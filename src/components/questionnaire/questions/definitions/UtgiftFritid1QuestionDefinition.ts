import {QuestionFormType} from "../QuestionFormType";
import {Theme} from "../themes";

export const UTGIFTFRITID1: QuestionFormType = {
    id: 'utgiftfritid1',
    theme: Theme.holidayHome,
    order: 52,
    questionText: 'Har du/din husholdning utgifter i forbindelse med fritidsboligen?',
    hasAnswered: false,
    answerValue: {
        answers: [
            {
                id: 'utgiftfritid1_1',
                value: "1",
                descriptionValue: 'Ja',
                chosen: false
            },
            {
                id: 'utgiftfritid1_2',
                value: "2",
                descriptionValue: 'Ja, men utgiftene deles med andre og er vanskelig å spesifisere',
                chosen: false
            },
            {
                id: 'utgiftfritid1_3',
                value: "3",
                descriptionValue: 'Nei',
                chosen: false
            },
        ]
    },
    dependentOnQuestionCriteria: [
        [
            {
                questionId: "fritidsn1",
                questionValue: "3"
            },
        ],
        [
            {
                questionId: "fritidsn1",
                questionValue: "2"
            },
        ]
    ],
    inputType: "radio"
} as QuestionFormType
