import {QuestionFormType} from "../QuestionFormType";
import {Theme} from "../themes";

export const BILEIEC: QuestionFormType = {
    id: 'bileiec',
    theme: Theme.car,
    order: 83,
    questionText: 'Hvor mange biler eier du/dere',
    hasAnswered: false,
    answerValue: {
        answers: [
            {
                id: 'bileieb_1',
                value: "1",
                descriptionValue: 'Antall',
                chosen: false
            },
        ]
    },
    inputType: "number",
    inputPostfix: "amount"
} as QuestionFormType
