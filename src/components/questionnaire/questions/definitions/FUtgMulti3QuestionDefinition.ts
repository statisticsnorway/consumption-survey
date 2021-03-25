import {QuestionFormType} from "../QuestionFormType";

export const FUTG_MULTI3: QuestionFormType = {
    id: 'futg3',
    order: 22,
    questionText: 'Omfatter husleien/fellesutgiftene …. ',
    hasAnswered: false,
    answerValue: {
        answers: [
            {
                header: 'Elektrisitet',
                answers: [
                    {
                        id: 'futg3_1_1',
                        value: "1_1",
                        descriptionValue: 'Ja',
                        chosen: false
                    },
                    {
                        id: 'futg3_1_2',
                        value: "1_2",
                        descriptionValue: 'Nei',
                        chosen: false
                    },
                    {
                        id: 'futg3_1_3',
                        value: "1_3",
                        descriptionValue: 'Vet ikke',
                        chosen: false
                    }
                ]
            },
            {
                header: 'Oppvarming',
                answers: [
                    {
                        id: 'futg3_2_1',
                        value: "2_1",
                        descriptionValue: 'Ja',
                        chosen: false
                    },
                    {
                        id: 'futg3_2_2',
                        value: "2_2",
                        descriptionValue: 'Nei',
                        chosen: false
                    },
                    {
                        id: 'futg3_2_3',
                        value: "2_3",
                        descriptionValue: 'Vet ikke',
                        chosen: false
                    }
                ]
            },
            {
                header: 'Varmtvann',
                answers: [
                    {
                        id: 'futg3_3_1',
                        value: "3_1",
                        descriptionValue: 'Ja',
                        chosen: false
                    },
                    {
                        id: 'futg3_3_2',
                        value: "3_2",
                        descriptionValue: 'Nei',
                        chosen: false
                    },
                    {
                        id: 'futg3_3_3',
                        value: "3_3",
                        descriptionValue: 'Vet ikke',
                        chosen: false
                    }
                ]
            },
            {
                header: 'Garasje/Parkering',
                answers: [
                    {
                        id: 'futg3_4_1',
                        value: "4_1",
                        descriptionValue: 'Ja',
                        chosen: false
                    },
                    {
                        id: 'futg3_4_2',
                        value: "1_2",
                        descriptionValue: 'Nei',
                        chosen: false
                    },
                    {
                        id: 'futg3_4_3',
                        value: "1_3",
                        descriptionValue: 'Vet ikke',
                        chosen: false
                    }
                ]
            },
            {
                header: 'Kabel-TV',
                answers: [
                    {
                        id: 'futg3_5_1',
                        value: "5_1",
                        descriptionValue: 'Ja',
                        chosen: false
                    },
                    {
                        id: 'futg3_5_2',
                        value: "5_2",
                        descriptionValue: 'Nei',
                        chosen: false
                    },
                    {
                        id: 'futg3_5_3',
                        value: "5_3",
                        descriptionValue: 'Vet ikke',
                        chosen: false
                    }
                ]
            },
            {
                header: 'Boligforsikring',
                answers: [
                    {
                        id: 'futg3_6_1',
                        value: "6_1",
                        descriptionValue: 'Ja',
                        chosen: false
                    },
                    {
                        id: 'futg3_6_2',
                        value: "6_2",
                        descriptionValue: 'Nei',
                        chosen: false
                    },
                    {
                        id: 'futg3_6_3',
                        value: "6_3",
                        descriptionValue: 'Vet ikke',
                        chosen: false
                    }
                ]
            },
            {
                header: 'Kommunale avgifter',
                answers: [
                    {
                        id: 'futg3_7_1',
                        value: "7_1",
                        descriptionValue: 'Ja',
                        chosen: false
                    },
                    {
                        id: 'futg3_7_2',
                        value: "7_2",
                        descriptionValue: 'Nei',
                        chosen: false
                    },
                    {
                        id: 'futg3_7_3',
                        value: "7_3",
                        descriptionValue: 'Vet ikke',
                        chosen: false
                    }
                ]
            },
            {
                header: 'Renter og avdrag på fellesgjeld',
                answers: [
                    {
                        id: 'futg3_8_1',
                        value: "8_1",
                        descriptionValue: 'Ja',
                        chosen: false
                    },
                    {
                        id: 'futg3_8_2',
                        value: "8_2",
                        descriptionValue: 'Nei',
                        chosen: false
                    },
                    {
                        id: 'futg3_8_3',
                        value: "8_3",
                        descriptionValue: 'Vet ikke',
                        chosen: false
                    }
                ]
            },
        ]
    },
    dependentOnQuestionCriteria: [
        [
            {
                questionId: "eier2",
                questionValue: "1"
            },
        ]
        // {
        //     questionId: "futg1",
        //     questionValue: "1"
        // },
    ],
    defaultNextQuestion: "futg4"
} as QuestionFormType
