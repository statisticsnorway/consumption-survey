import {QuestionFormType} from "../QuestionFormType";
import {Theme} from "../themes";

export const VED3: QuestionFormType = {
    id: 'ved3',
    theme: Theme.firewood,
    order: 79,
    questionText: 'For å kunne beregne en verdi av veden du har fått eller hugget , vil vi gjerne vite omtrent hvor mye ved du har fått/hugget',
    hasAnswered: false,
    answerValue: {
        answers: [
            {
                id: 'ved3_1',
                value: "1",
                descriptionValue: 'Små sekker opptil 40 liter',
                chosen: false
            },
            {
                id: 'ved3_2',
                value: "2",
                descriptionValue: 'Små sekker opptil 60 liter',
                chosen: false
            },
            {
                id: 'ved3_3',
                value: "3",
                descriptionValue: 'Store sekker opptil 1000 liter',
                chosen: false
            },
            {
                id: 'ved3_4',
                value: "4",
                descriptionValue: 'Sekker, store ca 1500 liter',
                chosen: false
            },
            {
                id: 'ved3_5',
                value: "5",
                descriptionValue: 'Kubikk',
                chosen: false
            },
        ]
    },
    dependentOnQuestionCriteria: [
        [
            {
                questionId: "ved2",
                questionValue: "2"
            }
        ]
    ],
    inputType: "checkbox",
} as QuestionFormType
