import {QuestionFormType} from "../QuestionFormType";
import {Theme} from "../themes";

export const LEIEFRITIDU2: QuestionFormType = {
    id: 'leiefritidu2',
    theme: Theme.holidayHomeAbroad,
    order: 75,
    questionText: 'Hvor mye har din husholdning betalt samlet for langtidsleie i utlandet de siste 12 månedene?',
    hasAnswered: false,
    answerValue: {
        answers: [
            {
                id: 'leiefritidu2_1',
                value: "",
                descriptionValue: '1-1.000.000.000',
                chosen: true
            }
        ]
    },
    dependentOnQuestionCriteria: [
        [
            {
                questionId: "leiefritidu1",
                questionValue: "1"
            }
        ]
    ],
    inputType: "number",
    inputPostfix: "cash"
} as QuestionFormType