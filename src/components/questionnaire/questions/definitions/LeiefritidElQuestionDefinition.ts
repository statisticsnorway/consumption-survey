import {QuestionFormType} from "../QuestionFormType";
import {Theme} from "../themes";

export const LEIEFRITIDEL: QuestionFormType = {
    id: 'leiefritidel',
    theme: Theme.holidayHome,
    order: 51,
    questionText: 'Er elektrisitet og brensel inkludert i leien, eller betales dette separat?',
    hasAnswered: false,
    answerValue: {
        answers: [
            {
                id: 'leiefritidel_1',
                value: "1",
                descriptionValue: 'Inkludert i leien',
                chosen: false
            },
            {
                id: 'leiefritidel_2',
                value: "2",
                descriptionValue: 'Betales separat',
                chosen: false
            },
        ]
    },
    dependentOnQuestionCriteria: [
        [
            {
                questionId: "fritidsn2",
                questionValue: "1"
            },
        ]
    ],
    inputType: "radio"
} as QuestionFormType
