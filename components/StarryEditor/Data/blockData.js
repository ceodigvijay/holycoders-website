import {
  DocumentTextIcon,
  CollectionIcon,
  MenuAlt1Icon,
  CheckCircleIcon,
  CursorClickIcon,
} from "@heroicons/react/outline";

const IndividualCodeData = {
  title: "Title",
  language: "CPP",
  code: "",
  executable: false,
  highlight: "",
  downloadable: false,
  playground: false,
  exercise: false,
  output: "",
  solution: "",
  payload: "",
};

const TestQuestionDataOption = {
  text: "",
  position: 1,
  feedback: "",
};
const TestQuestionData = {
  title: "",
  text: "",
  options: [],
  feedback: "",
};

const options = {
  MARKDOWN: {
    label: "Markdown",
    format: {
      text: "",
      title: "",
      type: "MARKDOWN",
    },
    icon: <DocumentTextIcon />,
  },

  ATF: {
    label: "Arrange",
    format: {
      type: "ATF",
      ...TestQuestionData,
    },
    icon: <MenuAlt1Icon />,
  },

  MCQ: {
    label: "Multiple Choice",
    format: {
      type: "MCQ",
      ...TestQuestionData,
    },
    icon: <CheckCircleIcon />,
  },

  FTB: {
    label: "Fill the Blanks",
    format: {
      type: "FTB",
      language: "CPP",
      code: "",
      ...TestQuestionData,
    },
    icon: <CursorClickIcon />,
  },

  CODE: {
    label: "Code",
    format: {
      title: "",
      text: "",
      type: "CODE",
      data: [],
    },
    icon: <CollectionIcon />,
  },
};

export default options;
export { IndividualCodeData, TestQuestionDataOption };
