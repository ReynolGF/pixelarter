import type { Token } from "./token";

export class MinusToken implements Token {
  readonly text: string;
  constructor(text: string) {
    this.text = text;
  }
}
