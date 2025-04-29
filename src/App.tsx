
import React, { Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Initialize i18n
import './i18n/i18n';

// WhatsApp Button
import WhatsAppButton from "@/components/common/WhatsAppButton";

// Pages
import Index from "./pages/Index";
import EarlyAccess from "./pages/EarlyAccess";
import Blog from "./pages/Blog";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Loading component for suspense fallback
const LoadingScreen = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
  </div>
);

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/early-access" element={<EarlyAccess />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <TooltipProvider>
        <Suspense fallback={<LoadingScreen />}>
          <Toaster />
          <Sonner />
          <AppRoutes />
          <WhatsAppButton />
        </Suspense>
      </TooltipProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
