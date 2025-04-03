
import { useState } from "react";
import { Search, Filter, Store } from "lucide-react";
import Layout from "@/components/layout/Layout";
import PartnerCard from "@/components/Partners/PartnerCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";

const PartnersPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [redeemDialogOpen, setRedeemDialogOpen] = useState(false);
  const [selectedPartnerId, setSelectedPartnerId] = useState<number | null>(null);
  const { toast } = useToast();

  // Mock data
  const categories = ["Restaurants", "Fashion", "Electronics", "Grocery", "Entertainment"];
  
  const partners = [
    {
      id: 1,
      name: "Green Café",
      image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      discount: "50% Off",
      pointsRequired: 500,
      location: "Downtown",
      category: "Restaurants"
    },
    {
      id: 2,
      name: "Eco Apparel",
      image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      discount: "Buy 1 Get 1 Free",
      pointsRequired: 800,
      location: "Mall Central",
      category: "Fashion"
    },
    {
      id: 3,
      name: "Tech Planet",
      image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      discount: "20% Off",
      pointsRequired: 1200,
      location: "Tech District",
      category: "Electronics"
    },
    {
      id: 4,
      name: "Fresh Market",
      image: "https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      discount: "15% Off",
      pointsRequired: 400,
      location: "Westside",
      category: "Grocery"
    },
    {
      id: 5,
      name: "Cinema World",
      image: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      discount: "Free Popcorn",
      pointsRequired: 600,
      location: "Entertainment Zone",
      category: "Entertainment"
    },
    {
      id: 6,
      name: "Organic Bistro",
      image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      discount: "30% Off",
      pointsRequired: 700,
      location: "Riverside",
      category: "Restaurants"
    }
  ];

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category === selectedCategory ? null : category);
  };

  const handleRedeemClick = (id: number) => {
    setSelectedPartnerId(id);
    setRedeemDialogOpen(true);
  };

  const handleConfirmRedeem = () => {
    setRedeemDialogOpen(false);
    
    // In a real app, this would call an API endpoint to process the redemption
    toast({
      title: "Reward Redeemed!",
      description: "Check your email for the discount code.",
    });
  };

  const filteredPartners = partners.filter((partner) => {
    const matchesSearch = partner.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || partner.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const selectedPartner = partners.find(p => p.id === selectedPartnerId);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-eco-dark dark:text-white mb-4">
            Partner Shops
          </h1>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Redeem your eco points for exclusive discounts and offers at our partner stores.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input 
              placeholder="Search partners..." 
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Badge 
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className={`cursor-pointer ${selectedCategory === category ? "bg-eco-primary" : ""}`}
                onClick={() => handleCategorySelect(category)}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPartners.map((partner) => (
            <PartnerCard 
              key={partner.id}
              {...partner}
              onRedeem={handleRedeemClick}
            />
          ))}
          
          {filteredPartners.length === 0 && (
            <div className="col-span-full text-center py-12">
              <Store className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No partners found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or category filters.
              </p>
            </div>
          )}
        </div>
      </div>
      
      {/* Redeem confirmation dialog */}
      <Dialog open={redeemDialogOpen} onOpenChange={setRedeemDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Redeem Points</DialogTitle>
            <DialogDescription>
              Are you sure you want to redeem your points for this offer?
            </DialogDescription>
          </DialogHeader>
          
          {selectedPartner && (
            <div className="py-4">
              <div className="flex items-center space-x-4 mb-4">
                <div className="h-16 w-16 rounded-md overflow-hidden flex-shrink-0">
                  <img 
                    src={selectedPartner.image} 
                    alt={selectedPartner.name} 
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-medium">{selectedPartner.name}</h4>
                  <div className="text-sm text-muted-foreground">{selectedPartner.location}</div>
                  <Badge className="mt-1 bg-eco-accent">{selectedPartner.discount}</Badge>
                </div>
              </div>
              
              <div className="bg-muted p-3 rounded-md text-sm">
                <p className="font-medium">Redemption Details:</p>
                <p>• Required points: {selectedPartner.pointsRequired}</p>
                <p>• The discount code will be sent to your email</p>
                <p>• Offer valid for 30 days after redemption</p>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setRedeemDialogOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-eco-primary hover:bg-eco-secondary" onClick={handleConfirmRedeem}>
              Confirm Redemption
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default PartnersPage;
