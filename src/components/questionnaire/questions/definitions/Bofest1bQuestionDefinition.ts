import {QuestionFormType} from "../QuestionFormType";

export const BOFEST1B: QuestionFormType = {
    id: 'bofest1b',
    order: 14,
    questionText: 'Hvor mye har du/dere betalt de siste 12 månedene i festeavgift',
    hasAnswered: false,
    answerValue: {

        answers: [
            {
                id: 'bofest1b_1',
                value: "Måned",
                descriptionValue: 'Velg period mnd/kvartal/år',
                chosen: true
            },
            {
                id: 'bofest1b_2',
                value: "",
                descriptionValue: 'Beløp',
                chosen: true
            }
        ]
    },
    dependentOnQuestionCriteria: [
        [
            {
                questionId: "bofest1",
                questionValue: "2"
            },
        ]
    ],
    inputType: "text-optional-timeperiod"
} as QuestionFormType
