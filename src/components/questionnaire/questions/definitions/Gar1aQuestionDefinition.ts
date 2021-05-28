import {QuestionFormType} from "../QuestionFormType";
import {Theme} from "../themes";

export const GAR1A: QuestionFormType = {
    id: 'gar1a',
    theme: Theme.ownerExpedenaturesEconomy,
    order: 34,
    questionText: 'Har dere faste utgifter til parkering?',
    subText: 'Ta med utgifter til garasje, carport eller biloppstillingsplass som ikke er dekket av husleie.',
    hasAnswered: false,
    answerValue: {
        answers: [
            {
                id: 'gar1a_1',
                value: "1",
                descriptionValue: 'Ja',
                chosen: false
            },
            {
                id: 'gar1a_2',
                value: "2",
                descriptionValue: 'Nei',
                chosen: false
            }
        ]
    },
    dependentOnQuestionCriteria: [
        [
            {
                questionId: "gar1",
                questionValue: "1"
            }
        ],
        [
        {
            questionId: "gar1",
            questionValue: "2"
        }
        ]
    ],
    inputType: "radio"
} as QuestionFormType
