import {QuestionFormType} from "../QuestionFormType";
import {Theme} from "../themes";

export const OPPUSS15: QuestionFormType = {
    id: 'oppuss15',
    order: 38.5,
    theme: Theme.renovationDwelling,
    questionText: 'Du svarte "Annen oppussing eller vedlikehold av huset?" på forrige spørsmål. Spesifiser kort hva Annen var i dette tilfellet',
    hasAnswered: false,
    answerValue: {
        answers: [
            {
                id: 'oppgradf15_1',
                value: "",
                descriptionValue: 'Beskriv kort "Annen"',
                chosen: true
            },
        ]
    },
    dependentOnQuestionCriteria: [
        [
            {
                questionId: "oppuss1",
                questionValue: "8",
            }
        ]
    ],
    inputType: "text"
} as QuestionFormType
