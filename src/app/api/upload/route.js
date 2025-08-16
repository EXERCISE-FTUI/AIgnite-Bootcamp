import {google} from "googleapis";
import {PassThrough} from "stream";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req) {
	try {
		const formData = await req.formData();
		const file = formData.get("file");
		const folderName = formData.get("name");
		const label = formData.get("label");

		if (!file)
			return new Response(JSON.stringify({error: "No file uploaded"}), {
				status: 400,
			});
		if (!folderName)
			return new Response(
				JSON.stringify({error: "Folder name is required"}),
				{status: 400}
			);

		const fileBuffer = Buffer.from(await file.arrayBuffer());

		const jwtClient = new google.auth.JWT(
			process.env.CLIENT_EMAIL,
			undefined,
			process.env.PRIVATE_KEY?.replace(/\\n/g, "\n") || "",
			["https://www.googleapis.com/auth/drive"]
		);

		await jwtClient.authorize();
		const drive = google.drive({version: "v3", auth: jwtClient});

		// Find or create folder
		let folderId;
		const folderQuery = `name='${folderName}' and mimeType='application/vnd.google-apps.folder' and '${process.env.PARENT_FOLDER_ID}' in parents and trashed=false`;
		const folderList = await drive.files.list({
			q: folderQuery,
			fields: "files(id)",
		});

		if (folderList.data.files && folderList.data.files.length > 0) {
			folderId = folderList.data.files[0].id;
		} else {
			const folder = await drive.files.create({
				requestBody: {
					name: folderName,
					mimeType: "application/vnd.google-apps.folder",
					parents: [process.env.PARENT_FOLDER_ID],
				},
				fields: "id",
			});

			console.log(folder.data);
			folderId = folder.data.id;

			console.log("Folder created", folderId);
		}

		const fileMetadata = {
			name: `${label}_${folderName}`,
			parents: [folderId],
		};

		// ✅ Convert Buffer to a proper Node.js Readable stream
		const bufferStream = new PassThrough();
		bufferStream.end(fileBuffer);

		const media = {mimeType: file.type, body: bufferStream};

		const uploadedFile = await drive.files.create({
			requestBody: fileMetadata,
			media,
			fields: "id",
			uploadType: "media",
		});

		if (folderId) {
			await drive.permissions.create({
				fileId: folderId,
				requestBody: {role: "reader", type: "anyone"},
			});
		}

		// await drive.permissions.create({
		// 	fileId: uploadedFile.data.id,
		// 	requestBody: {role: "reader", type: "anyone"},
		// });

		// ✅ Use ReadableStream for the response
		const encoder = new TextEncoder();
		const responseStream = new ReadableStream({
			start(controller) {
				controller.enqueue(
					encoder.encode(
						JSON.stringify({
							message: "File uploaded successfully",
							fileName: file.name,
							name: folderName,
							fileUrl: `https://drive.google.com/file/d/${uploadedFile.data.id}`,
							folderUrl: `https://drive.google.com/drive/folders/${folderId}`,
						})
					)
				);
				controller.close();
			},
		});

		return new Response(responseStream, {
			headers: {"Content-Type": "application/json"},
		});
	} catch (error) {
		console.error("Error Uploading File", error);

		const encoder = new TextEncoder();
		const errorStream = new ReadableStream({
			start(controller) {
				controller.enqueue(
					encoder.encode(
						JSON.stringify({
							error: error.message,
						})
					)
				);
				controller.close();
			},
		});

		return new Response(errorStream, {
			status: 500,
			headers: {"Content-Type": "application/json"},
		});
	}
}
