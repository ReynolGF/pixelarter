import type { Token } from "./Token";

export class InvalidToken implements Token {
  readonly text: string;
  constructor(text: string) {
    this.text = text;
  }
}
