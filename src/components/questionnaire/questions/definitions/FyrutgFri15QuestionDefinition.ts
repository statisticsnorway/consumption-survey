import {QuestionFormType} from "../QuestionFormType";

export const FYRUTGFRI15: QuestionFormType = {
    id: 'fyrutgfri15',
    order: 66.5,
    questionText: 'Du svarte "Annet" på forrige spørsmål. Spesifiser kort hva Annet var i dette tilfellet',
    hasAnswered: false,
    answerValue: {
        answers: [
            {
                id: 'fyrutgfri15_1',
                value: "",
                descriptionValue: 'Beskriv kort "Annet"',
                chosen: true
            },
        ]
    },
    dependentOnQuestionCriteria: [
        [
            {
                questionId: "fyrutgfri1",
                questionValue: "9",
            }
        ]
    ],
    inputType: "text"
} as QuestionFormType
