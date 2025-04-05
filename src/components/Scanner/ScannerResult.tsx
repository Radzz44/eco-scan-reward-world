
import { Check, AlertTriangle, TrendingUp, HeartHandshake } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useState, useEffect } from "react";

interface ScanResult {
  wasteType: string;
  reusability: number;
  pointsAwarded: number;
  message: string;
  donationSuggestion?: boolean;
}

interface ScannerResultProps {
  result: ScanResult;
  onNewScan: () => void;
}

const ScannerResult = ({ result, onNewScan }: ScannerResultProps) => {
  const [animatedPoints, setAnimatedPoints] = useState(0);
  const [showAnimation, setShowAnimation] = useState(true);
  
  useEffect(() => {
    // Animate points counting up
    if (animatedPoints < result.pointsAwarded) {
      const timer = setTimeout(() => {
        setAnimatedPoints(prev => Math.min(prev + Math.ceil(result.pointsAwarded / 20), result.pointsAwarded));
      }, 50);
      return () => clearTimeout(timer);
    } else {
      // Once animation completes, show checkmark briefly then hide animation
      const timer = setTimeout(() => {
        setShowAnimation(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [animatedPoints, result.pointsAwarded]);

  // Set color based on reusability score
  const getProgressColor = () => {
    if (result.reusability > 70) return "bg-eco-primary";
    if (result.reusability > 40) return "bg-amber-500";
    return "bg-red-500";
  };

  return (
    <div className="w-full space-y-4 animate-fade-in">
      <div className="bg-muted p-4 rounded-lg">
        <div className="flex justify-between items-center mb-2">
          <div className="font-medium text-lg">{result.wasteType}</div>
          <div className="flex items-center">
            <div className="bg-eco-accent text-white px-3 py-1 rounded-full text-sm font-medium">
              +{showAnimation ? animatedPoints : result.pointsAwarded} points
            </div>
            {showAnimation && animatedPoints === result.pointsAwarded && (
              <Check className="h-5 w-5 ml-2 text-eco-primary animate-pulse" />
            )}
          </div>
        </div>
        
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Reusability</span>
              <span>{result.reusability}%</span>
            </div>
            <Progress 
              value={result.reusability} 
              className={`h-2 ${getProgressColor()}`}
            />
          </div>
          
          <div className="flex items-start mt-2 text-sm">
            {result.reusability > 70 ? (
              <Check className="h-5 w-5 text-eco-primary mr-2 mt-0.5" />
            ) : (
              <AlertTriangle className="h-5 w-5 text-amber-500 mr-2 mt-0.5" />
            )}
            <span>{result.message}</span>
          </div>

          {/* Donation suggestion for food items */}
          {result.donationSuggestion && (
            <div className="bg-orange-50 p-3 rounded-md mt-2 border border-orange-200">
              <div className="flex items-center">
                <HeartHandshake className="h-5 w-5 text-orange-500 mr-2" />
                <span className="text-sm font-medium text-orange-700">Donation Opportunity</span>
              </div>
              <p className="text-sm mt-1 text-orange-700">
                Consider donating this food to someone in need. You'll make a difference and earn bonus points!
              </p>
              <Button 
                variant="outline" 
                className="w-full mt-2 border-orange-200 text-orange-700 hover:bg-orange-100"
                onClick={() => alert("This feature will connect you with local donation centers")}
              >
                Find Donation Centers
              </Button>
            </div>
          )}

          {showAnimation && (
            <div className="bg-eco-light/50 p-2 rounded-md mt-2 flex items-center justify-between">
              <div className="flex items-center text-sm">
                <TrendingUp className="h-4 w-4 text-eco-primary mr-2" />
                <span>Updating your total points...</span>
              </div>
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-eco-primary border-t-transparent"></div>
            </div>
          )}
        </div>
      </div>
      
      <div className="flex space-x-3">
        <Button 
          variant="outline" 
          className="flex-1"
          onClick={onNewScan}
        >
          Take New Photo
        </Button>
      </div>
    </div>
  );
};

export default ScannerResult;
