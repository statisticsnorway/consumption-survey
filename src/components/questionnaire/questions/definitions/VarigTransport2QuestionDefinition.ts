import {QuestionFormType} from "../QuestionFormType";

export const VARIGTRANSPORT2: QuestionFormType = {
    id: 'varigtransport2',
    order: 114,
    questionText: 'Hvor mye betalte du/dere? Dersom dette var en gave, anslå verdien',
    hasAnswered: false,
    answerValue: {
        answers: [
            {
                id: 'varigtransport2_1',
                value: "",
                descriptionValue: 'Sykkel, el-sparkesykkel',
                chosen: false
            },
            {
                id: 'varigmøbler2_2',
                value: "",
                descriptionValue: 'Motorsykkel, moped',
                chosen: false
            },
            {
                id: 'varigmøbler2_3',
                value: "",
                descriptionValue: 'Campingvogn, bobil',
                chosen: false
            },
            {
                id: 'varigtransport2_4',
                value: "",
                descriptionValue: 'Båt, båtmotor',
                chosen: false
            },
            {
                id: 'varigtransport2_5',
                value: "",
                descriptionValue: 'Tilhenger',
                chosen: false
            },
            {
                id: 'varigtransport2_6',
                value: "",
                descriptionValue: 'Andre transportmidler',
                chosen: false
            },
            {
                id: 'varigtransport2_7',
                value: "",
                descriptionValue: 'Ingen av disse',
                chosen: false
            },
        ]
    },
    dependentOnQuestionCriteria: [
        [
            {
                questionId: "varigtransport1",
                questionValue: "7",
                specialCompare: "logicNot"
            }
        ]
    ],
    inputType: "multifield-number-dependent",
    inputPostfix: "cash"
} as QuestionFormType
