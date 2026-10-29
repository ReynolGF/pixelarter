import type { Expression } from "../expression";

export abstract class BinaryExpression implements Expression {
  protected readonly left: Expression;
  protected readonly right: Expression;

  constructor(left: Expression, right: Expression) {
    this.left = left;
    this.right = right;
  }

  evaluate: any = () => {
    return { left: this.left.evaluate(), right: this.right.evaluate() };
  };
}
