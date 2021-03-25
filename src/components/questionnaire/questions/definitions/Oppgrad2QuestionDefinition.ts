import {QuestionFormType} from "../QuestionFormType";

export const OPPGRAD2: QuestionFormType = {
    id: 'oppgrad2',
    order: 37,
    questionText: 'Hvor store utgifter hadde du/dere til disse.....',
    hasAnswered: false,
    answerValue: {
        answers: [
            {
                id: 'oppgrad1_1',
                value: "",
                descriptionValue: 'Til håndtverker',
                chosen: true
            },
            {
                id: 'oppgrad1_2',
                value: "",
                descriptionValue: 'Til matrialer',
                chosen: true
            }
        ]
    },
    defaultNextQuestion: "oppuss1",
    inputType: "multifield-text"
} as QuestionFormType
