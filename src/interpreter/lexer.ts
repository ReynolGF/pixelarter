import { InvalidToken } from "./Token/invalidToken";
import { MinusToken } from "./Token/minusToken";
import { NumberToken } from "./Token/numberToken";
import { PlusToken } from "./Token/plusToken";
import type { Token } from "./Token/token";
import { isDigit } from "./utils";

export class Lexer {
  private readonly text: string;
  private position: number = 0;

  private getCurrent = () =>
    this.position >= this.text.length ? "\0" : this.text[this.position];

  constructor(text: string) {
    this.text = text;
  }

  public getTokens(): Token[] {
    let tokens: Token[] = [];

    while (this.position < this.text.length) {
      tokens.push(this.getToken());
      this.position++;
    }
    return tokens;
  }

  private getToken(): Token {
    while (this.getCurrent() == " ") {
      this.position++;
    }

    if (isDigit(this.getCurrent())) {
      let number = "";

      do {
        number += this.getCurrent();
        this.position++;
      } while (isDigit(this.getCurrent()));

      this.position--;

      return new NumberToken(number);
    }

    switch (this.getCurrent()) {
      case "+":
        return new PlusToken("+");
      case "-":
        return new MinusToken("-");
      default:
        return new InvalidToken(this.getCurrent());
    }
  }
}
