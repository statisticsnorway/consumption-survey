import {QuestionFormType} from "../QuestionFormType";
import {Theme} from "../themes";

export const ELUTGFRI1B: QuestionFormType = {
    id: 'elutgfri1b',
    theme: Theme.powerHolidayHome,
    order: 69.1,
    questionText: 'Hvor store utgifter har du/dere hatt til strøm og nettleie i fritidsboligene de siste 12 måneder?',
    hasAnswered: false,
    answerValue: {
        answers: [
            {
                id: 'elutgfri1b_1',
                value: "",
                descriptionValue: 'Både strøm og nettleie (hvis du/dere får samlet regning)',
                chosen: true
            },

        ]
    },
    dependentOnQuestionCriteria: [
        [
            {
                questionId: "sepregnfri",
                questionValue: "2"
            }
        ]
    ],
    inputType: "multifield-number",
    inputPostfix: "cash"
} as QuestionFormType
