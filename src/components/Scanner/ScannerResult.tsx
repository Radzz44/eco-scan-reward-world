
import { Check, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface ScanResult {
  wasteType: string;
  reusability: number;
  pointsAwarded: number;
  message: string;
}

interface ScannerResultProps {
  result: ScanResult;
  onNewScan: () => void;
}

const ScannerResult = ({ result, onNewScan }: ScannerResultProps) => {
  return (
    <div className="w-full space-y-4 animate-fade-in">
      <div className="bg-muted p-4 rounded-lg">
        <div className="flex justify-between items-center mb-2">
          <div className="font-medium text-lg">{result.wasteType}</div>
          <div className="bg-eco-accent text-white px-3 py-1 rounded-full text-sm font-medium">
            +{result.pointsAwarded} points
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
              className="h-2"
              indicator={result.reusability > 70 ? "bg-eco-primary" : 
                        result.reusability > 40 ? "bg-amber-500" : "bg-red-500"}
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
