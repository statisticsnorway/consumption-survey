import {QuestionFormType} from "../QuestionFormType";
import {Theme} from "../themes";

export const KOMAVG: QuestionFormType = {
    id: 'komavg',
    theme: Theme.ownerExpedenaturesEconomy,
    order: 24,
    questionText: 'Betaler dere noen av disse kommunale avgiftene?',
    hasAnswered: false,
    answerValue: {
        answers: [
            {
                id: 'komavg_1',
                value: "1",
                descriptionValue: 'Renovasjonsavgift',
                chosen: false
            },
            {
                id: 'komavg_2',
                value: "2",
                descriptionValue: 'Vannavgift',
                chosen: false
            },
            {
                id: 'komavg_3',
                value: "3",
                descriptionValue: 'Kloakkavgift',
                chosen: false
            },
            {
                id: 'komavg_4',
                value: "4",
                descriptionValue: 'Feieavgift',
                chosen: false
            },
            {
                id: 'komavg_5',
                value: "5",
                descriptionValue: 'Andre kommunale avgifter',
                chosen: false
            },
        ]
    },
    dependentOnQuestionCriteria: [
        [
            {
                questionId: "eier2",
                questionValue: "1"
            },
            {
                questionId: "futg3",
                questionValue: "3",
                specialCompare: "logicNot"
            },
        ]
    ],
    inputType: "checkbox",
} as QuestionFormType
