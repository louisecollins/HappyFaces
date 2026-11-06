import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Clock } from "lucide-react";
import type { Event } from "@/lib/schema";

// Add public events here, e.g.
// { title: "Summer Fun Day", venue: "Falls Park", location: "Belfast", date: "Saturday, 12th July", time: "11am - 3pm", description: "Face painting for all ages" }
const upcomingEvents: Event[] = [];

export function Events() {
  return (
    <section id="events" className="py-16 md:py-24 lg:py-32 bg-accent/20" data-testid="section-events">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2
            className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-foreground mb-4"
            data-testid="text-events-title"
          >
            Upcoming Events
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Find me at these upcoming public events around Belfast
          </p>
        </div>

        {upcomingEvents.length === 0 && (
          <Card className="max-w-2xl mx-auto">
            <CardContent className="p-8 md:p-12 text-center">
              <Calendar className="w-16 h-16 mx-auto mb-4 text-muted-foreground/40" />
              <h3 className="font-display font-semibold text-xl md:text-2xl text-foreground mb-3">
                No Public Events Scheduled
              </h3>
              <p className="text-muted-foreground mb-4">
                I don't currently have any public events scheduled, but I'd love to bring face painting to your event!
              </p>
              <p className="text-sm text-muted-foreground">
                Get in touch to discuss booking me for your birthday party, community event, or special occasion.
              </p>
            </CardContent>
          </Card>
        )}

        {upcomingEvents.length > 0 && (
          <div className="space-y-6 max-w-4xl mx-auto">
            {upcomingEvents.map((event, index) => (
            <Card key={index} className="overflow-hidden hover-elevate" data-testid={`card-event-${index}`}>
              <div className="flex flex-col md:flex-row">
                <div className="md:w-32 bg-gradient-to-br from-primary to-chart-2 p-6 flex flex-col items-center justify-center text-white">
                  <Calendar className="w-8 h-8 mb-2" />
                  <div className="text-center">
                    <div className="font-display font-bold text-2xl">
                      {event.date.split(",")[1]?.trim().split("th")[0] || "15"}
                    </div>
                    <div className="text-sm opacity-90">
                      {event.date.split(",")[0]}
                    </div>
                  </div>
                </div>
                
                <div className="flex-1">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4 flex-wrap">
                      <div>
                        <CardTitle className="font-display text-xl md:text-2xl mb-2">
                          {event.title}
                        </CardTitle>
                        <CardDescription className="text-base">
                          {event.description}
                        </CardDescription>
                      </div>
                      <Badge className="bg-chart-2 text-white border-0">
                        I'll Be There
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">{event.venue}, {event.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">{event.time}</span>
                    </div>
                  </CardContent>
                </div>
              </div>
            </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
