import {QuestionFormType} from "../QuestionFormType";

export const BILVERDINY: QuestionFormType = {
    id: 'bilverdiny',
    order: 84,
    questionText: 'Hvor mye betalte du/dere for bilen(e) dere kjøpte NY(E)? \n' +
        'Ta også med registrerings- eller omregistreringsavgift.\n' +
        'Hvis bilen var en gave, anslå verdien  ',
    hasAnswered: false,
    answerValue: {
        answers: [
            {
                id: 'bilverdiny_1',
                value: "",
                descriptionValue: 'Bil-1 sum',
                chosen: true
            },
            {
                id: 'bilverdiny_2',
                value: "",
                descriptionValue: 'Bil-2 sum',
                chosen: true
            },
            {
                id: 'bilverdiny_3',
                value: "",
                descriptionValue: 'Bil-3 sum',
                chosen: true
            },
            {
                id: 'bilverdiny_4',
                value: "",
                descriptionValue: 'Bil-4 sum',
                chosen: true
            },
            {
                id: 'bilverdiny_5',
                value: "",
                descriptionValue: 'Bil-5 sum',
                chosen: true
            },
            {
                id: 'bilverdiny_6',
                value: "",
                descriptionValue: 'Bil-6 sum',
                chosen: true
            },
            {
                id: 'bilverdiny_7',
                value: "",
                descriptionValue: 'Bil-7 sum',
                chosen: true
            },
            {
                id: 'bilverdiny_8',
                value: "",
                descriptionValue: 'Bil-8 sum',
                chosen: true
            },
            {
                id: 'bilverdiny_9',
                value: "",
                descriptionValue: 'Bil-9 sum',
                chosen: true
            },
            {
                id: 'bilverdiny_10',
                value: "",
                descriptionValue: 'Bil-10 sum',
                chosen: true
            },
        ]
    },
    dependentOnQuestionCriteria: [
        [
            {
                questionId: "bil2",
                questionValue: "0",
                answerId: "bil2_1",
                specialCompare: "moreThan"
            },
        ]
    ],
    inputType: "multifield-number-siffer-dependent",
    inputPostfix: "cash"
} as QuestionFormType
