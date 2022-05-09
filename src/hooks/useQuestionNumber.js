import { useParams } from "react-router-dom";

export default function useQuestionNumber() {
  const { questionNumber: questionNumberParam } = useParams();

  if (typeof questionNumberParam === "undefined") {
    return;
  }

  return parseInt(questionNumberParam);
}
