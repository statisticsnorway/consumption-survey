import {QuestionFormType} from "../QuestionFormType";

export const EIER1: QuestionFormType = {
    id: 'eier1',
    order: 5,
    questionText: 'Eier eller leier du/dere boligen?',
    hasAnswered: false,
    answerValue: {
        answers: [
            {
                id: 'eier1_1',
                value: "1",
                descriptionValue: 'Eier(Selv- / andelseier)',
                chosen: false
            },
            {
                id: 'eier1_2',
                value: "2",
                descriptionValue: 'Leier eller disponerer på annen måte',
                chosen: false
            }
        ]
    },
    defaultNextQuestion: "laan1",
    alternativeNextQuestionCriteria: [{
        currentQuestionValue: "1",
        nextQuestionId: "eier2"
    }],
    inputType: "radio"
} as QuestionFormType
