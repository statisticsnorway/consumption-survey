import {QuestionFormType} from "../QuestionFormType";

export const TILSYN1: QuestionFormType = {
    id: 'tilsyn1',
    order: 120,
    questionText: 'Du/dere har tidligere oppgitt at det bor xx barn under 11 år i husholdningen. Vi har nå noen spørsmål om utgifter til tilsyn av [barnet/barna].\n' +
        '\n' +
        'Har [barnet/noen av barna] regelmessig tilsyn av andre enn foreldre eller foresatte?',
    hasAnswered: false,
    answerValue: {
        answers: [
            {
                id: 'tilsyn1_1',
                value: "1",
                descriptionValue: 'Ja',
                chosen: false
            },
            {
                id: 'tilsyn1_2',
                value: "2",
                descriptionValue: 'Nei',
                chosen: false
            }
        ]
    },
    inputType: "radio"
} as QuestionFormType
