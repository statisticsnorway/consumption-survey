import {QuestionFormType} from "../QuestionFormType";

export const KOMAVG4: QuestionFormType = {
    id: 'komavg4',
    order: 32,
    questionText: 'Hvor mye betaler du/dere i kommunale avgifter?',
    hasAnswered: false,
    answerValue: {
        answers: [
            {
                id: 'komavg4_1',
                value: "Måned",
                descriptionValue: 'Velg period mnd/kvartal/år',
                chosen: true
            },
            {
                id: 'komavg4_1',
                value: "",
                descriptionValue: 'Beløp',
                chosen: true
            }
        ]
    },
    dependentOnQuestionCriteria: [
        [
            {
                questionId: "komavg2",
                questionValue: "2",
            }
        ],
    ],
    inputType: "number-optional-timeperiod",
    inputPostfix: "cash"
} as QuestionFormType
