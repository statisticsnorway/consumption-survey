import {QuestionFormType} from "../QuestionFormType";
import {Theme} from "../themes";

export const BILEIE: QuestionFormType = {
    id: 'bileie',
    theme: Theme.car,
    order: 81,
    questionText: 'Eier du/dere privat bil',
    hasAnswered: false,
    answerValue: {
        answers: [
            {
                id: 'bileie_1',
                value: "1",
                descriptionValue: 'Ja',
                chosen: false
            },
            {
                id: 'bileie_2',
                value: "2",
                descriptionValue: 'Nei',
                chosen: false
            },
        ]
    },
    inputType: "radio"
} as QuestionFormType
