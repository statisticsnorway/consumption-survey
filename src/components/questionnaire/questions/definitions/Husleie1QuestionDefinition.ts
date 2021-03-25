import {QuestionFormType} from "../QuestionFormType";

export const HUSLEIE1: QuestionFormType = {
    id: 'husleie1',
    order: 15,
    questionText: 'Betaler [du/dere] fellesutgifter eller husleie',
    hasAnswered: false,
    answerValue: {
        answers: [
            {
                id: 'husleie1_1',
                value: "1",
                descriptionValue: 'Ja',
                chosen: false
            },
            {
                id: 'husleie1_2',
                value: "2",
                descriptionValue: 'Nei',
                chosen: false
            }
        ]
    },
    alternativeNextQuestionCriteria: [
        {
            currentQuestionValue: "4",
            nextQuestionId: "husleie1a",
            nextQuestionDependencies: [
                {
                    questionId: "eier1",
                    questionValue: "2"
                },
                {
                    questionId: "husleie1",
                    questionValue: "1"
                }
            ]
        },
        {
            currentQuestionValue: "4",
            nextQuestionId: "futg1",
            nextQuestionDependencies: [
                {
                    questionId: "eier1",
                    questionValue: "1"
                },
                {
                    questionId: "eier2",
                    questionValue: "1"
                }
            ]
        },
    ],
    defaultNextQuestion: "futg1",
    inputType: "radio"
} as QuestionFormType
