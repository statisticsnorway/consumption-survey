import {QuestionFormType} from "../QuestionFormType";
import {Theme} from "../themes";

export const FESTFRITID: QuestionFormType = {
    id: 'festfritid',
    theme: Theme.holidayHome,
    order: 55,
    questionText: 'Festavgift',
    hasAnswered: false,
    answerValue: {
        answers: [
            {
                id: 'festfritid_1',
                value: "",
                descriptionValue: 'Beløp',
                chosen: true
            }
        ]
    },
    defaultNextQuestion: "komavg",
    inputType: "number",
    inputPostfix: "cash"
} as QuestionFormType
