
import { Loader2 } from "lucide-react";

const ScannerInitializing = () => {
  return (
    <div className="flex flex-col items-center py-10">
      <Loader2 className="h-16 w-16 text-eco-primary animate-spin mb-4" />
      <p className="text-center text-muted-foreground">
        Initializing waste detection model...<br />
        This may take a moment
      </p>
    </div>
  );
};

export default ScannerInitializing;
