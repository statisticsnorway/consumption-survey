import {QuestionFormType} from "../QuestionFormType";
import {Theme} from "../themes";

export const HUSLEIE1: QuestionFormType = {
    id: 'husleie1',
    theme: Theme.rentDwelling,
    order: 15,
    questionText: 'Betaler [du/dere] husleie',
    hasAnswered: false,
    answerValue: {
        answers: [
            {
                id: 'husleie1_1',
                value: "1",
                descriptionValue: 'Ja',
                chosen: false
            },
            {
                id: 'husleie1_2',
                value: "2",
                descriptionValue: 'Nei',
                chosen: false
            }
        ]
    },
    dependentOnQuestionCriteria: [
        [
            {
                questionId: "eier1",
                questionValue: "2"
            }
        ]
    ],
    inputType: "radio"
} as QuestionFormType
