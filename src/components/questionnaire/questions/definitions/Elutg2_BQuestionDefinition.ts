import {QuestionFormType} from "../QuestionFormType";
import {Theme} from "../themes";

export const ELUTG2B: QuestionFormType = {
    id: 'elutg2b',
    theme: Theme.powerDwelling,
    order: 44.2,
    questionText: 'Hvor store utgifter har husholdningen hatt til strøm og nettleie siste måned?',
    hasAnswered: false,
    answerValue: {
        answers: [
            {
                id: 'elutg2b_3',
                value: "",
                descriptionValue: 'Strøm og nettleie samlet',
                chosen: true
            },
        ]
    },
    dependentOnQuestionCriteria: [
        [
            {
                questionId: "elutg1",
                questionValue: "2"
            }
        ]
    ],
    inputType: "multifield-number",
    inputPostfix: "cash"
} as QuestionFormType
