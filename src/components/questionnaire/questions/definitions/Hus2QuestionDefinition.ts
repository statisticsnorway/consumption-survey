import {QuestionFormType} from "../QuestionFormType";
import {Theme} from "../themes";

export const HUS2: QuestionFormType = {
    id: 'hus2',
    theme: Theme.dwelling,
    order: 2,
    questionText: 'Er det færre eller flere enn 10 leiligheter i huset du/dere bor i?',
    hasAnswered: false,
    answerValue: {
        answers: [
            {
                id: 'hus2_1',
                value: "1",
                descriptionValue: 'Færre enn 10',
                chosen: false
            },
            {
                id: 'hus2_2',
                value: "2",
                descriptionValue: '10 eller flere',
                chosen: false
            }
        ]
    },
    dependentOnQuestionCriteria: [
        [
            {
                questionId: "hus1",
                questionValue: "4"
            }
        ]
    ],
    defaultNextQuestion: "bol1",
    inputType: "radio"
} as QuestionFormType
