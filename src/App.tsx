import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import MedicinesIndex from "./pages/MedicinesIndex.tsx";
import LangLayout from "./routes/LangLayout.tsx";
import RootRedirect from "./routes/RootRedirect.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Root → detect language → redirect to /:lang */}
            <Route path="/" element={<RootRedirect />} />

            {/* All real pages live under /:lang */}
            <Route path="/:lang" element={<LangLayout />}>
              <Route index element={<Index />} />
              <Route path="medicines" element={<MedicinesIndex />} />
              {/* ADD ALL LANGUAGE-SCOPED ROUTES HERE, ABOVE THE INNER CATCH-ALL */}
              <Route path="*" element={<NotFound />} />
            </Route>

            {/* Top-level catch-all (paths that don't even start with a lang) */}
            <Route path="*" element={<RootRedirect />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
