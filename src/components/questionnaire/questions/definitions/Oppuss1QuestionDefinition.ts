import {QuestionFormType} from "../QuestionFormType";
import {Theme} from "../themes";

export const OPPUSS1: QuestionFormType = {
    id: 'oppuss1',
    theme: Theme.renovationDwelling,
    order: 38,
    questionText: 'Har du/dere hatt utgifter til vedlikehold av boligens standard de siste 12 månedene?',
    hasAnswered: false,
    answerValue: {
        answers: [
            {
                id: 'oppuss1_1',
                value: "1",
                descriptionValue: 'Utvendig maling eller annen overflatebehandling',
                chosen: false
            },
            {
                id: 'oppuss1_2',
                value: "2",
                descriptionValue: 'Mindre vedlikehold av kjøkken, bad eller wc? For eksempel ny armatur, servant, maling, lys eller lignende',
                chosen: false
            },
            {
                id: 'oppuss1_3',
                value: "3",
                descriptionValue: 'Oppussing eller vedlikehold av stue? Regn ikke med kjøp av møbler',
                chosen: false
            },
            {
                id: 'oppuss1_4',
                value: "4",
                descriptionValue: 'Oppussing og vedlikehold av soverom',
                chosen: false
            },
            {
                id: 'oppuss1_5',
                value: "5",
                descriptionValue: 'Oppussing og vedlikehold av gang, entré eller lignende',
                chosen: false
            },
            {
                id: 'oppuss1_6',
                value: "6",
                descriptionValue: 'Nye ytterdører eller vinduer',
                chosen: false
            },
            {
                id: 'oppuss1_7',
                value: "7",
                descriptionValue: 'Utvendig maling eller annen overflatebehandling',
                chosen: false
            },
            {
                id: 'oppuss1_8',
                value: "8",
                descriptionValue: 'Annen oppussing eller vedlikehold av huset',
                chosen: false
            },
            {
                id: 'oppuss1_9',
                value: "9",
                descriptionValue: 'Ingen av disse',
                chosen: false

            },
        ]
    },
    dependentOnQuestionCriteria: [
        [
            {
                questionId: "eier1",
                questionValue: "1",
            },
        ],
    ],
    inputType: "checkbox"
} as QuestionFormType
