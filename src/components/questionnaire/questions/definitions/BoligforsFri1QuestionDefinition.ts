import {QuestionFormType} from "../QuestionFormType";
import {Theme} from "../themes";

export const BOLIGFORSFRI1: QuestionFormType = {
    id: 'boligforsfri1',
    theme: Theme.insuranceHolidayHome,
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
                questionId: "fritidsn1",
                questionValue: "1"
            },
            {
                questionId: "fritidsn1",
                questionValue: "2"
            },
        ]
    ],
    inputType: "number",
    inputPostfix: "cash"
} as QuestionFormType

// 1. Sum
// 2. Kan ikke skille boligforsikring fra innboforsikring