
import { Card } from "@/components/ui/card";
import ScannerInitializing from "./ScannerInitializing";
import ScannerUpload from "./ScannerUpload";
import ScannerPreview from "./ScannerPreview";
import ScannerResult from "./ScannerResult";
import { useWasteScanner } from "@/hooks/useWasteScanner";
import { Award, Recycle, HeartHandshake } from "lucide-react";

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

  // Check if the current result is a food item that can be donated
  const isFoodDonation = scanResult?.donationSuggestion;

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

      {/* Optional info banners */}
      {isFoodDonation && (
        <div className="mt-4 p-4 bg-orange-50 rounded-lg flex items-center w-full">
          <div className="mr-4 bg-orange-500 rounded-full p-2">
            <HeartHandshake className="h-5 w-5 text-white" />
          </div>
          <p className="text-sm">
            <strong>Food Donation Tip:</strong> Food that's still in good condition can help those in need. Consider donating to local shelters or food banks!
          </p>
        </div>
      )}

      {!isFoodDonation && scanResult && (
        <div className="mt-4 p-4 bg-eco-light rounded-lg flex items-center w-full">
          <div className="mr-4 bg-eco-primary rounded-full p-2">
            <Recycle className="h-5 w-5 text-white" />
          </div>
          <p className="text-sm">
            <strong>Recycling Tip:</strong> Always clean containers before recycling and separate different materials for more effective processing.
          </p>
        </div>
      )}
    </div>
  );
};

export default WasteScanner;
