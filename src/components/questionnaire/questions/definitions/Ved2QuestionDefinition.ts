import {QuestionFormType} from "../QuestionFormType";
import {Theme} from "../themes";

export const VED2: QuestionFormType = {
    id: 'ved2',
    theme: Theme.firewood,
    order: 78,
    questionText: 'Kan du anslå hvor mye du måtte ha betalt dersom du skulle ha kjøpt veden?',
    hasAnswered: false,
    answerValue: {
        answers: [
            {
                id: 'ved2_1',
                value: "",
                descriptionValue: 'Beløp [0 … 99997]',
                chosen: true
            },
            {
                id: 'ved2_2',
                value: "2",
                descriptionValue: 'Kan ikke anslå verdi',
                chosen: false
            }
        ]
    },
    dependentOnQuestionCriteria: [
        [
            {
                questionId: "ved1",
                questionValue: "1"
            }
        ]
    ],
    inputType: "number-checkbox",
    inputPostfix: "cash"
} as QuestionFormType
