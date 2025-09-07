import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { email, password } = await req.json(); // Parse request body
        const supabase = createClient();
        console.log("CREATING USER:", email);
        // if user already exists with other provider

        const { data: auth, error } = await (
            await supabase
        ).auth.signUp({
            email,
            password,
        });

        console.log("AUTH: ", auth);

        if (error) {
            return NextResponse.json({ error: error }, { status: 500 });
        }

        const { error: insertError } = await (await supabase)
            .from("users")
            .insert({
                email,
                user_id: auth.user?.id,
            });

        console.log("INSERT ERROR: ", insertError);
        if (insertError) {
            return NextResponse.json(
                { error: "Email already exists, try log in with google" },
                { status: 500 }
            );
        }

        return NextResponse.json({ data: auth }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { error: (error as Error).message },
            { status: 500 }
        );
    }
}
