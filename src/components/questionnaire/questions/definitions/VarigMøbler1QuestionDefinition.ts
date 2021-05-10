import {QuestionFormType} from "../QuestionFormType";

export const VARIGMØBLER1: QuestionFormType = {
    id: 'varigmøbler1',
    order: 111,
    questionText: 'Møbler og inventar Har du/dere i løpet av de siste 12 månedene kjøpt eller fått… ',
    hasAnswered: false,
    answerValue: {
        answers: [
            {
                id: 'varigmøbler1_1',
                value: "1",
                descriptionValue: 'Sofa',
                chosen: false
            },
            {
                id: 'varigmøbler1_2',
                value: "2",
                descriptionValue: 'Utemøbler',
                chosen: false
            },
            {
                id: 'varigmøbler1_3',
                value: "3",
                descriptionValue: 'Spisebord',
                chosen: false
            },
            {
                id: 'varigmøbler1_4',
                value: "4",
                descriptionValue: 'Seng',
                chosen: false
            },
            {
                id: 'varigmøbler1_5',
                value: "5",
                descriptionValue: 'Bokhyller/reol',
                chosen: false
            },
            {
                id: 'varigmøbler1_6',
                value: "6",
                descriptionValue: 'Skap',
                chosen: false
            },
            {
                id: 'varigmøbler1_7',
                value: "7",
                descriptionValue: 'Lamper/belysning',
                chosen: false
            },
            {
                id: 'varigmøbler1_8',
                value: "8",
                descriptionValue: 'Andre større møbler/inventar',
                chosen: false
            },
            {
                id: 'varigmøbler1_9',
                value: "9",
                descriptionValue: 'Ingen av disse',
                chosen: false
            },
        ]
    },
    inputType: "checkbox"
} as QuestionFormType
