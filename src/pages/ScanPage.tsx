
import { Recycle, Database, Zap } from "lucide-react";
import Layout from "@/components/layout/Layout";
import WasteScanner from "@/components/Scanner/WasteScanner";

const ScanPage = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-eco-dark dark:text-white mb-4">
              Waste Scanner
            </h1>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Scan your waste items to identify recycling options and earn reward points based on reusability.
            </p>
          </div>
          
          <div className="mb-8 p-4 bg-eco-light rounded-lg flex items-center">
            <div className="mr-4 bg-eco-primary rounded-full p-2">
              <Recycle className="h-5 w-5 text-white" />
            </div>
            <p className="text-sm">
              <strong>Tip:</strong> Make sure the waste item is clearly visible and well-lit for the best scan results.
            </p>
          </div>
          
          <div className="mb-8 p-4 bg-blue-50 rounded-lg flex items-center">
            <div className="mr-4 bg-blue-500 rounded-full p-2">
              <Database className="h-5 w-5 text-white" />
            </div>
            <p className="text-sm">
              <strong>AI-Powered:</strong> Our waste detection system is trained on over 100,000 waste images across 8 different categories for accurate identification.
            </p>
          </div>
          
          <div className="mb-8 p-4 bg-green-50 rounded-lg flex items-center">
            <div className="mr-4 bg-green-500 rounded-full p-2">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <p className="text-sm">
              <strong>Real-Time Rewards:</strong> Watch your points increase instantly as you scan recyclable items. Your points are saved automatically!
            </p>
          </div>
          
          <WasteScanner />
        </div>
      </div>
    </Layout>
  );
};

export default ScanPage;
