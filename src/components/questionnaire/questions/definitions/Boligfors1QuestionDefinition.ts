import {QuestionFormType} from "../QuestionFormType";
import {Theme} from "../themes";

export const BOLIGFORS1: QuestionFormType = {
    id: 'boligfors1',
    theme: Theme.insuranceDwelling,
    order: 46,
    questionText: 'Hvor mye har du/dere betalt i boligforsikringspremie for boligen de siste 12 månedene? ',
    hasAnswered: false,
    answerValue: {
        answers: [
            {
                id: 'boligfors1_1',
                value: "",
                descriptionValue: 'Sum',
                chosen: true
            }
        ]
    },
    dependentOnQuestionCriteria: [
        [
            {
                questionId: "eier1",
                questionValue: "1"
            },
            {
                questionId: "eier2",
                questionValue: "1"
            }
        ]
    ],
    inputType: "number",
    inputPostfix: "cash"
} as QuestionFormType
