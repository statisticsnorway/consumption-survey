import {QuestionFormType} from "../QuestionFormType";
import {Theme} from "../themes";

export const SEPREGNFRI: QuestionFormType = {
    id: 'sepregnfri',
    order: 68,
    theme: Theme.powerHolidayHome,
    questionText: 'Er det enklest for deg å oppgi utgifter til elektrisitet og nettleie samlet eller ønsker du å oppgi utgiftene separat?',
    hasAnswered: false,
    answerValue: {
        answers: [
            {
                id: 'sepregnfri_1',
                value: "1",
                descriptionValue: 'Separat',
                chosen: false
            },
            {
                id: 'sepregnfri_2',
                value: "2",
                descriptionValue: 'Samlet',
                chosen: false
            },
            {
                id: 'sepregnfri_3',
                value: "3",
                descriptionValue: 'Fritidsboligen er uten strøm',
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
                    {
                    questionId: "utgiftfritid1",
                    questionValue: "1",
                    },
                ],

                [
                    {
                        questionId: "fritidsn1",
                        questionValue: "2",

                    },
                    {
                        questionId: "utgiftfritid1",
                        questionValue: "1",
                    },
                ],

                [
                    {
                        questionId: "fritidsn1",
                        questionValue: "3",

                    },
                    {
                        questionId: "utgiftfritid1",
                        questionValue: "1",
                    },
                ],
                [
                    {
                        questionId: "leiefritidel",
                        questionValue: "2",
                    },
                ],
    ],
    inputType: "radio"
} as QuestionFormType
