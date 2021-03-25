import {QuestionFormType} from "../QuestionFormType";

export const BOFEST1: QuestionFormType = {
    id: 'bofest1',
    order: 13,
    questionText: 'Står boligen på selveiertomt eller festet tomt?',
    hasAnswered: false,
    answerValue: {
        answers: [
            {
                id: 'bofest1_1',
                value: "1",
                descriptionValue: 'Selveiertomt',
                chosen: false
            },
            {
                id: 'bofest1_2',
                value: "2",
                descriptionValue: 'Festet tomt',
                chosen: false
            },
            {
                id: 'bofest1_3',
                value: "3",
                descriptionValue: 'Vet ikke',
                chosen: false
            }
        ]
    },
    defaultNextQuestion: "husleie1",
    alternativeNextQuestionCriteria: [{
        currentQuestionValue: "2",
        nextQuestionId: "bofest1b"
    }],
    inputType: "radio"
} as QuestionFormType

export default BOFEST1;