import {QuestionFormType} from "../QuestionFormType";
import {Theme} from "../themes";

export const FYRUTG15: QuestionFormType = {
    id: 'fyrutg15',
    order: 42.5,
    theme: Theme.powerDwelling,
    questionText: 'Du svarte "Annet" på forrige spørsmål. Spesifiser kort hva Annet var i dette tilfellet',
    hasAnswered: false,
    answerValue: {
        answers: [
            {
                id: 'fyrutg15_1',
                value: "",
                descriptionValue: 'Beskriv kort "Annet"',
                chosen: true
            },
        ]
    },
    dependentOnQuestionCriteria: [
        [
            {
                questionId: "fyrutg1",
                questionValue: "9",
            }
        ]
    ],
    inputType: "text"
} as QuestionFormType
