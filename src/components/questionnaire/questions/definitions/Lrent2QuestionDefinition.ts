import {QuestionFormType} from "../QuestionFormType";

export const LRENT2: QuestionFormType = {
    id: 'lrent2',
    order: 12,
    questionText: 'Hva er rentesatsen for boliglånet /lånene med sikkerhet i boligen nå?',
    hasAnswered: false,
    answerValue: {
        answers: [
            {
                id: 'lrent2_1',
                value: "",
                descriptionValue: 'Rentesats for boliglånet',
                chosen: true
            }
        ]
    },
    dependentOnQuestionCriteria: [
        [
            {
                questionId: "laan1",
                questionValue: "1"
            },
            {
                questionId: "lrent1",
                questionValue: "2"
            },
        ]
    ],
    defaultNextQuestion: "husleie1",
    inputType: "text"
} as QuestionFormType
