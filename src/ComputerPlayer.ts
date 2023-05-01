import { Player } from "./Player";

export class ComputerPlayer implements Player {
  constructor(public name: string) {}
  selectedMatches: MatchInterface[] = [];
  isHuman = false;

  takeTurn(): number {
    const availableMatches: Element[] = [
      ...document.querySelectorAll(
        ".matches__heap__match:not(.matches__heap__match--selected):not(.matches__heap__match--removed)"
      ),
    ];

    const cpuRandomAmountMatches = Math.floor(Math.random() * 3) + 1;

    for (let i = 0; i < cpuRandomAmountMatches; i++) {
      const randomIndex: number =
        Math.floor(Math.random() * availableMatches.length - 1) + 1;
      const cpuSelectedMatch: Element = availableMatches.splice(
        randomIndex,
        1
      )[0];

      cpuSelectedMatch.classList.add("matches__heap__match--selected");
      this.selectedMatches.push({
        id: this.getMatchId(cpuSelectedMatch),
        isSelected: true,
        isRemoved: false,
      });
    }

    console.log(
      `Computer selected random matches: ${this.selectedMatches.length}`
    );

    return this.selectedMatches.length;
  }

  endTurn(): void {
    this.selectedMatches = [];
  }

  getMatchId(match: Element): number {
    return +(match.getAttribute("id") ?? 0);
  }
}
