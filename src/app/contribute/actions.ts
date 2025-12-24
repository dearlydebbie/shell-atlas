"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

export async function submitContribution(prevState: any, formData: FormData) {
    const supabase = await createClient();

    const type = formData.get("type") as string;
    const theme = formData.get("theme") as string;
    const origin_region = formData.get("origin_region") as string;
    const origin_free_text = formData.get("origin_free_text") as string;
    const lineage = formData.get("lineage") as string;
    const from_story_slug = formData.get("from_story_slug") as string;

    // Text content
    const text = formData.get("text") as string;

    // Audio handling
    const audioFile = formData.get("audio") as File;
    let audio_path = null;

    if (type === "voice" && audioFile && audioFile.size > 0) {
        // Validate size (e.g. 5MB)
        if (audioFile.size > 5 * 1024 * 1024) {
            return { error: "Audio file too large. Max 5MB." };
        }

        const fileExt = audioFile.name.split('.').pop();
        const fileName = `${uuidv4()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
            .from("contribution-audio")
            .upload(filePath, audioFile);

        if (uploadError) {
            console.error("Upload error:", uploadError);
            return { error: "Failed to upload audio." };
        }

        audio_path = filePath;
    }

    // Insert Record
    const { error: insertError } = await supabase.from("contributions").insert({
        type,
        theme,
        origin_region,
        origin_free_text,
        lineage,
        from_story_slug: from_story_slug || null,
        text: text || null,
        audio_path, // null if not voice
        status: "pending" // Force pending
    });

    if (insertError) {
        console.error("Insert error:", insertError);
        return { error: "Failed to save contribution." };
    }

    redirect("/contribute/thanks");
}
