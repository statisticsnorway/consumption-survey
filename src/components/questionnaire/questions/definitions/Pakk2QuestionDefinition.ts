import {QuestionFormType} from "../QuestionFormType";
import {Theme} from "../themes";

export const PAKK2: QuestionFormType = {
    id: 'pakk2',
    order: 96,
    theme: Theme.travels,
    questionText: 'Hvor mye har du/dere betalt for pakketurer de siste 12 månedene?\n' +
        'Dersom du/dere fikk reisen i gave eller premie, anslå hvor mye du/dere selv måtte ha betalt ',
    hasAnswered: false,
    answerValue: {
        answers: [
            {
                id: 'pakk2_1',
                value: "",
                descriptionValue: 'Beløp',
                chosen: true
            }
        ]
    },
    dependentOnQuestionCriteria: [
        [
            {
                questionId: "pakk1",
                questionValue: "1"
            }
        ]
    ],
    inputType: "number",
    inputPostfix: "cash"
} as QuestionFormType
