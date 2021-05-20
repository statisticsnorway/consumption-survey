import {QuestionFormType} from "../QuestionFormType";
import {Theme} from "../themes";

export const ELUTGFRI1A: QuestionFormType = {
    id: 'elutgfri1a',
    theme: Theme.powerHolidayHome,
    order: 69,
    questionText: 'Hvor store utgifter har du/dere hatt til strøm og nettleie i fritidsboligene de siste 12 måneder?',
    hasAnswered: false,
    answerValue: {
        answers: [
            {
                id: 'elutgfri1a_1',
                value: "",
                descriptionValue: 'Nettleie',
                chosen: true
            },
            {
                id: 'elutgfri1a_2',
                value: "",
                descriptionValue: 'Strøm',
                chosen: true
            },
        ]
    },
    dependentOnQuestionCriteria: [
        [
            {
                questionId: "sepregnfri",
                questionValue: "1"
            }
        ]
    ],
    inputType: "multifield-number",
    inputPostfix: "cash"
} as QuestionFormType
