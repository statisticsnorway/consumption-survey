import {QuestionFormType} from "../QuestionFormType";
import {Theme} from "../themes";

export const LEIEFRITID: QuestionFormType = {
    id: 'leiefritid',
    theme: Theme.holidayHome,
    order: 63.3,
    questionText: 'Hvor mye har din husholdning betalt samlet i langtidsleie de siste 12 månedene?',
    hasAnswered: false,
    answerValue: {
        answers: [
            {
                id: 'leiefritid_1',
                value: "",
                descriptionValue: 'Sum',
                chosen: true
            }
        ]
    },
    dependentOnQuestionCriteria: [
        [
            {
                questionId: "fritidsn2",
                questionValue: "1"
            },
        ]
    ],
    inputType: "number",
    inputPostfix: "cash"
} as QuestionFormType
