import { ComputerPlayer } from "./ComputerPlayer";
import { HumanPlayer } from "./HumanPlayer";
import { NimGame } from "./NimGame";

const humanPlayer = new HumanPlayer("Fábio");
const computerPlayer = new ComputerPlayer("CPU");
const game = new NimGame(humanPlayer, computerPlayer);

game.start();
