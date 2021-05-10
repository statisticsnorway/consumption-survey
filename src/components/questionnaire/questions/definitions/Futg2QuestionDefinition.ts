import {QuestionFormType} from "../QuestionFormType";
import {Theme} from "../themes";

export const FUTG2: QuestionFormType = {
    id: 'futg2',
    theme: Theme.rentDwelling,
    order: 21,
    questionText: 'Betaler dere [du/dere] fellesutgifter til borettslag eller sameie?',
    hasAnswered: false,
    answerValue: {
        answers: [
            {
                id: 'futg2_1',
                value: "Måned",
                descriptionValue: 'Velg period mnd/kvartal/år',
                chosen: false
            },
            {
                id: 'futg2_2',
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
    inputType: "number-optional-timeperiod",
    inputPostfix: "cash"
} as QuestionFormType
