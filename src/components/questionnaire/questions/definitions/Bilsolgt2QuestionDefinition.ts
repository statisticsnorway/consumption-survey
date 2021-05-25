import {QuestionFormType} from "../QuestionFormType";
import {Theme} from "../themes";

export const BILSOLGT2: QuestionFormType = {
    id: 'bilsolgt2',
    order: 86.2,
    theme: Theme.carPurchase,
    questionText: 'Hva ble bilen/bilene solgt for/verdsatt til ved innbytte?',
    hasAnswered: false,
    answerValue: {
        answers: [
            {
                id: 'bilsolgt2_1',
                value: "",
                descriptionValue: 'Bil-1 sum',
                chosen: true
            },
            {
                id: 'bilsolgt2_2',
                value: "",
                descriptionValue: 'Bil-2 sum',
                chosen: true
            },
            {
                id: 'bilsolgt2_3',
                value: "",
                descriptionValue: 'Bil-3 sum',
                chosen: true
            },
            {
                id: 'bilsolgt2_4',
                value: "",
                descriptionValue: 'Bil-4 sum',
                chosen: true
            },
            {
                id: 'bilsolgt2_5',
                value: "",
                descriptionValue: 'Bil-5 sum',
                chosen: true
            },
            {
                id: 'bilsolgt2_6',
                value: "",
                descriptionValue: 'Bil-6 sum',
                chosen: true
            },
            {
                id: 'bilsolgt2_7',
                value: "",
                descriptionValue: 'Bil-7 sum',
                chosen: true
            },
            {
                id: 'bilsolgt2_8',
                value: "",
                descriptionValue: 'Bil-8 sum',
                chosen: true
            },
            {
                id: 'bilsolgt2_9',
                value: "",
                descriptionValue: 'Bil-9 sum',
                chosen: true
            },
            {
                id: 'bilsolgt2_10',
                value: "",
                descriptionValue: 'Bil-10 sum',
                chosen: true
            },
        ]
    },
    dependentOnQuestionCriteria: [
        [
            {
                questionId: "bilsolgt1",
                questionValue: "0",
                answerId: "bilsolgt1_1",
                specialCompare: "moreThan"
            },
        ]
    ],
    inputType: "multifield-number-siffer-dependent",
    inputPostfix: "cash"
} as QuestionFormType
