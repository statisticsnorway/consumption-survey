import {QuestionFormType} from "../QuestionFormType";

export const FLY1: QuestionFormType = {
    id: 'fly1',
    order: 90,
    questionText: 'Har du/dere kjøpt flybilletter i løpet av de siste 12 månedene? \n' +
        'Ikke ta med flybilletter som er inkludert i pakketurer, cruise eller gruppereiser ',
    hasAnswered: false,
    answerValue: {
        answers: [
            {
                id: 'fly1_1',
                value: "1",
                descriptionValue: 'Ja',
                chosen: false
            },
            {
                id: 'fly1_2',
                value: "2",
                descriptionValue: 'Nei',
                chosen: false
            },
            {
                id: 'fly1_3',
                value: "3",
                descriptionValue: 'Vet ikke',
                chosen: false,
                hidden: true
            }
        ]
    },
    inputType: "radio"
} as QuestionFormType
