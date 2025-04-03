
import { Loader2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useState, useEffect } from "react";

const ScannerInitializing = () => {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingMessage, setLoadingMessage] = useState("Loading waste detection model...");

  useEffect(() => {
    // Simulate loading progress updates
    const messages = [
      "Loading neural network...",
      "Initializing waste recognition models...",
      "Preparing image analysis components...",
      "Setting up waste classification system...",
      "Almost ready..."
    ];
    
    const progressInterval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 95) {
          clearInterval(progressInterval);
          return 95;
        }
        return prev + Math.random() * 15;
      });
    }, 700);
    
    let messageIndex = 0;
    const messageInterval = setInterval(() => {
      if (messageIndex < messages.length) {
        setLoadingMessage(messages[messageIndex]);
        messageIndex++;
      } else {
        clearInterval(messageInterval);
      }
    }, 1800);
    
    return () => {
      clearInterval(progressInterval);
      clearInterval(messageInterval);
    };
  }, []);

  return (
    <div className="flex flex-col items-center py-10">
      <Loader2 className="h-16 w-16 text-eco-primary animate-spin mb-4" />
      <p className="text-center text-muted-foreground mb-6">
        {loadingMessage}
      </p>
      <div className="w-full max-w-xs space-y-2">
        <Progress value={loadingProgress} className="h-2" />
        <p className="text-xs text-center text-muted-foreground">
          {Math.round(loadingProgress)}% complete
        </p>
      </div>
    </div>
  );
};

export default ScannerInitializing;
