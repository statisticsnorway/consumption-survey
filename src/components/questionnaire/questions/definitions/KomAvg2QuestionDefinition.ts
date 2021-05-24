import {QuestionFormType} from "../QuestionFormType";
import {Theme} from "../themes";

export const KOMAVG2: QuestionFormType = {
    id: 'komavg2',
    theme: Theme.ownerExpedenaturesEconomy,
    order: 25,
    questionText: 'Betaler du/dere de kommunale avgiftene separat, eller som en samlet sum?',
    hasAnswered: false,
    answerValue: {
        answers: [
            {
                id: 'komavg2_1',
                value: "1",
                descriptionValue: 'Separat',
                chosen: false
            },
            {
                id: 'komavg2_2',
                value: "2",
                descriptionValue: 'Samlet sum',
                chosen: false
            }
        ]
    },
    dependentOnQuestionCriteria: [
        // MINST 2 valgt i KomAvg spørmål
        [
            {
                questionId: "komavg",
                questionValue: "1"
            },
            {
                questionId: "komavg",
                questionValue: "2"
            },
        ],
        [
            {
                questionId: "komavg",
                questionValue: "1"
            },
            {
                questionId: "komavg",
                questionValue: "3"
            },
        ],
        [
            {
                questionId: "komavg",
                questionValue: "1"
            },
            {
                questionId: "komavg",
                questionValue: "4"
            },
        ],
        [
            {
                questionId: "komavg",
                questionValue: "1"
            },
            {
                questionId: "komavg",
                questionValue: "5"
            },
        ],
        [
            {
                questionId: "komavg",
                questionValue: "2"
            },
            {
                questionId: "komavg",
                questionValue: "3"
            },
        ],
        [
            {
                questionId: "komavg",
                questionValue: "2"
            },
            {
                questionId: "komavg",
                questionValue: "4"
            },
        ],
        [
            {
                questionId: "komavg",
                questionValue: "2"
            },
            {
                questionId: "komavg",
                questionValue: "5"
            },
        ],
        [
            {
                questionId: "komavg",
                questionValue: "3"
            },
            {
                questionId: "komavg",
                questionValue: "4"
            },
        ],
        [
            {
                questionId: "komavg",
                questionValue: "3"
            },
            {
                questionId: "komavg",
                questionValue: "5"
            },
        ],
        [
            {
                questionId: "komavg",
                questionValue: "4"
            },
            {
                questionId: "komavg",
                questionValue: "5"
            },
        ],
    ],
    inputType: "radio"
} as QuestionFormType
