/// <reference types="@cloudflare/workers-types" />
import type { ContactEmailData } from "../_email";
import { sendContactEmail } from "../_email";



// Optional CORS/preflight handler (safe to keep)
export const onRequestOptions: PagesFunction = async () =>
    new Response(null, {
        status: 204,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type",
        },
    });

export const onRequestPost: PagesFunction<{ RESEND_API_KEY: string }> = async (ctx) => {
    try {
        const data = (await ctx.request.json()) as Partial<ContactEmailData>;

        // Minimal validation
        if (!data?.name || !data?.email || !data?.message) {
            return new Response(JSON.stringify({ error: "Name, email and message are required." }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }

        await sendContactEmail(ctx.env, data as ContactEmailData);

        return new Response(JSON.stringify({ success: true, message: "Your message has been sent! We'll get back to you soon." }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (err: any) {
        return new Response(JSON.stringify({ error: err?.message || "Server error" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
};
