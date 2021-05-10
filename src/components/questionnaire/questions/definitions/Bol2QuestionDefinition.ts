import {QuestionFormType} from "../QuestionFormType";
import {Theme} from "../themes";

export const BOL2: QuestionFormType = {
    id: 'bol2',
    theme: Theme.dwelling,
    order: 4,
    questionText: 'Omtrent hvor mange kvadratmeter er boligen?',
    hasAnswered: false,
    answerValue: {
        answers: [
            {
                id: 'bol2_1',
                value: "",
                descriptionValue: 'Omtrent hvor mange kvadratmeter er boligen?',
                chosen: true
            }
        ]
    },
    helperText: {
        title: "Info",
        content: "I kjeller og loft skal bare beboelsesrom regnes med."
    },
    defaultNextQuestion: "eier1",
    inputType: "number",
    inputPostfix: "kvm"
} as QuestionFormType
