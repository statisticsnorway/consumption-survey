import {QuestionFormType} from "../QuestionFormType";

export const HUSLEIE1A: QuestionFormType = {
    id: 'husleie1a',
    order: 16,
    questionText: 'Betaler [du/dere] vanlig markedsleie',
    hasAnswered: false,
    answerValue: {
        answers: [
            {
                id: 'husleie1a_1',
                value: "1",
                descriptionValue: 'Ja',
                chosen: false
            },
            {
                id: 'husleie1a_2',
                value: "2",
                descriptionValue: 'Nei',
                chosen: false
            }
        ]
    },
    dependentOnQuestionCriteria: [
        [
            {
                questionId: "eier1",
                questionValue: "2"
            },
            {
                questionId: "husleie1",
                questionValue: "1"
            },
        ]
    ],
    defaultNextQuestion: "husleie1b",
    inputType: "radio"
} as QuestionFormType
