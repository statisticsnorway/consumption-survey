import {QuestionFormType} from "../QuestionFormType";
import {Theme} from "../themes";

export const BILSOLGT1: QuestionFormType = {
    id: 'bilsolgt1',
    theme: Theme.car,
    order: 86.1,
    questionText: 'Hvor mange biler har du/dere solgt/byttet inn?',
    hasAnswered: false,
    answerValue: {
        answers: [
            {
                id: 'bilsolgt1_1',
                value: "",
                descriptionValue: '[1...99]',
                chosen: true
            }
        ]
    },
    dependentOnQuestionCriteria: [
        [
            {
                questionId: "bilsolgt",
                questionValue: "1"
            },
        ],
        [
            {
                questionId: "bilsolgt",
                questionValue: "2"
            },
        ],
        [
            {
                questionId: "bilsolgt",
                questionValue: "3"
            },
        ],
    ],
    inputType: "number",
    inputPostfix: "amount"
} as QuestionFormType
