
import { Card } from "@/components/ui/card";
import ScannerInitializing from "./ScannerInitializing";
import ScannerUpload from "./ScannerUpload";
import ScannerPreview from "./ScannerPreview";
import ScannerResult from "./ScannerResult";
import { useWasteScanner } from "@/hooks/useWasteScanner";
import { Award } from "lucide-react";

const WasteScanner = () => {
  const {
    isInitializing,
    isScanning,
    uploadedImage,
    scanResult,
    progress,
    totalPoints,
    handleFileSelect,
    analyzeWaste,
    resetScan
  } = useWasteScanner();

  return (
    <div className="flex flex-col items-center w-full max-w-md mx-auto">
      {/* Points display */}
      <div className="bg-eco-light mb-4 px-5 py-2 rounded-full flex items-center self-end">
        <Award className="h-5 w-5 text-eco-primary mr-2" />
        <span className="font-medium">{totalPoints} points</span>
      </div>

      <Card className="w-full p-6 shadow-lg">
        {isInitializing ? (
          <ScannerInitializing />
        ) : !uploadedImage ? (
          <ScannerUpload onFileSelect={handleFileSelect} />
        ) : scanResult ? (
          <ScannerResult result={scanResult} onNewScan={resetScan} />
        ) : (
          <ScannerPreview
            imageUrl={uploadedImage}
            isScanning={isScanning}
            progress={progress}
            onAnalyze={analyzeWaste}
            onNewPhoto={resetScan}
          />
        )}
      </Card>
    </div>
  );
};

export default WasteScanner;
