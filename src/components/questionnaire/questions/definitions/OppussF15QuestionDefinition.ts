import {QuestionFormType} from "../QuestionFormType";

export const OPPUSSF15: QuestionFormType = {
    id: 'oppussf15',
    order: 60.5,
    questionText: 'Du svarte "Annet" på forrige spørsmål. Spesifiser kort hva Annet var i dette tilfellet',
    hasAnswered: false,
    answerValue: {
        answers: [
            {
                id: 'oppussf15_1',
                value: "",
                descriptionValue: 'Beskriv kort "Annet"',
                chosen: true
            },
        ]
    },
    dependentOnQuestionCriteria: [
        [
            {
                questionId: "oppussf1",
                questionValue: "6",
            }
        ]
    ],
    inputType: "text"
} as QuestionFormType
