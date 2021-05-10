import {QuestionFormType} from "../QuestionFormType";

export const FLY2: QuestionFormType = {
    id: 'fly2',
    order: 91,
    questionText: 'Hvor mye har du/dere betalt for flyturer de siste 12 månedene?\n' +
        'Dersom du/dere fikk reisen i gave eller premie, anslå hvor mye du/dere selv måtte ha betalt.',
    hasAnswered: false,
    answerValue: {
        answers: [
            {
                id: 'fly2_1',
                value: "",
                descriptionValue: 'Beløp',
                chosen: true
            }
        ]
    },
    dependentOnQuestionCriteria: [
        [
            {
                questionId: "fly1",
                questionValue: "1"
            }
        ]
    ],
    inputType: "number",
    inputPostfix: "cash"
} as QuestionFormType
