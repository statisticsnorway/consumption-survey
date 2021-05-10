import {QuestionFormType} from "../QuestionFormType";

export const VARIGMØBLER15: QuestionFormType = {
    id: 'varigmøbler15',
    order: 111.5,
    questionText: 'Du svarte "Andre større møbler/inventar" på forrige spørsmål. Spesifiser kort hva Andre var i dette tilfellet',
    hasAnswered: false,
    answerValue: {
        answers: [
            {
                id: 'varigmøbler15_1',
                value: "",
                descriptionValue: 'Beskriv kort "Andre større møbler/inventar"',
                chosen: true
            },
        ]
    },
    dependentOnQuestionCriteria: [
        [
            {
                questionId: "varigmøbler1",
                questionValue: "9",
            }
        ]
    ],
    inputType: "text"
} as QuestionFormType
