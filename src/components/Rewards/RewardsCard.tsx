
import { CircleDollarSign, TrendingUp, Award } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface RewardsCardProps {
  totalPoints: number;
  thisMonth: number;
  wasteRecycled: string;
  nextMilestone: number;
}

const RewardsCard = ({ totalPoints, thisMonth, wasteRecycled, nextMilestone }: RewardsCardProps) => {
  const progressToNextMilestone = (totalPoints % nextMilestone) / nextMilestone * 100;
  
  return (
    <Card className="shadow-lg border-t-4 border-t-eco-primary">
      <CardHeader>
        <CardTitle className="flex items-center text-eco-dark">
          <Award className="mr-2 h-6 w-6 text-eco-primary" />
          Your Eco Impact
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-eco-light mb-2">
              <CircleDollarSign className="h-6 w-6 text-eco-primary" />
            </div>
            <div className="text-2xl font-bold">{totalPoints}</div>
            <div className="text-xs text-muted-foreground">Total Points</div>
          </div>
          
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-eco-light mb-2">
              <TrendingUp className="h-6 w-6 text-eco-primary" />
            </div>
            <div className="text-2xl font-bold">{thisMonth}</div>
            <div className="text-xs text-muted-foreground">This Month</div>
          </div>
          
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-eco-light mb-2">
              <div className="h-6 w-6 flex items-center justify-center text-eco-primary font-bold">
                kg
              </div>
            </div>
            <div className="text-2xl font-bold">{wasteRecycled}</div>
            <div className="text-xs text-muted-foreground">Waste Recycled</div>
          </div>
        </div>
        
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span>Progress to next milestone</span>
            <span className="font-medium">{Math.floor(progressToNextMilestone)}%</span>
          </div>
          <Progress value={progressToNextMilestone} className="h-2" />
          <div className="flex justify-between mt-1 text-xs text-muted-foreground">
            <span>{totalPoints % nextMilestone} points</span>
            <span>{nextMilestone} points</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RewardsCard;
