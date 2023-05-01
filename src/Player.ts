export interface Player {
  name: string;
  isHuman: boolean;
  selectedMatches: MatchInterface[];
  takeTurn(selectedMatch?: HTMLElement): number;
  endTurn(): void;
}
