import type { Expression } from "../expression";
import { BinaryExpression } from "./binaryExpression";

export class BinarySumExpression extends BinaryExpression {
  public evaluate = () =>
    Number(this.left.evaluate()) + Number(this.right.evaluate());

  constructor(left: Expression, right: Expression) {
    super(left, right);
  }
}
