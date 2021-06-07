import {QuestionFormType} from "../QuestionFormType";
import {Theme} from "../themes";

export const FORS2: QuestionFormType = {
    id: 'fors2',
    order: 125,
    theme: Theme.insuranceCost,
    questionText: 'Hvor mye har du betalt siste 12 månedene?',
    hasAnswered: false,
    answerValue: {
        answers: [
            {
                id: 'fors2_1',
                value: "",
                descriptionValue: 'Boligforsikring (også for fritidsbolig)',
                chosen: true
            },
            {
                id: 'fors2_2',
                value: "",
                descriptionValue: 'Innboforsikring (også for fritidsbolig)',
                chosen: true
            },
            {
                id: 'fors2_3',
                value: "",
                descriptionValue: 'Livsforsikring',
                chosen: true
            },
            {
                id: 'fors2_4',
                value: "",
                descriptionValue: 'Pensjonsforsikring',
                chosen: true
            },
            {
                id: 'fors2_5',
                value: "",
                descriptionValue: 'Reiseforsikring',
                chosen: true
            },
            {
                id: 'fors2_6',
                value: "",
                descriptionValue: 'Barneforsikring (hvis barn)',
                chosen: true
            },
            {
                id: 'fors2_7',
                value: "",
                descriptionValue: 'Bilforsikring (hvis bil)',
                chosen: true
            },
        ]
    },
    dependentOnQuestionCriteria: [
        [
            {
                questionId: "fors1",
                questionValue: "8",
                specialCompare: "logicNot"
            }
        ]
    ],
    inputType: "multifield-number-dependent",
    inputPostfix: "cash"
} as QuestionFormType
