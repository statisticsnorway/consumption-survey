import {QuestionFormType} from "../QuestionFormType";
import {Theme} from "../themes";

export const OPPGRADF2: QuestionFormType = {
    id: 'oppgradf2',
    theme: Theme.renovationHolidayHome,
    order: 59,
    questionText: 'Hvor store utgifter hadde du/dere til',
    hasAnswered: false,
    answerValue: {
        answers: [
            {
                id: 'oppgradf2_1_1',
                value: "",
                descriptionValue: 'Til håndtverker',
                chosen: true
            },
            {
                id: 'oppgradf2_1_2',
                value: "",
                descriptionValue: 'Til materialer',
                chosen: true
            },
            {
                id: 'oppgradf2_2_1',
                value: "",
                descriptionValue: 'Til håndtverker',
                chosen: true
            },
            {
                id: 'oppgradf2_2_2',
                value: "",
                descriptionValue: 'Til materialer',
                chosen: true
            },
            {
                id: 'oppgradf2_3_1',
                value: "",
                descriptionValue: 'Til håndtverker',
                chosen: true
            },
            {
                id: 'oppgradf2_3_2',
                value: "",
                descriptionValue: 'Til materialer',
                chosen: true
            },
            {
                id: 'oppgradf2_4_1',
                value: "",
                descriptionValue: 'Til håndtverker',
                chosen: true
            },
            {
                id: 'oppgradf2_4_2',
                value: "",
                descriptionValue: 'Til materialer',
                chosen: true
            },
            {
                id: 'oppgradf2_5_1',
                value: "",
                descriptionValue: 'Til håndtverker',
                chosen: true
            },
            {
                id: 'oppgradf2_5_2',
                value: "",
                descriptionValue: 'Til materialer',
                chosen: true
            },
            {
                id: 'oppgradf2_6_1',
                value: "",
                descriptionValue: 'Til håndtverker',
                chosen: true
            },
            {
                id: 'oppgradf2_6_2',
                value: "",
                descriptionValue: 'Til materialer',
                chosen: true
            },
            {
                id: 'oppgradf2_7_1',
                value: "",
                descriptionValue: 'Til håndtverker',
                chosen: true
            },
            {
                id: 'oppgradf2_7_2',
                value: "",
                descriptionValue: 'Til materialer',
                chosen: true
            },
            {
                id: 'oppgradf2_8_1',
                value: "",
                descriptionValue: 'Til håndtverker',
                chosen: true
            },
            {
                id: 'oppgradf2_8_2',
                value: "",
                descriptionValue: 'Til materialer',
                chosen: true
            },
            {
                id: 'oppgradf2_9_1',
                value: "",
                descriptionValue: 'Til håndtverker',
                chosen: true
            },
            {
                id: 'oppgradf2_9_2',
                value: "",
                descriptionValue: 'Til materialer',
                chosen: true
            },
        ]
    },
    dependentOnQuestionCriteria: [
        [
            {
                questionId: "oppgradf1",
                questionValue: "10",
                specialCompare: "logicNot"
            },
            {
                questionId: 'fritidsn1',
                questionValue: '4',
                specialCompare: "logicNot"
            }
        ]
    ],

    inputType: "multifield-number-dependent-with-sum",
    inputPostfix: "cash"
} as QuestionFormType
