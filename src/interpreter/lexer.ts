import { BooleanToken } from "./Token/booleanToken";
import { InvalidToken } from "./Token/invalidToken";
import { MinusToken } from "./Token/minusToken";
import { NumberToken } from "./Token/numberToken";
import { PlusToken } from "./Token/plusToken";
import type { Token } from "./Token/token";
import { isDigit, isLetter } from "./utils";

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

      return new NumberToken(number, "NumberToken");
    }
    if (isLetter(this.getCurrent())) {
      let word = "";
      do {
        word += this.getCurrent();
        this.position++;
      } while (isLetter(this.getCurrent()));

      this.position--;

      switch (word) {
        case "True":
          return new BooleanToken("True", "BooleanToken");
        case "False":
          return new BooleanToken("False", "BooleanToken");
        default:
          return new InvalidToken(word, "InvalidToken");
      }
    }

    switch (this.getCurrent()) {
      case "+":
        return new PlusToken("+", "PlusToken");
      case "-":
        return new MinusToken("-", "MinusToken");
      default:
        return new InvalidToken(this.getCurrent(), "InvalidToken");
    }
  }
}
