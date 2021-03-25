import {QuestionFormType} from "../QuestionFormType";

export const LAAN1: QuestionFormType = {
    id: 'laan1',
    order: 7,
    questionText: 'Har [du/dere] boliglån og / eller andre lån med sikkerhet i boligen nå?',
    hasAnswered: false,
    answerValue: {
        answers: [
            {
                id: 'laan1_1',
                value: "1",
                descriptionValue: 'Ja',
                chosen: false
            },
            {
                id: 'laan1_2',
                value: "2",
                descriptionValue: 'Nei',
                chosen: false
            }
        ]
    },
    helperText: {
        title: "Lån",
        content: "Regn med alle lån med sikkerhet i boligen du bor i. Regn ikke med fellesgjeld."
    },
    inputType: "radio"
} as QuestionFormType
