
import { ExternalLink, MapPin, Percent } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface PartnerCardProps {
  id: number;
  name: string;
  image: string;
  discount: string;
  pointsRequired: number;
  location: string;
  category: string;
  onRedeem: (id: number) => void;
}

const PartnerCard = ({
  id,
  name,
  image,
  discount,
  pointsRequired,
  location,
  category,
  onRedeem
}: PartnerCardProps) => {
  return (
    <div className="eco-card overflow-hidden group">
      <div className="aspect-video relative overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <Badge className="absolute top-3 right-3 bg-eco-accent">
          {discount}
        </Badge>
      </div>
      
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="font-bold text-lg">{name}</h3>
            <div className="flex items-center text-sm text-muted-foreground mt-1">
              <MapPin className="h-4 w-4 mr-1" />
              {location}
            </div>
          </div>
          <Badge variant="outline" className="text-xs">
            {category}
          </Badge>
        </div>
        
        <div className="flex items-center mb-4">
          <Percent className="h-5 w-5 text-eco-primary mr-2" />
          <span className="text-sm text-muted-foreground">
            {pointsRequired} points required
          </span>
        </div>
        
        <div className="flex space-x-2">
          <Button 
            className="flex-1 bg-eco-primary hover:bg-eco-secondary"
            onClick={() => onRedeem(id)}
          >
            Redeem Offer
          </Button>
          <Button variant="outline" size="icon">
            <ExternalLink className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PartnerCard;
