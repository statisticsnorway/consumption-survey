import {QuestionFormType} from "../QuestionFormType";
import {Theme} from "../themes";

export const REISER1: QuestionFormType = {
    id: 'reiser1',
    order: 92,
    theme: Theme.travels,
    questionText: 'Har du/dere hatt utgifter til fritidsresier de siste 12 månedene?\n' +
        'Ta ikke med pakketurer' ,
    hasAnswered: false,
    answerValue: {
        answers: [
            {
                id: 'reiser1_1',
                value: "1",
                descriptionValue: 'Fly innenlands',
                chosen: false
            },
            {
                id: 'reiser1_2',
                value: "2",
                descriptionValue: 'Fly utenlands',
                chosen: false
            },
            {
                id: 'reiser1_3',
                value: "3",
                descriptionValue: 'Båt (ferge, hurtigruta ol)',
                chosen: false
            },
            {
                id: 'reiser1_4',
                value: "4",
                descriptionValue: 'Tog',
                chosen: false
            },
            {
                id: 'reiser1_5',
                value: "5",
                descriptionValue: 'Buss',
                chosen: false
            },
        ]
    },
    inputType: "checkbox"
} as QuestionFormType
