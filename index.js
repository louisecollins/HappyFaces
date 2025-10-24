var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// shared/schema.ts
var schema_exports = {};
__export(schema_exports, {
  bookingRequests: () => bookingRequests,
  contactMessages: () => contactMessages,
  events: () => events,
  galleryItems: () => galleryItems,
  insertBookingRequestSchema: () => insertBookingRequestSchema,
  insertContactMessageSchema: () => insertContactMessageSchema,
  insertEventSchema: () => insertEventSchema,
  insertGalleryItemSchema: () => insertGalleryItemSchema,
  insertTestimonialSchema: () => insertTestimonialSchema,
  testimonials: () => testimonials
});
import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
var contactMessages = pgTable("contact_messages", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull()
});
var insertContactMessageSchema = createInsertSchema(contactMessages).omit({
  id: true,
  createdAt: true
}).extend({
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  message: z.string().min(10, "Message must be at least 10 characters")
});
var bookingRequests = pgTable("booking_requests", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  eventDate: text("event_date").notNull(),
  startTime: text("start_time").notNull(),
  location: text("location").notNull(),
  eventType: text("event_type").notNull(),
  numberOfChildren: integer("number_of_children").notNull(),
  duration: text("duration").notNull(),
  specialRequests: text("special_requests"),
  createdAt: timestamp("created_at").defaultNow().notNull()
});
var insertBookingRequestSchema = createInsertSchema(bookingRequests).omit({
  id: true,
  createdAt: true
}).extend({
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  eventDate: z.string().min(1, "Please select an event date"),
  startTime: z.string().min(1, "Please select a start time"),
  location: z.string().min(2, "Please enter event location or venue name"),
  eventType: z.string().min(1, "Please select an event type"),
  numberOfChildren: z.coerce.number().min(1, "Must have at least 1 child").max(100, "Please contact us directly for events with over 100 children"),
  duration: z.string().min(1, "Please select a duration")
});
var events = pgTable("events", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  venue: text("venue").notNull(),
  location: text("location").notNull(),
  date: text("date").notNull(),
  time: text("time").notNull(),
  description: text("description")
});
var insertEventSchema = createInsertSchema(events).omit({
  id: true
});
var galleryItems = pgTable("gallery_items", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  imageUrl: text("image_url").notNull(),
  title: text("title").notNull(),
  category: text("category").notNull(),
  description: text("description")
});
var insertGalleryItemSchema = createInsertSchema(galleryItems).omit({
  id: true
});
var testimonials = pgTable("testimonials", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  author: text("author").notNull(),
  rating: integer("rating").notNull(),
  text: text("text").notNull(),
  date: text("date").notNull(),
  isApproved: integer("is_approved").notNull().default(1),
  createdAt: timestamp("created_at").defaultNow().notNull()
});
var insertTestimonialSchema = createInsertSchema(testimonials).omit({
  id: true,
  createdAt: true
}).extend({
  author: z.string().min(2, "Author name must be at least 2 characters"),
  rating: z.number().min(1).max(5),
  text: z.string().min(10, "Testimonial must be at least 10 characters"),
  date: z.string().optional().default("recently"),
  isApproved: z.number().optional().default(0)
});

// server/db.ts
import { Pool, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import ws from "ws";
neonConfig.webSocketConstructor = ws;
if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?"
  );
}
var pool = new Pool({ connectionString: process.env.DATABASE_URL });
var db = drizzle({ client: pool, schema: schema_exports });

// server/storage.ts
import { eq } from "drizzle-orm";
var DatabaseStorage = class {
  async createContactMessage(insertMessage) {
    const [message] = await db.insert(contactMessages).values(insertMessage).returning();
    return message;
  }
  async getAllContactMessages() {
    return await db.select().from(contactMessages);
  }
  async createBookingRequest(insertBooking) {
    const [booking] = await db.insert(bookingRequests).values(insertBooking).returning();
    return booking;
  }
  async getAllBookingRequests() {
    return await db.select().from(bookingRequests);
  }
  async getAllEvents() {
    return await db.select().from(events);
  }
  async createEvent(insertEvent) {
    const [event] = await db.insert(events).values(insertEvent).returning();
    return event;
  }
  async getAllGalleryItems() {
    return await db.select().from(galleryItems);
  }
  async createGalleryItem(insertItem) {
    const [item] = await db.insert(galleryItems).values(insertItem).returning();
    return item;
  }
  async getAllTestimonials() {
    return await db.select().from(testimonials);
  }
  async getApprovedTestimonials() {
    return await db.select().from(testimonials).where(eq(testimonials.isApproved, 1));
  }
  async createTestimonial(insertTestimonial) {
    const [testimonial] = await db.insert(testimonials).values(insertTestimonial).returning();
    return testimonial;
  }
};
var storage = new DatabaseStorage();

// server/email.ts
import { Resend } from "resend";
var resend = new Resend(process.env.RESEND_API_KEY);
async function sendBookingEmail(data) {
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

${data.specialRequests ? `SPECIAL REQUESTS:
${data.specialRequests}` : "No special requests"}

---
Reply directly to this email to respond to ${data.name}.
  `.trim();
  await resend.emails.send({
    from: "Happy Faces Belfast <onboarding@resend.dev>",
    to: "happy_faces@hotmail.co.uk",
    replyTo: data.email,
    subject: `New Booking Request from ${data.name}`,
    text: emailBody
  });
}
async function sendContactEmail(data) {
  const emailBody = `
New Contact Message from ${data.name}

MESSAGE:
${data.message}

CONTACT INFORMATION:
- Name: ${data.name}
- Email: ${data.email}
${data.phone ? `- Phone: ${data.phone}` : ""}

---
Reply directly to this email to respond to ${data.name}.
  `.trim();
  await resend.emails.send({
    from: "Happy Faces Belfast <onboarding@resend.dev>",
    to: "happy_faces@hotmail.co.uk",
    replyTo: data.email,
    subject: `New Contact Message from ${data.name}`,
    text: emailBody
  });
}

// server/routes.ts
async function registerRoutes(app2) {
  app2.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactMessageSchema.parse(req.body);
      await sendContactEmail(validatedData);
      res.json({ success: true, message: "Your message has been sent! We'll get back to you soon." });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error.message || "Failed to send contact message"
      });
    }
  });
  app2.post("/api/bookings", async (req, res) => {
    try {
      const validatedData = insertBookingRequestSchema.parse(req.body);
      await sendBookingEmail(validatedData);
      res.json({ success: true, message: "Your booking request has been sent! We'll contact you shortly to confirm details and provide a quote." });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error.message || "Failed to send booking request"
      });
    }
  });
  app2.get("/api/events", async (req, res) => {
    try {
      const events2 = await storage.getAllEvents();
      res.json({ success: true, data: events2 });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message || "Failed to fetch events"
      });
    }
  });
  app2.post("/api/events", async (req, res) => {
    try {
      const validatedData = insertEventSchema.parse(req.body);
      const event = await storage.createEvent(validatedData);
      res.json({ success: true, data: event });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error.message || "Failed to create event"
      });
    }
  });
  app2.get("/api/gallery", async (req, res) => {
    try {
      const items = await storage.getAllGalleryItems();
      res.json({ success: true, data: items });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message || "Failed to fetch gallery items"
      });
    }
  });
  app2.post("/api/gallery", async (req, res) => {
    try {
      const validatedData = insertGalleryItemSchema.parse(req.body);
      const item = await storage.createGalleryItem(validatedData);
      res.json({ success: true, data: item });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error.message || "Failed to create gallery item"
      });
    }
  });
  app2.get("/api/testimonials", async (req, res) => {
    try {
      const testimonials2 = await storage.getApprovedTestimonials();
      res.json({ success: true, data: testimonials2 });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message || "Failed to fetch testimonials"
      });
    }
  });
  app2.post("/api/testimonials", async (req, res) => {
    try {
      const validatedData = insertTestimonialSchema.parse(req.body);
      const testimonial = await storage.createTestimonial(validatedData);
      res.json({ success: true, data: testimonial });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error.message || "Failed to create testimonial"
      });
    }
  });
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      ),
      await import("@replit/vite-plugin-dev-banner").then(
        (m) => m.devBanner()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"]
    }
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express2();
app.use(express2.json({
  verify: (req, _res, buf) => {
    req.rawBody = buf;
  }
}));
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = parseInt(process.env.PORT || "5000", 10);
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true
  }, () => {
    log(`serving on port ${port}`);
  });
})();
