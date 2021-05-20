import {QuestionFormType} from "../QuestionFormType";

export const BÅT2: QuestionFormType = {
    id: 'båt2',
    order: 94,
    questionText: 'Hvor mye har du/dere betalt for båtreiser de siste 12 månedene?\n' +
        'Dersom du/dere fikk reisen i gave eller premie, anslå hvor mye du/dere selv måtte ha betalt ',
    hasAnswered: false,
    answerValue: {
        answers: [
            {
                id: 'båt2_1',
                value: "",
                descriptionValue: 'Beløp',
                chosen: true
            }
        ]
    },
    dependentOnQuestionCriteria: [
        [
            {
                questionId: "båt1",
                questionValue: "1"
            }
        ]
    ],
    inputType: "number",
    inputPostfix: "cash"
} as QuestionFormType
