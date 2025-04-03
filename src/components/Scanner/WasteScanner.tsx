
import { Card } from "@/components/ui/card";
import ScannerInitializing from "./ScannerInitializing";
import ScannerUpload from "./ScannerUpload";
import ScannerPreview from "./ScannerPreview";
import ScannerResult from "./ScannerResult";
import { useWasteScanner } from "@/hooks/useWasteScanner";

const WasteScanner = () => {
  const {
    isInitializing,
    isScanning,
    uploadedImage,
    scanResult,
    progress,
    handleFileSelect,
    analyzeWaste,
    resetScan
  } = useWasteScanner();

  return (
    <div className="flex flex-col items-center w-full max-w-md mx-auto">
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
