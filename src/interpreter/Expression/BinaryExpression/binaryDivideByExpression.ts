import type { Expression } from "../expression";

export class BinaryDivideByExpression {
  private readonly left: Expression;
  private readonly right: Expression;

  public evaluate = () =>
    Number(this.left.evaluate()) / Number(this.right.evaluate());

  constructor(left: Expression, right: Expression) {
    this.left = left;
    this.right = right;
  }
}
