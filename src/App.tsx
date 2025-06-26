
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import TopNavigation from "@/components/TopNavigation";
import Footer from "@/components/Footer";
import Index from "./pages/Index";
import About from "./pages/About";
import Blacklist from "./pages/Blacklist";
import Impressum from "./pages/Impressum";
import DataProtection from "./pages/DataProtection";
import GeneralTerms from "./pages/GeneralTerms";
import AiPolicy from "./pages/AiPolicy";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen flex flex-col">
            <TopNavigation />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/blacklist" element={<Blacklist />} />
                <Route path="/about" element={<About />} />
                <Route path="/impressum" element={<Impressum />} />
                <Route path="/data-protection" element={<DataProtection />} />
                <Route path="/general-terms" element={<GeneralTerms />} />
                <Route path="/ai-policy" element={<AiPolicy />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
