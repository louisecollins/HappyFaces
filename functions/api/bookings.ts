/// <reference types="@cloudflare/workers-types" />
import type { BookingEmailData } from "../_email";
import { sendBookingEmail } from "../_email";

// Optional: handle CORS preflight (harmless to keep)
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
        const raw = (await ctx.request.json()) as Partial<BookingEmailData>;

        // Coerce numberOfChildren to a number if it arrives as a string
        const numberOfChildren =
            typeof raw.numberOfChildren === "string"
                ? parseInt(raw.numberOfChildren, 10)
                : raw.numberOfChildren;

        const data: BookingEmailData = {
            name: String(raw.name || "").trim(),
            email: String(raw.email || "").trim(),
            phone: String(raw.phone || "").trim(),
            eventDate: String(raw.eventDate || "").trim(),
            startTime: String(raw.startTime || "").trim(),
            location: String(raw.location || "").trim(),
            eventType: String(raw.eventType || "").trim(),
            duration: String(raw.duration || "").trim(),
            numberOfChildren: Number.isFinite(numberOfChildren!) ? (numberOfChildren as number) : 0,
            specialRequests: (raw.specialRequests ?? null) as string | null,
        };

        // Minimal validation (expand later if you like)
        const required: (keyof BookingEmailData)[] = [
            "name",
            "email",
            "phone",
            "eventDate",
            "startTime",
            "location",
            "eventType",
            "duration",
            "numberOfChildren",
        ];
        for (const k of required) {
            const v = data[k] as any;
            if (v === undefined || v === null || String(v).trim() === "") {
                return new Response(JSON.stringify({ error: `Missing field: ${k}` }), {
                    status: 400,
                    headers: { "Content-Type": "application/json" },
                });
            }
        }
        if (data.numberOfChildren <= 0) {
            return new Response(JSON.stringify({ error: "numberOfChildren must be > 0" }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }

        await sendBookingEmail(ctx.env, data);

        return new Response(
            JSON.stringify({
                success: true,
                message:
                    "Your booking request has been sent! I'll contact you shortly to confirm details and provide a quote.",
            }),
            { status: 200, headers: { "Content-Type": "application/json" } }
        );
    } catch (err: any) {
        return new Response(JSON.stringify({ error: err?.message || "Server error" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
};
