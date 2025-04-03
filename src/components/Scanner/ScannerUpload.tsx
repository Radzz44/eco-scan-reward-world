
import { Camera, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRef } from "react";

interface ScannerUploadProps {
  onFileSelect: (file: File) => void;
}

const ScannerUpload = ({ onFileSelect }: ScannerUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  };

  return (
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
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
};

export default ScannerUpload;
