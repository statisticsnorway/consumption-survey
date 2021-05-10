import {QuestionFormType} from "../QuestionFormType";
import {Theme} from "../themes";

export const BILEIEB: QuestionFormType = {
    id: 'bileieb',
    theme: Theme.car,
    order: 82,
    questionText: 'Hovr mange biler eier du/dere',
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
