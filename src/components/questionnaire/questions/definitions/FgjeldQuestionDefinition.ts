import {QuestionFormType} from "../QuestionFormType";

export const FGJELD: QuestionFormType = {
    id: 'fgjeld',
    order: 22.5,
    questionText: 'Hva er den samlede fellesgjelden på din/deres bolig?',
    hasAnswered: false,
    answerValue: {
        answers: [
            {
                id: 'fgjeld_1',
                value: "",
                descriptionValue: 'Beløp',
                chosen: true
            },
            {
                id: 'fgjeld_2',
                value: "2",
                descriptionValue: 'Har ikke fellesgjeld',
                chosen: false
            },
            {
                id: 'fgjeld_3',
                value: "3",
                descriptionValue: 'Vet ikke',
                chosen: false,
                hidden: true
            }
        ]
    },
    dependentOnQuestionCriteria: [
        [
            {
                questionId: "eier1",
                questionValue: "1"
            },
            {
                questionId: "futg1",
                questionValue: "1"
            }
        ]
    ],
    inputType: "number-checkbox",
    inputPostfix: "cash"
} as QuestionFormType

// KOM IKKE VET IKKE.