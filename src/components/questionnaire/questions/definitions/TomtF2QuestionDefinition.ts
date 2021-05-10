import {QuestionFormType} from "../QuestionFormType";
import {Theme} from "../themes";

export const TOMTF2: QuestionFormType = {
    id: 'tomtf2',
    theme: Theme.renovationDwelling,
    order: 63,
    questionText: 'Hvor store utgifter hadde du/dere til disse tiltakene? Dersom betaling til håndverkere også dekket materialer eller innredning, kan du oppgi alt under «til håndverkere».',
    hasAnswered: false,
    answerValue: {
        answers: [
            {
                id: 'tomtf2_1_1',
                value: "",
                descriptionValue: 'Til håndtverker',
                chosen: true
            },
            {
                id: 'tomtf2_1_2',
                value: "",
                descriptionValue: 'Til materialer',
                chosen: true
            },
            {
                id: 'tomtf2_2_1',
                value: "",
                descriptionValue: 'Til håndtverker',
                chosen: true
            },
            {
                id: 'tomtf2_2_2',
                value: "",
                descriptionValue: 'Til materialer',
                chosen: true
            },
            {
                id: 'tomtf2_3_1',
                value: "",
                descriptionValue: 'Til håndtverker',
                chosen: true
            },
            {
                id: 'tomtf2_3_2',
                value: "",
                descriptionValue: 'Til materialer',
                chosen: true
            },
            {
                id: 'tomtf2_4_1',
                value: "",
                descriptionValue: 'Til håndtverker',
                chosen: true
            },
            {
                id: 'tomtf2_4_2',
                value: "",
                descriptionValue: 'Til materialer',
                chosen: true
            },
            {
                id: 'tomtf2_5_1',
                value: "",
                descriptionValue: 'Til håndtverker',
                chosen: true
            },
            {
                id: 'tomtf2_5_2',
                value: "",
                descriptionValue: 'Til materialer',
                chosen: true
            },
            {
                id: 'tomtf2_6_1',
                value: "",
                descriptionValue: 'Til håndtverker',
                chosen: true
            },
            {
                id: 'tomtf2_6_2',
                value: "",
                descriptionValue: 'Til materialer',
                chosen: true
            },

        ]
    },
    dependentOnQuestionCriteria: [
        [
            {
                questionId: "tomtf1",
                questionValue: "7",
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
