import {QuestionFormType} from "../QuestionFormType";

export const UTDANNING15: QuestionFormType = {
    id: 'utdanning15',
    order: 1.2,
    questionText: 'Du svarte "Annen utdanning" på forrige spørsmål. Spesifiser kort hva Annen var i dette tilfellet',
    hasAnswered: false,
    answerValue: {
        answers: [
            {
                id: 'utdanning15_1',
                value: "",
                descriptionValue: 'Beskriv kort "Annen utdanning"',
                chosen: true
            },
        ]
    },
    dependentOnQuestionCriteria: [
        [
            {
                questionId: "utdanning1",
                questionValue: "5",
            }
        ]
    ],
    inputType: "text"
} as QuestionFormType
