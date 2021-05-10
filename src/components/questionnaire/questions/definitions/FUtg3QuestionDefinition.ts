import {QuestionFormType} from "../QuestionFormType";
import {Theme} from "../themes";

export const FUTG3: QuestionFormType = {
    id: 'futg3',
    theme: Theme.rentDwelling,
    order: 22,
    questionText: 'Omfatter husleien/fellesutgiftene …. ',
    hasAnswered: false,
    answerValue: {
        answers: [
            {
                id: 'futg3_1',
                value: "1",
                descriptionValue: 'Elektrisitet',
                chosen: false
            },
            {
                id: 'futg3_2',
                value: "2",
                descriptionValue: 'Oppvarming',
                chosen: false
            },
            {
                id: 'futg3_3',
                value: "3",
                descriptionValue: 'Kommunale avgifter',
                chosen: false
            },
            {
                id: 'futg3_4',
                value: "4",
                descriptionValue: 'Varmtvann',
                chosen: false
            },
            {
                id: 'futg3_5',
                value: "5",
                descriptionValue: 'Garasje/parkering',
                chosen: false
            },
            {
                id: 'futg3_6',
                value: "6",
                descriptionValue: 'TV/internett',
                chosen: false
            },
        ]
    },
    dependentOnQuestionCriteria: [
        [
            {
                questionId: "eier2",
                questionValue: "1"
            },
            {
                questionId: "futg1",
                questionValue: "1"
            },
        ],
    ],
    inputType: "checkbox"
} as QuestionFormType

// Betaler dere [du/dere] fellesutgifter til borettslag eller sameie? --- JA
// Eier [du/dere] som selveier eller gjennom borettslag? ----- Borettslag