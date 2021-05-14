import {QuestionFormType} from "../QuestionFormType";
import {Theme} from "../themes";

export const OPPGRAD15: QuestionFormType = {
    id: 'oppgrad15',
    order: 36.5,
    theme: Theme.renovationDwelling,
    questionText: 'Du svarte "Annet, noter" på forrige spørsmål. Spesifiser kort hva Annet var i dette tilfellet',
    hasAnswered: false,
    answerValue: {
        answers: [
            {
                id: 'oppgrad15_1',
                value: "",
                descriptionValue: 'Beskriv kort "Annet"',
                chosen: true
            },
        ]
    },
    dependentOnQuestionCriteria: [
        [
            {
                questionId: "oppgrad1",
                questionValue: "10",
            }
        ]
    ],
    inputType: "text"
} as QuestionFormType
