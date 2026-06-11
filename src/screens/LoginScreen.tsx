import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { Trophy, Loader2 } from "lucide-react";
import { auth } from "../../lib/firebase";
import { toast } from "sonner";
import { setUserRole } from "../lib/store";

export default function LoginScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      // Mock login
      await new Promise(resolve => setTimeout(resolve, 1000));
      setUserRole("user");
      toast.success("Signed in successfully (Mock Mode)!");
      window.location.href = "/";
    } catch (error: any) {
      toast.error(error.message || "Failed to sign in with Google");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return toast.error("Please enter email and password");
    
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setUserRole("user");
      if (isRegister) {
        toast.success("Account created successfully (Mock Mode)!");
      } else {
        toast.success("Signed in successfully (Mock Mode)!");
      }
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
      setUserRole("user");
      toast.success("Phone verified successfully (Mock Mode)!");
      window.location.href = "/";
    }, 1000);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="flex flex-col items-center space-y-2 text-center">
          <div className="rounded-full bg-orange-500/10 p-4">
            <Trophy className="h-10 w-10 text-amber-500" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-50">Cricket Auction Pro</h1>
          <p className="text-slate-400">Sign in to manage your team and players</p>
        </div>

        <Card className="border-slate-800 bg-slate-900 text-slate-50">
          <CardHeader>
            <CardTitle>{isRegister ? "Create an account" : "Welcome back"}</CardTitle>
            <CardDescription className="text-slate-400">
              {isRegister ? "Enter your details to register" : "Enter your credentials to sign in"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="email" className="w-full mb-4">
              <TabsList className="grid w-full grid-cols-2 bg-slate-950 border border-slate-800">
                <TabsTrigger value="email" className="data-[state=active]:bg-slate-800 data-[state=active]:text-white">Email</TabsTrigger>
                <TabsTrigger value="phone" className="data-[state=active]:bg-slate-800 data-[state=active]:text-white">Phone</TabsTrigger>
              </TabsList>
              
              <TabsContent value="email" className="mt-4">
                <form onSubmit={handleEmailAuth} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="name@example.com" 
                      className="border-slate-700 bg-slate-950 text-white" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Password</Label>
                      {!isRegister && (
                        <a href="#" className="hidden text-sm text-orange-500 hover:underline">
                          Forgot password?
                        </a>
                      )}
                    </div>
                    <Input 
                      id="password" 
                      type="password" 
                      className="border-slate-700 bg-slate-950 text-white" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700 text-white" disabled={isLoading}>
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {isRegister ? "Register" : "Sign In"}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="phone" className="mt-4">
                {!showOtp ? (
                  <form onSubmit={handleSendOtp} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input 
                        id="phone" 
                        type="tel" 
                        placeholder="+91 9876543210" 
                        className="border-slate-700 bg-slate-950 text-white" 
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700 text-white" disabled={isLoading}>
                      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      Send OTP
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
                        className="border-slate-700 bg-slate-950 text-white text-center tracking-[0.5em] font-mono text-lg" 
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        required
                        maxLength={6}
                      />
                      <p className="text-xs text-center text-slate-400 mt-2">
                        Code sent to {phoneNumber} <button type="button" onClick={() => setShowOtp(false)} className="text-orange-500 hover:underline">Edit</button>
                      </p>
                    </div>
                    <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white" disabled={isLoading}>
                      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      Verify & Sign In
                    </Button>
                  </form>
                )}
              </TabsContent>
            </Tabs>
            
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-slate-700" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-slate-900 px-2 text-slate-400">Or continue with</span>
              </div>
            </div>

            <Button variant="outline" className="w-full border-slate-700 text-slate-950 dark:text-slate-50" onClick={handleGoogleSignIn} disabled={isLoading}>
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : (
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                  <path d="M1 1h22v22H1z" fill="none" />
                </svg>
              )}
              Google
            </Button>
          </CardContent>
          <CardFooter className="flex-col gap-3 pb-8">
            <Button 
              variant="ghost" 
              className="w-full text-sm text-slate-400 hover:text-white"
              onClick={() => setIsRegister(!isRegister)}
            >
              {isRegister ? "Already have an account? Sign In" : "Don't have an account? Register"}
            </Button>
            
            <div className="w-full h-px bg-slate-800 my-2"></div>
            
            <Button
              variant="outline"
              className="w-full border-orange-500/30 text-orange-400 hover:bg-orange-950/20 hover:text-orange-300 transition-colors py-6 shadow-[0_0_15px_rgba(249,115,22,0.1)]"
              onClick={() => navigate('/player-registration')}
            >
              Apply to Participate as Player
            </Button>

            <Button 
              variant="link" 
              className="w-full text-xs text-slate-500 hover:text-slate-300 mt-2"
              onClick={() => navigate('/admin-login')}
            >
              Admin Portal Login
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
