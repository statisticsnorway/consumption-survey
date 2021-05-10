import {QuestionFormType} from "../QuestionFormType";
import {Theme} from "../themes";

export const FRITIDSUTL2: QuestionFormType = {
    id: 'fritidsutl2',
    theme: Theme.holidayHomeAbroad,
    order: 71,
    questionText: 'Hva slags kostnader har [du/dere] hatt til fritidsbolig i utlandet i løpet av de siste 12 månedene?',
    hasAnswered: false,
    answerValue: {
        answers: [
            {
                id: 'fritidsutl2_1',
                value: "1",
                descriptionValue: 'Forsikring',
                chosen: false
            },
            {
                id: 'fritidsutl2_2',
                value: "2",
                descriptionValue: 'Felleskostnader eller husleie',
                chosen: false
            },
            {
                id: 'fritidsutl2_3',
                value: "3",
                descriptionValue: 'Lokale skatter og avgifter',
                chosen: false
            },
            {
                id: 'fritidsutl2_4',
                value: "4",
                descriptionValue: 'Vedlikehold (ikke bygging eller påbygging)',
                chosen: false
            },
            {
                id: 'fritidsutl2_5',
                value: "5",
                descriptionValue: 'Elektrisitet',
                chosen: false
            },
            {
                id: 'fritidsutl2_6',
                value: "6",
                descriptionValue: 'Utgifter til hage eller uteområde',
                chosen: false
            },
            {
                id: 'fritidsutl2_7',
                value: "7",
                descriptionValue: 'Andre utgifter',
                chosen: false
            },

        ]
    },
    dependentOnQuestionCriteria: [
        [
            {
                questionId: "fritidsutl1",
                questionValue: "1",
            },
        ],

    ],
    inputType: "checkbox",
} as QuestionFormType