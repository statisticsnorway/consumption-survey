import {QuestionFormType} from "../QuestionFormType";

export const ARBREIS3: QuestionFormType = {
    id: 'arbreis3',
    order: 98,
    questionText: 'Hva ville det kostet i løpet av de siste 12 månedene dersom du/dere måtte betale disse arbeidsreisene selv? ',
    hasAnswered: false,
    answerValue: {
        answers: [
            {
                id: 'arbreis3_1',
                value: "",
                descriptionValue: 'Beløp',
                chosen: true
            }
        ]
    },
    inputType: "number",
    inputPostfix: "cash"
} as QuestionFormType
