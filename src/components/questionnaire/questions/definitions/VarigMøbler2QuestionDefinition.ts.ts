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
                id: 'varigmøbler2_1',
                value: "",
                descriptionValue: 'Sofa',
                chosen: true
            },
            {
                id: 'varigmøbler2_2',
                value: "",
                descriptionValue: 'Utemøbler',
                chosen: true
            },
            {
                id: 'varigmøbler2_3',
                value: "",
                descriptionValue: 'Spisebord',
                chosen: true
            },
            {
                id: 'varigmøbler2_4',
                value: "",
                descriptionValue: 'Seng',
                chosen: true
            },
            {
                id: 'varigmøbler2_5',
                value: "",
                descriptionValue: 'Bokhyller/reol',
                chosen: true
            },
            {
                id: 'varigmøbler2_6',
                value: "",
                descriptionValue: 'Skap',
                chosen: true
            },
            {
                id: 'varigmøbler2_7',
                value: "",
                descriptionValue: 'Lamper/belysning',
                chosen: true
            },
            {
                id: 'varigmøbler2_8',
                value: "",
                descriptionValue: 'Andre større møbler/inventar',
                chosen: true
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
