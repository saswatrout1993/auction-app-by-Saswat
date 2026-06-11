import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Trophy, Upload, ArrowLeft, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { savePlayer } from "../lib/store";

export default function PlayerRegistrationScreen() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    aadhar: "",
    village: "",
    gp: "",
    role: "Batter",
    battingStyle: "Right Hand Batter",
    bowlingStyle: "None",
    basePrice: "₹50",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Mock API Call
    setTimeout(() => {
      savePlayer({
        id: Date.now().toString(),
        name: formData.name,
        phone: formData.phone,
        aadhar: formData.aadhar,
        village: formData.village,
        gp: formData.gp,
        role: formData.role,
        style: formData.role === 'Bowler' ? formData.bowlingStyle : 
               (formData.role === 'Batter' || formData.role === 'Wicket Keeper') ? formData.battingStyle : 
               `${formData.battingStyle} • ${formData.bowlingStyle}`,
        basePrice: formData.basePrice,
        status: "Available",
        image: "https://i.pravatar.cc/150?u=" + Date.now()
      });

      setIsLoading(false);
      toast.success("Application submitted successfully! We will contact you soon.");
      navigate("/login");
    }, 1500);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 p-4 py-8">
      <div className="w-full max-w-md space-y-6">
        
        <button 
          onClick={() => navigate("/login")}
          className="flex items-center text-sm font-medium text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Login
        </button>

        <div className="flex flex-col items-center space-y-2 text-center">
          <div className="rounded-full bg-orange-500/10 p-4">
            <Trophy className="h-10 w-10 text-amber-500" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-50">Player Registration</h1>
          <p className="text-slate-400">Apply to participate in the Namatara Premier League 2027</p>
        </div>

        <Card className="border-slate-800 bg-slate-900 text-slate-50">
          <CardHeader>
            <CardTitle>Application Form</CardTitle>
            <CardDescription className="text-slate-400">
              Fill in your details and upload required documents.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="Enter your name" value={formData.name} onChange={handleInputChange} required className="bg-slate-950 border-slate-700" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" type="tel" placeholder="+91 9876543210" value={formData.phone} onChange={handleInputChange} required className="bg-slate-950 border-slate-700" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="aadhar">Aadhar Card Number</Label>
                <Input id="aadhar" placeholder="XXXX XXXX XXXX" value={formData.aadhar} onChange={handleInputChange} required className="bg-slate-950 border-slate-700" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="village">Village</Label>
                  <Input id="village" placeholder="Village name" value={formData.village} onChange={handleInputChange} required className="bg-slate-950 border-slate-700" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gp">Gram Panchayat (GP)</Label>
                  <Input id="gp" placeholder="GP name" value={formData.gp} onChange={handleInputChange} required className="bg-slate-950 border-slate-700" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Select value={formData.role} onValueChange={(value) => setFormData(prev => ({...prev, role: value}))}>
                    <SelectTrigger className="bg-slate-950 border-slate-700 text-white">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Batter">Batter</SelectItem>
                      <SelectItem value="Bowler">Bowler</SelectItem>
                      <SelectItem value="All-Rounder">All-Rounder</SelectItem>
                      <SelectItem value="Wicket Keeper">Wicket Keeper</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {(formData.role === 'Batter' || formData.role === 'All-Rounder' || formData.role === 'Wicket Keeper') && (
                  <div className="space-y-2">
                    <Label htmlFor="battingStyle">Batting Style</Label>
                    <Select value={formData.battingStyle} onValueChange={(value) => setFormData(prev => ({...prev, battingStyle: value}))}>
                      <SelectTrigger className="bg-slate-950 border-slate-700 text-white">
                        <SelectValue placeholder="Select batting style" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Right Hand Batter">Right Hand Batter</SelectItem>
                        <SelectItem value="Left Hand Batter">Left Hand Batter</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {(formData.role === 'Bowler' || formData.role === 'All-Rounder') && (
                  <div className="space-y-2">
                    <Label htmlFor="bowlingStyle">Bowling Style</Label>
                    <Select value={formData.bowlingStyle} onValueChange={(value) => setFormData(prev => ({...prev, bowlingStyle: value}))}>
                      <SelectTrigger className="bg-slate-950 border-slate-700 text-white">
                        <SelectValue placeholder="Select bowling style" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Right Hand Bowler">Right Hand Bowler</SelectItem>
                        <SelectItem value="Left Hand Bowler">Left Hand Bowler</SelectItem>
                        <SelectItem value="Right Arm Spin">Right Arm Spin</SelectItem>
                        <SelectItem value="Left Arm Spin">Left Arm Spin</SelectItem>
                        <SelectItem value="None">None</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="basePrice">Base Price</Label>
                <Select value={formData.basePrice} onValueChange={(value) => setFormData(prev => ({...prev, basePrice: value}))}>
                  <SelectTrigger className="bg-slate-950 border-slate-700 text-white">
                    <SelectValue placeholder="Select base price" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="₹50">₹50</SelectItem>
                    <SelectItem value="₹100">₹100</SelectItem>
                    <SelectItem value="₹150">₹150</SelectItem>
                    <SelectItem value="₹200">₹200</SelectItem>
                    <SelectItem value="₹250">₹250</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2 pt-2">
                <Label className="block">Recent Photo</Label>
                <div className="flex items-center justify-center w-full">
                  <label htmlFor="photo-upload" className="flex flex-col items-center justify-center w-full h-24 border-2 border-slate-700 border-dashed rounded-lg cursor-pointer bg-slate-950 hover:bg-slate-800 transition">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-6 h-6 mb-2 text-slate-400" />
                      <p className="text-xs text-slate-400">Click to upload photo</p>
                    </div>
                    <input id="photo-upload" type="file" accept="image/*" required className="hidden" />
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="space-y-2">
                  <Label className="block">Aadhar Front</Label>
                  <div className="flex items-center justify-center w-full">
                    <label htmlFor="aadhar-front-upload" className="flex flex-col items-center justify-center w-full h-24 border-2 border-slate-700 border-dashed rounded-lg cursor-pointer bg-slate-950 hover:bg-slate-800 transition">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-6 h-6 mb-2 text-slate-400" />
                        <p className="text-xs text-slate-400 text-center px-1">Upload front</p>
                      </div>
                      <input id="aadhar-front-upload" type="file" accept="image/*,application/pdf" required className="hidden" />
                    </label>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="block">Aadhar Back</Label>
                  <div className="flex items-center justify-center w-full">
                    <label htmlFor="aadhar-back-upload" className="flex flex-col items-center justify-center w-full h-24 border-2 border-slate-700 border-dashed rounded-lg cursor-pointer bg-slate-950 hover:bg-slate-800 transition">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-6 h-6 mb-2 text-slate-400" />
                        <p className="text-xs text-slate-400 text-center px-1">Upload back</p>
                      </div>
                      <input id="aadhar-back-upload" type="file" accept="image/*,application/pdf" required className="hidden" />
                    </label>
                  </div>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <Label className="block">Payment Screenshot</Label>
                <div className="flex items-center justify-center w-full">
                  <label htmlFor="payment-upload" className="flex flex-col items-center justify-center w-full h-24 border-2 border-slate-700 border-dashed rounded-lg cursor-pointer bg-slate-950 hover:bg-slate-800 transition">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-6 h-6 mb-2 text-slate-400" />
                      <p className="text-xs text-slate-400">Click to upload screenshot</p>
                    </div>
                    <input id="payment-upload" type="file" accept="image/*" required className="hidden" />
                  </label>
                </div>
              </div>

              <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700 text-white mt-4" disabled={isLoading}>
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Submit Application
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
