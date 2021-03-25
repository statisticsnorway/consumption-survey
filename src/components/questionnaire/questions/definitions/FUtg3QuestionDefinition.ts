import {QuestionFormType} from "../QuestionFormType";

export const FUTG3: QuestionFormType = {
    id: 'futg3',
    order: 22,
    questionText: 'Omfatter husleien/fellesutgiftene …. ',
    hasAnswered: false,
    answerValue: {
        answers: [
            {
                id: 'futg3_1_1',
                value: "1_1",
                descriptionValue: 'Elektrisitet',
                chosen: false
            },
            {
                id: 'futg3_2_1',
                value: "2_1",
                descriptionValue: 'Oppvarming',
                chosen: false
            },
            {
                id: 'futg3_3_1',
                value: "3_1",
                descriptionValue: 'Varmtvann',
                chosen: false
            },
            {
                id: 'futg3_4_1',
                value: "4_1",
                descriptionValue: 'Garasje/Parkering',
                chosen: false
            },
            {
                id: 'futg3_5_1',
                value: "5_1",
                descriptionValue: 'Kabel-TV',
                chosen: false
            },
            {
                id: 'futg3_6_1',
                value: "6_1",
                descriptionValue: 'Boligforsikring',
                chosen: false
            },
            {
                id: 'futg3_7_1',
                value: "7_1",
                descriptionValue: 'Kommunale avgifter',
                chosen: false
            },
            {
                id: 'futg3_8_1',
                value: "8_1",
                descriptionValue: 'Renter og avdrag på fellesgjeld',
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
        ],
        [
            {
                questionId: "eier2",
                questionValue: "2"
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