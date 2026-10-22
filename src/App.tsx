import { useState } from "react";
import "./App.css";
import { Lexer } from "./interpreter/lexer";
import type { Token } from "./interpreter/Token/token";

function App() {
  const textInput = "1+4 true false flase";

  const [result, setResult] = useState<Token[]>([]);

  const compile = () => {
    let lexer = new Lexer(textInput);

    setResult(lexer.getTokens());
  };

  return (
    <>
      {result.map((token) => (
        <div>
          <h1>{token.text}</h1>
          <h2> {typeof token}</h2>
        </div>
      ))}
      <button onClick={compile}>Compile</button>
    </>
  );
}

export default App;
