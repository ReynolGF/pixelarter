import { useState } from "react";
import "./App.css";
import { Lexer } from "./interpreter/lexer";
import type { Token } from "./interpreter/Token/token";
import { Parser } from "./interpreter/parser";
import type { Expression } from "./interpreter/Expression/expression";

function App() {
  const textInput = "1+4";

  const [tokens, setTokens] = useState<Token[]>([]);
  const [ast, setAst] = useState<Expression>();

  const compile = () => {
    let lexer = new Lexer(textInput);

    let Tokens = lexer.getTokens();

    let parser = new Parser(Tokens);

    let Ast = parser.Parse();

    setTokens(Tokens);
    setAst(Ast);
  };

  return (
    <>
      {tokens.map((token) => (
        <div>
          <h1>{token.text}</h1>
          <h2> {token.type}</h2>
        </div>
      ))}
      {ast == undefined ? <></> : <h1>ast</h1>}
      <button onClick={compile}>Compile</button>
    </>
  );
}

export default App;
