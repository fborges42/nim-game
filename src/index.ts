import { ComputerPlayer } from "./nim-game/ComputerPlayer";
import { NimGame } from "./nim-game/NimGame";
import { HumanPlayer } from "./nim-game/HumanPlayer";

const humanPlayer = new HumanPlayer("Fábio");
const computerPlayer = new ComputerPlayer("CPU");
const game = new NimGame(humanPlayer, computerPlayer);

game.start();
