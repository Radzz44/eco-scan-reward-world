
import { useState, useRef } from "react";
import { Camera, Upload, Check, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";

interface ScanResult {
  wasteType: string;
  reusability: number;
  pointsAwarded: number;
  message: string;
}

const WasteScanner = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file type
    if (!file.type.startsWith("image/")) {
      toast({
        title: "Invalid file",
        description: "Please upload an image file.",
        variant: "destructive"
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setUploadedImage(event.target?.result as string);
      setScanResult(null);
    };
    reader.readAsDataURL(file);
  };

  const simulateScan = () => {
    setIsScanning(true);
    setProgress(0);
    
    // Simulate progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 5;
      });
    }, 100);

    // Simulate scan completion
    setTimeout(() => {
      clearInterval(interval);
      setProgress(100);
      
      // Mock results - in a real app, this would come from an AI model
      const results = [
        {
          wasteType: "Plastic Bottle",
          reusability: 85,
          pointsAwarded: 120,
          message: "Great job! This plastic is highly recyclable."
        },
        {
          wasteType: "Food Container",
          reusability: 65,
          pointsAwarded: 80,
          message: "Good! This container can be recycled in most facilities."
        },
        {
          wasteType: "Glass Bottle",
          reusability: 95,
          pointsAwarded: 150,
          message: "Excellent! Glass is one of the most recyclable materials."
        },
        {
          wasteType: "Cardboard",
          reusability: 90,
          pointsAwarded: 100,
          message: "Awesome! Cardboard is easily recycled and reused."
        }
      ];
      
      // Randomly select a result
      const randomResult = results[Math.floor(Math.random() * results.length)];
      setScanResult(randomResult);
      setIsScanning(false);
      
      toast({
        title: "Scan Complete!",
        description: `You've earned ${randomResult.pointsAwarded} points!`,
        variant: "default",
      });
    }, 2500);
  };

  const handleTakeNewPhoto = () => {
    setUploadedImage(null);
    setScanResult(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-md mx-auto">
      <Card className="w-full p-6 shadow-lg">
        {!uploadedImage ? (
          <div className="flex flex-col items-center">
            <div className="w-64 h-64 bg-muted rounded-lg flex items-center justify-center mb-6 border-2 border-dashed border-gray-300">
              <Camera className="h-16 w-16 text-gray-400" />
            </div>
            <div className="flex flex-col w-full space-y-3">
              <Button 
                className="w-full bg-eco-primary hover:bg-eco-secondary text-white" 
                onClick={() => fileInputRef.current?.click()}
              >
                <Camera className="mr-2 h-5 w-5" /> Take a Photo
              </Button>
              <Button 
                variant="outline" 
                className="w-full" 
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="mr-2 h-5 w-5" /> Upload Image
              </Button>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                ref={fileInputRef}
                onChange={handleFileSelect}
              />
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <div className="w-full aspect-square rounded-lg overflow-hidden mb-6 relative">
              <img 
                src={uploadedImage} 
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
            
            {scanResult ? (
              <div className="w-full space-y-4 animate-fade-in">
                <div className="bg-muted p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <div className="font-medium text-lg">{scanResult.wasteType}</div>
                    <div className="bg-eco-accent text-white px-3 py-1 rounded-full text-sm font-medium">
                      +{scanResult.pointsAwarded} points
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Reusability</span>
                        <span>{scanResult.reusability}%</span>
                      </div>
                      <Progress 
                        value={scanResult.reusability} 
                        className="h-2"
                        indicator={scanResult.reusability > 70 ? "bg-eco-primary" : 
                                  scanResult.reusability > 40 ? "bg-amber-500" : "bg-red-500"}
                      />
                    </div>
                    
                    <div className="flex items-start mt-2 text-sm">
                      {scanResult.reusability > 70 ? (
                        <Check className="h-5 w-5 text-eco-primary mr-2 mt-0.5" />
                      ) : (
                        <AlertTriangle className="h-5 w-5 text-amber-500 mr-2 mt-0.5" />
                      )}
                      <span>{scanResult.message}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-3">
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={handleTakeNewPhoto}
                  >
                    Take New Photo
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex space-x-3 w-full">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={handleTakeNewPhoto}
                >
                  Take New Photo
                </Button>
                <Button 
                  className="flex-1 bg-eco-primary hover:bg-eco-secondary"
                  onClick={simulateScan}
                  disabled={isScanning}
                >
                  {isScanning ? "Scanning..." : "Analyze Waste"}
                </Button>
              </div>
            )}
          </div>
        )}
      </Card>
    </div>
  );
};

export default WasteScanner;
