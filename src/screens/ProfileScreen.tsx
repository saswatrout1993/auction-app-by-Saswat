import { useState } from "react";
import { Button } from "../../components/ui/button";
import { auth } from "../../lib/firebase";
import { useNavigate } from "react-router-dom";
import { LogOut, User, Mail, Shield, Settings, HelpCircle, FileText } from "lucide-react";
import { Card, CardContent } from "../../components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";

export default function ProfileScreen() {
  const navigate = useNavigate();
  const user = auth.currentUser;

  const handleLogout = async () => {
    await auth.signOut();
    navigate("/login");
  };

  return (
    <div className="flex-1 space-y-6 p-4 pt-6 bg-slate-950 min-h-full pb-24 text-white">
      <h2 className="text-3xl font-bold tracking-tight">Settings</h2>

      <Card className="bg-slate-900 border-slate-800 text-white">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <Avatar className="h-16 w-16 border-2 border-orange-500">
              <AvatarImage src={user?.photoURL || ""} alt={user?.displayName || "User"} />
              <AvatarFallback className="bg-slate-800 text-lg">{user?.email?.charAt(0).toUpperCase() || "U"}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-xl font-bold">{user?.displayName || "Auction Admin"}</h3>
              <p className="text-sm text-slate-400 flex items-center mt-1">
                <Mail className="mr-1 h-3 w-3" />
                {user?.email}
              </p>
              <div className="mt-2 inline-flex items-center rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-0.5 text-xs font-semibold text-amber-500">
                <Shield className="mr-1 h-3 w-3" />
                Super Admin
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-500 ml-1">Account & App</h4>
        
        <div className="rounded-xl border border-slate-800 bg-slate-900 overflow-hidden text-slate-200">
          <button className="flex w-full items-center justify-between p-4 hover:bg-slate-800/50 transition">
            <div className="flex items-center text-sm font-medium">
              <User className="mr-3 h-5 w-5 text-slate-400" />
              Edit Profile
            </div>
          </button>
          <div className="h-px bg-slate-800 w-full" />
          <button className="flex w-full items-center justify-between p-4 hover:bg-slate-800/50 transition">
            <div className="flex items-center text-sm font-medium">
              <Settings className="mr-3 h-5 w-5 text-slate-400" />
              Preferences
            </div>
          </button>
          <div className="h-px bg-slate-800 w-full" />
          <button className="flex w-full items-center justify-between p-4 hover:bg-slate-800/50 transition">
            <div className="flex items-center text-sm font-medium">
              <Shield className="mr-3 h-5 w-5 text-slate-400" />
              Security Settings
            </div>
          </button>
        </div>

        <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-500 ml-1 pt-4">Legal & Support</h4>
        
        <div className="rounded-xl border border-slate-800 bg-slate-900 overflow-hidden text-slate-200">
           <button className="flex w-full items-center justify-between p-4 hover:bg-slate-800/50 transition">
            <div className="flex items-center text-sm font-medium">
              <HelpCircle className="mr-3 h-5 w-5 text-slate-400" />
              Help & Support
            </div>
          </button>
          <div className="h-px bg-slate-800 w-full" />
          <button className="flex w-full items-center justify-between p-4 hover:bg-slate-800/50 transition">
            <div className="flex items-center text-sm font-medium">
              <FileText className="mr-3 h-5 w-5 text-slate-400" />
              Terms & Conditions
            </div>
          </button>
        </div>

        <Button 
          variant="destructive" 
          className="w-full mt-8 bg-red-900/20 text-red-500 hover:bg-red-900/40 hover:text-red-400 border border-red-900/50"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Log Out
        </Button>
      </div>

    </div>
  );
}
