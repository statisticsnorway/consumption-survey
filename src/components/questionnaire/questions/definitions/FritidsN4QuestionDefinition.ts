import {QuestionFormType} from "../QuestionFormType";
import {Theme} from "../themes";

export const FRITIDSN4: QuestionFormType = {
    id: 'fritidsn4',
    theme: Theme.holidayHome,
    order: 57,
    questionText: 'Hvor store utgifter har du/dere hatt i løpet av de siste 12 mnd til…',
    hasAnswered: false,
    answerValue: {
        answers: [
            {
                id: 'fritidsn4_1',
                value: "",
                descriptionValue: 'Festeavgift',
                chosen: true
            },
            {
                id: 'fritidsn4_2',
                value: "",
                descriptionValue: 'Kommunale avgifter',
                chosen: true
            },

        ]
    },
    dependentOnQuestionCriteria: [
        [
            {
                questionId: 'fritidsn3',
                questionValue: '1',
            }
        ],
        [
            {
                questionId: 'fritidsn3',
                questionValue: '2',
            }
        ],
    ],
    inputType: "multifield-number-dependent",
    inputPostfix: "cash"
} as QuestionFormType
