import {QuestionFormType} from "../QuestionFormType";

export const VARIGKUNST1: QuestionFormType = {
    id: 'varigkunst1',
    order: 119,
    questionText: 'Kunst, smykker ol.\n' +
        'Har du/dere kjøpt i løpet av de siste 12 månedene kjøpt eller fått… ',
    hasAnswered: false,
    answerValue: {
        answers: [
            {
                id: 'varigkunst1_1',
                value: "1",
                descriptionValue: 'Smykker',
                chosen: false
            },
            {
                id: 'varigkunst1_2',
                value: "2",
                descriptionValue: 'Kunst',
                chosen: false
            },
            {
                id: 'varigkunst1_3',
                value: "3",
                descriptionValue: 'Bunad',
                chosen: false
            },
            {
                id: 'varigkunst1_4',
                value: "4",
                descriptionValue: 'Sølvtøy',
                chosen: false
            },
            {
                id: 'varigkunst1_5',
                value: "5",
                descriptionValue: 'Ingen av disse',
                chosen: false
            },
        ]
    },
    inputType: "checkbox"
} as QuestionFormType
