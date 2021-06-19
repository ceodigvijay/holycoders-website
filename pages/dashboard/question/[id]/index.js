import React, { useState, useEffect } from "react";
import { getQuestionWithId, addQuestion } from "../../../../lib/index";
import { useRouter } from "next/router";
import QuestionEditor from "../../../../components/dashboard/question/editor";
export default function newCourse() {
  const router = useRouter();
  const { lesson, id } = router.query;
  useEffect(() => {
    const getData = async () => {
      try {
        if (id && id !== "new") {
          const res = await getQuestionWithId(id);
          setQuestion(res.data.question);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [id]);
  const [question, setQuestion] = useState(null);

  const [title, setTitle] = useState("");

  const addNewQuestion = async () => {
    try {
      const res = await addQuestion(title);
      router.replace(
        `/dashboard/question/[id]`,
        router.asPath.split("/").slice(0, -2).join("/") + "/" + res.data.id,
        undefined,
        { shallow: true }
      );
    } catch (error) {
      console.log(error);
    }
  };

  if (!id || (id !== "new" && !question)) {
    return "Loading";
  } else if (id === "new") {
    return (
      <div className="h-screen">
        <div className="pt-14 px-10">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyPress={(event) => {
              console.log(event.key);
              if (event.key === "Enter") {
                addNewQuestion();
              }
            }}
            autoFocus
            type="text"
            className="w-full text-5xl border-2 border-gray-200 rounded-md placeholder-gray-300 font-bold text-gray-700"
            placeholder="Short and Descriptive title (e.g Python Hello World)"
          />
          <button onClick={addNewQuestion}>Add Course</button>
        </div>
      </div>
    );
  } else {
    return <QuestionEditor question={question} setQuestion={setQuestion} />;
  }
}
