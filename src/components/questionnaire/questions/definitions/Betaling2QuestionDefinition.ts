import {QuestionFormType} from "../QuestionFormType";
import {Theme} from "../themes";

export const BETALING2: QuestionFormType = {
    id: 'betaling2',
    theme: Theme.paymentOptions,
    order: 127,
    questionText: 'Hvor ofte betaler husholdningen med disse betalingsmåtene?',
    subText: 'Gi et anslag i prosent',
    hasAnswered: false,
    answerValue: {
        answers: [
            {
                id: 'betaling2_1',
                value: "",
                descriptionValue: 'Debetkort hvor man drar/tæpper kortet i terminal',
                chosen: true
            },
            {
                id: 'betaling2_2',
                value: "",
                descriptionValue: 'Kredittkort, f. eks. MasterCard, American Express eller Trumf visa hvor man drar/tæpper kortet i terminal',
                chosen: true
            },
            {
                id: 'betaling2_3',
                value: "",
                descriptionValue: 'Kontanter',
                chosen: true
            },
            {
                id: 'betaling2_4',
                value: "",
                descriptionValue: 'Mobilbetaling, f. eks. Apple Pay, Google Pay, Coopay eller lignende',
                chosen: true
            },
            {
                id: 'betaling2_5',
                value: "",
                descriptionValue: 'Smartklokke',
                chosen: true
            },
            {
                id: 'betaling2_6',
                value: "",
                descriptionValue: 'Annet',
                chosen: true
            },

        ]
    },
    dependentOnQuestionCriteria: [
        [
            {
                questionId: "betaling1",
                questionValue: "1"
            }
        ],
        [
            {
                questionId: "betaling1",
                questionValue: "2"
            }
        ],
        [
            {
                questionId: "betaling1",
                questionValue: "3"
            }
        ],
        [
            {
                questionId: "betaling1",
                questionValue: "4"
            }
        ],
        [
            {
                questionId: "betaling1",
                questionValue: "5"
            }
        ],
        [
            {
                questionId: "betaling1",
                questionValue: "6"
            }
        ],
    ],
    inputType: "multifield-number-dependent",
    inputPostfix: "percent"
} as QuestionFormType
