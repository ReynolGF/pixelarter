import type { Expression } from "./expression";

export class NumberExpression implements Expression {
  private readonly num: number;

  public evaluate = () => this.num;

  constructor(num: number) {
    this.num = num;
  }
}
