import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { Shield, Loader2, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { setUserRole } from "../lib/store";

export default function AdminLoginScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const navigate = useNavigate();

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return toast.error("Please enter email and password");
    
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setUserRole("admin");
      toast.success("Admin signed in successfully!");
      window.location.href = "/";
    } catch (error: any) {
      toast.error(error.message || "Authentication failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber) return toast.error("Please enter phone number");
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setShowOtp(true);
      toast.success("OTP sent successfully!");
    }, 1000);
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp) return toast.error("Please enter the OTP");
    setIsLoading(true);
    setTimeout(() => {
      setUserRole("admin");
      toast.success("Admin phone verified successfully!");
      window.location.href = "/";
    }, 1000);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 p-4">
      <div className="w-full max-w-md space-y-6">
        <button 
          onClick={() => navigate("/login")}
          className="flex items-center text-sm font-medium text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to User Login
        </button>

        <div className="flex flex-col items-center space-y-2 text-center">
          <div className="rounded-full bg-blue-500/10 p-4 border border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.3)]">
            <Shield className="h-10 w-10 text-blue-500" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-50">Admin Portal</h1>
          <p className="text-slate-400">Sign in to manage tournament settings and share forms</p>
        </div>

        <Card className="border-blue-900/50 bg-slate-900 text-slate-50 shadow-[0_0_30px_rgba(59,130,246,0.1)]">
          <CardHeader>
            <CardTitle>Super Admin Access</CardTitle>
            <CardDescription className="text-slate-400">
              Authorized personnel only
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="email" className="w-full mb-4">
              <TabsList className="grid w-full grid-cols-2 bg-slate-950 border border-slate-800">
                <TabsTrigger value="email" className="data-[state=active]:bg-blue-900/50 data-[state=active]:text-white data-[state=active]:border-blue-700/50">Email</TabsTrigger>
                <TabsTrigger value="phone" className="data-[state=active]:bg-blue-900/50 data-[state=active]:text-white data-[state=active]:border-blue-700/50">Phone</TabsTrigger>
              </TabsList>
              
              <TabsContent value="email" className="mt-4">
                <form onSubmit={handleEmailAuth} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Admin Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="admin@namatara.com" 
                      className="border-slate-700 bg-slate-950 text-white focus-visible:ring-blue-500" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input 
                      id="password" 
                      type="password" 
                      className="border-slate-700 bg-slate-950 text-white focus-visible:ring-blue-500" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-900/20" disabled={isLoading}>
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Sign in to Dashboard
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="phone" className="mt-4">
                {!showOtp ? (
                  <form onSubmit={handleSendOtp} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Admin Phone Number</Label>
                      <Input 
                        id="phone" 
                        type="tel" 
                        placeholder="+91 9876543210" 
                        className="border-slate-700 bg-slate-950 text-white focus-visible:ring-blue-500" 
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-900/20" disabled={isLoading}>
                      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      Send Admin OTP
                    </Button>
                  </form>
                ) : (
                  <form onSubmit={handleVerifyOtp} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="otp">Enter OTP</Label>
                      <Input 
                        id="otp" 
                        type="text" 
                        placeholder="123456" 
                        className="border-slate-700 bg-slate-950 text-white text-center tracking-[0.5em] font-mono text-lg focus-visible:ring-blue-500" 
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        required
                        maxLength={6}
                      />
                      <p className="text-xs text-center text-slate-400 mt-2">
                        Code sent to {phoneNumber} <button type="button" onClick={() => setShowOtp(false)} className="text-blue-400 hover:underline">Edit</button>
                      </p>
                    </div>
                    <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-900/20" disabled={isLoading}>
                      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      Verify & Secure Login
                    </Button>
                  </form>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
