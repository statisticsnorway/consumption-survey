import {QuestionFormType} from "../QuestionFormType";
import {Theme} from "../themes";

export const OPPUSSF1: QuestionFormType = {
    id: 'oppussf1',
    theme: Theme.renovationHolidayHome,
    order: 60,
    questionText: 'Hvilke utgifter har du/dere hatt til vedlikehold av fritidsboligens standard  de siste 12 månedene?',
    subText: 'Ta ikke med tiltak eller utgifter du allerede har oppgitt.' ,
    hasAnswered: false,
    answerValue: {
        answers: [
            {
                id: 'oppussf1_1',
                value: "1",
                descriptionValue: 'Utvendig maling eller annen overflatebehandling',
                chosen: false
            },
            {
                id: 'oppussf1_2',
                value: "2",
                descriptionValue: 'Mindre vedlikehold av kjøkken, bad eller wc? For eksempel ny armatur, servant, maling, lys eller lignende',
                chosen: false
            },
            {
                id: 'oppussf1_3',
                value: "3",
                descriptionValue: 'Oppussing eller vedlikehold av stue? Regn ikke med kjøp av møbler',
                chosen: false
            },
            {
                id: 'oppussf1_4',
                value: "4",
                descriptionValue: 'Oppussing og vedlikehold av soverom',
                chosen: false
            },
            {
                id: 'oppussf1_5',
                value: "5",
                descriptionValue: 'Oppussing og vedlikehold av gang, entré eller lignende',
                chosen: false
            },
            {
                id: 'oppussf1_6',
                value: "6",
                descriptionValue: 'Annet',
                chosen: false
            },
            {
                id: 'oppussf1_7',
                value: "7",
                descriptionValue: 'Ingen av disse',
                chosen: false
            },

        ]
    },
    dependentOnQuestionCriteria: [
        [
            {
                questionId: "fritidsn1",
                questionValue: "1",
            },
        ],
        [
            {
                questionId: "fritidsn1",
                questionValue: "2",
            },
        ],
        [
            {
                questionId: "fritidsn1",
                questionValue: "3",
            },
        ]
    ],
    defaultNextQuestion: "oppussf2",
    inputType: "checkbox"
} as QuestionFormType
