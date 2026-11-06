import { z } from "zod";

export const insertContactMessageSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export const insertBookingRequestSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  eventDate: z.string().min(1, "Please select an event date"),
  startTime: z.string().min(1, "Please select a start time"),
  location: z.string().min(2, "Please enter event location or venue name"),
  eventType: z.string().min(1, "Please select an event type"),
  numberOfChildren: z.coerce
    .number()
    .min(1, "Must have at least 1 child")
    .max(100, "Please contact us directly for events with over 100 children"),
  duration: z.string().min(1, "Please select a duration"),
  specialRequests: z.string().nullable().optional(),
});

export interface Event {
  title: string;
  venue: string;
  location: string;
  date: string;
  time: string;
  description?: string | null;
}
