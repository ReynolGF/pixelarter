import type { Token } from "./token";

export class NumberToken implements Token {
  readonly text: string;
  constructor(text: string) {
    this.text = text;
  }
}
