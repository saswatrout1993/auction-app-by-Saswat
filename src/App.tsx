import { BrowserRouter, Routes, Route, Navigate, useLocation, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Home, Users, Shield, User, Trophy, LogOut, Loader2 } from "lucide-react";
import { Button } from "../components/ui/button";

import LoginScreen from "./screens/LoginScreen";
import AdminLoginScreen from "./screens/AdminLoginScreen";
import PlayerRegistrationScreen from "./screens/PlayerRegistrationScreen";
import HomeScreen from "./screens/HomeScreen";
import PlayersScreen from "./screens/PlayersScreen";
import TeamsScreen from "./screens/TeamsScreen";
import ProfileScreen from "./screens/ProfileScreen";
import LiveAuctionScreen from "./screens/LiveAuctionScreen";
import { Toaster } from "../components/ui/sonner";
import { auth } from "../lib/firebase";

// A simple layout with bottom navigation for mobile-first feel
function AppLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/", icon: Home },
    { name: "Auctions", path: "/live", icon: Trophy },
    { name: "Players", path: "/players", icon: Users },
    { name: "Teams", path: "/teams", icon: Shield },
    { name: "Profile", path: "/profile", icon: User },
  ];

  return (
    <div className="flex flex-col h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-50">
      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto pb-20 relative">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 w-full bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 safe-area-pb">
        <div className="flex justify-around items-center h-16 px-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${
                  isActive ? "text-orange-500" : "text-slate-500 hover:text-slate-900 dark:hover:text-slate-300"
                }`}
              >
                <div className={`p-1 rounded-full ${isActive ? 'bg-orange-100 dark:bg-orange-900/30' : ''}`}>
                  <Icon size={20} className={isActive ? "fill-orange-100 dark:fill-orange-950" : ""} />
                </div>
                <span className="text-[10px] font-medium">{item.name}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}

function RequireAuth({ children }: { children: JSX.Element }) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user: any) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-slate-950 text-amber-400">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-center" richColors />
      <Routes>
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/admin-login" element={<AdminLoginScreen />} />
        <Route path="/player-registration" element={<PlayerRegistrationScreen />} />
        
        {/* Protected Routes inside Layout */}
        <Route path="/" element={<RequireAuth><AppLayout><HomeScreen /></AppLayout></RequireAuth>} />
        <Route path="/live" element={<RequireAuth><AppLayout><LiveAuctionScreen /></AppLayout></RequireAuth>} />
        <Route path="/players" element={<RequireAuth><AppLayout><PlayersScreen /></AppLayout></RequireAuth>} />
        <Route path="/teams" element={<RequireAuth><AppLayout><TeamsScreen /></AppLayout></RequireAuth>} />
        <Route path="/profile" element={<RequireAuth><AppLayout><ProfileScreen /></AppLayout></RequireAuth>} />
      </Routes>
    </BrowserRouter>
  );
}
