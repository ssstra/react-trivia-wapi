import { BrowserRouter, Route, Routes } from "react-router-dom";

import AppContext from "../contexts/AppContext";

import useQuestionInfos from "../hooks/useQuestionInfos";

import InvalidApiResponse from "./InvalidApiResponse";
import Loading from "./Loading";
import NotFound from "./NotFound";
import Question from "./Question";
import Results from "./Results";
import Start from "./Start";

export default function AppContent() {
  const { apiError, loadState, questionInfos, setQuestionInfos } =
    useQuestionInfos();

  if (loadState === "loading") {
    return <Loading />;
  }

  if (loadState === "failed") {
    return <InvalidApiResponse apiError={apiError} />;
  }

  function setProvidedAnswerForQuestion(questionNumber, providedAnswer) {
    questionInfos[questionNumber - 1].providedAnswer = providedAnswer;

    setQuestionInfos(questionInfos);
  }

  return (
    <AppContext.Provider
      value={{ questionInfos, setProvidedAnswerForQuestion }}
    >
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Start />} />
          <Route path={`/question/:questionNumber`} element={<Question />} />
          <Route path="/results" element={<Results />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  );
}
