import classNames from "classnames";
import { Link } from "react-router-dom";

import { useAppContext, useQuestionNumber } from "../hooks";

import NotFound from "./NotFound";

export default function Question() {
  const { questionInfos } = useAppContext();
  const questionNumber = useQuestionNumber();

  if (questionNumber > questionInfos.length) {
    return <NotFound />;
  }

  const questionInfo = questionInfos[questionNumber - 1];

  return (
    <main>
      <div className="question-heading-container">
        <h1>{questionInfo.category}</h1>
      </div>
      <div className="question-content">
        <div className="question-content-text">
          <h2>{questionInfo.question}</h2>
        </div>
        <div className="question-content-answers">
          <AnswerButton buttonClassName="intent-success" value={true}>
            True
          </AnswerButton>
          <AnswerButton buttonClassName="intent-failure" value={false}>
            False
          </AnswerButton>
        </div>
      </div>
      <div className="question-footer-container">
        <h3>
          {questionNumber} of {questionInfos.length}
        </h3>
      </div>
    </main>
  );
}

function isNotLastQuestion(questionInfos, questionNumber) {
  return questionInfos.length > questionNumber;
}

function AnswerButton({ buttonClassName, children, value }) {
  const { questionInfos, setProvidedAnswerForQuestion } = useAppContext();
  const questionNumber = useQuestionNumber();
  const linkTo = isNotLastQuestion(questionInfos, questionNumber)
    ? `/question/${questionNumber + 1}`
    : "/results";

  return (
    <Link className="answer-button" to={linkTo}>
      <button
        className={classNames("answer-button-button", buttonClassName)}
        onClick={() => setProvidedAnswerForQuestion(questionNumber, value)}
      >
        <h3>{children}</h3>
      </button>
    </Link>
  );
}
