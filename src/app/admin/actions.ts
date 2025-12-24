"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/server";

const COOKIE_NAME = "admin_session";
const MAX_AGE = 60 * 60 * 24; // 24 hours

export async function login(prevState: any, formData: FormData) {
    const token = formData.get("token") as string;
    const adminToken = process.env.ADMIN_TOKEN;

    // Simple token check
    if (!token || token !== adminToken) {
        return { error: "Invalid admin token" };
    }

    // Set cookie
    const cookieStore = await cookies();
    cookieStore.set(COOKIE_NAME, "true", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: MAX_AGE,
        path: "/",
    });

    redirect("/admin");
}

export async function logout() {
    const cookieStore = await cookies();
    cookieStore.delete(COOKIE_NAME);
    redirect("/admin/login");
}

// Moderation Actions
export async function approveContribution(id: string) {
    // Verify admin
    const cookieStore = await cookies();
    if (!cookieStore.get(COOKIE_NAME)) return;

    const supabase = createAdminClient();
    await supabase.from("contributions").update({ status: "approved", approved_at: new Date().toISOString() }).eq("id", id);

    // Revalidate dashboard
}

export async function rejectContribution(id: string) {
    const cookieStore = await cookies();
    if (!cookieStore.get(COOKIE_NAME)) return;

    const supabase = createAdminClient();
    await supabase.from("contributions").update({ status: "rejected" }).eq("id", id);
}

export async function deleteContribution(id: string) {
    const cookieStore = await cookies();
    if (!cookieStore.get(COOKIE_NAME)) return;

    const supabase = createAdminClient();
    // If it has audio, delete file too? 
    // Ideally yes. Fetch it first.
    const { data } = await supabase.from("contributions").select("audio_path").eq("id", id).single();
    if (data?.audio_path) {
        await supabase.storage.from("contribution-audio").remove([data.audio_path]);
    }

    await supabase.from("contributions").delete().eq("id", id);
}
