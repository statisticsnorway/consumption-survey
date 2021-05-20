import {QuestionFormType} from "../QuestionFormType";

export const BÅT1: QuestionFormType = {
    id: 'båt1',
    order: 93,
    questionText: 'Har du/dere kjøpt båtreiser de siste 12 månedene? \n' +
        'Vi tenker her på lengre fritidsreiser, som for eksempel Hurtigruta eller Danskebåten. Ikke ta med kortere turer eller utgifter som er inkludert i pakketurer.',
    hasAnswered: false,
    answerValue: {
        answers: [
            {
                id: 'båt1_1',
                value: "1",
                descriptionValue: 'Ja',
                chosen: false
            },
            {
                id: 'båt1_2',
                value: "2",
                descriptionValue: 'Nei',
                chosen: false
            },
        ]
    },
    inputType: "radio"
} as QuestionFormType
