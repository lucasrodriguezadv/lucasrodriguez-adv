import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { lazy, Suspense } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const Criminal = lazy(() => import("./pages/areas/Criminal"));
const Consumidor = lazy(() => import("./pages/areas/Consumidor"));
const Familia = lazy(() => import("./pages/areas/Familia"));
const Imobiliario = lazy(() => import("./pages/areas/Imobiliario"));
const QuemSomos = lazy(() => import("./pages/QuemSomos"));
const AreasDeAtuacao = lazy(() => import("./pages/AreasDeAtuacao"));
const PoliticaPrivacidade = lazy(() => import("./pages/PoliticaPrivacidade"));
const TermosUso = lazy(() => import("./pages/TermosUso"));
const AvisoLegal = lazy(() => import("./pages/AvisoLegal"));
const Contato = lazy(() => import("./pages/Contato"));

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Suspense fallback={<div className="min-h-screen bg-background" />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/quem-somos" element={<QuemSomos />} />
              <Route path="/areas-de-atuacao" element={<AreasDeAtuacao />} />
              <Route path="/areas/criminal" element={<Criminal />} />
              <Route path="/areas/consumidor" element={<Consumidor />} />
              <Route path="/areas/familia" element={<Familia />} />
              <Route path="/areas/imobiliario" element={<Imobiliario />} />
              <Route path="/politica-de-privacidade" element={<PoliticaPrivacidade />} />
              <Route path="/termos-de-uso" element={<TermosUso />} />
              <Route path="/aviso-legal" element={<AvisoLegal />} />
              <Route path="/contato" element={<Contato />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);
export default App;
