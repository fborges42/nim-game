import { ComputerPlayer } from "./ComputerPlayer";
import { HumanPlayer } from "./HumanPlayer";
import { Player } from "./Player";

export class NimGame {
  private players: Player[] = [];
  private matchesLeft = 13;
  private currentPlayerIndex = 0;
  private currentPlayer!: Player;

  constructor(humanPlayer: HumanPlayer, computerPlayer: ComputerPlayer) {
    this.players.push(humanPlayer, computerPlayer);
  }

  start(): void {
    const domMatches: Element[] = [
      ...document.querySelectorAll(".matches__heap__match"),
    ];
    const domRemoveBtn: Element | null = document.querySelector(
      ".actions__btn--remove"
    );
    domMatches.forEach((domMatch) =>
      domMatch.addEventListener("click", ($event) => this.takeTurn($event))
    );
    domRemoveBtn?.addEventListener("click", () => this.removeMatches());
  }

  takeTurn($event: Event): void {
    this.currentPlayer = this.players[this.currentPlayerIndex];
    const pickedMatch = $event.target as HTMLElement;
    const numMatches = this.currentPlayer.takeTurn(pickedMatch);

    console.log(`${this.currentPlayer.name} takes ${numMatches} matches.`);
  }

  removeMatches() {
    this.matchesLeft -= this.currentPlayer.selectedMatches.length;

    const availableMatches: NodeListOf<Element> | null =
      document.querySelectorAll(
        ".matches__heap__match:not(.matches__heap__match--selected):not(.matches__heap__match--removed)"
      );

    if (availableMatches.length <= 1) {
      alert(`${this.currentPlayer.name} wins!`);
      return this.restartGame();
    }

    // hide removed matches
    const domMatchesNotRemoved: NodeListOf<Element> | null =
      document.querySelectorAll(
        ".matches__heap__match:not(.matches__heap__match--removed)"
      );
    this.currentPlayer?.selectedMatches?.forEach(
      (selectedMatch: MatchInterface) => {
        domMatchesNotRemoved.forEach((matchElement: Element) => {
          if (selectedMatch.id === this.getMatchId(matchElement)) {
            matchElement.classList.add("matches__heap__match--removed");
          }
        });
      }
    );

    // pass turn to other player
    this.endTurn();
  }

  get getMatchesLeft(): number {
    return this.matchesLeft;
  }

  getMatchId(match: Element): number {
    return +(match.getAttribute("id") ?? 0);
  }

  restartGame(): void {
    const allMatches: NodeListOf<Element> | null = document.querySelectorAll(
      ".matches__heap__match"
    );
    allMatches.forEach((match) => {
      match.classList.remove("matches__heap__match--removed");
      match.classList.remove("matches__heap__match--selected");
    });

    this.endTurn();
  }

  endTurn(): void {
    this.currentPlayer.endTurn();

    const nextPlayerIndex = (this.currentPlayerIndex + 1) % 2;
    this.currentPlayerIndex = nextPlayerIndex;
    this.currentPlayer = this.players[this.currentPlayerIndex];
    if (!this.currentPlayer.isHuman) {
      this.currentPlayer.takeTurn();
      setTimeout(() => {
        // timeout just to make it visible CPU is making his move
        this.removeMatches();
      }, 1500);
    }
  }
}
