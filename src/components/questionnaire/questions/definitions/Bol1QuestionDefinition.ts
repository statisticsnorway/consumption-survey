import {QuestionFormType} from "../QuestionFormType";

export const BOL1: QuestionFormType = {
    id: 'bol1',
    order: 3,
    questionText: 'Hvor mange rom er det i boligen?',
    hasAnswered: false,
    answerValue: {
        answers: [
            {
                id: 'bol1_1',
                value: "",
                descriptionValue: 'Hvor mange rom er det i boligen',
                chosen: true
            }
        ]
    },
    defaultNextQuestion: "bol2",
    inputType: "text"
} as QuestionFormType
