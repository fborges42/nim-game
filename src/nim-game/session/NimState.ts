import { SessionStorage } from "../../session/SessionStorage";
import { IMatch } from "../IMatch";
import { IPlayer } from "../IPlayer";

export class NimState {
  constructor(private readonly sessionStorage: SessionStorage) {}

  getItem(key: string): IPlayer | IMatch[] {
    return this.sessionStorage.getItem(key)!;
  }

  setItem(key: string, value: IPlayer): void {
    if (!!sessionStorage.getItem(key)) return;
    this.sessionStorage.setItem(key, value);
  }

  setSelectedMatches(key: string, value: IMatch[]): void {
    const currentPlayerState: IPlayer | null =
      this.sessionStorage.getItem<IPlayer>(key);

    if (!currentPlayerState) return;

    currentPlayerState.selectedMatches.push(...value);
    this.sessionStorage.setItem(key, currentPlayerState);
  }

  removeItem(key: string) {
    this.sessionStorage.removeItem(key);
  }
}
