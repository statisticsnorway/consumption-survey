import {QuestionFormType} from "../QuestionFormType";
import {Theme} from "../themes";

export const BOLIGFORSSAMLET: QuestionFormType = {
    id: 'boligforssamlet',
    theme: Theme.insuranceDwelling,
    order: 47,
    questionText: 'Hvor mye har du/dere betalt samlet for bolig- og innboforsikring de siste 12 månedene?',
    hasAnswered: false,
    answerValue: {
        answers: [
            {
                id: 'boligforssamlet_1',
                value: "",
                descriptionValue: 'Sum',
                chosen: true
            }
        ]
    },
    dependentOnQuestionCriteria: [
        [
            {
                questionId: "boligforssamlet",
                questionValue: "1"
            },
        ]
    ],
    inputType: "number",
    inputPostfix: "cash"
} as QuestionFormType
