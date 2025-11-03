import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, ExternalLink } from "lucide-react";

const googleReviews = [
    {
        rating: 5,
        text: "Booked Happy Faces for my daughters christening and the service was outstanding. The kids absolutely loved it and they all looked amazing would highly recommend",
        author: "Mark Hyland",
        date: "3 days ago",
        reviewerInfo: "Local Guide • 3 reviews",
    },
    {
        rating: 5,
        text: "Booked Happy Faces for my daughters birthday. Delighted with the service from from start to finish and Louise ensured there was 20 very happy children. Would highly recommend and will definitely be hiring again in near future",
        author: "Gavin McGucken",
        date: "2 weeks ago",
        reviewerInfo: "1 review",
    },
    {
        rating: 5,
        text: "I had requested Louises' face painting service for my daughter's Birthday. She was fantastic and all kids thoroughly enjoyed get their face painted. I highly recommend Happy Faces. Thank you!",
        author: "Divya sankarankutty",
        date: "9 weeks ago",
        reviewerInfo: "Local Guide • 37 reviews • 51 photos",
    },
    {
        rating: 5,
        text: "Booked with Happy Faces for my daughter's birthday party last week and was really glad I did. All the kids were delighted with their face paint, she was really brilliant helping a few nervous kids and settling them to get their faces painted, and made sure the 20 odd kids that wanted something done were sorted. Couldn't have wished for better",
        author: "Seamus Nolan",
        date: "9 weeks ago",
        reviewerInfo: "1 review",
    },
];

export function Reviews() {
    return (
        <section id="reviews" className="py-16 md:py-24 lg:py-32" data-testid="section-reviews">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12 md:mb-16">
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                    key={star}
                                    className="w-6 h-6 md:w-8 md:h-8 fill-yellow-400 text-yellow-400"
                                />
                            ))}
                        </div>
                    </div>
                    <h2
                        className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-foreground mb-4"
                        data-testid="text-reviews-title"
                    >
                        5-Star Google Reviews
                    </h2>
                    <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-6">
                        See what my happy customers are saying about Happy Faces Belfast
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-8">
                    {googleReviews.map((review, index) => (
                        <Card
                            key={index}
                            className="hover-elevate transition-all duration-300"
                            data-testid={`card-review-${index}`}
                        >
                            <CardContent className="p-6">
                                <div className="flex items-center gap-1 mb-3">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <Star
                                            key={star}
                                            className={`w-4 h-4 ${star <= review.rating
                                                    ? "fill-yellow-400 text-yellow-400"
                                                    : "text-muted"
                                                }`}
                                            data-testid={`star-${star}`}
                                        />
                                    ))}
                                </div>
                                <p className="text-card-foreground mb-4 leading-relaxed">
                                    "{review.text}"
                                </p>
                                <div className="border-t pt-3">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-semibold text-foreground">
                                                {review.author}
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                {review.reviewerInfo}
                                            </p>
                                        </div>
                                        <span className="text-sm text-muted-foreground">
                                            {review.date}
                                        </span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="text-center">
                    <Button
                        asChild
                        variant="outline"
                        size="lg"
                        data-testid="button-google-reviews"
                    >
                        <a
                            href="https://www.google.com/search?q=Happy+Faces+Belfast"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            View All Reviews on Google
                            <ExternalLink className="w-4 h-4 ml-2" />
                        </a>
                    </Button>
                </div>
            </div>
        </section>
    );
}
