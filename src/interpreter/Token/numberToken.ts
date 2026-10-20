import type { Token } from "./Token";

export class NumberToken implements Token {
  readonly text: string;
  constructor(text: string) {
    this.text = text;
  }
}
