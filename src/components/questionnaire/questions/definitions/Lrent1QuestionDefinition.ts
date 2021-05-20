import {QuestionFormType} from "../QuestionFormType";
import {Theme} from "../themes";

export const LRENT1: QuestionFormType = {
    id: 'lrent1',
    theme: Theme.ownerExpedenaturesEconomy,
    order: 11,
    questionText: 'Hvor mye av dette er renter',
    hasAnswered: false,
    answerValue: {
        answers: [
            {
                id: 'lrent1_1',
                value: "",
                descriptionValue: '1-1.000.000',
                chosen: true
            },
            {
                id: 'lrent1_2',
                value: "2",
                descriptionValue: 'Vet ikke',
                chosen: false,
                hidden: true
            }
        ]
    },
    dependentOnQuestionCriteria: [
        [
            {
                questionId: "lutg1",
                questionValue: "0",
                specialCompare: "moreThan"
            }
        ]
    ],
    defaultNextQuestion: "husleie1",
    inputType: "number-checkbox",
    inputPostfix: "cash"
} as QuestionFormType
