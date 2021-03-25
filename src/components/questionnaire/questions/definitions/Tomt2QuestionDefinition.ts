import {QuestionFormType} from "../QuestionFormType";

export const TOMT2: QuestionFormType = {
    id: 'tomt2',
    order: 41,
    questionText: 'Hvor store utgifter hadde du/dere til [avkrysset tiltak]?',
    hasAnswered: false,
    answerValue: {
        answers: [
            {
                id: 'tomt2_1',
                value: "",
                descriptionValue: 'Til håndtverker',
                chosen: true
            },
            {
                id: 'tomt2_2',
                value: "",
                descriptionValue: 'Til materialer',
                chosen: true
            },
        ]
    },
    defaultNextQuestion: "elutg1",
    inputType: "multifield-text"
} as QuestionFormType
