import {QuestionFormType} from "../QuestionFormType";

export const LAAN2: QuestionFormType = {
    id: 'laan2',
    order: 8,
    questionText: 'Hvor mye gjenstår av lånet?',
    hasAnswered: false,
    answerValue: {
        answers: [
            {
                id: 'laan2_1',
                value: "",
                descriptionValue: '1-1.000.000.000',
                chosen: true
            }
        ]
    },
    defaultNextQuestion: "lutg1",
    dependentOnQuestionCriteria: [
        [
            {
                questionId: "laan1",
                questionValue: "1"
            }
        ]
    ],
    inputType: "text"
} as QuestionFormType
