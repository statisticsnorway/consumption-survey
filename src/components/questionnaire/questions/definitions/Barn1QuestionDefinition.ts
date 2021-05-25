import {QuestionFormType} from "../QuestionFormType";

export const BARN1: QuestionFormType = {
    id: 'barn1',
    order: 120,
    questionText: 'Inkluderer husholdningen barn under 18 år?',
    hasAnswered: false,
    answerValue: {
        answers: [
            {
                id: 'barn1_1',
                value: "1",
                descriptionValue: 'Ja',
                chosen: false
            },
            {
                id: 'barn1_2',
                value: "2",
                descriptionValue: 'Nei',
                chosen: false
            }
        ]
    },
    inputType: "radio"
} as QuestionFormType
