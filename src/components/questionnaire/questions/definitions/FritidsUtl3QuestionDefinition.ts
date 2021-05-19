

import {QuestionFormType} from "../QuestionFormType";
import {Theme} from "../themes";

export const FRITIDSUTL3: QuestionFormType = {
    id: 'fritidsutl3',
    theme: Theme.holidayHomeAbroad,
    order: 72,
    questionText: 'Hvor store utgifter hadde du/dere til',
    hasAnswered: false,
    answerValue: {
        answers: [
            {
                id: 'fritidsutl3_1',
                value: "",
                descriptionValue: 'Forsikring',
                chosen: true
            },
            {
                id: 'fritidsutl3_2',
                value: "",
                descriptionValue: 'Felleskostnader eller husleie',
                chosen: true
            },
            {
                id: 'fritidsutl3_3',
                value: "",
                descriptionValue: 'Lokale skatter og avgifter',
                chosen: true
            },
            {
                id: 'fritidsutl3_4',
                value: "",
                descriptionValue: 'Vedlikehold (ikke bygging eller påbygging)',
                chosen: true
            },
            {
                id: 'fritidsutl3_5',
                value: "",
                descriptionValue: 'Elektrisitet',
                chosen: true
            },
            {
                id: 'fritidsutl3_6',
                value: "",
                descriptionValue: 'Utgifter til hage eller uteområde',
                chosen: true
            },
            {
                id: 'fritidsutl3_7',
                value: "",
                descriptionValue: 'Andre utgifter',
                chosen: true
            },

        ]
    },
    dependentOnQuestionCriteria: [
        [
            {
                questionId: "fritidsutl2",
                questionValue: ""
            },
            {
                questionId: 'fritidsutl1',
                questionValue: '1'
            }
        ],
    ],
    inputType: "multifield-number-dependent",
    inputPostfix: "cash"
} as QuestionFormType
