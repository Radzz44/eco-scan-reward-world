
import { Truck, Package, Leaf } from "lucide-react";
import Layout from "@/components/layout/Layout";
import CollectionForm from "@/components/Collection/CollectionForm";

const CollectionPage = () => {
  const benefits = [
    {
      icon: <Truck className="h-10 w-10 text-eco-primary" />,
      title: "Door-to-Door Collection",
      description: "Our smart dustbins will be delivered right to your doorstep at your preferred time."
    },
    {
      icon: <Package className="h-10 w-10 text-eco-primary" />,
      title: "Smart Sorting",
      description: "Our smart bins automatically sort waste, ensuring maximum recyclability and reuse."
    },
    {
      icon: <Leaf className="h-10 w-10 text-eco-primary" />,
      title: "Environmental Impact",
      description: "Each collection prevents waste from entering landfills and reduces your carbon footprint."
    }
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-eco-dark dark:text-white mb-4">
            Smart Waste Collection
          </h1>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Schedule a smart dustbin to collect your waste directly from your location.
          </p>
        </div>
        
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-4">How It Works</h2>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-eco-primary text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">
                      1
                    </div>
                    <p className="text-muted-foreground">
                      Fill out the collection form with your address and preferred pickup time.
                    </p>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-eco-primary text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">
                      2
                    </div>
                    <p className="text-muted-foreground">
                      Our smart dustbin will arrive at your location at the scheduled time.
                    </p>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-eco-primary text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">
                      3
                    </div>
                    <p className="text-muted-foreground">
                      Place your waste in the smart dustbin, which automatically sorts and categorizes it.
                    </p>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-eco-primary text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">
                      4
                    </div>
                    <p className="text-muted-foreground">
                      Earn additional points based on the volume and quality of waste collected.
                    </p>
                  </div>
                </div>
              </div>
              
              <div>
                <h2 className="text-xl font-semibold mb-4">Benefits</h2>
                <div className="space-y-6">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start">
                      <div className="mr-4 flex-shrink-0">
                        {benefit.icon}
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">{benefit.title}</h3>
                        <p className="text-sm text-muted-foreground">{benefit.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div>
              <CollectionForm />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CollectionPage;
