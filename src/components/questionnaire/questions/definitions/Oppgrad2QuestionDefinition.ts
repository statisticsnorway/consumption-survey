import {QuestionFormType} from "../QuestionFormType";
import {Theme} from "../themes";

export const OPPGRAD2: QuestionFormType = {
    id: 'oppgrad2',
    theme: Theme.renovationDwelling,
    order: 37,
    questionText: 'Hvor store utgifter hadde du/dere til disse tiltakene? Dersom betaling til håndverkere også dekket materialer eller innredning, kan du oppgi alt under «til håndverkere».',
    hasAnswered: false,
    answerValue: {
        answers: [
            {
                id: 'oppgrad2_1_1',
                value: "",
                descriptionValue: 'Til håndtverker',
                chosen: true
            },
            {
                id: 'oppgrad2_1_2',
                value: "",
                descriptionValue: 'Til materialer',
                chosen: true
            },
            {
                id: 'oppgrad2_2_1',
                value: "",
                descriptionValue: 'Til håndtverker',
                chosen: true
            },
            {
                id: 'oppgrad2_2_2',
                value: "",
                descriptionValue: 'Til materialer',
                chosen: true
            },
            {
                id: 'oppgrad2_3_1',
                value: "",
                descriptionValue: 'Til håndtverker',
                chosen: true
            },
            {
                id: 'oppgrad2_3_2',
                value: "",
                descriptionValue: 'Til materialer',
                chosen: true
            },
            {
                id: 'oppgrad2_4_1',
                value: "",
                descriptionValue: 'Til håndtverker',
                chosen: true
            },
            {
                id: 'oppgrad2_4_2',
                value: "",
                descriptionValue: 'Til materialer',
                chosen: true
            },
            {
                id: 'oppgrad2_5_1',
                value: "",
                descriptionValue: 'Til håndtverker',
                chosen: true
            },
            {
                id: 'oppgrad2_5_2',
                value: "",
                descriptionValue: 'Til materialer',
                chosen: true
            },
            {
                id: 'oppgrad2_6_1',
                value: "",
                descriptionValue: 'Til håndtverker',
                chosen: true
            },
            {
                id: 'oppgrad2_6_2',
                value: "",
                descriptionValue: 'Til materialer',
                chosen: true
            },
            {
                id: 'oppgrad2_7_1',
                value: "",
                descriptionValue: 'Til håndtverker',
                chosen: true
            },
            {
                id: 'oppgrad2_7_2',
                value: "",
                descriptionValue: 'Til materialer',
                chosen: true
            },
            {
                id: 'oppgrad2_8_1',
                value: "",
                descriptionValue: 'Til håndtverker',
                chosen: true
            },
            {
                id: 'oppgrad2_8_2',
                value: "",
                descriptionValue: 'Til materialer',
                chosen: true
            },
            {
                id: 'oppgrad2_9_1',
                value: "",
                descriptionValue: 'Til håndtverker',
                chosen: true
            },
            {
                id: 'oppgrad2_9_2',
                value: "",
                descriptionValue: 'Til materialer',
                chosen: true
            },
            {
                id: 'oppgrad2_10_1',
                value: "",
                descriptionValue: 'Til håndtverker',
                chosen: true
            },
            {
                id: 'oppgrad2_10_2',
                value: "",
                descriptionValue: 'Til materialer',
                chosen: true
            },
            {
                id: 'oppgrad2_11_1',
                value: "",
                descriptionValue: 'Til håndtverker',
                chosen: true
            },
            {
                id: 'oppgrad2_11_2',
                value: "",
                descriptionValue: 'Til materialer',
                chosen: true
            },
        ]
    },
    dependentOnQuestionCriteria: [
        [
            {
                questionId: "oppgrad1",
                questionValue: "11",
                specialCompare: "logicNot"
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
