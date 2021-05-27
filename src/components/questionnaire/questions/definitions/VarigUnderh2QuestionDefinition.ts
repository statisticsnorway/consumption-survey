import {QuestionFormType} from "../QuestionFormType";
import {Theme} from "../themes";

export const VARIGUNDERH2: QuestionFormType = {
    id: 'varigunderh2',
    order: 116,
    theme: Theme.rarePurchases,
    questionText: 'Hvor mye betalte du/dere for... Dersom dette var en gave, anslå verdien',
    hasAnswered: false,
    answerValue: {
        answers: [
            {
                id: 'varigunderh2_1',
                value: "",
                descriptionValue: 'Mobiltelefon, utstyr til mobiltelefon',
                chosen: true
            },
            {
                id: 'varigunderh2_2',
                value: "",
                descriptionValue: 'TV, digitalboks, parabolantenne, dvd-spiller og utstyr til slike',
                chosen: true
            },
            {
                id: 'varigunderh2_3',
                value: "",
                descriptionValue: 'Lydanlegg, for eksempel høyttalere, forsterker',
                chosen: true
            },
            {
                id: 'varigunderh2_4',
                value: "",
                descriptionValue: 'Spillkonsoll, som Playstation, Xbox, Wii',
                chosen: true
            },
            {
                id: 'varigunderh2_5',
                value: "",
                descriptionValue: 'Datamaskin, enten stasjonær eller laptop',
                chosen: true
            },
            {
                id: 'varigunderh2_6',
                value: "",
                descriptionValue: 'Skriver, skanner',
                chosen: true
            },
            {
                id: 'varigunderh2_7',
                value: "",
                descriptionValue: 'Kamera, filmkamera',
                chosen: true
            },
            {
                id: 'varigunderh2_8',
                value: "",
                descriptionValue: 'Musikkinstrument',
                chosen: true
            },
            {
                id: 'varigunderh2_9',
                value: "",
                descriptionValue: 'Andre større eller kostbare elektriske artikler og underholdningsartikler',
                chosen: true
            }

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
