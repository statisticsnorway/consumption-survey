import {QuestionFormType} from "../QuestionFormType";
import {Theme} from "../themes";

export const BOFEST1B: QuestionFormType = {
    id: 'bofest1b',
    theme: Theme.ownerExpedenaturesEconomy,
    order: 14,
    questionText: 'Hvor mye har du/dere betalt de siste 12 månedene i festeavgift',
    hasAnswered: false,
    answerValue: {

        answers: [
            {
                id: 'bofest1b_1',
                value: "Måned",
                descriptionValue: 'Velg period mnd/kvartal/år',
                chosen: false
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
    inputType: "number-optional-timeperiod",
    inputPostfix: "cash"
} as QuestionFormType
