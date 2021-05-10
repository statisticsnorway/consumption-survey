import {QuestionFormType} from "../QuestionFormType";
import {Theme} from "../themes";

export const ELUTG2A: QuestionFormType = {
    id: 'elutg2a',
    theme: Theme.powerDwelling,
    order: 44.1,
    questionText: 'Hvor store utgifter har husholdningen hatt til strøm og nettleie siste måned?',
    hasAnswered: false,
    answerValue: {
        answers: [
            {
                id: 'elutg2a_1',
                value: "",
                descriptionValue: 'Nettleie',
                chosen: true
            },
            {
                id: 'elutg2a_2',
                value: "",
                descriptionValue: 'Strøm',
                chosen: true
            },
        ]
    },
    dependentOnQuestionCriteria: [
        [
            {
                questionId: "elutg1",
                questionValue: "1"
            }
        ]
    ],
    inputType: "multifield-number",
    inputPostfix: "cash"
} as QuestionFormType
