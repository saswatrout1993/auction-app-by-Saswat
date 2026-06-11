import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Plus, Users } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../../components/ui/dialog";
import { toast } from "sonner";
import { useTeams, saveTeam, getUserRole } from "../lib/store";

export default function TeamsScreen() {
  const { teams, refresh } = useTeams();
  const userRole = getUserRole();
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    owner: "",
    purse: "₹10,00,000",
    color: "bg-blue-600"
  });

  const handleCreateTeam = (e: React.FormEvent) => {
    e.preventDefault();
    saveTeam({
      id: Date.now().toString(),
      name: formData.name,
      owner: formData.owner,
      purse: formData.purse,
      players: 0,
      color: formData.color,
    });
    toast.success("Team created successfully");
    setIsOpen(false);
    refresh();
  };

  return (
    <div className="flex-1 space-y-6 p-4 pt-6 bg-slate-950 min-h-full pb-24 text-white">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Teams</h2>
        {userRole === 'admin' && (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="bg-orange-600 hover:bg-orange-700 h-8 text-white sm:h-10">
              <Plus className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Create Team</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-slate-900 border-slate-800 text-slate-50">
            <DialogHeader>
              <DialogTitle>Create New Team</DialogTitle>
              <DialogDescription className="text-slate-400">
                Super Admin only: Add a new franchise to the auction.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCreateTeam} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="teamName">Team Name</Label>
                <Input required id="teamName" className="bg-slate-950 border-slate-700" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="owner">Owner Name</Label>
                <Input required id="owner" className="bg-slate-950 border-slate-700" value={formData.owner} onChange={e => setFormData({...formData, owner: e.target.value})} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="purse">Initial Purse (Budget)</Label>
                <Input required id="purse" className="bg-slate-950 border-slate-700" value={formData.purse} onChange={e => setFormData({...formData, purse: e.target.value})} />
              </div>
              <div className="space-y-2">
                <Label>Team Theme Color</Label>
                <div className="flex gap-2">
                  {["bg-blue-600", "bg-yellow-500", "bg-red-600", "bg-purple-800", "bg-orange-600", "bg-emerald-600", "bg-cyan-600", "bg-pink-600"].map(color => (
                    <button
                      key={color}
                      type="button"
                      className={`h-8 w-8 rounded-full ${color} ${formData.color === color ? 'ring-2 ring-white ring-offset-2 ring-offset-slate-900' : ''}`}
                      onClick={() => setFormData({...formData, color})}
                    />
                  ))}
                </div>
              </div>
              <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700 text-white mt-4">Create Team</Button>
            </form>
          </DialogContent>
        </Dialog>
        )}
      </div>

      {teams.length === 0 ? (
        <div className="text-center py-10 text-slate-500 bg-slate-900 rounded-xl border border-slate-800 border-dashed">
          No teams created yet. {userRole === 'admin' ? 'Click "Create Team" to get started.' : 'Check back later once the admin sets up the teams.'}
        </div>
      ) : (
      <div className="grid gap-4 md:grid-cols-2">
        {teams.map((team) => (
          <Card key={team.id} className="bg-slate-900 border-slate-800 text-white overflow-hidden flex flex-col">
            <div className={`h-2 w-full ${team.color}`}></div>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl font-bold">{team.name}</CardTitle>
                  <p className="text-sm text-slate-400 mt-1">Owner: {team.owner}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-400 font-semibold uppercase">Remaining Purse</p>
                  <p className="text-xl font-bold text-emerald-400">{team.purse}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="flex items-center text-sm font-medium text-slate-300">
                <Users className="mr-2 h-4 w-4 text-slate-500" />
                {team.players} / 25 Players Squad
              </div>
              <div className="w-full bg-slate-800 h-2 mt-4 rounded-full overflow-hidden">
                <div className={`h-full ${team.color}`} style={{ width: `${(team.players/25)*100}%` }}></div>
              </div>
            </CardContent>
            <CardFooter className="pt-2 border-t border-slate-800">
              <Button variant="ghost" className="w-full text-slate-300 hover:text-white hover:bg-slate-800">
                View Squad Details
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      )}
    </div>
  );
}
