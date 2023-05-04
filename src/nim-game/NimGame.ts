import { ComputerPlayer } from "./ComputerPlayer";
import { IMatch } from "./IMatch";
import { HumanPlayer } from "./HumanPlayer";
import { IPlayer } from "./IPlayer";
import { SessionStorage } from "../session/SessionStorage";

export class NimGame {
  private players: IPlayer[] = [];
  private matchesLeft = 13;
  private currentPlayerIndex = 0;
  private currentPlayer!: IPlayer;
  sessionStorage: SessionStorage;

  constructor(humanPlayer: HumanPlayer, computerPlayer: ComputerPlayer) {
    this.players.push(humanPlayer, computerPlayer);
    this.sessionStorage = new SessionStorage();
  }

  get getMatchesLeft(): number {
    return this.matchesLeft;
  }

  start(): void {
    this.watchDomEvents();
    this.getGameState();
  }

  private getGameState() {
    this.players.forEach((player) => {
      const playerState: IPlayer | null = this.sessionStorage.getItem(
        player.name
      );
      if (playerState) {
        player = playerState;
        if (playerState.isPlayerTurn) {
          this.currentPlayer = player;
          this.currentPlayerIndex = player.isHuman ? 0 : 1;
        }

        this.removeMatches(playerState);
      }
    });
  }

  private watchDomEvents() {
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

  private takeTurn($event: Event): void {
    this.currentPlayer = this.players[this.currentPlayerIndex];
    debugger;
    const pickedMatch = $event.target as HTMLElement;
    this.currentPlayer.takeTurn(pickedMatch);
  }

  private removeMatches(player: IPlayer = this.currentPlayer) {
    this.matchesLeft -= player.selectedMatches.length;

    const availableMatches: NodeListOf<Element> | null =
      document.querySelectorAll(
        ".matches__heap__match:not(.matches__heap__match--selected):not(.matches__heap__match--removed)"
      );

    if (availableMatches.length <= 1) {
      alert(`${player.name} wins!`);
      return this.restartGame();
    }

    // hide removed matches
    const domMatchesNotRemoved: NodeListOf<Element> | null =
      document.querySelectorAll(
        ".matches__heap__match:not(.matches__heap__match--removed)"
      );
    player?.selectedMatches?.forEach((selectedMatch: IMatch) => {
      domMatchesNotRemoved.forEach((matchElement: Element) => {
        if (selectedMatch.id === this.getMatchId(matchElement)) {
          selectedMatch.isRemoved = true;
          matchElement.classList.add("matches__heap__match--removed");
        }
      });
    });

    // pass turn to other player
    this.endTurn();
  }

  private getMatchId(match: Element): number {
    return +(match.getAttribute("id") ?? 0);
  }

  private restartGame(): void {
    const allMatches: NodeListOf<Element> | null = document.querySelectorAll(
      ".matches__heap__match"
    );
    allMatches.forEach((match) => {
      match.classList.remove("matches__heap__match--removed");
      match.classList.remove("matches__heap__match--selected");
    });

    this.players.forEach((player) => player.restartGame());
  }

  private endTurn(): void {
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
