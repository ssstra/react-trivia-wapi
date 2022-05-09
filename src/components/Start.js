import { Link } from "react-router-dom";

import { useAppContext } from "../hooks";

export default function Start() {
  const { questionInfos } = useAppContext();

  return (
    <main>
      <h1>Welcome to the Trivia Challenge!</h1>
      <h2>
        You will be presented with {questionInfos.length} True or False
        questions.
      </h2>
      <h2>Can you score 100%?</h2>
      <Link to="/question/1">
        <button>
          <h3>BEGIN?</h3>
        </button>
      </Link>
    </main>
  );
}
