import {QuestionFormType} from "../QuestionFormType";

export const ARBREIS5: QuestionFormType = {
    id: 'arbreis5',
    order: 100,
    questionText: 'Hva ville det kostet dersom du/dere måtte betale disse reisene selv, medregnet eventuelt opphold og overnatting? ',
    hasAnswered: false,
    answerValue: {
        answers: [
            {
                id: 'arbreis5_1',
                value: "",
                descriptionValue: 'Beløp',
                chosen: true
            }
        ]
    },
    dependentOnQuestionCriteria: [
        [
            {
                questionId: "arbreis4",
                questionValue: "1"
            }
        ]
    ],
    inputType: "number",
    inputPostfix: "cash"
} as QuestionFormType
