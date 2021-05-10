import {QuestionFormType} from "../QuestionFormType";

export const TOMTF15: QuestionFormType = {
    id: 'tomtf15',
    order: 62.5,
    questionText: 'Du svarte "Annet" på forrige spørsmål. Spesifiser kort hva Annet var i dette tilfellet',
    hasAnswered: false,
    answerValue: {
        answers: [
            {
                id: 'tomtf15_1',
                value: "",
                descriptionValue: 'Beskriv kort "Annet"',
                chosen: true
            },
        ]
    },
    dependentOnQuestionCriteria: [
        [
            {
                questionId: "tomtf1",
                questionValue: "7",
            }
        ]
    ],
    inputType: "text"
} as QuestionFormType
