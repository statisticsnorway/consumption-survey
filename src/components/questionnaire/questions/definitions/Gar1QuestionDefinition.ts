import {QuestionFormType} from "../QuestionFormType";

export const GAR1: QuestionFormType = {
    id: 'gar1',
    order: 33,
    questionText: 'Eier eller leier du/dere tilgang til garasje, carport eller biloppstillingsplass?',
    hasAnswered: false,
    answerValue: {
        answers: [
            {
                id: 'gar1_1',
                value: "1",
                descriptionValue: 'Eier',
                chosen: false
            },
            {
                id: 'gar1_2',
                value: "2",
                descriptionValue: 'Leier',
                chosen: false
            },
            {
                id: 'gar1_3',
                value: "3",
                descriptionValue: 'Nei',
                chosen: false
            }
        ]
    },
    defaultNextQuestion: "gar1a",
    inputType: "radio"
} as QuestionFormType
