import { BinaryMinusExpression } from "./Expression/BinaryExpression/binaryMinusExpression";
import { BinarySumExpression } from "./Expression/BinaryExpression/binarySumExpression";
import { BooleanExpression } from "./Expression/booleanExpression";
import { ErrorExpression } from "./Expression/errorExpression";
import type { Expression } from "./Expression/expression";
import { NumberExpression } from "./Expression/numberExpression";
import type { Token } from "./Token/token";

export class Parser {
  private readonly tokens: Token[];

  private pos: number = 0;
  private getCurrent = (): Token => {
    return this.tokens[this.pos];
  };
  private nextToken = (): void => {
    this.pos++;
  };
  constructor(tokens: Token[]) {
    this.tokens = tokens;
  }
  public Parse(): Expression {
    let left: Expression = this.E(this.getCurrent());

    while (
      this.getCurrent().type == "PlusToken" ||
      this.getCurrent().type == "MinusToken"
    ) {
      let currentOperator = this.getCurrent();

      this.nextToken();
      let right: Expression = this.E(this.getCurrent());

      if (currentOperator.type == "PlusToken") {
        left = new BinarySumExpression(left, right);
      }

      if (currentOperator.type == "MinusToken") {
        left = new BinaryMinusExpression(left, right);
      }
    }
    return left;
  }

  private E(currentToken: Token): Expression {
    if (currentToken.type == "NumberToken")
      return new NumberExpression(Number(currentToken.text));
    if (currentToken.type == "BooleanToken")
      return new BooleanExpression(Boolean(currentToken.text));
    if (currentToken.type == "InvalidToken") return new ErrorExpression();

    return new ErrorExpression();
  }
}
