import {QuestionFormType} from "../QuestionFormType";
import {Theme} from "../themes";

export const PAKK1: QuestionFormType = {
    id: 'pakk1',
    order: 95,
    theme: Theme.travels,
    questionText: 'Har du/dere kjøpt eller fått pakketurer, charterturer, cruise eller gruppereiser i løpet av de siste 12 månedene.',
    hasAnswered: false,
    answerValue: {
        answers: [
            {
                id: 'pakk1_1',
                value: "1",
                descriptionValue: 'Ja',
                chosen: false
            },
            {
                id: 'pakk1_2',
                value: "2",
                descriptionValue: 'Nei',
                chosen: false
            },
        ]
    },
    inputType: "radio"
} as QuestionFormType
