import fs from "fs";
import path from "path";
import {Client} from "pg";
import dotenv from "dotenv";

// Load env from .env.local (fallback to .env)
try {
	dotenv.config({path: path.resolve(process.cwd(), ".env.local")});
} catch {
	// Ignore error if .env.local doesn't exist
}
try {
	dotenv.config();
} catch {
	// Ignore error if .env doesn't exist
}

function maskConnectionString(raw: string): string {
	try {
		const u = new URL(raw);
		const user = decodeURIComponent(u.username || "");
		const host = u.hostname;
		const port = u.port || "5432";
		const db = u.pathname || "";
		return `${u.protocol}//${
			user ? user + ":" : ""
		}***@${host}:${port}${db}`;
	} catch {
		return "***";
	}
}

async function main(): Promise<void> {
	const databaseUrl = process.env.DIRECT_URL;
	if (!databaseUrl) {
		console.error("Missing DIRECT_URL in environment");
		process.exit(1);
	}

	console.log("[migrate] Using database:", maskConnectionString(databaseUrl));

	const migrationPath = path.resolve(
		process.cwd(),
		"migrations",
		"001_init.sql"
	);
	if (!fs.existsSync(migrationPath)) {
		console.error(`Migration file not found: ${migrationPath}`);
		process.exit(1);
	}
	const sql = fs.readFileSync(migrationPath, "utf-8");
	const sqlLines = sql.split(/\r?\n/).length;
	console.log(
		`[migrate] Loaded SQL from ${path.relative(
			process.cwd(),
			migrationPath
		)} (${sqlLines} lines)`
	);

	const client = new Client({
		connectionString: databaseUrl,
		ssl: {rejectUnauthorized: false},
	});

	try {
		const startedAt = Date.now();
		console.log("[migrate] Connecting to database...");
		await client.connect();
		console.log("[migrate] Connected. Beginning transaction...");
		await client.query("begin");
		console.log("[migrate] Executing migration statements...");
		await client.query(sql);
		console.log("[migrate] Commit transaction...");
		await client.query("commit");
		const durationMs = Date.now() - startedAt;
		console.log(
			`[migrate] Migration completed successfully in ${durationMs} ms.`
		);
	} catch (err) {
		try {
			console.warn(
				"[migrate] Error encountered. Rolling back transaction..."
			);
			await client.query("rollback");
			console.warn("[migrate] Rollback complete.");
		} catch {
			// Ignore rollback errors
		}
		console.error(
			"[migrate] Migration failed:",
			err instanceof Error ? err.message : String(err)
		);
		if (err instanceof Error && err.stack) {
			console.error("[migrate] Stack:", err.stack);
		}
		process.exitCode = 1;
	} finally {
		console.log("[migrate] Closing connection...");
		await client.end();
		console.log("[migrate] Connection closed.");
	}
}

main().catch((err) => {
	console.error("[migrate] Unhandled error:", err);
	process.exit(1);
});
