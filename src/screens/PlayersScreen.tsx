import { useState } from "react";
import { Card, CardContent } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Search, Filter, Plus } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { usePlayers } from "../lib/store";

export default function PlayersScreen() {
  const [searchTerm, setSearchTerm] = useState("");
  const { players } = usePlayers();
  const [filter, setFilter] = useState("all");

  const filteredPlayers = players.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filter === "all" || p.role.toLowerCase() === filter.toLowerCase();
    return matchesSearch && matchesRole;
  });

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 bg-slate-950 min-h-full pb-24 text-white">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Players Directory</h2>
      </div>

      <div className="flex space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
          <Input 
            type="search" 
            placeholder="Search players..." 
            className="pl-9 bg-slate-900 border-slate-800 text-white placeholder:text-slate-500" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" className="border-slate-800 bg-slate-900 text-slate-300">
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      <Tabs defaultValue="all" className="w-full" onValueChange={setFilter}>
        <TabsList className="w-full bg-slate-900 border border-slate-800 justify-start overflow-x-auto">
          <TabsTrigger value="all" className="data-[state=active]:bg-slate-800 data-[state=active]:text-white text-slate-400">All</TabsTrigger>
          <TabsTrigger value="batter" className="data-[state=active]:bg-slate-800 data-[state=active]:text-white text-slate-400">Batters</TabsTrigger>
          <TabsTrigger value="bowler" className="data-[state=active]:bg-slate-800 data-[state=active]:text-white text-slate-400">Bowlers</TabsTrigger>
          <TabsTrigger value="all-rounder" className="data-[state=active]:bg-slate-800 data-[state=active]:text-white text-slate-400">All-Rounders</TabsTrigger>
          <TabsTrigger value="wicket keeper" className="data-[state=active]:bg-slate-800 data-[state=active]:text-white text-slate-400">WKs</TabsTrigger>
        </TabsList>
        <TabsContent value={filter} className="mt-4 space-y-4">
          {filteredPlayers.length === 0 ? (
            <div className="text-center py-10 text-slate-500">No players found</div>
          ) : (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {filteredPlayers.map((player) => (
              <Card key={player.id} className="bg-slate-900 border-slate-800 overflow-hidden text-white cursor-pointer hover:border-slate-700 transition">
                <div className="flex p-3 gap-3">
                  <div className="h-20 w-20 rounded bg-slate-800 shrink-0 overflow-hidden">
                    <img src={player.image} alt={player.name} className="h-full w-full object-cover" />
                  </div>
                  <div className="flex flex-col justify-between flex-1 py-1">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="font-bold text-lg leading-none">{player.name}</h4>
                        <Badge variant="outline" className={
                          player.status === 'Sold' ? 'border-emerald-500 text-emerald-500' :
                          player.status === 'Unsold' ? 'border-red-500 text-red-500' :
                          'border-amber-500 text-amber-500'
                        }>{player.status}</Badge>
                      </div>
                      <p className="text-sm text-slate-400 mt-1">{player.role} • {player.style}</p>
                    </div>
                    <div className="text-sm font-semibold text-slate-300">
                      Base: <span className="text-white">{player.basePrice}</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
