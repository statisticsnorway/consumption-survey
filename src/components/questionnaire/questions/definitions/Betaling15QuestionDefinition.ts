import {QuestionFormType} from "../QuestionFormType";
import {Theme} from "../themes";

export const BETALING15: QuestionFormType = {
    id: 'betaling15',
    order: 126.5,
    theme: Theme.paymentOptions,
    questionText: 'Du svarte "Annet" på forrige spørsmål. Spesifiser kort hva Annet var i dette tilfellet',
    hasAnswered: false,
    answerValue: {
        answers: [
            {
                id: 'betaling15_1',
                value: "",
                descriptionValue: 'Beskriv kort "Annet"',
                chosen: true
            },
        ]
    },
    dependentOnQuestionCriteria: [
        [
            {
                questionId: "betaling1",
                questionValue: "6",
            }
        ]
    ],
    inputType: "text"
} as QuestionFormType
