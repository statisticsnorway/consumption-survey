import {QuestionFormType} from "../QuestionFormType";

export const BOLIGFORSFRISAMLET: QuestionFormType = {
    id: 'boligforsfrisamlet',
    order: 65,
    questionText: 'Hvor mye har du/dere betalt samlet for bolig- og innboforsikring for fritidsboligen de siste 12 månedene?',
    hasAnswered: false,
    answerValue: {
        answers: [
            {
                id: 'boligforsfrisamlet_1',
                value: "",
                descriptionValue: 'Sum',
                chosen: true
            }
        ]
    },
    dependentOnQuestionCriteria: [
        [
            {
                questionId: "boligforsfri1",
                questionValue: "2"
            },
        ]
    ],
    inputType: "text"
} as QuestionFormType

// 1. Sum
// 2. Kan ikke skille boligforsikring fra innboforsikring