import { IPlayer } from "./nim-game/IPlayer";

export interface IGameState {
  currentPlayer: IPlayer;
  matchesLeft: number;
  players: IPlayer[];
}
