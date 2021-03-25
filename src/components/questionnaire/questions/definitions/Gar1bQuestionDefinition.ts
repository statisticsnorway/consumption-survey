import {QuestionFormType} from "../QuestionFormType";

export const GAR1B: QuestionFormType = {
    id: 'gar1b',
    order: 35,
    questionText: 'Har dere utgifter for tilgang til garasje, carport eller biloppstillingsplass?',
    hasAnswered: false,
    answerValue: {
        answers: [
            {
                id: 'gar1b_1',
                value: "",
                descriptionValue: 'Legg inn sum',
                chosen: true
            }
        ]
    },
    dependentOnQuestionCriteria: [
        [
            {
                questionId: "gar1a",
                questionValue: "1"
            }
        ]
    ],
    inputType: "text"
} as QuestionFormType
