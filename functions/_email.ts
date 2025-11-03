/// <reference types="node" />

import { Resend } from "resend";

// --- CONTACT FORM EMAIL ---

export interface ContactEmailData {
    name: string;
    email: string;
    phone?: string;
    message: string;
}

export async function sendContactEmail(
    env: { RESEND_API_KEY: string },
    data: ContactEmailData
) {
    const resend = new Resend(env.RESEND_API_KEY);

    const emailBody = `
New Contact Message from ${data.name}

MESSAGE:
${data.message}

CONTACT INFORMATION:
- Name: ${data.name}
- Email: ${data.email}
${data.phone ? `- Phone: ${data.phone}` : ""}
  `.trim();

    await resend.emails.send({
        from: "Happy Faces Belfast <onboarding@resend.dev>",
        to: "happy_faces@hotmail.co.uk",
        replyTo: data.email,
        subject: `New Contact Message from ${data.name}`,
        text: emailBody,
    });
}

// --- BOOKING REQUEST EMAIL ---

export interface BookingEmailData {
    name: string;
    email: string;
    phone: string;
    eventDate: string;
    startTime: string;
    location: string;
    eventType: string;
    numberOfChildren: number;
    duration: string;
    specialRequests?: string | null;
}

export async function sendBookingEmail(
    env: { RESEND_API_KEY: string },
    data: BookingEmailData
) {
    const resend = new Resend(env.RESEND_API_KEY);

    const emailBody = `
New Booking Request from ${data.name}

EVENT DETAILS:
- Event Type: ${data.eventType}
- Event Date: ${data.eventDate}
- Start Time: ${data.startTime}
- Location/Venue: ${data.location}
- Number of Children: ${data.numberOfChildren}
- Duration: ${data.duration}

CONTACT INFORMATION:
- Name: ${data.name}
- Email: ${data.email}
- Phone: ${data.phone}

${data.specialRequests ? `SPECIAL REQUESTS:\n${data.specialRequests}` : "No special requests"}

---
Reply directly to this email to respond to ${data.name}.
  `.trim();

    await resend.emails.send({
        from: "Happy Faces Belfast <onboarding@resend.dev>",
        to: "happy_faces@hotmail.co.uk",
        replyTo: data.email,
        subject: `New Booking Request from ${data.name}`,
        text: emailBody,
    });
}
