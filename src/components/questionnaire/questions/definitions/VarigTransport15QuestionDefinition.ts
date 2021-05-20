import {QuestionFormType} from "../QuestionFormType";
import {Theme} from "../themes";

export const VARIGTRANSPORT15: QuestionFormType = {
    id: 'varigtransport15',
    order: 113.5,
    theme: Theme.rarePurchases,
    questionText: 'Du svarte "Andre transportmidler" på forrige spørsmål. Spesifiser kort hva Andre var i dette tilfellet',
    hasAnswered: false,
    answerValue: {
        answers: [
            {
                id: 'varigtransport15_1',
                value: "",
                descriptionValue: 'Beskriv kort "Andre transportmidler"',
                chosen: true
            },
        ]
    },
    dependentOnQuestionCriteria: [
        [
            {
                questionId: "varigtransport1",
                questionValue: "6",
            }
        ]
    ],
    inputType: "text"
} as QuestionFormType
