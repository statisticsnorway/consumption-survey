import {QuestionFormType} from "../QuestionFormType";
import {Theme} from "../themes";

export const VED315: QuestionFormType = {
    id: 'ved315',
    theme: Theme.firewood,
    order: 79.1,
    questionText: 'Spesifiser antall innenfor hver kategori',
    hasAnswered: false,
    answerValue: {
        answers: [
            {
                id: 'ved3_1',
                value: "",
                descriptionValue: 'Små sekker opptil 40 liter',
                chosen: false
            },
            {
                id: 'ved3_2',
                value: "",
                descriptionValue: 'Små sekker opptil 60 liter',
                chosen: false
            },
            {
                id: 'ved3_3',
                value: "",
                descriptionValue: 'Store sekker opptil 1000 liter',
                chosen: false
            },
            {
                id: 'ved3_4',
                value: "",
                descriptionValue: 'Sekker, store ca 1500 liter',
                chosen: false
            },
            {
                id: 'ved3_5',
                value: "",
                descriptionValue: 'Kubikk',
                chosen: false
            },
        ]
    },
    dependentOnQuestionCriteria: [
        [
            {
                questionId: "ved3",
                questionValue: "1"
            }
        ],
        [
            {
                questionId: "ved3",
                questionValue: "2"
            }
        ],
        [
            {
                questionId: "ved3",
                questionValue: "3"
            }
        ],
        [
            {
                questionId: "ved3",
                questionValue: "4"
            }
        ],

        [
            {
                questionId: "ved3",
                questionValue: "5"
            }
        ],
    ],
    inputPostfix: "amount",
    inputType: "multifield-number-dependent",
} as QuestionFormType
