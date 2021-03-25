import {QuestionFormType} from "../QuestionFormType";

export const KOMAVG: QuestionFormType = {
    id: 'komavg',
    order: 1000000000,
    questionText: 'Betaler dere noen av disse avgiftene',
    hasAnswered: false,
    answerValue: {
        answers: [
            {
                header: 'Renovasjonsavgift',
                answers: [
                    {
                        id: 'komavg_1_1',
                        value: "1_1",
                        descriptionValue: 'Ja',
                        chosen: false
                    },
                    {
                        id: 'komavg_1_2',
                        value: "1_2",
                        descriptionValue: 'Nei',
                        chosen: false
                    },
                    {
                        id: 'komavg_1_3',
                        value: "1_3",
                        descriptionValue: 'Vet ikke',
                        chosen: false
                    }
                ]
            },
            {
                header: 'Vannavgift',
                answers: [
                    {
                        id: 'komavg_2_1',
                        value: "2_1",
                        descriptionValue: 'Ja',
                        chosen: false
                    },
                    {
                        id: 'komavg_2_2',
                        value: "2_2",
                        descriptionValue: 'Nei',
                        chosen: false
                    },
                    {
                        id: 'komavg_2_3',
                        value: "2_3",
                        descriptionValue: 'Vet ikke',
                        chosen: false
                    }
                ]
            },
            {
                header: 'Kloakkavgift',
                answers: [
                    {
                        id: 'komavg_3_1',
                        value: "3_1",
                        descriptionValue: 'Ja',
                        chosen: false
                    },
                    {
                        id: 'komavg_3_2',
                        value: "3_2",
                        descriptionValue: 'Nei',
                        chosen: false
                    },
                    {
                        id: 'komavg_3_3',
                        value: "3_3",
                        descriptionValue: 'Vet ikke',
                        chosen: false
                    }
                ]
            },
            {
                header: 'Feieavgift',
                answers: [
                    {
                        id: 'komavg_4_1',
                        value: "4_1",
                        descriptionValue: 'Ja',
                        chosen: false
                    },
                    {
                        id: 'komgavg_4_2',
                        value: "1_2",
                        descriptionValue: 'Nei',
                        chosen: false
                    },
                    {
                        id: 'komavg_4_3',
                        value: "1_3",
                        descriptionValue: 'Vet ikke',
                        chosen: false
                    }
                ]
            },
            {
                header: 'Andre Kommunale avgifter',
                answers: [
                    {
                        id: 'komavg_5_1',
                        value: "5_1",
                        descriptionValue: 'Ja',
                        chosen: false
                    },
                    {
                        id: 'komavg_5_2',
                        value: "5_2",
                        descriptionValue: 'Nei',
                        chosen: false
                    },
                    {
                        id: 'komavg_5_3',
                        value: "5_3",
                        descriptionValue: 'Vet ikke',
                        chosen: false
                    }
                ]
            }
        ]
    },
    defaultNextQuestion: "komavg2",
    dependentOnQuestionCriteria: [
        [
            {
                questionId: "eier2",
                questionValue: "1"
            },
            {
                questionId: "futg4",
                questionValue: "1"
            },
        ]
    ],
} as QuestionFormType
