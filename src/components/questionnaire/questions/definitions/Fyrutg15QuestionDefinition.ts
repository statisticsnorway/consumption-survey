import {QuestionFormType} from "../QuestionFormType";

export const FYRUTG15: QuestionFormType = {
    id: 'fyrutg15',
    order: 42.5,
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
