import { Player } from "./Player";

export class HumanPlayer implements Player {
  constructor(public name: string) {}
  selectedMatches: MatchInterface[] = [];
  isHuman = true;

  takeTurn(selectedMatch: HTMLElement): number {
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
        (match: MatchInterface) => match.id !== this.getMatchId(selectedMatch)
      );
    } else {
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
    this.selectedMatches = [];
  }

  getMatchId(match: Element): number {
    return +(match.getAttribute("id") ?? 0);
  }
}
