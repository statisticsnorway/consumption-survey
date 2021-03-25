import {QuestionFormType} from "../QuestionFormType";

export const ELUTG1: QuestionFormType = {
    id: 'elutg1',
    order: 42,
    questionText: 'Eier eller leier du/dere boligen?',
    hasAnswered: false,
    answerValue: {
        answers: [
            {
                id: 'elutg1_1',
                value: "1",
                descriptionValue: 'Separat',
                chosen: false
            },
            {
                id: 'elutg1_2',
                value: "2",
                descriptionValue: 'Samlet',
                chosen: false
            }
        ]
    },
    inputType: "radio"
} as QuestionFormType
