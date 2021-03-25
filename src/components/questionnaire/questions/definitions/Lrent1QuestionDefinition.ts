import {QuestionFormType} from "../QuestionFormType";

export const LRENT1: QuestionFormType = {
    id: 'lrent1',
    order: 11,
    questionText: 'Hvor mye av dette er renter',
    hasAnswered: false,
    answerValue: {
        answers: [
            {
                id: 'lrent1_1',
                value: "",
                descriptionValue: '1-1.000.000',
                chosen: true
            }
        ]
    },
    defaultNextQuestion: "husleie1",
    inputType: "text"
} as QuestionFormType
