import {QuestionFormType} from "../QuestionFormType";

export const FUTG4: QuestionFormType = {
    id: 'futg4',
    order: 21,
    questionText: 'Hvor mye av husleien/fellesutgiftene går til å dekke renter og avdrag på fellesgjeld?',
    hasAnswered: false,
    answerValue: {
        answers: [
            {
                id: 'futg4_1',
                value: "",
                descriptionValue: 'Beløp',
                chosen: true
            }
        ]
    },
    dependentOnQuestionCriteria: [
        [
            {
                questionId: "eier2",
                questionValue: "1"
            },
            {
                questionId: "futg1",
                questionValue: "1"
            },
        ]
    ],
    defaultNextQuestion: "komavg",
    inputType: "text"
} as QuestionFormType
