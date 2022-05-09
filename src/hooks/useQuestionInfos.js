import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { unescapeHtmlEntities } from "../utils";

export default function useQuestionInfos() {
  const [apiError, setApiError] = useState();
  const [questionInfos, setQuestionInfos] = useState();

  useQuestionInfosApiEffect(setApiError, setQuestionInfos);

  if (typeof apiError !== "undefined") {
    return { loadState: "failed", apiError };
  } else if (typeof questionInfos !== "undefined") {
    return { loadState: "succeeded", questionInfos, setQuestionInfos };
  } else {
    return { loadState: "loading" };
  }
}

function useQuestionInfosApiEffect(setApiError, setQuestionInfos) {
  useEffect(() => {
    fetchQuestionInfos(setApiError, setQuestionInfos);
  }, [setApiError, setQuestionInfos]);
}

async function fetchQuestionInfos(setApiError, setQuestionInfos) {
  try {
    const response = await fetch(questionsApiUrl);
    const { response_code: responseCode, results } = await response.json();

    if (responseCode !== 0) {
      throw new Error(
        `API responded with non-zero response code: ${responseCode}`
      );
    }

    const questionInfos = (results || []).map((questionInfo) => ({
      id: uuidv4(),
      category: questionInfo.category,
      question: unescapeHtmlEntities(questionInfo.question),
      correctAnswer: questionInfo.correct_answer === "True",
    }));

    setQuestionInfos(questionInfos);
  } catch (error) {
    setApiError(error);
  }
}

const questionsApiUrl =
  "https://opentdb.com/api.php?amount=10&difficulty=hard&type=boolean";
