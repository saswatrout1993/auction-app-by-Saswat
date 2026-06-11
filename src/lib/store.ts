import { useState, useEffect } from 'react';

// Types
export interface Player {
  id: string;
  name: string;
  phone: string;
  aadhar: string;
  village: string;
  gp: string;
  role: string;
  style: string;
  basePrice: string;
  status: string;
  image?: string;
}

export interface Team {
  id: string;
  name: string;
  owner: string;
  purse: string;
  players: number;
  color: string;
}

// Helpers
export const getStoredPlayers = (): Player[] => {
  const data = localStorage.getItem('auction_players');
  return data ? JSON.parse(data) : [];
};

export const savePlayer = (player: Player) => {
  const players = getStoredPlayers();
  players.push(player);
  localStorage.setItem('auction_players', JSON.stringify(players));
};

export const updatePlayerStatus = (playerId: string, status: string, price?: number, teamId?: string) => {
  const players = getStoredPlayers();
  const playerIndex = players.findIndex(p => p.id === playerId);
  if (playerIndex !== -1) {
    players[playerIndex].status = status;
    if (price !== undefined) {
      players[playerIndex].basePrice = `₹${price.toLocaleString('en-IN')}`;
    }
    // Would save team id as well if needed
    localStorage.setItem('auction_players', JSON.stringify(players));
  }
};

export const getUserRole = () => {
  return localStorage.getItem('userRole') || 'user';
};

export const setUserRole = (role: string) => {
  localStorage.setItem('userRole', role);
};

export const getStoredTeams = (): Team[] => {
  const data = localStorage.getItem('auction_teams');
  return data ? JSON.parse(data) : [];
};

export const saveTeam = (team: Team) => {
  const teams = getStoredTeams();
  teams.push(team);
  localStorage.setItem('auction_teams', JSON.stringify(teams));
};

// Hooks
export const usePlayers = () => {
  const [players, setPlayers] = useState<Player[]>([]);

  useEffect(() => {
    setPlayers(getStoredPlayers());
  }, []);

  return { players, refresh: () => setPlayers(getStoredPlayers()) };
};

export const useTeams = () => {
  const [teams, setTeams] = useState<Team[]>([]);

  useEffect(() => {
    setTeams(getStoredTeams());
  }, []);

  return { teams, refresh: () => setTeams(getStoredTeams()) };
};
