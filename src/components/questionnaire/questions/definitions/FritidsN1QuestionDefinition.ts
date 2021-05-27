import {QuestionFormType} from "../QuestionFormType";
import {Theme} from "../themes";

export const FRITIDSN1: QuestionFormType = {
    id: 'fritidsn1',
    theme: Theme.holidayHome,
    order: 48,
    questionText: 'Eier eller disponerer du/dere hytte eller hus som brukes til fritidsbolig i Norge?',
    subText: 'Dersom du både eier og disponerer kryss av for de aktuelle',
    hasAnswered: false,
    answerValue: {
        answers: [
            {
                id: 'fritidsn1_1',
                value: "1",
                descriptionValue: 'Ja, eier alene',
                chosen: false
            },
            {
                id: 'fritidsn1_2',
                value: "2",
                descriptionValue: 'Ja, eier sammen med andre',
                chosen: false
            },
            {
                id: 'fritidsn1_3',
                value: "3",
                descriptionValue: 'Ja, disponerer',
                chosen: false
            },
            {
                id: 'fritidsn1_4',
                value: "4",
                descriptionValue: 'Nei',
                chosen: false
            },
        ]
    },
    inputType: "checkbox"
} as QuestionFormType
