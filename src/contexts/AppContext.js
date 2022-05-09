import { createContext } from "react";

export default createContext({
  questionInfos: [],
  setProvidedAnswerForQuestion(questionNumber, providedAnswer) {},
});
