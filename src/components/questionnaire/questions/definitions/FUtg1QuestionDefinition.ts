import {QuestionFormType} from "../QuestionFormType";
import {Theme} from "../themes";

export const FUTG1: QuestionFormType = {
    id: 'futg1',
    theme: Theme.rentDwelling,
    order: 20,
    questionText: 'Betaler dere [du/dere] fellesutgifter til borettslag eller sameie?',
    hasAnswered: false,
    answerValue: {
        answers: [
            {
                id: 'futg1_1',
                value: "1",
                descriptionValue: 'Ja',
                chosen: false
            },
            {
                id: 'futg1_2',
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
                questionValue: "1"
            },
        ],
    ],
    defaultNextQuestion: "futg2",
    inputType: "radio"
} as QuestionFormType
