import {QuestionFormType} from "../QuestionFormType";

export const BOLIGFORSFRI1: QuestionFormType = {
    id: 'boligforsfri1',
    order: 64,
    questionText: 'Hvor mye har du/dere betalt de siste 12 månedene i boligforsikringspremie for fritidsboligen?',
    hasAnswered: false,
    answerValue: {
        answers: [
            {
                id: 'boligforsfri1_1',
                value: "",
                descriptionValue: 'Sum',
                chosen: true
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
                questionId: "1",
                questionValue: "2"
            },
        ]
    ],
    inputType: "text"
} as QuestionFormType

// 1. Sum
// 2. Kan ikke skille boligforsikring fra innboforsikring