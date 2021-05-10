import {QuestionFormType} from "../QuestionFormType";
import {Theme} from "../themes";

export const FRITIDSN3: QuestionFormType = {
    id: 'fritidsn3',
    theme: Theme.holidayHome,
    order: 54,
    questionText: 'Har dere som eiere eller disponenter av fritidsboligen(e) de siste 12 måneden hatt utgifter til:',
    hasAnswered: false,
    answerValue: {
        answers: [
            {
                id: 'fritidsn3_1',
                value: "1",
                descriptionValue: 'Festeavgift',
                chosen: false
            },
            {
                id: 'fritidsn3_2',
                value: "2",
                descriptionValue: 'Kommunale avgifter',
                chosen: false
            },
            {
                id: 'fritidsn3_3',
                value: "3",
                descriptionValue: 'Nei',
                chosen: false
            },
        ]
    },
    dependentOnQuestionCriteria: [
        [
            {
                questionId: 'fritidsn1',
                questionValue: '1',
            },
            {
                questionId: 'utgiftfritid1',
                questionValue: '1'
            },
        ],
        [
            {
                questionId: 'fritidsn1',
                questionValue: '2',
            },
            {
                questionId: 'utgiftfritid1',
                questionValue: '1'
            },
        ],
        [
            {
                questionId: 'fritidsn1',
                questionValue: '3',
            },
            {
                questionId: 'utgiftfritid1',
                questionValue: '1'
            },
        ],
    ],
    inputType: "checkbox"
} as QuestionFormType
