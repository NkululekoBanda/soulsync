import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { GameProvider, useGame } from "@/contexts/GameContext";
import { BottomNav } from "@/components/BottomNav";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Onboarding from "./pages/Onboarding";
import Home from "./pages/Home";
import Quiz from "./pages/Quiz";
import Profile from "./pages/Profile";
import MyProfile from "./pages/MyProfile";
import Chat from "./pages/Chat";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function AuthGuard({ 
  children, 
  fallback 
}: { 
  children: React.ReactNode,
  fallback?: React.ReactNode 
}) {
  const { isLoggedIn } = useGame();
  if (!isLoggedIn) return fallback ? <>{fallback}</> : <Navigate to="/login" replace />;
  return <>{children}</>;
}

function AppRoutes() {
  return (
    <div className="max-w-md mx-auto min-h-screen relative">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/" element={<AuthGuard><Home /></AuthGuard>} />
        <Route path="/quiz" element={<AuthGuard><Quiz /></AuthGuard>} />
        <Route path="/profile/:id" element={<AuthGuard><Profile /></AuthGuard>} />
        <Route path="/me" element={<AuthGuard><MyProfile /></AuthGuard>} />
        <Route path="/chat/:id" element={<AuthGuard><Chat /></AuthGuard>} />
        <Route path="/chats" element={<AuthGuard><Home /></AuthGuard>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <BottomNav />
    </div>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <GameProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </GameProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
