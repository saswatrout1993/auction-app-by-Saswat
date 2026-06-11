import { useState, useEffect } from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Hammer, History, Play, Pause, X, SkipForward, ArrowUpCircle } from "lucide-react";
import { usePlayers, useTeams, updatePlayerStatus } from "../lib/store";

export default function LiveAuctionScreen() {
  const { players, refresh: refreshPlayers } = usePlayers();
  const { teams } = useTeams();
  
  const availablePlayers = players.filter(p => p.status === "Available");
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  
  const currentPlayer = availablePlayers[currentPlayerIndex];

  const [currentBid, setCurrentBid] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [highestBidder, setHighestBidder] = useState("None");

  useEffect(() => {
    // Reset state when current player changes
    if (currentPlayer) {
      const basePriceNum = parseInt(currentPlayer.basePrice.replace(/\D/g, ''));
      setCurrentBid(basePriceNum);
      setHighestBidder("None");
    }
  }, [currentPlayer]);

  const formatPrice = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(value);
  };

  const handleBid = (amount: number) => {
    setCurrentBid(prev => prev + amount);
    // In a real app we'd have a UI to select which team bid, but for now just mock it
    if (teams.length > 0) {
      const randomTeam = teams[Math.floor(Math.random() * teams.length)];
      setHighestBidder(randomTeam.name);
    } else {
      setHighestBidder("Unknown Team");
    }
  };

  const handleSell = () => {
    if (currentPlayer && highestBidder !== "None") {
      updatePlayerStatus(currentPlayer.id, "Sold", currentBid, highestBidder);
      refreshPlayers();
    }
  };

  const handleUnsold = () => {
    if (currentPlayer) {
      updatePlayerStatus(currentPlayer.id, "Unsold");
      refreshPlayers();
    }
  };

  const handleSkip = () => {
    if (currentPlayerIndex < availablePlayers.length - 1) {
      setCurrentPlayerIndex(prev => prev + 1);
    }
  };

  if (!currentPlayer) {
    return (
      <div className="flex flex-col h-full bg-slate-950 text-white pb-24 overflow-hidden items-center justify-center p-6 text-center">
        <h2 className="text-2xl font-bold mb-4">No Players Available</h2>
        <p className="text-slate-400">There are currently no more players available for auction. Check back later or add new players.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-slate-950 text-white pb-24 overflow-hidden">
      {/* Header Area */}
      <div className="bg-slate-900 px-4 py-3 border-b border-slate-800 flex justify-between items-center shadow-lg z-10 sticky top-0">
        <div>
          <div className="flex items-center space-x-2">
            <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse"></div>
            <span className="text-xs font-bold text-red-500 uppercase tracking-wider">Live</span>
          </div>
          <h1 className="text-lg font-bold">Namatara Premier League 2027</h1>
        </div>
        <div className="flex space-x-2">
          {isPaused ? (
            <Button size="sm" variant="outline" className="h-8 border-green-500 text-green-500 hover:bg-green-500/10" onClick={() => setIsPaused(false)}>
              <Play className="h-4 w-4 mr-1" /> Resume
            </Button>
          ) : (
            <Button size="sm" variant="outline" className="h-8 border-amber-500 text-amber-500 hover:bg-amber-500/10" onClick={() => setIsPaused(true)}>
              <Pause className="h-4 w-4 mr-1" /> Pause
            </Button>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        
        {/* Current Player Card */}
        <div className="relative rounded-2xl border-2 border-slate-800 bg-gradient-to-b from-slate-800 to-slate-900 p-6 flex flex-col items-center text-center overflow-hidden shadow-2xl">
          <div className="absolute top-4 right-4 bg-slate-950/50 backdrop-blur-md rounded-full px-3 py-1 flex items-center border border-slate-700">
             <History className="w-3 h-3 text-slate-400 mr-2" />
             <span className="text-xs font-bold font-mono">Lot #{currentPlayerIndex + 1}</span>
          </div>

          <div className="h-32 w-32 rounded-full overflow-hidden border-4 border-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.5)] mb-4">
            <img src={currentPlayer.image || `https://i.pravatar.cc/300?u=${currentPlayer.id}`} alt="Player" className="h-full w-full object-cover" />
          </div>
          
          <h2 className="text-3xl font-black tracking-tight mb-1">{currentPlayer.name}</h2>
          <p className="text-slate-400 font-medium mb-3 flex items-center">
            {currentPlayer.role} <span className="mx-2">•</span> {currentPlayer.style}
          </p>

          <div className="w-full grid grid-cols-2 gap-4 mt-2">
            <div className="bg-slate-950/50 p-3 rounded-xl border border-slate-800">
              <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Base Price</p>
              <p className="text-lg font-mono font-bold text-slate-300">{currentPlayer.basePrice}</p>
            </div>
            <div className="bg-slate-950/50 p-3 rounded-xl border border-slate-800">
              <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Highest Bidder</p>
              <p className="text-sm font-bold text-amber-500 leading-tight">{highestBidder}</p>
            </div>
          </div>
        </div>

        {/* Current Bid Display */}
        <div className="text-center py-4 bg-orange-950/20 rounded-2xl border border-orange-900/50 shadow-[inset_0_0_20px_rgba(249,115,22,0.1)]">
          <p className="text-sm font-bold uppercase tracking-widest text-orange-500 mb-2">Current Highest Bid</p>
          <div className="text-5xl font-black text-white font-mono tracking-tighter">
            {formatPrice(currentBid)}
          </div>
        </div>

        {/* Bidding Controls */}
        <div className="space-y-4">
           <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest px-1">Quick Bids</h3>
           <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
             <Button variant="outline" className="h-14 border-slate-700 bg-slate-800 hover:bg-slate-700 hover:text-white" onClick={() => handleBid(50)}>
               <ArrowUpCircle className="w-4 h-4 mr-2 text-emerald-500" />
               +₹50
             </Button>
             <Button variant="outline" className="h-14 border-slate-700 bg-slate-800 hover:bg-slate-700 hover:text-white" onClick={() => handleBid(100)}>
               <ArrowUpCircle className="w-4 h-4 mr-2 text-emerald-500" />
               +₹100
             </Button>
             <Button variant="outline" className="h-14 border-slate-700 bg-slate-800 hover:bg-slate-700 hover:text-white" onClick={() => handleBid(200)}>
               <ArrowUpCircle className="w-4 h-4 mr-2 text-emerald-500" />
               +₹200
             </Button>
             <Button variant="outline" className="h-14 border-slate-700 bg-slate-800 hover:bg-slate-700 hover:text-white shrink-0">
               Custom
             </Button>
           </div>
        </div>

        {/* Admin Actions */}
        <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-800">
           <Button className="h-12 bg-red-600 hover:bg-red-700 text-white font-bold w-full" onClick={handleUnsold}>
             <X className="w-4 h-4 mr-2" /> Unsold
           </Button>
           <Button className="h-12 bg-emerald-600 hover:bg-emerald-700 text-white font-bold w-full" onClick={handleSell}>
             <Hammer className="w-4 h-4 mr-2" /> Sell
           </Button>
           <Button variant="outline" className="h-12 border-slate-700 text-slate-300 col-span-2" onClick={handleSkip}>
             <SkipForward className="w-4 h-4 mr-2" /> Skip Player
           </Button>
        </div>

      </div>
    </div>
  );
}
