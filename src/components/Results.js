import classNames from "classnames";
import { useRef } from "react";

import { useAppContext } from "../hooks";

import RestartButton from "./RestartButton";

export default function Results() {
  const { questionInfos } = useAppContext();

  if (hasIncompleteAnswers(questionInfos)) {
    return <IncompleteResults />;
  }

  return (
    <main>
      <div className="results-heading-container">
        <h1>You scored</h1>
        <h2 className={getResultsHeadingProgressClassName(questionInfos)}>
          {numberOfCorrectAnswers(questionInfos)} / {questionInfos.length}
        </h2>
      </div>
      <QuestionResults />
      <div className="results-footer-container">
        <RestartButton>PLAY AGAIN?</RestartButton>
      </div>
    </main>
  );
}

function hasIncompleteAnswers(questionInfos) {
  return questionInfos.some(
    (questionInfo) => !("providedAnswer" in questionInfo)
  );
}

function numberOfCorrectAnswers(questionInfos) {
  return questionInfos.filter(wasAnsweredCorrectly).length;
}

function wasAnsweredCorrectly({ correctAnswer, providedAnswer }) {
  return correctAnswer === providedAnswer;
}

function wasAnswered({ providedAnswer }) {
  return typeof providedAnswer !== "undefined";
}

function getResultsHeadingProgressClassName(questionInfos) {
  const intentClassName = questionInfos.every(wasAnsweredCorrectly)
    ? "intent-success"
    : questionInfos.every(
        (questionInfo) =>
          wasAnswered(questionInfo) && !wasAnsweredCorrectly(questionInfo)
      )
    ? "intent-failure"
    : questionInfos.every((questionInfo) => !wasAnswered(questionInfo))
    ? "intent-warning"
    : "";

  return classNames("results-heading-progress", intentClassName);
}

function IncompleteResults() {
  const { questionInfos } = useAppContext();

  return (
    <main>
      <div className="results-heading">
        <h1>You only answered</h1>
        <h2 className={getResultsHeadingProgressClassName(questionInfos)}>
          {numberOfAnsweredQuestions(questionInfos)} / {questionInfos.length}
        </h2>
      </div>
      <QuestionResults />
      <RestartButton />
    </main>
  );
}

function numberOfAnsweredQuestions(questionInfos) {
  return questionInfos.filter(wasAnswered).length;
}

function QuestionResults() {
  const { questionInfos } = useAppContext();
  const contentElementRef = useRef();

  return (
    <div className={getQuestionResultsClassName(questionInfos)}>
      <div ref={contentElementRef} className="question-results-content">
        {questionInfos.map((questionInfo) => (
          <h3
            key={questionInfo.id}
            className={getQuestionResultsEntryClassName(questionInfo)}
          >
            <QuestionResultsEntryAnswerSign questionInfo={questionInfo} />
            <div>
              {questionInfo.question} &mdash;
              <i>This is {questionInfo.correctAnswer.toString()}.</i>
            </div>
          </h3>
        ))}
      </div>
    </div>
  );
}

function getQuestionResultsClassName(questionInfos) {
  const intentClassName = questionInfos.every(wasAnsweredCorrectly)
    ? "intent-success"
    : questionInfos.every(
        (questionInfo) =>
          wasAnswered(questionInfo) && !wasAnsweredCorrectly(questionInfo)
      )
    ? "intent-failure"
    : questionInfos.every((questionInfo) => !wasAnswered(questionInfo))
    ? "intent-warning"
    : "";

  return classNames("question-results", intentClassName);
}

function getQuestionResultsEntryClassName(questionInfo) {
  const intentClassName = wasAnswered(questionInfo)
    ? wasAnsweredCorrectly(questionInfo)
      ? "intent-success"
      : "intent-failure"
    : "intent-warning";

  return classNames("question-results-entry", intentClassName);
}

function QuestionResultsEntryAnswerSign({ questionInfo }) {
  return (
    <strong className="question-results-entry-answer-sign">
      {wasAnswered(questionInfo)
        ? wasAnsweredCorrectly(questionInfo)
          ? "+"
          : "-"
        : "?"}
    </strong>
  );
}
