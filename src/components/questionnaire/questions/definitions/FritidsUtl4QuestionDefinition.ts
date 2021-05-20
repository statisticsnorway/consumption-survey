import {QuestionFormType} from "../QuestionFormType";
import {Theme} from "../themes";

export const FRITIDSUTL4: QuestionFormType = {
    id: 'fritidsutl4',
    theme: Theme.holidayHomeAbroad,
    order: 73,
    questionText: 'Hva inngår i de lokale skattene og avgiftene?',
    hasAnswered: false,
    answerValue: {
        answers: [
            {
                id: 'fritidsutl4_1',
                value: "1",
                descriptionValue: 'Renovasjonsavgift',
                chosen: false
            },
            {
                id: 'fritidsutl4_2',
                value: "2",
                descriptionValue: 'Vann og avløp',
                chosen: false
            },
            {
                id: 'fritidsutl4_3',
                value: "3",
                descriptionValue: 'Eiendomsskatt',
                chosen: false
            },
            {
                id: 'fritidsutl4_4',
                value: "4",
                descriptionValue: 'Annet',
                chosen: false
            },

        ]
    },
    dependentOnQuestionCriteria: [
        [
            {
                questionId: "fritidsutl2",
                questionValue: "3"
            }
        ]
    ],
    inputType: "checkbox"
} as QuestionFormType
