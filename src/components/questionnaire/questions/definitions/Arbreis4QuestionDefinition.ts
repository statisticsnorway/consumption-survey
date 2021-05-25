import {QuestionFormType} from "../QuestionFormType";

export const ARBREIS4: QuestionFormType = {
    id: 'arbreis4',
    order: 99,
    questionText: 'Får du [eller noen i din husholdning] dekket utgifter til kollektivtransport mellom hjem og arbeid av arbeidsgiver? ',
    hasAnswered: false,
    answerValue: {
        answers: [
            {
                id: 'arbreis4_1',
                value: "1",
                descriptionValue: 'Ja',
                chosen: false
            },
            {
                id: 'arbreis4_2',
                value: "2",
                descriptionValue: 'Nei',
                chosen: false
            },
        ]
    },
    inputType: "radio"
} as QuestionFormType
