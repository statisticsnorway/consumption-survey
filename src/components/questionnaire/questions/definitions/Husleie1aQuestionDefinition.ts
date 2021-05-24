import {QuestionFormType} from "../QuestionFormType";
import {Theme} from "../themes";

export const HUSLEIE1A: QuestionFormType = {
    id: 'husleie1a',
    theme: Theme.ownerExpedenaturesEconomy,
    order: 16,
    questionText: 'Er husleien',
    hasAnswered: false,
    answerValue: {
        answers: [
            {
                id: 'husleie1a_1',
                value: "1",
                descriptionValue: 'Vanlig markedspris',
                chosen: false
            },
            {
                id: 'husleie1a_2',
                value: "2",
                descriptionValue: 'Til redusert pris',
                chosen: false
            },
            {
                id: 'husleie1a_3',
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
                questionId: "eier1",
                questionValue: "2"
            },
            {
                questionId: "husleie1",
                questionValue: "1"
            },
        ]
    ],
    defaultNextQuestion: "husleie1b",
    inputType: "radio"
} as QuestionFormType
