import {QuestionFormType} from "../QuestionFormType";
import {Theme} from "../themes";

export const BOFEST1: QuestionFormType = {
    id: 'bofest1',
    theme: Theme.ownerExpedenaturesEconomy,
    order: 13,
    questionText: 'Står boligen på selveiertomt eller festet tomt?',
    hasAnswered: false,
    answerValue: {
        answers: [
            {
                id: 'bofest1_1',
                value: "1",
                descriptionValue: 'Selveiertomt',
                chosen: false
            },
            {
                id: 'bofest1_2',
                value: "2",
                descriptionValue: 'Festet tomt',
                chosen: false
            },
            {
                id: 'bofest1_3',
                value: "3",
                descriptionValue: 'Vet ikke',
                chosen: false,
                hidden: true
            }
        ]
    },
    dependentOnQuestionCriteria: [
        [
            {
                questionId: "eier2",
                questionValue: "1"
            },
            {
                questionId: "hus1",
                questionValue: "1"
            },
        ]
    ],
    inputType: "radio"
} as QuestionFormType
