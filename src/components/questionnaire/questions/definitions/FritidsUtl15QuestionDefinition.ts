import {QuestionFormType} from "../QuestionFormType";

export const FRITIDSUTL15: QuestionFormType = {
    id: 'fritidsutl15',
    order: 71.5,
    questionText: 'Du svarte "Andre utgifter" på forrige spørsmål. Spesifiser kort hva Andre utgifter var i dette tilfellet',
    hasAnswered: false,
    answerValue: {
        answers: [
            {
                id: 'fritidsutl15_1',
                value: "",
                descriptionValue: 'Beskriv kort "Andre utgifter"',
                chosen: true
            },
        ]
    },
    dependentOnQuestionCriteria: [
        [
            {
                questionId: "fritidsutl2",
                questionValue: "7",
            }
        ]
    ],
    inputType: "text"
} as QuestionFormType
