import { SessionStorage } from "../session/SessionStorage";
import { IMatch } from "./IMatch";
import { IPlayer } from "./IPlayer";
import { NimState } from "./session/NimState";

export class ComputerPlayer implements IPlayer {
  protected readonly nimState: NimState;
  selectedMatches: IMatch[] = [];
  isHuman = false;
  isPlayerTurn = false;

  constructor(public name: string) {
    this.nimState = new NimState(new SessionStorage());
    this.nimState.setItem(this.name, this);
  }

  takeTurn(): number {
    this.isPlayerTurn = true;
    const availableMatches: Element[] = [
      ...document.querySelectorAll(
        ".matches__heap__match:not(.matches__heap__match--selected):not(.matches__heap__match--removed)"
      ),
    ];

    let cpuRandomAmountMatches = 0;
    const totalMatches: number = availableMatches.length;
    const remainingMatches: number = totalMatches - this.selectedMatches.length;
    if (remainingMatches > 1) {
      cpuRandomAmountMatches = (remainingMatches - 1) % 4; // module 4 winning strategy for nim
      if (cpuRandomAmountMatches === 0) {
        // just two matches left
        cpuRandomAmountMatches = 1;
      }
    }

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
