import {QuestionFormType} from "../QuestionFormType";

export const FUTG1: QuestionFormType = {
    id: 'futg1',
    order: 20,
    questionText: 'Har [du/dere] fellesutgifter gjennom sameie eller lignende?',
    hasAnswered: false,
    answerValue: {
        answers: [
            {
                id: 'futg1_1',
                value: "1",
                descriptionValue: 'Ja',
                chosen: false
            },
            {
                id: 'futg1_2',
                value: "2",
                descriptionValue: 'Nei',
                chosen: false
            }
        ]
    },
    dependentOnQuestionCriteria: [
        [
            {
                questionId: "eier2",
                questionValue: "1"
            }
        ]
    ],
    defaultNextQuestion: "futg2",
    inputType: "radio"
} as QuestionFormType
