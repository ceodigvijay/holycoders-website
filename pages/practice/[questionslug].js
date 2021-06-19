import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getQuestionWithSlug } from "../../lib/index";
import QuestionPage from "../../components/question/index";

export default function CodeChallenges() {
  const router = useRouter();
  const { questionslug } = router.query;
  const [question, setQuestion] = useState(null);
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        if (questionslug) {
          const response = await getQuestionWithSlug(questionslug);
          setQuestion(response.data.question);
          setSubmissions(response.data.submissions);
          console.log(response);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [questionslug]);
  if (question) {
    return <QuestionPage question={question} submissions={submissions} />;
  } else {
    return "Loading";
  }
}
