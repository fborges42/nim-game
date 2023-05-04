import { IMatch } from "./IMatch";

export interface IPlayer {
  name: string;
  isHuman: boolean;
  selectedMatches: IMatch[];
  isPlayerTurn: boolean;
  takeTurn(selectedMatch?: HTMLElement): number;
  endTurn(): void;
  restartGame(): void;
}
