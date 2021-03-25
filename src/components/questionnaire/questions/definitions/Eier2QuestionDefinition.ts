import {QuestionFormType} from "../QuestionFormType";

export const EIER2: QuestionFormType = {
    id: 'eier2',
    order: 6,
    questionText: 'Eier [du/dere] som selveier eller gjennom borettslag?',
    hasAnswered: false,
    answerValue: {
        answers: [
            {
                id: 'eier2_1',
                value: "1",
                descriptionValue: 'Selveier',
                chosen: false
            },
            {
                id: 'eier2_2',
                value: "2",
                descriptionValue: 'Gjennom borettslag, boligaksjeselskap e.l.',
                chosen: false
            }
        ]
    },
    dependentOnQuestionCriteria: [
        [
            {
                questionId: "eier1",
                questionValue: "1"
            }
        ]
    ],
    defaultNextQuestion: "laan1",
    inputType: "radio"
} as QuestionFormType
