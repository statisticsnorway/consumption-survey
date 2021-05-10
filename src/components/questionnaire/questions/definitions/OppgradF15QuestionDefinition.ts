import {QuestionFormType} from "../QuestionFormType";

export const OPPGRADF15: QuestionFormType = {
    id: 'oppgradf15',
    order: 58.5,
    questionText: 'Du svarte "Annet" på forrige spørsmål. Spesifiser kort hva Annet var i dette tilfellet',
    hasAnswered: false,
    answerValue: {
        answers: [
            {
                id: 'oppgradf15_1',
                value: "",
                descriptionValue: 'Beskriv kort "Annet"',
                chosen: true
            },
        ]
    },
    dependentOnQuestionCriteria: [
        [
            {
                questionId: "oppgradf1",
                questionValue: "9",
            }
        ]
    ],
    inputType: "text"
} as QuestionFormType
