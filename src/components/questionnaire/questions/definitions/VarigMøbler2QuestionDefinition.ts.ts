import {QuestionFormType} from "../QuestionFormType";
import {Theme} from "../themes";

export const VARIGMØBLER2: QuestionFormType = {
    id: 'varigmøbler2',
    theme: Theme.rarePurchases,
    order: 112,
    questionText: 'Hvor mye betalte du/dere?Dersom dette var en gave, anslå verdien' ,
    hasAnswered: false,
    answerValue: {
        answers: [
            {
                id: 'varigmøbler1_1',
                value: "",
                descriptionValue: 'Sofa',
                chosen: false
            },
            {
                id: 'varigmøbler1_2',
                value: "",
                descriptionValue: 'Utemøbler',
                chosen: false
            },
            {
                id: 'varigmøbler1_3',
                value: "",
                descriptionValue: 'Spisebord',
                chosen: false
            },
            {
                id: 'varigmøbler1_4',
                value: "",
                descriptionValue: 'Seng',
                chosen: false
            },
            {
                id: 'varigmøbler1_5',
                value: "",
                descriptionValue: 'Bokhyller/reol',
                chosen: false
            },
            {
                id: 'varigmøbler1_6',
                value: "",
                descriptionValue: 'Skap',
                chosen: false
            },
            {
                id: 'varigmøbler1_7',
                value: "",
                descriptionValue: 'Lamper/belysning',
                chosen: false
            },
            {
                id: 'varigmøbler1_8',
                value: "",
                descriptionValue: 'Andre større møbler/inventar',
                chosen: false
            },
            {
                id: 'varigmøbler1_9',
                value: "",
                descriptionValue: 'Ingen av disse',
                chosen: false
            },
        ]
    },
    dependentOnQuestionCriteria: [
        [
            {
                questionId: "varigmøbler1",
                questionValue: "9",
                specialCompare: "logicNot"
            }
        ]
    ],
    inputType: "multifield-number-dependent",
    inputPostfix: "cash"
} as QuestionFormType
