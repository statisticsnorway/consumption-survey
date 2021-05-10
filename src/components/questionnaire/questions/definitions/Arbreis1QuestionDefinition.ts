import {QuestionFormType} from "../QuestionFormType";

export const ARBREIS1: QuestionFormType = {
    id: 'arbreis1',
    order: 96,
    questionText: 'Får du [eller noen i din husholdning] dekket utgifter til kollektivtransport mellom hjem og arbeid av arbeidsgiver?' +
        'Regn ikke med tjenestereiser.',
    hasAnswered: false,
    answerValue: {
        answers: [
            {
                id: 'arbreis1_1',
                value: "1",
                descriptionValue: 'Ja',
                chosen: false
            },
            {
                id: 'arbreis1_2',
                value: "2",
                descriptionValue: 'Nei',
                chosen: false
            },
        ]
    },
    inputType: "radio"
} as QuestionFormType
