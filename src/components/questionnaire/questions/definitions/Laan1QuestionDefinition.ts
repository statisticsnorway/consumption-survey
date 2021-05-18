import {QuestionFormType} from "../QuestionFormType";
import {Theme} from "../themes";

export const LAAN1: QuestionFormType = {
    id: 'laan1',
    theme: Theme.ownerExpedenaturesEconomy,
    order: 7,
    questionText: 'Har [du/dere] boliglån eller annet lån med sikkerhet i bolig?',
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
    dependentOnQuestionCriteria: [
        [
            {
                questionId: "eier1",
                questionValue: "1"
            }
        ]
    ],
    inputType: "radio"
} as QuestionFormType
