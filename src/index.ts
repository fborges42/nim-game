// import { Match } from "./Match";
// import { NimGame } from "./NimGame";
// import { Player } from "./Player";

import { ComputerPlayer } from "./ComputerPlayer";
import { HumanPlayer } from "./HumanPlayer";
import { NimGame } from "./NimGame";

// // interface Player {
// //   name: string;
// //   selectedMatches: Match[];
// //   numberOfGames?: number;
// //   numberOfWins?: number;
// //   numberOfLosses?: number;
// //   playerTurn: boolean;
// // }

// const domMatches: NodeListOf<Element> = document.querySelectorAll(
//   ".matches__heap__match"
// );
// const domGoButton: HTMLElement | null = document.querySelector(
//   ".actions__btn--start"
// );

// const players: Player[] = [
//   {
//     name: "Fábio",
//     numberOfWins: 0,
//     numberOfLosses: 0,
//     selectedMatches: [],
//   },
//   {
//     name: "John",
//     numberOfWins: 0,
//     numberOfLosses: 0,
//     selectedMatches: [],
//   },
// ];

// const newGame = new NimGame(players);
// newGame.start();

// let domPlayerOneName: HTMLElement | null =
//   document.querySelector(".player__one");
// let domPlayerTwoName: HTMLElement | null =
//   document.querySelector(".player__two");
// if (domPlayerOneName)
//   domPlayerOneName.innerText = `Player 1: ${players[0].name}`;
// if (domPlayerTwoName)
//   domPlayerTwoName.innerText = `Player 2: ${players[1].name}`;

// domMatches.forEach((match) => {
//   match.addEventListener("click", selectMatch);
// });

// domGoButton?.addEventListener("click", onGoClick);

// function onGoClick($event: Event) {
//   // if 0 match left = lost game
//   let numberOfAvailableMatches = 0;
//   const domMatches: NodeListOf<Element> | null = document.querySelectorAll(
//     ".matches__heap__match:not(.matches__heap__match--selected):not(.matches__heap__match--removed)"
//   );

//   numberOfAvailableMatches = domMatches.length;

//   if (numberOfAvailableMatches === 0) {
//     alert("You lost the game");
//     newGame.playerLose(players[0]);
//     const domMatchesClearing: NodeListOf<Element> | null =
//       document.querySelectorAll(".matches__heap__match");
//     domMatchesClearing.forEach((matchClear) => {
//       matchClear.classList.remove("matches__heap__match--removed");
//       matchClear.classList.remove("matches__heap__match--selected");
//     });
//     return;
//   }

//   // hide removed matches
//   const playerAtGame: Player | undefined = players.find(
//     (player) => player.playerTurn === true
//   );
//   debugger;
//   const domMatchesNotRemoved: NodeListOf<Element> | null =
//     document.querySelectorAll(
//       ".matches__heap__match:not(.matches__heap__match--removed)"
//     );
//   playerAtGame?.selectedMatches?.forEach((selectedMatch: Match) => {
//     domMatchesNotRemoved.forEach((matchElement: Element) => {
//       if (selectedMatch.matchId === getMatchId(matchElement)) {
//         matchElement.classList.add("matches__heap__match--removed");
//       }
//     });
//   });

//   // pass turn to other player
//   newGame.nextTurn();
// }

// function selectMatch($event: Event) {
//   debugger;
//   const domSelectedMatch = $event.target as HTMLElement;

//   const isMatchAlreadySelected = domSelectedMatch.classList.contains(
//     "matches__heap__match--selected"
//   );
//   const isMatchSelectionMaxed =
//     newGame.currentPlayer.selectedMatches?.length === 3;
//   if (!isMatchAlreadySelected && isMatchSelectionMaxed) {
//     alert(
//       "Only 3 cards are allowed to be selected per each round. Please unselect a card to continue"
//     );
//     return;
//   }

//   if (isMatchAlreadySelected) {
//     debugger;
//     domSelectedMatch.classList.remove("matches__heap__match--selected");
//     newGame.currentPlayer.selectedMatches =
//       newGame.currentPlayer.selectedMatches?.filter(
//         (match: Match) => match.matchId !== getMatchId(domSelectedMatch)
//       );
//   } else {
//     domSelectedMatch.classList.add("matches__heap__match--selected");
//     newGame.selectMatch([
//       {
//         matchId: getMatchId(domSelectedMatch),
//         isSelected: true,
//       },
//     ]);
//   }

//   console.log(newGame.currentPlayer);
// }

// function getMatchId(match: Element) {
//   return +(match.getAttribute("id") ?? 0);
// }

const humanPlayer = new HumanPlayer("Fábio");
const computerPlayer = new ComputerPlayer("CPU");
const game = new NimGame(humanPlayer, computerPlayer);

game.start();
