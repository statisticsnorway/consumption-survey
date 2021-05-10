import {QuestionFormType} from "../QuestionFormType";

export const VARIGUNDERH15: QuestionFormType = {
    id: 'varigunderh15',
    order: 115.5,
    questionText: 'Du svarte "Andre større eller kostbare elektriske artikler og underholdningsartikler\'" på forrige spørsmål. Spesifiser kort hva Andre var i dette tilfellet',
    hasAnswered: false,
    answerValue: {
        answers: [
            {
                id: 'varigmøbler15_1',
                value: "",
                descriptionValue: 'Beskriv kort "Andre større eller kostbare elektriske artikler og underholdningsartikler"',
                chosen: true
            },
        ]
    },
    dependentOnQuestionCriteria: [
        [
            {
                questionId: "varigunderh1",
                questionValue: "9",
            }
        ]
    ],
    inputType: "text"
} as QuestionFormType
