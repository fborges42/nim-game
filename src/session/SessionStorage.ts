import { IStorage } from "./IStorage";

export class SessionStorage implements IStorage {
  getItem<T>(key: string): T | null {
    const item = sessionStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : null;
  }
  setItem<T>(key: string, value: T): void {
    sessionStorage.setItem(key, JSON.stringify(value));
  }
  removeItem(key: string): void {
    sessionStorage.removeItem(key);
  }
}
