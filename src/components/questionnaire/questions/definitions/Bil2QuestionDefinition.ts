import {QuestionFormType} from "../QuestionFormType";
import {Theme} from "../themes";

export const BIL2: QuestionFormType = {
    id: 'bil2',
    order: 83,
    theme: Theme.carPurchase,
    questionText: 'Kjøpte eller fikk du/dere ny eller brukt bil',
    hasAnswered: false,
    answerValue: {
        answers: [
            {
                id: 'bil2_1',
                value: "",
                descriptionValue: 'Ny. Antall',
                chosen: true
            },
            {
                id: 'bil2_2',
                value: "",
                descriptionValue: 'Brukt. Antall',
                chosen: true
            }
        ]
    },
    dependentOnQuestionCriteria: [
        [
            {
                questionId: "bil1",
                questionValue: "1",
            },
        ]
    ],
    inputType: "multifield-number",
    inputPostfix: "amount"
} as QuestionFormType
