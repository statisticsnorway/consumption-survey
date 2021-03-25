import {QuestionFormType} from "../QuestionFormType";

export const HUSLEIE2: QuestionFormType = {
    id: 'husleie2',
    order: 18,
    questionText: 'Hvor mye betaler [du/dere] i fellesutgifter eller husleie pr. måned',
    hasAnswered: false,
    answerValue: {
        answers: [
            {
                id: 'husleie2_1',
                value: "",
                descriptionValue: '1-99.997 Kroner',
                chosen: true
            }
        ]
    },
    defaultNextQuestion: "husleie3",
    dependentOnQuestionCriteria: [
        [
            {
                questionId: "husleie1",
                questionValue: "1"
            }
        ]
    ],
    inputType: "text"
} as QuestionFormType
