import {QuestionFormType} from "../QuestionFormType";

export const HUSLEIE3: QuestionFormType = {
    id: 'husleie3',
    order: 19,
    questionText: 'Er elektrisitet inkludert i husleien?',
    hasAnswered: false,
    answerValue: {
        answers: [
            {
                id: 'husleie3_1',
                value: "1",
                descriptionValue: 'Ja',
                chosen: false
            },
            {
                id: 'husleie3_2',
                value: "2",
                descriptionValue: 'Nei',
                chosen: false
            }
        ]
    },
    defaultNextQuestion: "futg1",
    dependentOnQuestionCriteria: [
        [
            {
                questionId: "eier1",
                questionValue: "2"
            },
            {
                questionId: "husleie1",
                questionValue: "1"
            },
        ]
    ],
    inputType: "radio"
} as QuestionFormType
