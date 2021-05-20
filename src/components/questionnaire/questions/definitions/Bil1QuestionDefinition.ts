import {QuestionFormType} from "../QuestionFormType";
import {Theme} from "../themes";

export const BIL1: QuestionFormType = {
    id: 'bil1',
    order: 82,
    theme: Theme.carPurchase,
    questionText: 'Har du/dere kjøpt eller fått bil de siste 12 månedene? Ta ikke med biler som brukes som firmabil eller tjenestebil som disponeres til privat bruk',
    hasAnswered: false,
    answerValue: {
        answers: [
            {
                id: 'bil1_1',
                value: "1",
                descriptionValue: 'Ja',
                chosen: false
            },
            {
                id: 'bil1_2',
                value: "2",
                descriptionValue: 'Nei',
                chosen: false
            },
        ]
    },
    inputType: "radio"
} as QuestionFormType
