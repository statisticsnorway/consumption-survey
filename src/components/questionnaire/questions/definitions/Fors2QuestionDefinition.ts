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
                descriptionValue: 'Boligfosikring (også for fritidsbolig)',
                chosen: false
            },
            {
                id: 'fors2_2',
                value: "",
                descriptionValue: 'Innboforsikring (også for fritidsbolig)',
                chosen: false
            },
            {
                id: 'fors2_3',
                value: "",
                descriptionValue: 'Livsforsikring',
                chosen: false
            },
            {
                id: 'fors2_4',
                value: "",
                descriptionValue: 'Pensjonsforsikring',
                chosen: false
            },
            {
                id: 'fors2_5',
                value: "",
                descriptionValue: 'Reiseforsikring',
                chosen: false
            },
            {
                id: 'fors2_6',
                value: "",
                descriptionValue: 'Barneforsikring (hvis barn)',
                chosen: false
            },
            {
                id: 'fors2_7',
                value: "",
                descriptionValue: 'Bilforsikring (hvis bil)',
                chosen: false
            },
        ]
    },
    dependentOnQuestionCriteria: [
        [{
            questionId: 'fors1',
            questionValue: '1'
        }],
        [{
            questionId: 'fors1',
            questionValue: '2'
        }],
        [{
            questionId: 'fors1',
            questionValue: '3'
        }],
        [{
            questionId: 'fors1',
            questionValue: '4'
        }],
        [{
            questionId: 'fors1',
            questionValue: '5'
        }],
        [{
            questionId: 'fors1',
            questionValue: '6'
        }],
        [{
            questionId: 'fors1',
            questionValue: '7'
        }],
    ],
    inputType: "multifield-number-dependent",
    inputPostfix: "cash"
} as QuestionFormType
