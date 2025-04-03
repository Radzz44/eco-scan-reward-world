
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScanPage from "./pages/ScanPage";
import RewardsPage from "./pages/RewardsPage";
import PartnersPage from "./pages/PartnersPage";
import CollectionPage from "./pages/CollectionPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ScanPage />} />
          <Route path="/rewards" element={<RewardsPage />} />
          <Route path="/partners" element={<PartnersPage />} />
          <Route path="/collection" element={<CollectionPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
