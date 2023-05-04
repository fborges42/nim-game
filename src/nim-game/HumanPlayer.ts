import { SessionStorage } from "../session/SessionStorage";
import { IMatch } from "./IMatch";
import { IPlayer } from "./IPlayer";
import { NimState } from "./session/NimState";

export class HumanPlayer implements IPlayer {
  protected readonly nimState: NimState;
  selectedMatches: IMatch[] = [];
  isHuman = true;
  isPlayerTurn = true;

  constructor(public name: string) {
    this.nimState = new NimState(new SessionStorage());
    this.nimState.setItem(this.name, this);
  }

  takeTurn(selectedMatch: HTMLElement): number {
    this.isPlayerTurn = true;
    const isMatchAlreadySelected = selectedMatch.classList.contains(
      "matches__heap__match--selected"
    );

    const isMatchSelectionMaxed = this.selectedMatches?.length === 3;
    if (!isMatchAlreadySelected && isMatchSelectionMaxed) {
      alert(
        "Only 3 cards are allowed to be selected per each round. Please unselect a card to continue"
      );
      return this.selectedMatches.length;
    }

    if (isMatchAlreadySelected) {
      selectedMatch.classList.remove("matches__heap__match--selected");

      this.selectedMatches = this.selectedMatches.filter(
        (match: IMatch) => match.id !== this.getMatchId(selectedMatch)
      );
    } else {
      debugger;
      selectedMatch.classList.add("matches__heap__match--selected");
      this.selectedMatches.push({
        id: this.getMatchId(selectedMatch),
        isSelected: true,
        isRemoved: false,
      });
    }

    return this.selectedMatches.length;
  }

  endTurn(): void {
    this.isPlayerTurn = false;
    this.nimState.setSelectedMatches(this.name, this.selectedMatches);
    this.selectedMatches = [];
  }

  restartGame(): void {
    debugger;
    this.selectedMatches = [];
    this.nimState.removeItem(this.name);
    this.nimState.setItem(this.name, this);
  }

  getMatchId(match: Element): number {
    return +(match.getAttribute("id") ?? 0);
  }
}
