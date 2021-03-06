import {QuestionFormType} from "../QuestionFormType";
import {Theme} from "../themes";

export const FORS1: QuestionFormType = {
    id: 'fors1',
    order: 124,
    theme: Theme.insuranceCost,
    questionText: 'Har dere i løpet av de siste 12 månedene betalt for…',
    hasAnswered: false,
    answerValue: {
        answers: [
            {
                id: 'fors1_1',
                value: "1",
                descriptionValue: 'Boligforsikring (også for fritidsbolig)',
                chosen: false
            },
            {
                id: 'fors1_2',
                value: "2",
                descriptionValue: 'Innboforsikring (også for fritidsbolig)',
                chosen: false
            },
            {
                id: 'fors1_3',
                value: "3",
                descriptionValue: 'Livsforsikring',
                chosen: false
            },
            {
                id: 'fors1_4',
                value: "4",
                descriptionValue: 'Pensjonsforsikring',
                chosen: false
            },
            {
                id: 'fors1_5',
                value: "5",
                descriptionValue: 'Reiseforsikring',
                chosen: false
            },
            {
                id: 'fors1_6',
                value: "6",
                descriptionValue: 'Barneforsikring (hvis barn)',
                chosen: false
            },
            {
                id: 'fors1_7',
                value: "7",
                descriptionValue: 'Bilforsikring (hvis bil)',
                chosen: false
            },
            {
                id: 'fors1_8',
                value: "8",
                descriptionValue: 'Ingen av disse',
                chosen: false
            },
        ]
    },

    inputType: "checkbox"
} as QuestionFormType
