import {QuestionFormType} from "../QuestionFormType";
import {Theme} from "../themes";

export const ELUTG1: QuestionFormType = {
    id: 'elutg1',
    theme: Theme.powerDwelling,
    order: 44,
    questionText: 'Er det enklest for deg å oppgi utgifter til elektrisitet og nettleie separat eller samlet?',
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
    dependentOnQuestionCriteria: [
        [
            {
                questionId: "eier1",
                questionValue: "1",
            },
        ],
        [
            {
                questionId: "eier1",
                questionValue: "2",
            },
            {
                questionId: "husleie3",
                questionValue: "2",
            },
        ],
    ],
    inputType: "radio"
} as QuestionFormType
