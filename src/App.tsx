import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Oppettider from "./pages/Oppettider";
import RodaDagar from "./pages/RodaDagar";
import Sondagsoppet from "./pages/Sondagsoppet";
import Midsommar from "./pages/Midsommar";
import Pask from "./pages/Pask";
import Jul from "./pages/Jul";
import Nyar from "./pages/Nyar";
import OppetImorgon from "./pages/OppetImorgon";
import NarStanger from "./pages/NarStanger";
import OppetSondag from "./pages/OppetSondag";
import ForstaMaj from "./pages/ForstaMaj";
import PaskOppettider from "./pages/PaskOppettider";
import FredagOppettider from "./pages/FredagOppettider";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/systembolaget-oppettider" element={<Oppettider />} />
            <Route path="/systembolaget-roda-dagar-2026" element={<RodaDagar />} />
            <Route path="/systembolaget-sondagsoppet" element={<Sondagsoppet />} />
            <Route path="/systembolaget-midsommar" element={<Midsommar />} />
            <Route path="/systembolaget-pask" element={<Pask />} />
            <Route path="/systembolaget-jul" element={<Jul />} />
            <Route path="/systembolaget-nyar" element={<Nyar />} />
            <Route path="/systembolaget-oppet-imorgon" element={<OppetImorgon />} />
            <Route path="/nar-stanger-systembolaget" element={<NarStanger />} />
            <Route path="/systembolaget-oppet-sondag" element={<OppetSondag />} />
            <Route path="/systembolaget-1-maj-oppettider" element={<ForstaMaj />} />
            <Route path="/systembolaget-pask-oppettider" element={<PaskOppettider />} />
            <Route path="/systembolaget-fredag-oppettider" element={<FredagOppettider />} />
            <Route path="/systembolaget-oppen-idag" element={<OppenIdag />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
