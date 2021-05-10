import {QuestionFormType} from "../QuestionFormType";
import {Theme} from "../themes";

export const FYRUTG2: QuestionFormType = {
    id: 'fyrutg2',
    theme: Theme.powerDwelling,
    order: 43,
    questionText: 'Hvor store utgifter har du/dere til..',
    hasAnswered: false,
    answerValue: {
        answers: [
            {
                id: 'fyrutg2_1',
                value: "",
                descriptionValue: 'Elektrisitet',
                chosen: true
            },
            {
                id: 'fyrutg2_2',
                value: "",
                descriptionValue: 'Varmepumpe',
                chosen: true
            },
            {
                id: 'fyrutg2_3',
                value: "",
                descriptionValue: 'Fjernvarme',
                chosen: true
            },
            {
                id: 'fyrutg2_4',
                value: "",
                descriptionValue: 'Vedfyring/pellets',
                chosen: true
            },
            {
                id: 'fyrutg2_5',
                value: "",
                descriptionValue: 'Jord/bergvarme',
                chosen: true
            },
            {
                id: 'fyrutg2_6',
                value: "",
                descriptionValue: 'Parafin/oljefyring',
                chosen: true
            },
            {
                id: 'fyrutg2_7',
                value: "",
                descriptionValue: 'Gass (Installert med rør)',
                chosen: true
            },
            {
                id: 'fyrutg2_8',
                value: "",
                descriptionValue: 'Gass fra beholder',
                chosen: true
            },
            {
                id: 'fyrutg2_9',
                value: "",
                descriptionValue: 'Annet',
                chosen: true
            },
        ]
    },
    dependentOnQuestionCriteria: [
        [
            {
                questionId: "fyrutg1",
                questionValue: ""
            }
        ]
    ],
    inputType: "multifield-number-dependent",
    inputPostfix: "cash"
} as QuestionFormType
