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
                value: "",
                descriptionValue: 'Små ekker opptil 40 liter. Skriv inn antall',
                chosen: true
            },
            {
                id: 'ved3_2',
                value: "",
                descriptionValue: 'Små ekker opptil 60 liter. Skriv inn antall',
                chosen: true
            },
            {
                id: 'ved3_3',
                value: "",
                descriptionValue: 'Store sekker opptil 1000 liter. Skriv inn antall',
                chosen: true
            },
            {
                id: 'ved3_4',
                value: "",
                descriptionValue: 'Sekker, store ca 1500 liter. Skriv inn antall',
                chosen: true
            },
            {
                id: 'ved3_5',
                value: "",
                descriptionValue: 'Kubikk. Skriv inn antall',
                chosen: true
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
    inputType: "multifield-number",
    inputPostfix: "cash"
} as QuestionFormType
