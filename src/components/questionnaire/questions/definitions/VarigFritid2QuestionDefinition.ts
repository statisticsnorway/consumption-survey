import {QuestionFormType} from "../QuestionFormType";
import {Theme} from "../themes";

export const VARIGFRITID2: QuestionFormType = {
    id: 'varigfritid2',
    order: 118,
    theme: Theme.rarePurchases,
    questionText: 'Hvor mye betalte du/dere for...Dersom dette var en gave, anslå verdien',
    hasAnswered: false,
    answerValue: {
        answers: [
            {
                id: 'varigfritid2_1',
                value: "",
                descriptionValue: 'Ski/skøyter',
                chosen: true
            },
            {
                id: 'varigfritid2_2',
                value: "",
                descriptionValue: 'Jakt/fiskeutstyr',
                chosen: true
            },
            {
                id: 'varigfritid2_3',
                value: "",
                descriptionValue: 'Dykkerutstyr',
                chosen: true
            },
            {
                id: 'varigfritid2_4',
                value: "",
                descriptionValue: 'Telt eller annet friluftutstyr',
                chosen: true
            },
            {
                id: 'varigfritid2_5',
                value: "",
                descriptionValue: 'Annet kostbart fritidsutstyr',
                chosen: true
            },
        ]
    },
    dependentOnQuestionCriteria: [
        [
            {
                questionId: "varigfritid1",
                questionValue: "6",
                specialCompare: "logicNot"
            }
        ]
    ],
    inputType: "multifield-number-dependent",
    inputPostfix: "cash"
} as QuestionFormType
