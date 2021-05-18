import {QuestionFormType} from "../QuestionFormType";
import {Theme} from "../themes";

export const VARIGUNDERH1: QuestionFormType = {
    id: 'varigunderh1',
    order: 115,
    theme: Theme.rarePurchases,
    questionText: 'Elektriske artikler og underholdningsartikler\n' +
        'Har du/dere i løpet av de siste 12 månedene kjøpt eller fått…',
    hasAnswered: false,
    answerValue: {
        answers: [
            {
                id: 'varigunderh1_1',
                value: "1",
                descriptionValue: 'Mobiltelefon, utstyr til mobiltelefon',
                chosen: false
            },
            {
                id: 'varigunderh1_2',
                value: "2",
                descriptionValue: 'TV, digitalboks, parabolantenne, dvd-spiller og utstyr til slike',
                chosen: false
            },
            {
                id: 'varigunderh1_3',
                value: "3",
                descriptionValue: 'Lydanlegg, for eksempel høyttalere, forsterker',
                chosen: false
            },
            {
                id: 'varigunderh1_4',
                value: "4",
                descriptionValue: 'Spillkonsoll, som Playstation, Xbox, Wii',
                chosen: false
            },
            {
                id: 'varigunderh1_5',
                value: "5",
                descriptionValue: 'Datamaskin, enten stasjonær eller laptop',
                chosen: false
            },
            {
                id: 'varigunderh1_6',
                value: "6",
                descriptionValue: 'Skriver, skanner',
                chosen: false
            },
            {
                id: 'varigunderh1_7',
                value: "7",
                descriptionValue: 'Kamera, filmkamera',
                chosen: false
            },
            {
                id: 'varigunderh1_8',
                value: "8",
                descriptionValue: 'Musikkinstrument',
                chosen: false
            },
            {
                id: 'varigunderh1_9',
                value: "9",
                descriptionValue: 'Andre større eller kostbare elektriske artikler og underholdningsartikler',
                chosen: false
            },
            {
                id: 'varigunderh1_10',
                value: "10",
                descriptionValue: 'Ingen av disse',
                chosen: false
            },
        ]
    },
    inputType: "checkbox"
} as QuestionFormType
