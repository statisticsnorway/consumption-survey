import {QuestionFormType} from "../QuestionFormType";
import {Theme} from "../themes";

export const BILNYBRUKT: QuestionFormType = {
    id: 'bilnybrukt',
    theme: Theme.car,
    order: -100, // Not used
    questionText: 'Kjøpte eller mottok du/dere bilen ny eller brukt?',
    hasAnswered: false,
    answerValue: {
        answers: [
            {
                id: 'bilnybrukt_1',
                value: "1",
                descriptionValue: 'Ny',
                chosen: false
            },
            {
                id: 'bilnybrukt_2',
                value: "2",
                descriptionValue: 'Brukt',
                chosen: false
            },
        ]
    },
    inputType: "radio"
} as QuestionFormType
