import {QuestionFormType} from "../QuestionFormType";

export const BILVERDIBRUKT: QuestionFormType = {
    id: 'bilverdibrukt',
    order: 85,
    questionText: 'Hvor mye betalte du/dere for bilen(e) dere kjøpte BRUKT(E)? \n' +
        'Ta også med registrerings- eller omregistreringsavgift.\n' +
        'Hvis bilen var en gave, anslå verdien  ',
    hasAnswered: false,
    answerValue: {
        answers: [
            {
                id: 'bilverdibrukt_1',
                value: "",
                descriptionValue: 'Bil-1 sum',
                chosen: true
            },
            {
                id: 'bilverdibrukt_2',
                value: "",
                descriptionValue: 'Bil-2 sum',
                chosen: true
            },
            {
                id: 'bilverdibrukt_3',
                value: "",
                descriptionValue: 'Bil-3 sum',
                chosen: true
            },
            {
                id: 'bilverdibrukt_4',
                value: "",
                descriptionValue: 'Bil-4 sum',
                chosen: true
            },
            {
                id: 'bilverdibrukt_5',
                value: "",
                descriptionValue: 'Bil-5 sum',
                chosen: true
            },
            {
                id: 'bilverdibrukt_6',
                value: "",
                descriptionValue: 'Bil-6 sum',
                chosen: true
            },
            {
                id: 'bilverdibrukt_7',
                value: "",
                descriptionValue: 'Bil-7 sum',
                chosen: true
            },
            {
                id: 'bilverdibrukt_8',
                value: "",
                descriptionValue: 'Bil-8 sum',
                chosen: true
            },
            {
                id: 'bilverdibrukt_9',
                value: "",
                descriptionValue: 'Bil-9 sum',
                chosen: true
            },
            {
                id: 'bilverdibrukt_10',
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
                answerId: "bil2_2",
                specialCompare: "moreThan"
            },
        ]
    ],
    inputType: "multifield-number-siffer-dependent",
    inputPostfix: "cash"
} as QuestionFormType
