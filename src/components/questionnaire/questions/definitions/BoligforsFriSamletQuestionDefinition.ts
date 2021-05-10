import {QuestionFormType} from "../QuestionFormType";
import {Theme} from "../themes";

export const BOLIGFORSFRISAMLET: QuestionFormType = {
    id: 'boligforsfrisamlet',
    theme: Theme.insuranceHolidayHome,
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
    inputType: "number",
    inputPostfix: "cash"
} as QuestionFormType

// 1. Sum
// 2. Kan ikke skille boligforsikring fra innboforsikring