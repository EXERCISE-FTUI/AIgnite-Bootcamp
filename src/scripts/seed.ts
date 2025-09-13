import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import path from "path";

// Load environment variables
try {
    dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });
} catch {
    // Ignore error if .env.local doesn't exist
}
try {
    dotenv.config();
} catch {
    // Ignore error if .env doesn't exist
}

interface DummyUser {
    email: string;
    password: string;
}

async function main(): Promise<void> {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
        console.error("Missing Supabase environment variables");
        process.exit(1);
    }

    console.log("[seed] Starting database seeding...");

    // Create Supabase client
    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    // Define dummy users
    const dummyUsers: DummyUser[] = [];
    for (let i = 1; i <= 10; i++) {
        dummyUsers.push({
            email: `test${i}@gmail.com`,
            password: "12345678",
        });
    }

    console.log(`[seed] Creating ${dummyUsers.length} dummy users...`);

    let successCount = 0;
    let failCount = 0;

    for (const user of dummyUsers) {
        try {
            console.log(`[seed] Creating user: ${user.email}`);

            // Step 1: Create auth user (mimicking the register API)
            const { data: auth, error: authError } = await supabase.auth.signUp(
                {
                    email: user.email,
                    password: user.password,
                    options: {
                        emailRedirectTo:
                            process.env.NEXT_PUBLIC_BASE_URL + "/dashboard",
                    },
                }
            );

            if (authError) {
                console.error(
                    `[seed] Auth error for ${user.email}:`,
                    authError.message
                );
                failCount++;
                continue;
            }

            if (!auth.user?.id) {
                console.error(`[seed] No user ID returned for ${user.email}`);
                failCount++;
                continue;
            }

            console.log(
                `[seed] Auth user created for ${user.email}, ID: ${auth.user.id}`
            );

            // Step 2: Insert into users table (mimicking the register API)
            const { error: insertError } = await supabase.from("users").insert({
                email: user.email,
                user_id: auth.user.id,
            });

            if (insertError) {
                console.error(
                    `[seed] Insert error for ${user.email}:`,
                    insertError.message
                );
                failCount++;
                continue;
            }

            console.log(`[seed] ✓ Successfully created user: ${user.email}`);
            successCount++;
        } catch (error) {
            console.error(
                `[seed] Unexpected error for ${user.email}:`,
                error instanceof Error ? error.message : String(error)
            );
            failCount++;
        }

        // Add small delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 100));
    }

    console.log(`[seed] Seeding completed!`);
    console.log(`[seed] Success: ${successCount} users`);
    console.log(`[seed] Failed: ${failCount} users`);

    if (failCount > 0) {
        process.exitCode = 1;
    }
}

main().catch(err => {
    console.error("[seed] Unhandled error:", err);
    process.exit(1);
});
