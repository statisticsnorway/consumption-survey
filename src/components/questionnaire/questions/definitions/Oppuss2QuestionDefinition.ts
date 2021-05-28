import {QuestionFormType} from "../QuestionFormType";
import {Theme} from "../themes";

export const OPPUSS2: QuestionFormType = {
    id: 'oppuss2',
    theme: Theme.renovationDwelling,
    order: 39,
    questionText: 'Hvor store utgifter hadde du/dere til disse tiltakene?',
    subText: 'Dersom betaling til håndverkere også dekket materialer eller innredning, kan du oppgi alt under «til håndverkere».',
    hasAnswered: false,
    answerValue: {
        answers: [
            {
                id: 'oppuss2_1_1',
                value: "",
                descriptionValue: 'Til håndtverker',
                chosen: true
            },
            {
                id: 'oppuss2_1_2',
                value: "",
                descriptionValue: 'Til materialer',
                chosen: true
            },
            {
                id: 'oppuss2_2_1',
                value: "",
                descriptionValue: 'Til håndtverker',
                chosen: true
            },
            {
                id: 'oppuss2_2_2',
                value: "",
                descriptionValue: 'Til materialer',
                chosen: true
            },
            {
                id: 'oppuss2_3_1',
                value: "",
                descriptionValue: 'Til håndtverker',
                chosen: true
            },
            {
                id: 'oppuss2_3_2',
                value: "",
                descriptionValue: 'Til materialer',
                chosen: true
            },
            {
                id: 'oppuss2_4_1',
                value: "",
                descriptionValue: 'Til håndtverker',
                chosen: true
            },
            {
                id: 'oppuss2_4_2',
                value: "",
                descriptionValue: 'Til materialer',
                chosen: true
            },
            {
                id: 'oppuss2_5_1',
                value: "",
                descriptionValue: 'Til håndtverker',
                chosen: true
            },
            {
                id: 'oppuss2_5_2',
                value: "",
                descriptionValue: 'Til materialer',
                chosen: true
            },
            {
                id: 'oppuss2_6_1',
                value: "",
                descriptionValue: 'Til håndtverker',
                chosen: true
            },
            {
                id: 'oppuss2_6_2',
                value: "",
                descriptionValue: 'Til materialer',
                chosen: true
            },
            {
                id: 'oppuss2_7_1',
                value: "",
                descriptionValue: 'Til håndtverker',
                chosen: true
            },
            {
                id: 'oppuss2_7_2',
                value: "",
                descriptionValue: 'Til materialer',
                chosen: true
            },
            {
                id: 'oppuss2_8_1',
                value: "",
                descriptionValue: 'Til håndtverker',
                chosen: true
            },
            {
                id: 'oppuss2_8_2',
                value: "",
                descriptionValue: 'Til materialer',
                chosen: true
            },
        ]
    },
    dependentOnQuestionCriteria: [
        [
            {
                questionId: "oppuss1",
                questionValue: "9",
                specialCompare: "logicNot",
            },
            {
                questionId: 'eier1',
                questionValue: '1'
            }
        ]
    ],
    inputType: "multifield-number-dependent-with-sum",
    inputPostfix: "cash"
} as QuestionFormType
