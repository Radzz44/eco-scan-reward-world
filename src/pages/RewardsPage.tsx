
import { useState } from "react";
import { Award, Zap } from "lucide-react";
import Layout from "@/components/layout/Layout";
import RewardsCard from "@/components/Rewards/RewardsCard";
import RewardHistory from "@/components/Rewards/RewardHistory";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const RewardsPage = () => {
  // Mock data
  const [rewardsData] = useState({
    totalPoints: 1250,
    thisMonth: 320,
    wasteRecycled: "12.5",
    nextMilestone: 500
  });
  
  const [history] = useState([
    { id: 1, date: "April 2, 2025", wasteType: "Plastic Bottle", points: 120 },
    { id: 2, date: "April 1, 2025", wasteType: "Glass Container", points: 150 },
    { id: 3, date: "March 28, 2025", wasteType: "Cardboard Box", points: 100 },
    { id: 4, date: "March 25, 2025", wasteType: "Aluminum Can", points: 130 },
    { id: 5, date: "March 22, 2025", wasteType: "Paper Waste", points: 90 }
  ]);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-eco-dark dark:text-white mb-4">
              My Rewards
            </h1>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Track your eco impact and rewards earned through responsible waste management.
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-8">
            <RewardsCard 
              totalPoints={rewardsData.totalPoints}
              thisMonth={rewardsData.thisMonth}
              wasteRecycled={rewardsData.wasteRecycled}
              nextMilestone={rewardsData.nextMilestone}
            />
            
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <Tabs defaultValue="history" className="w-full">
                <div className="px-6 pt-6">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="history">Activity History</TabsTrigger>
                    <TabsTrigger value="badges">Eco Badges</TabsTrigger>
                  </TabsList>
                </div>
                
                <TabsContent value="history" className="p-0">
                  <RewardHistory history={history} />
                </TabsContent>
                
                <TabsContent value="badges" className="p-6">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {/* Active badges */}
                    <div className="flex flex-col items-center p-4 rounded-lg border border-eco-primary bg-eco-light/30">
                      <Award className="h-12 w-12 text-eco-primary mb-2" />
                      <div className="font-medium text-center">Eco Warrior</div>
                      <div className="text-xs text-muted-foreground text-center mt-1">Recycled over 10kg of waste</div>
                    </div>
                    
                    <div className="flex flex-col items-center p-4 rounded-lg border border-eco-primary bg-eco-light/30">
                      <Zap className="h-12 w-12 text-eco-primary mb-2" />
                      <div className="font-medium text-center">Quick Starter</div>
                      <div className="text-xs text-muted-foreground text-center mt-1">Completed 5 scans in a week</div>
                    </div>
                    
                    {/* Locked badges */}
                    <div className="flex flex-col items-center p-4 rounded-lg border border-gray-200 bg-gray-50 opacity-60">
                      <Award className="h-12 w-12 text-gray-400 mb-2" />
                      <div className="font-medium text-center text-gray-500">Master Recycler</div>
                      <div className="text-xs text-gray-400 text-center mt-1">Recycle 50kg of waste (25.5kg to go)</div>
                    </div>
                    
                    <div className="flex flex-col items-center p-4 rounded-lg border border-gray-200 bg-gray-50 opacity-60">
                      <Award className="h-12 w-12 text-gray-400 mb-2" />
                      <div className="font-medium text-center text-gray-500">Eco Influencer</div>
                      <div className="text-xs text-gray-400 text-center mt-1">Invite 5 friends (5 to go)</div>
                    </div>
                  </div>
                  
                  <div className="mt-6 text-center">
                    <Button variant="outline">View All Badges</Button>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default RewardsPage;
