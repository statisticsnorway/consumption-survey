import {QuestionFormType} from "../QuestionFormType";

export const ARBREIS2: QuestionFormType = {
    id: 'arbreis2',
    order: 97,
    questionText: 'Hvilken eller hvilke reisemåter er det snakk om? (tick off)',
    hasAnswered: false,
    answerValue: {
        answers: [
            {
                id: 'arbreis2_1',
                value: "1",
                descriptionValue: 'Buss',
                chosen: false
            },
            {
                id: 'arbreis2_2',
                value: "2",
                descriptionValue: 'Tog/Trikk/T-bane',
                chosen: false
            },
            {
                id: 'arbreis2_3',
                value: "3",
                descriptionValue: 'Båt',
                chosen: false
            },
            {
                id: 'arbreis2_4',
                value: "4",
                descriptionValue: 'Fly',
                chosen: false
            },
        ]
    },
    dependentOnQuestionCriteria: [
        [
            {
                questionId: "arbreis1",
                questionValue: "1"
            }
        ]
    ],
    inputType: "checkbox"
} as QuestionFormType
