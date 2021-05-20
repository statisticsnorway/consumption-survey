import {QuestionFormType} from "../QuestionFormType";
import {Theme} from "../themes";

export const VARIGTRANSPORT1: QuestionFormType = {
    id: 'varigtransport1',
    order: 113,
    theme: Theme.rarePurchases,
    questionText: 'Har du/dere i løpet av de siste 12 månedene kjøpt eller fått...',
    hasAnswered: false,
    answerValue: {
        answers: [
            {
                id: 'varigtransport1_1',
                value: "1",
                descriptionValue: 'Sykkel, el-sparkesykkel',
                chosen: false
            },
            {
                id: 'varigmøbler1_2',
                value: "2",
                descriptionValue: 'Motorsykkel, moped',
                chosen: false
            },
            {
                id: 'varigmøbler1_3',
                value: "3",
                descriptionValue: 'Campingvogn, bobil',
                chosen: false
            },
            {
                id: 'varigtransport1_4',
                value: "4",
                descriptionValue: 'Båt, båtmotor',
                chosen: false
            },
            {
                id: 'varigtransport1_5',
                value: "5",
                descriptionValue: 'Tilhenger',
                chosen: false
            },
            {
                id: 'varigtransport1_6',
                value: "6",
                descriptionValue: 'Andre transportmidler',
                chosen: false
            },
            {
                id: 'varigtransport1_7',
                value: "7",
                descriptionValue: 'Ingen av disse',
                chosen: false
            },
        ]
    },
    inputType: "checkbox"
} as QuestionFormType
