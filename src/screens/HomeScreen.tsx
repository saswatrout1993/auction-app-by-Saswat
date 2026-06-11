import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../components/ui/card";
import { Users, Shield, Trophy, Activity, Clock, QrCode, Share2 } from "lucide-react";
import { Button } from "../../components/ui/button";
import { QRCodeSVG } from "qrcode.react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../../components/ui/dialog";
import { usePlayers, useTeams, getUserRole } from "../lib/store";

export default function HomeScreen() {
  const registrationLink = `${window.location.origin}/player-registration`;
  const { players } = usePlayers();
  const { teams } = useTeams();
  const userRole = getUserRole();

  return (
    <div className="flex-1 space-y-6 p-4 pt-6 md:p-8 bg-slate-950 min-h-full pb-24">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight text-white">Dashboard</h2>
        <div className="flex items-center space-x-2">
          <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
          <span className="text-sm font-medium text-slate-300">System Online</span>
        </div>
      </div>
      
      {/* Action Bar */}
      {userRole === 'admin' && (
      <div className="flex justify-end">
        <Dialog>
          <DialogTrigger render={<Button className="bg-orange-600 hover:bg-orange-700 text-white shadow-[0_0_15px_rgba(249,115,22,0.3)]" />}>
            <QrCode className="mr-2 h-4 w-4" />
            Share Registration Link
          </DialogTrigger>
          <DialogContent className="bg-slate-900 text-slate-50 border-slate-800 sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Player Registration QR</DialogTitle>
              <DialogDescription className="text-slate-400">
                Show this QR to players so they can easily apply for the auction.
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col items-center justify-center space-y-6 py-6">
              <div className="bg-white p-4 rounded-xl">
                <QRCodeSVG 
                  value={registrationLink} 
                  size={200}
                  level={"H"}
                  includeMargin={true}
                  imageSettings={{
                    src: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Cricket_Ball.svg",
                    x: undefined,
                    y: undefined,
                    height: 24,
                    width: 24,
                    excavate: true,
                  }}
                />
              </div>
              <div className="text-center space-y-2">
                <p className="text-sm text-slate-400">Or share this direct link:</p>
                <div className="flex items-center gap-2 max-w-[280px]">
                  <code className="bg-slate-950 border border-slate-800 px-3 py-2 rounded text-xs truncate select-all flex-1 text-slate-300">
                    {registrationLink}
                  </code>
                  <Button size="icon" variant="outline" className="border-slate-800 bg-slate-950 shrink-0" onClick={() => {
                    navigator.clipboard.writeText(registrationLink);
                  }}>
                    <Share2 className="h-4 w-4 text-slate-400" />
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      )}

      {/* Overview Cards */}
      <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
        <Card className="bg-slate-900 border-slate-800 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Total Players</CardTitle>
            <Users className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{players.length}</div>
            <p className="text-xs text-slate-500">Registered</p>
          </CardContent>
        </Card>
        <Card className="bg-slate-900 border-slate-800 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Teams</CardTitle>
            <Shield className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teams.length}</div>
            <p className="text-xs text-slate-500">Created by admin</p>
          </CardContent>
        </Card>
        <Card className="bg-amber-500 text-slate-950 border-none col-span-2 md:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-bold uppercase tracking-wider">Live Auction</CardTitle>
            <Activity className="h-4 w-4 text-slate-950 animate-pulse" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Namatara Premier League 2027</div>
            <div className="mt-2 flex items-center text-sm font-medium">
              <Clock className="mr-1 h-3 w-3" />
              Ready to start
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Featured/Recent Section */}
      <h3 className="text-xl font-bold mt-8 text-white">Recently Registered Players</h3>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {players.slice(-3).reverse().map((player) => (
          <Card key={player.id} className="bg-slate-900 border-slate-800 text-white overflow-hidden">
            <div className="flex p-4 gap-4 items-center">
              <div className="h-16 w-16 rounded-full overflow-hidden border-2 border-orange-500">
                <img src={player.image} alt={player.name} className="h-full w-full object-cover" />
              </div>
              <div className="flex-1 w-full min-w-0">
                <h4 className="font-bold text-lg truncate">{player.name}</h4>
                <p className="text-sm text-slate-400 truncate">{player.role} • {player.village}</p>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs font-semibold text-sky-400 bg-sky-400/10 px-2 py-1 rounded">Available</span>
                  <span className="font-bold text-emerald-400">{player.basePrice}</span>
                </div>
              </div>
            </div>
          </Card>
        ))}
        {players.length === 0 && (
          <div className="col-span-full py-8 text-center text-slate-500 bg-slate-900 rounded-xl border border-slate-800">
            No players have registered yet. Share the registration link to get started!
          </div>
        )}
      </div>

    </div>
  );
}
