import {QuestionFormType} from "../QuestionFormType";

export const VARIGFRITID2: QuestionFormType = {
    id: 'varigfritid2',
    order: 118,
    questionText: 'Hvor mye betalte du/dere for...Dersom dette var en gave, anslå verdien',
    hasAnswered: false,
    answerValue: {
        answers: [
            {
                id: 'varigfritid2_1',
                value: "",
                descriptionValue: 'Ski/skøyter',
                chosen: false
            },
            {
                id: 'varigfritid2_2',
                value: "",
                descriptionValue: 'Jakt/fiskeutstyr',
                chosen: false
            },
            {
                id: 'varigfritid2_3',
                value: "",
                descriptionValue: 'Dykkerutstyr',
                chosen: false
            },
            {
                id: 'varigfritid2_4',
                value: "",
                descriptionValue: 'Telt eller annet friluftutstyr',
                chosen: false
            },
            {
                id: 'varigfritid2_5',
                value: "",
                descriptionValue: 'Annet kostbart fritidsutstyr',
                chosen: false
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
