import {QuestionFormType} from "../QuestionFormType";
import {Theme} from "../themes";

export const REISER2: QuestionFormType = {
    id: 'reiser2',
    theme: Theme.firewood,
    order: 93,
    questionText: 'Hvor mye betalte du/dere for reisene?',
    hasAnswered: false,
    answerValue: {
        answers: [
            {
                id: 'reiser2_1',
                value: "",
                descriptionValue: 'Fly innenlands',
                chosen: true
            },
            {
                id: 'reiser2_2',
                value: "",
                descriptionValue: 'Fly utenlands',
                chosen: true
            },
            {
                id: 'reiser2_3',
                value: "",
                descriptionValue: 'Båt (ferge, hurtigruta ol)',
                chosen: true
            },
            {
                id: 'reiser2_4',
                value: "",
                descriptionValue: 'Tog',
                chosen: true
            },
            {
                id: 'reiser2_5',
                value: "",
                descriptionValue: 'Buss',
                chosen: true
            },
        ]
    },
    dependentOnQuestionCriteria: [
        [
            {
                questionId: "reiser1",
                questionValue: "1"
            }
        ],
        [
            {
                questionId: "reiser1",
                questionValue: "2"
            }
        ],
        [
            {
                questionId: "reiser1",
                questionValue: "3"
            }
        ],
        [
            {
                questionId: "reiser1",
                questionValue: "4"
            }
        ],
        [
            {
                questionId: "reiser1",
                questionValue: "5"
            }
        ],
    ],
    inputType: "multifield-number-dependent",
    inputPostfix: "cash"
} as QuestionFormType