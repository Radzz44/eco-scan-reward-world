
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface ScannerPreviewProps {
  imageUrl: string;
  isScanning: boolean;
  progress: number;
  onAnalyze: () => void;
  onNewPhoto: () => void;
}

const ScannerPreview = ({
  imageUrl,
  isScanning,
  progress,
  onAnalyze,
  onNewPhoto
}: ScannerPreviewProps) => {
  return (
    <div className="flex flex-col items-center">
      <div className="w-full aspect-square rounded-lg overflow-hidden mb-6 relative">
        <img 
          src={imageUrl} 
          alt="Uploaded waste" 
          className="w-full h-full object-cover" 
        />
        {isScanning && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center">
            <div className="text-white mb-3">Analyzing waste...</div>
            <Progress value={progress} className="w-3/4 h-2" />
          </div>
        )}
      </div>
      
      <div className="flex space-x-3 w-full">
        <Button 
          variant="outline" 
          className="flex-1"
          onClick={onNewPhoto}
        >
          Take New Photo
        </Button>
        <Button 
          className="flex-1 bg-eco-primary hover:bg-eco-secondary"
          onClick={onAnalyze}
          disabled={isScanning}
        >
          {isScanning ? "Scanning..." : "Analyze Waste"}
        </Button>
      </div>
    </div>
  );
};

export default ScannerPreview;
