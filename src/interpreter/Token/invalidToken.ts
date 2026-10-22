import type { Token } from "./token";

export class InvalidToken implements Token {
  readonly text: string;
  constructor(text: string) {
    this.text = text;
  }
}
