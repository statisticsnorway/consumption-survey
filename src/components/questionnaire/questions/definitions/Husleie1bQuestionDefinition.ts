import {QuestionFormType} from "../QuestionFormType";

export const HUSLEIE1B: QuestionFormType = {
    id: 'husleie1b',
    order: 17,
    questionText: 'Har du redusert leie fordi du leier av ...',
    hasAnswered: false,
    answerValue: {
        answers: [
            {
                id: 'husleie1b_1',
                value: "1",
                descriptionValue: 'kommunen, eller får dekket husleie av det offentlige ',
                chosen: false
            },
            {
                id: 'husleie1b_2',
                value: "2",
                descriptionValue: 'arbeidsgiver',
                chosen: false
            },
            {
                id: 'husleie1b_3',
                value: "3",
                descriptionValue: 'venner eller familie',
                chosen: false
            },
            {
                id: 'husleie1b_r',
                value: "4",
                descriptionValue: 'eller, av andre grunner?',
                chosen: false
            }
        ]
    },
    defaultNextQuestion: "husleie3",
    alternativeNextQuestionCriteria: [{
        currentQuestionValue: "4",
        nextQuestionId: "husleie2",
        nextQuestionDependencies: [
            {
                questionId: "husleie1",
                questionValue: "1"
            },
        ]
    }],
    dependentOnQuestionCriteria: [
        [
            {
                questionId: "husleie1a",
                questionValue: "2"
            }
        ]
    ],
    inputType: "radio"
} as QuestionFormType
