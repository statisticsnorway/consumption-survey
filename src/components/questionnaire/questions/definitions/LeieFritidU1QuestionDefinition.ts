import {QuestionFormType} from "../QuestionFormType";
import {Theme} from "../themes";

export const LEIEFRITIDU1: QuestionFormType = {
    id: 'leiefritidu1',
    theme: Theme.holidayHomeAbroad,
    order: 74,
    questionText: 'Har du/dere leid fritidsbolig på langtidsleie i utlandet, de siste 12 månedene? Med langtidsleie menes mer enn tre måneder',
    hasAnswered: false,
    answerValue: {
        answers: [
            {
                id: 'leiefritidu1_1',
                value: "1",
                descriptionValue: 'Ja',
                chosen: false
            },
            {
                id: 'leiefritidu1_2',
                value: "2",
                descriptionValue: 'Nei',
                chosen: false
            },
        ]
    },
    inputType: "radio"
} as QuestionFormType
