import {QuestionFormType} from "../QuestionFormType";
import {Theme} from "../themes";

export const OPPUSSF2: QuestionFormType = {
    id: 'oppussf2',
    theme: Theme.renovationHolidayHome,
    order: 61,
    questionText: 'Hvor store utgifter hadde du/dere til disse tiltakene?',
    subText: 'Dersom betaling til håndverkere også dekket materialer eller innredning, kan du oppgi alt under «til håndverkere».',
    hasAnswered: false,
    answerValue: {
        answers: [
            {
                id: 'oppussf2_1_1',
                value: "",
                descriptionValue: 'Til håndtverker',
                chosen: true
            },
            {
                id: 'oppussf2_1_2',
                value: "",
                descriptionValue: 'Til materialer',
                chosen: true
            },
            {
                id: 'oppussf2_2_1',
                value: "",
                descriptionValue: 'Til håndtverker',
                chosen: true
            },
            {
                id: 'oppussf2_2_2',
                value: "",
                descriptionValue: 'Til materialer',
                chosen: true
            },
            {
                id: 'oppussf2_3_1',
                value: "",
                descriptionValue: 'Til håndtverker',
                chosen: true
            },
            {
                id: 'oppussf2_3_2',
                value: "",
                descriptionValue: 'Til materialer',
                chosen: true
            },
            {
                id: 'oppussf2_4_1',
                value: "",
                descriptionValue: 'Til håndtverker',
                chosen: true
            },
            {
                id: 'oppussf2_4_2',
                value: "",
                descriptionValue: 'Til materialer',
                chosen: true
            },
            {
                id: 'oppussf2_5_1',
                value: "",
                descriptionValue: 'Til håndtverker',
                chosen: true
            },
            {
                id: 'oppussf2_5_2',
                value: "",
                descriptionValue: 'Til materialer',
                chosen: true
            },
            {
                id: 'oppussf2_6_1',
                value: "",
                descriptionValue: 'Til håndtverker',
                chosen: true
            },
            {
                id: 'oppussf2_6_2',
                value: "",
                descriptionValue: 'Til materialer',
                chosen: true
            },
        ]
    },
    dependentOnQuestionCriteria: [
        [
            {
                questionId: "oppussf1",
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
