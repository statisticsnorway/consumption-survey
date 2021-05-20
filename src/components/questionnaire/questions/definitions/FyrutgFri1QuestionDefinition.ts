import {QuestionFormType} from "../QuestionFormType";
import {Theme} from "../themes";

export const FYRUTGFRI1: QuestionFormType = {
    id: 'fyrutgfri1',
    theme: Theme.powerHolidayHome,
    order: 66,
    questionText: 'Hva slags oppvarming har dere i fritidsboligen?',
    hasAnswered: false,
    answerValue: {
        answers: [
            {
                id: 'fyrutgfri1_1',
                value: "1",
                descriptionValue: 'Elektrisitet',
                chosen: false
            },
            {
                id: 'fyrutgfri1_2',
                value: "2",
                descriptionValue: 'Varmepumpe',
                chosen: false
            },
            {
                id: 'fyrutgfri1_3',
                value: "3",
                descriptionValue: 'Jord/bergvarme',
                chosen: false
            },
            {
                id: 'fyrutgfri1_4',
                value: "4",
                descriptionValue: 'Vedfyring/pellets',
                chosen: false
            },
            {
                id: 'fyrutgfri1_5',
                value: "5",
                descriptionValue: 'Parafin/oljefyring',
                chosen: false
            },
            {
                id: 'fyrutgfri1_6',
                value: "6",
                descriptionValue: 'Gass (Installert med rør)',
                chosen: false
            },
            {
                id: 'fyrutgfri1_7',
                value: "7",
                descriptionValue: 'Gass fra beholder',
                chosen: false
            },
            {
                id: 'fyrutgfri1_8',
                value: "8",
                descriptionValue: 'Fjernvarme',
                chosen: false
            },
            {
                id: 'fyrutgfri1_9',
                value: "9",
                descriptionValue: 'Annet',
                chosen: false
            },
        ]
    },
    dependentOnQuestionCriteria: [
        [
            {
                questionId: "fritidsn1",
                questionValue: "1",
            },
        ],
        [
            {
                questionId: "fritidsn1",
                questionValue: "2",
            },
        ],
        [
            {
                questionId: "fritidsn1",
                questionValue: "3",
            },
        ]
    ],
    inputType: "checkbox",
} as QuestionFormType