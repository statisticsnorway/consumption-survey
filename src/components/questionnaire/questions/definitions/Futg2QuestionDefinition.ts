import {NextQuestionCriteriaTwo, QuestionFormType} from "../QuestionFormType";

export const FUTG2: QuestionFormType = {
    id: 'futg2',
    order: 21,
    questionText: 'Hvor mye betaler [du/dere] pr. mnd/kvartal/år i fellesutgifter?',
    hasAnswered: false,
    answerValue: {
        answers: [
            {
                id: 'futg2_1',
                value: "",
                descriptionValue: '1-1.000.000 Kroner',
                chosen: true
            }
        ]
    },
    dependentOnQuestionCriteria: [
        [
            {
                questionId: "futg1",
                questionValue: "1"
            }
        ]
    ],
    defaultNextQuestion: "futg4",
    alternativeNextQuestionCriteria: [{
        currentQuestionValue: "4",
        nextQuestionId: "futg3",
        nextQuestionDependencies: [
            {
                questionId: "eier2",
                questionValue: "1"
            },
            {
                questionId: "futg1",
                questionValue: "1"
            },
        ]
    }],
    inputType: "text"
} as QuestionFormType
