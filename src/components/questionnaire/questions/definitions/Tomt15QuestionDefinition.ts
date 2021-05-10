import {QuestionFormType} from "../QuestionFormType";

export const TOMT15: QuestionFormType = {
    id: 'tomt15',
    order: 40.5,
    questionText: 'Du svarte "Annet" på forrige spørsmål. Spesifiser kort hva Annet var i dette tilfellet',
    hasAnswered: false,
    answerValue: {
        answers: [
            {
                id: 'tomt15_1',
                value: "",
                descriptionValue: 'Beskriv kort "Annet"',
                chosen: true
            },
        ]
    },
    dependentOnQuestionCriteria: [
        [
            {
                questionId: "tomt1",
                questionValue: "7",
            }
        ]
    ],
    inputType: "text"
} as QuestionFormType
