import {QuestionFormType} from "../QuestionFormType";
import {Theme} from "../themes";

export const VARIGKUNST2: QuestionFormType = {
    id: 'varigkunst2',
    order: 120,
    theme: Theme.rarePurchases,
    questionText: 'Hvor mye betalte du/dere for...Dersom dette var en gave, anslå verdien',
    hasAnswered: false,
    answerValue: {
        answers: [
            {
                id: 'varigkunst2_1',
                value: "",
                descriptionValue: 'Smykker',
                chosen: true
            },
            {
                id: 'varigkunst2_2',
                value: "",
                descriptionValue: 'Kunst',
                chosen: true
            },
            {
                id: 'varigkunst2_3',
                value: "",
                descriptionValue: 'Bunad',
                chosen: true
            },
            {
                id: 'varigkunst2_4',
                value: "",
                descriptionValue: 'Sølvtøy',
                chosen: true
            },
        ]
    },
    dependentOnQuestionCriteria: [
        [
            {
                questionId: "varigkunst1",
                questionValue: "5",
                specialCompare: "logicNot"
            }
        ]
    ],
    inputType: "multifield-number-dependent",
    inputPostfix: "cash"
} as QuestionFormType
