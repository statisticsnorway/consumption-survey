import {QuestionFormType} from "../QuestionFormType";

export const GAR1A: QuestionFormType = {
    id: 'gar1a',
    order: 34,
    questionText: 'Har dere utgifter for tilgang til garasje, carport eller biloppstillingsplass?',
    hasAnswered: false,
    answerValue: {
        answers: [
            {
                id: 'gar1a_1',
                value: "1",
                descriptionValue: 'Ja, separat/spesifisert',
                chosen: false
            },
            {
                id: 'gar1a_2',
                value: "2",
                descriptionValue: 'Ja, gjennom husleie/fellesutgifter',
                chosen: false
            },
            {
                id: 'gar1a_3',
                value: "3",
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
        ]
    ],
    inputType: "radio"
} as QuestionFormType
