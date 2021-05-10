import {QuestionFormType} from "../QuestionFormType";
import {Theme} from "../themes";

export const BILSOLGT: QuestionFormType = {
    id: 'bilsolgt',
    theme: Theme.car,
    order: 86,
    questionText: 'Har du/dere solgt eller byttet inn bil i løpet av de siste 12 månedene?\n' +
        'Ikke ta med bil som brukes som firma- eller tjenestebil, men som også disponeres til privat bruk.',
    hasAnswered: false,
    answerValue: {
        answers: [
            {
                id: 'bilsolgt_1',
                value: "1",
                descriptionValue: 'Ja, solgt',
                chosen: false
            },
            {
                id: 'bilsolgt_2',
                value: "2",
                descriptionValue: 'Ja, bytte inn',
                chosen: false
            },
            {
                id: 'bilsolgt_3',
                value: "3",
                descriptionValue: 'Ja, både solgt og byttet inn',
                chosen: false
            },
            {
                id: 'bilsolgt_4',
                value: "4",
                descriptionValue: 'Nei',
                chosen: false
            }
        ]
    },
    inputType: "radio"
} as QuestionFormType
