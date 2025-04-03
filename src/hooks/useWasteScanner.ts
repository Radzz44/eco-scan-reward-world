
import { useState, useEffect } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { initWasteDetection, detectWaste } from "@/services/wasteDetectionService";

interface ScanResult {
  wasteType: string;
  reusability: number;
  pointsAwarded: number;
  message: string;
}

export const useWasteScanner = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [progress, setProgress] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    const loadModel = async () => {
      try {
        await initWasteDetection();
        setIsInitializing(false);
      } catch (error) {
        console.error("Failed to initialize waste detection model:", error);
        toast({
          title: "Model Initialization Failed",
          description: "We couldn't load the waste detection model. Please try again later.",
          variant: "destructive"
        });
        setIsInitializing(false);
      }
    };
    
    loadModel();
  }, [toast]);

  const handleFileSelect = (file: File) => {
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

  const analyzeWaste = async () => {
    if (!uploadedImage) return;
    
    setIsScanning(true);
    setProgress(0);
    
    // Simulate initial progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 70) {
          clearInterval(interval);
          return 70;
        }
        return prev + 5;
      });
    }, 100);
    
    try {
      // Perform real waste detection
      const result = await detectWaste(uploadedImage);
      
      // Complete the progress
      setProgress(100);
      setScanResult(result);
      
      toast({
        title: "Scan Complete!",
        description: `You've earned ${result.pointsAwarded} points!`,
        variant: "default",
      });
    } catch (error) {
      console.error("Waste detection failed:", error);
      toast({
        title: "Detection Failed",
        description: "We couldn't analyze your waste item. Please try again.",
        variant: "destructive"
      });
    } finally {
      clearInterval(interval);
      setIsScanning(false);
    }
  };

  const resetScan = () => {
    setUploadedImage(null);
    setScanResult(null);
  };

  return {
    isInitializing,
    isScanning,
    uploadedImage,
    scanResult,
    progress,
    handleFileSelect,
    analyzeWaste,
    resetScan
  };
};
