import {QuestionFormType} from "../QuestionFormType";
import {Theme} from "../themes";

export const FUTG1: QuestionFormType = {
    id: 'futg1',
    theme: Theme.ownerExpedenaturesEconomy,
    order: 20,
    questionText: 'Betaler [du/dere] fellesutgifter til borettslag eller sameie?',
    hasAnswered: false,
    answerValue: {
        answers: [
            {
                id: 'futg1_1',
                value: "1",
                descriptionValue: 'Ja',
                chosen: false
            },
            {
                id: 'futg1_2',
                value: "2",
                descriptionValue: 'Nei',
                chosen: false
            }
        ]
    },
    dependentOnQuestionCriteria: [
        [
            {
                questionId: "eier1",
                questionValue: "1"
            },
            {
                questionId: "hus1",
                questionValue: "2"
            },
        ],
        [
            {
                questionId: "eier1",
                questionValue: "1"
            },
            {
                questionId: "hus1",
                questionValue: "3"
            },
        ],
        [
            {
                questionId: "eier1",
                questionValue: "1"
            },
            {
                questionId: "hus1",
                questionValue: "4"
            },
        ],
        [
            {
                questionId: "eier1",
                questionValue: "1"
            },
            {
                questionId: "hus1",
                questionValue: "5"
            },
        ],
    ],
    defaultNextQuestion: "futg2",
    inputType: "radio"
} as QuestionFormType
