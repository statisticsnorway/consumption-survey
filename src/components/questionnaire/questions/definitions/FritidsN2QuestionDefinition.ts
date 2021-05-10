import {QuestionFormType} from "../QuestionFormType";
import {Theme} from "../themes";

export const FRITIDSN2: QuestionFormType = {
    id: 'fritidsn2',
    theme: Theme.holidayHome,
    order: 49,
    questionText: 'Har du/dere leid fritidsbolig på langtidsleie (mer enn 6 mnd) i Norge, de siste 12 månedene?',
    hasAnswered: false,
    answerValue: {
        answers: [
            {
                id: 'fritidsn2_1',
                value: "1",
                descriptionValue: 'Ja',
                chosen: false
            },
            {
                id: 'fritidsn2_2',
                value: "2",
                descriptionValue: 'Nei',
                chosen: false
            },
        ]
    },
    inputType: "radio"
} as QuestionFormType
