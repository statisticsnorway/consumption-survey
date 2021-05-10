import {QuestionFormType} from "../QuestionFormType";

export const VARIGUNDERH2: QuestionFormType = {
    id: 'varigunderh2',
    order: 116,
    questionText: 'Hvor mye betalte du/dere for... Dersom dette var en gave, anslå verdien',
    hasAnswered: false,
    answerValue: {
        answers: [
            {
                id: 'varigunderh2_1',
                value: "",
                descriptionValue: 'Mobiltelefon, utstyr til mobiltelefon',
                chosen: false
            },
            {
                id: 'varigunderh2_2',
                value: "",
                descriptionValue: 'TV, digitalboks, parabolantenne, dvd-spiller og utstyr til slike',
                chosen: false
            },
            {
                id: 'varigunderh2_3',
                value: "",
                descriptionValue: 'Lydanlegg, for eksempel høyttalere, forsterker',
                chosen: false
            },
            {
                id: 'varigunderh2_4',
                value: "",
                descriptionValue: 'Spillkonsoll, som Playstation, Xbox, Wii',
                chosen: false
            },
            {
                id: 'varigunderh2_5',
                value: "",
                descriptionValue: 'Datamaskin, enten stasjonær eller laptop',
                chosen: false
            },
            {
                id: 'varigunderh2_6',
                value: "",
                descriptionValue: 'Skriver, skanner',
                chosen: false
            },
            {
                id: 'varigunderh2_7',
                value: "",
                descriptionValue: 'Kamera, filmkamera',
                chosen: false
            },
            {
                id: 'varigunderh2_8',
                value: "8",
                descriptionValue: 'Musikkinstrument',
                chosen: false
            },
            {
                id: 'varigunderh2_9',
                value: "9",
                descriptionValue: 'Andre større eller kostbare elektriske artikler og underholdningsartikler',
                chosen: false
            },
            {
                id: 'varigunderh2_10',
                value: "10",
                descriptionValue: 'Ingen av disse',
                chosen: false
            },

        ]
    },
    dependentOnQuestionCriteria: [
        [
            {
                questionId: "varigunderh1",
                questionValue: "10",
                specialCompare: "logicNot"
            }
        ]
    ],
    inputType: "multifield-number-dependent",
    inputPostfix: "cash"
} as QuestionFormType
