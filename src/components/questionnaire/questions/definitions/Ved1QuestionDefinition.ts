import {QuestionFormType} from "../QuestionFormType";
import {Theme} from "../themes";

export const VED1: QuestionFormType = {
    id: 'ved1',
    theme: Theme.firewood,
    order: 77,
    questionText: 'Har [du/dere] fått eller hugget ved selv til privat bruk de siste 12 månedene?',
    hasAnswered: false,
    answerValue: {
        answers: [
            {
                id: 'ved1_1',
                value: "1",
                descriptionValue: 'Ja',
                chosen: false
            },
            {
                id: 'ved1_2',
                value: "2",
                descriptionValue: 'Nei',
                chosen: false
            },
        ]
    },
    dependentOnQuestionCriteria: [
        [
            {
                questionId: "fyrutg1",
                questionValue: "4"
            },
        ],


        [
            {
                questionId: "fyrutgfri1",
                questionValue: "4"
            },
        ],
    ],
    inputType: "radio"
} as QuestionFormType
