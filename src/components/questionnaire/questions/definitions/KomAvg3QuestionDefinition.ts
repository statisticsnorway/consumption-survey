import {QuestionFormType} from "../QuestionFormType";

export const KOMAVG3: QuestionFormType = {
    id: 'komavg3',
    order: 26,
    questionText: 'Hvor mye betaler du/dere i',
    hasAnswered: false,
    answerValue: {
        answers: [
            {
                id: 'komavg3_1',
                value: "",
                descriptionValue: 'Renovasjonsavgift',
                chosen: true
            },
            {
                id: 'komavg3_2',
                value: "",
                descriptionValue: 'Vannavgift',
                chosen: true
            },
            {
                id: 'komavg3_3',
                value: "",
                descriptionValue: 'Kloakkavgift',
                chosen: true
            },
            {
                id: 'komavg3_4',
                value: "",
                descriptionValue: 'Feieavgift',
                chosen: true
            },
            {
                id: 'komavg3_5',
                value: "",
                descriptionValue: 'Andre kommunale avgifter',
                chosen: true
            },
        ]
    },
    dependentOnQuestionCriteria: [
        [
            {
                questionId: "komavg",
                questionValue: "",
            },
            {
                questionId: "eier2",
                questionValue: "1"
            },
            {
                questionId: "futg3",
                questionValue: "3",
                specialCompare: "logicNot"
            },
        ],
    ],
    inputType: "multifield-number-dependent",
    inputPostfix: "cash"
} as QuestionFormType
