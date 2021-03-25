import {QuestionFormType} from "../QuestionFormType";

export const LUTG1: QuestionFormType = {
    id: 'lutg1',
    order: 9,
    questionText: 'Hvor mye betaler [du/dere] samlet i renter og avdrag for dette lånet pr. måned? ',
    hasAnswered: false,
    answerValue: {
        answers: [
            {
                id: 'lutg1_1',
                value: "",
                descriptionValue: '1-1.000.000 Kroner',
                chosen: true
            }
        ]
    },
    defaultNextQuestion: "bofest1",
    alternativeNextQuestionCriteria: [{
        currentQuestionValue: "2",
        nextQuestionId: "lret2"
    }],
    inputType: "text"
} as QuestionFormType
