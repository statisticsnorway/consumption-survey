import {QuestionFormType} from "../QuestionFormType";
import {Theme} from "../themes";

export const KOMMAVGFRITID: QuestionFormType = {
    id: 'kommavgfritid',
    theme: Theme.holidayHome,
    order: 56, /*56*/
    questionText: 'Kommunale avgifter',
    hasAnswered: false,
    answerValue: {
        answers: [
            {
                id: 'kommavgfritid_1',
                value: "",
                descriptionValue: 'Beløp',
                chosen: true
            },
            {
                id: 'kommavgfritid_2',
                value: "2",
                descriptionValue: 'Har ikke denne utgiften',
                chosen: false
            }
        ]
    },
    inputType: "number-checkbox",
    inputPostfix: "cash"
} as QuestionFormType
