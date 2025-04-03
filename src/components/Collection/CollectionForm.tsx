
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { MapPin, Calendar, Truck, Clock } from "lucide-react";

const CollectionForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      toast({
        title: "Collection Scheduled!",
        description: "A smart dustbin will arrive at your location soon.",
      });
    }, 1500);
  };

  if (isSubmitted) {
    return (
      <Card className="shadow-lg border-t-4 border-t-eco-primary">
        <CardHeader>
          <CardTitle className="flex items-center text-eco-dark">
            <Truck className="mr-2 h-6 w-6 text-eco-primary" />
            Collection Scheduled
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-muted p-4 rounded-lg space-y-4">
            <div className="flex items-center space-x-3">
              <div className="bg-eco-light p-2 rounded-full">
                <Calendar className="h-5 w-5 text-eco-primary" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Date</div>
                <div className="font-medium">Tomorrow, {new Date(Date.now() + 86400000).toLocaleDateString()}</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="bg-eco-light p-2 rounded-full">
                <Clock className="h-5 w-5 text-eco-primary" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Time</div>
                <div className="font-medium">Between 9:00 AM and 12:00 PM</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="bg-eco-light p-2 rounded-full">
                <MapPin className="h-5 w-5 text-eco-primary" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Location</div>
                <div className="font-medium">Your provided address</div>
              </div>
            </div>
          </div>
          
          <div className="p-4 border border-eco-primary bg-eco-light/20 rounded-lg">
            <p className="text-sm">
              Our smart dustbin will arrive at your location during the scheduled time. Please ensure someone is available to receive it.
            </p>
          </div>
          
          <Button 
            className="w-full" 
            variant="outline"
            onClick={() => setIsSubmitted(false)}
          >
            Schedule Another Collection
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center text-eco-dark">
          <MapPin className="mr-2 h-6 w-6 text-eco-primary" />
          Schedule Waste Collection
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="Enter your full name" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" placeholder="Enter your phone number" required />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Textarea id="address" placeholder="Enter your full address" required className="resize-none" />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">Preferred Date</Label>
                <Input id="date" type="date" required min={new Date().toISOString().split('T')[0]} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">Preferred Time</Label>
                <select id="time" className="w-full h-10 px-3 rounded-md border border-input bg-background">
                  <option value="">Select a time slot</option>
                  <option value="morning">Morning (9 AM - 12 PM)</option>
                  <option value="afternoon">Afternoon (1 PM - 4 PM)</option>
                  <option value="evening">Evening (5 PM - 8 PM)</option>
                </select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="notes">Additional Notes</Label>
              <Textarea id="notes" placeholder="Any special instructions or details about your waste" className="resize-none" />
            </div>
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-eco-primary hover:bg-eco-secondary"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Scheduling..." : "Schedule Collection"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default CollectionForm;
