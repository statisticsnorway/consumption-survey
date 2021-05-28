import {QuestionFormType} from "../QuestionFormType";
import {Theme} from "../themes";

export const FRITIDSN2: QuestionFormType = {
    id: 'fritidsn2',
    theme: Theme.holidayHome,
    order: 63.2,
    questionText: 'Har du/dere leid fritidsbolig på langtidsleie i Norge, de siste 12 månedene? Med langtidsleie menes mer enn tre måneder',
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
