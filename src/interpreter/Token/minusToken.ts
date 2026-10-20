import type { Token } from "./Token";

export class MinusToken implements Token {
  readonly text: string;
  constructor(text: string) {
    this.text = text;
  }
}
