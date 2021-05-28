import {QuestionFormType} from "../QuestionFormType";
import {Theme} from "../themes";

export const VARIGTRANSPORT2: QuestionFormType = {
    id: 'varigtransport2',
    order: 114,
    theme: Theme.rarePurchases,
    questionText: 'Hvor mye betalte du/dere? Dersom dette var en gave, anslå verdien',
    hasAnswered: false,
    answerValue: {
        answers: [
            {
                id: 'varigtransport2_1',
                value: "",
                descriptionValue: 'Sykkel, el-sparkesykkel',
                chosen: true
            },
            {
                id: 'varigtransport2_2',
                value: "",
                descriptionValue: 'Motorsykkel, moped',
                chosen: true
            },
            {
                id: 'varigtransport2_3',
                value: "",
                descriptionValue: 'Campingvogn, bobil',
                chosen: true
            },
            {
                id: 'varigtransport2_4',
                value: "",
                descriptionValue: 'Båt, båtmotor',
                chosen: true
            },
            {
                id: 'varigtransport2_5',
                value: "",
                descriptionValue: 'Tilhenger',
                chosen: true
            },
            {
                id: 'varigtransport2_6',
                value: "",
                descriptionValue: 'Andre transportmidler',
                chosen: true
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
