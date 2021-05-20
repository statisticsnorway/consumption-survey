import {QuestionFormType} from "../QuestionFormType";
import {Theme} from "../themes";

export const BOL1: QuestionFormType = {
    id: 'bol1',
    theme: Theme.dwelling,
    order: 3,
    questionText: 'Hvor mange rom disponerer [du/husholdningen din] til eget bruk?',
    hasAnswered: false,
    answerValue: {
        answers: [
            {
                id: 'bol1_1',
                value: "",
                descriptionValue: 'Hvor mange rom er det i boligen',
                chosen: true
            }
        ]
    },
    helperText: {
        title: "Info",
        content: "Ta ikke med kjøkken, bad, entre, vaskerom eller små rom under 6 kvadratmeter."
    },
    inputType: "number",
    inputPostfix: "amount"
} as QuestionFormType
