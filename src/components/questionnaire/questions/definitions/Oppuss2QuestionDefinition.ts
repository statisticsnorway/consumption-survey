import {QuestionFormType} from "../QuestionFormType";

export const OPPUSS2: QuestionFormType = {
    id: 'oppuss2',
    order: 39,
    questionText: 'Hvor store utgifter hadde du/dere til [avkrysset tiltak]?',
    hasAnswered: false,
    answerValue: {
        answers: [
            {
                id: 'oppuss1_1',
                value: "",
                descriptionValue: 'Til håndtverker',
                chosen: true
            },
            {
                id: 'oppuss1_2',
                value: "",
                descriptionValue: 'Til matrialer ..',
                chosen: true
            },
        ]
    },
    defaultNextQuestion: "oppuss2",
    inputType: "multifield-text-with-sum"
} as QuestionFormType
