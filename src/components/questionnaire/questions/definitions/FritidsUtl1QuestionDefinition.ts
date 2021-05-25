import {QuestionFormType} from "../QuestionFormType";
import {Theme} from "../themes";

export const FRITIDSUTL1: QuestionFormType = {
    id: 'fritidsutl1',
    theme: Theme.holidayHomeAbroad,
    order: 70,
    questionText: 'Eier [du/dere] eller har [du/dere] andel i fritidsbolig i utlandet? For eksempel ferieleilighet, sommerhus eller lignende?',
    hasAnswered: false,
    answerValue: {
        answers: [
            {
                id: 'fritidsutl1_1',
                value: "1",
                descriptionValue: 'Ja',
                chosen: false
            },
            {
                id: 'fritidsutl1_2',
                value: "2",
                descriptionValue: 'Nei',
                chosen: false
            }
        ]
    },

    defaultNextQuestion: "fritidsutl2",
    inputType: "radio"
} as QuestionFormType