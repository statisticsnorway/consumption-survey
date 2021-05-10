import {QuestionFormType} from "../QuestionFormType";
import {Theme} from "../themes";

export const LUTG1: QuestionFormType = {
    id: 'lutg1',
    theme: Theme.mortgage,
    order: 9,
    questionText: 'Hvor mye betaler [du/dere] for dette lånet per måned?',
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
    dependentOnQuestionCriteria: [
        [
            {
                questionId: "laan1",
                questionValue: "1"
            }
        ]
    ],
    inputType: "number",
    inputPostfix: "cash"
} as QuestionFormType
