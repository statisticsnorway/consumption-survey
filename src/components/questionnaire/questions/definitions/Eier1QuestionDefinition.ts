import {QuestionFormType} from "../QuestionFormType";
import {Theme} from "../themes";

export const EIER1: QuestionFormType = {
    id: 'eier1',
    theme: Theme.ownerExpedenaturesEconomy,
    order: 5,
    questionText: 'Eier eller leier du/dere boligen?',
    hasAnswered: false,
    answerValue: {
        answers: [
            {
                id: 'eier1_1',
                value: "1",
                descriptionValue: 'Eier',
                chosen: false
            },
            {
                id: 'eier1_2',
                value: "2",
                descriptionValue: 'Leier eller disponerer på annen måte',
                chosen: false
            }
        ]
    },
    inputType: "radio"
} as QuestionFormType
