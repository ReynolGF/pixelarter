import type { Expression } from "../expression";

export class BinarySumExpression {
  public readonly left: Expression;
  public readonly right: Expression;
  constructor(left: Expression, right: Expression) {
    this.left = left;
    this.right = right;
  }
}
