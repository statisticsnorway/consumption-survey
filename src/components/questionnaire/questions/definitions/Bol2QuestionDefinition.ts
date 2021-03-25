import {QuestionFormType} from "../QuestionFormType";

export const BOL2: QuestionFormType = {
    id: 'bol2',
    order: 4,
    questionText: 'Omtrent hvor mange kvadratmeter er boligen?',
    hasAnswered: false,
    answerValue: {
        answers: [
            {
                id: 'bol2_1',
                value: "",
                descriptionValue: 'Omtrent hvor mange kvadratmeter er boligen?',
                chosen: true
            }
        ]
    },
    defaultNextQuestion: "eier1",
    inputType: "text"
} as QuestionFormType
