import {QuestionFormType} from "../QuestionFormType";

export const VARIGFRITID15: QuestionFormType = {
    id: 'varigfritid15',
    order: 117.5,
    questionText: 'Du svarte "Annet kostbart fritidsutstyr" på forrige spørsmål. Spesifiser kort hva Annet var i dette tilfellet',
    hasAnswered: false,
    answerValue: {
        answers: [
            {
                id: 'varigfritid15_1',
                value: "",
                descriptionValue: 'Beskriv kort "Annet"',
                chosen: true
            },
        ]
    },
    dependentOnQuestionCriteria: [
        [
            {
                questionId: "varigfritid1",
                questionValue: "5",
            }
        ]
    ],
    inputType: "text"
} as QuestionFormType
