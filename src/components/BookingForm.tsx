import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { insertBookingRequestSchema } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { ChevronLeft, ChevronRight, CheckCircle } from "lucide-react";

export function BookingForm() {
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(insertBookingRequestSchema),
    defaultValues: {
      eventDate: "",
      startTime: "",
      location: "",
      eventType: "",
      numberOfChildren: 1,
      duration: "",
      name: "",
      email: "",
      phone: "",
      specialRequests: "",
    },
  });

  const numberOfChildren = form.watch("numberOfChildren");

  useEffect(() => {
    if (numberOfChildren < 15) {
      form.setValue("duration", "1 hour");
    } else if (numberOfChildren >= 15 && numberOfChildren <= 30) {
      form.setValue("duration", "2 hours");
    } else if (numberOfChildren > 30) {
      form.setValue("duration", "3 hours");
    }
  }, [numberOfChildren, form]);

  const mutation = useMutation({
    mutationFn: async (data: any) => {
      return await apiRequest("POST", "/api/bookings", data);
    },
    onSuccess: () => {
      setIsSubmitted(true);
      form.reset();
      toast({
        title: "Booking request received!",
        description: "We'll get back to you within 24 hours.",
      });
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: "Something went wrong",
        description: error.message || "Please try again later.",
      });
    },
  });

  const onSubmit = (data: any) => {
    mutation.mutate(data);
  };

  const nextStep = async () => {
    const fieldsToValidate = step === 1 
      ? ["eventDate", "startTime", "location", "eventType", "numberOfChildren", "duration"] as const
      : ["name", "email", "phone"] as const;
    
    const isValid = await form.trigger(fieldsToValidate);
    if (isValid) {
      setStep(2);
    }
  };

  if (isSubmitted) {
    return (
      <section id="booking" className="py-16 md:py-24 lg:py-32" data-testid="section-booking">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="text-center p-8">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-primary" />
            </div>
            <CardTitle className="font-display text-2xl md:text-3xl mb-4">
              Thank You!
            </CardTitle>
            <CardDescription className="text-base md:text-lg">
              Your booking request has been received. We'll respond within 24 hours to confirm availability and discuss details.
            </CardDescription>
            <Button
              onClick={() => setIsSubmitted(false)}
              variant="outline"
              className="mt-6"
              data-testid="button-submit-another"
            >
              Submit Another Request
            </Button>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section id="booking" className="py-16 md:py-24 lg:py-32" data-testid="section-booking">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2
            className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-foreground mb-4"
            data-testid="text-booking-title"
          >
            Book Your Event
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground">
            Fill out the form below and we'll get back to you within 24 hours with a price
          </p>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step >= 1 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}>
                  1
                </div>
                <div className="w-12 md:w-20 h-px bg-border" />
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step >= 2 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}>
                  2
                </div>
              </div>
              <span className="text-sm text-muted-foreground">Step {step} of 2</span>
            </div>
            <CardTitle className="font-display text-xl">
              {step === 1 ? "Event Details" : "Contact Information"}
            </CardTitle>
            <CardDescription>
              {step === 1 
                ? "Tell us about your event" 
                : "How can we reach you?"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {step === 1 ? (
                  <div key="step-1" className="space-y-6">
                    <FormField
                      control={form.control}
                      name="eventDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Event Date *</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} data-testid="input-event-date" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="startTime"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Start Time *</FormLabel>
                          <FormControl>
                            <Input type="time" {...field} data-testid="input-start-time" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Event Location / Venue Name *</FormLabel>
                          <FormControl>
                            <Input 
                              {...field} 
                              placeholder="e.g. Community Centre, Home Address, etc."
                              data-testid="input-location" 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="eventType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Event Type *</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger data-testid="select-event-type">
                                <SelectValue placeholder="Select event type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Birthday Party">Birthday Party</SelectItem>
                              <SelectItem value="Communion Party">Communion Party</SelectItem>
                              <SelectItem value="Christening Party">Christening Party</SelectItem>
                              <SelectItem value="Community Event">Community Event</SelectItem>
                              <SelectItem value="Corporate Function">Corporate Function</SelectItem>
                              <SelectItem value="School Event">School Event</SelectItem>
                              <SelectItem value="Other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="numberOfChildren"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Number of Children *</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              min="1"
                              {...field}
                              onChange={(e) => {
                                const value = e.target.value;
                                field.onChange(value === "" ? 1 : parseInt(value) || 1);
                              }}
                              value={field.value}
                              data-testid="input-number-children"
                            />
                          </FormControl>
                          <FormDescription>
                            Approximate number of children attending
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="duration"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Duration *</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger data-testid="select-duration">
                                <SelectValue placeholder="Select duration" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="1 hour">1 hour</SelectItem>
                              <SelectItem value="2 hours">2 hours</SelectItem>
                              <SelectItem value="3 hours">3 hours</SelectItem>
                              <SelectItem value="4+ hours">4+ hours</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            {numberOfChildren < 15 && "Recommended: 1 hour (up to 15 children)"}
                            {numberOfChildren >= 15 && numberOfChildren <= 30 && "Recommended: 2 hours (15-30 children)"}
                            {numberOfChildren > 30 && "Recommended: 3 hours (30+ children)"}
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="button"
                      onClick={nextStep}
                      className="w-full"
                      data-testid="button-next-step"
                    >
                      Next Step
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                ) : (
                  <div key="step-2" className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Your Name *</FormLabel>
                          <FormControl>
                            <Input {...field} data-testid="input-name" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address *</FormLabel>
                          <FormControl>
                            <Input type="email" {...field} data-testid="input-email" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number *</FormLabel>
                          <FormControl>
                            <Input type="tel" {...field} data-testid="input-phone" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="specialRequests"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Special Requests (Optional)</FormLabel>
                          <FormControl>
                            <Textarea
                              {...field}
                              placeholder="Any specific designs or requirements?"
                              className="min-h-24"
                              data-testid="textarea-special-requests"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex gap-3">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setStep(1)}
                        className="flex-1"
                        data-testid="button-back"
                      >
                        <ChevronLeft className="w-4 h-4 mr-2" />
                        Back
                      </Button>
                      <Button
                        type="submit"
                        disabled={mutation.isPending}
                        className="flex-1"
                        data-testid="button-submit-booking"
                      >
                        {mutation.isPending ? "Submitting..." : "Request Booking"}
                      </Button>
                    </div>

                    <p className="text-sm text-center text-muted-foreground">
                      We'll respond within 24 hours
                    </p>
                  </div>
                )}
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
