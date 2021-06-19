import {QuestionFormType} from "../QuestionFormType";
import {Theme} from "../themes";

export const VARIGFRITID1: QuestionFormType = {
    id: 'varigfritid1',
    order: 117,
    theme: Theme.rarePurchases,
    questionText: 'Har du/dere i løpet av de siste 12 månedene kjøpt eller fått… ',
    hasAnswered: false,
    answerValue: {
        answers: [
            {
                id: 'varigfritid1_1',
                value: "1",
                descriptionValue: 'Ski/skøyter',
                chosen: false
            },
            {
                id: 'varigfritid1_2',
                value: "2",
                descriptionValue: 'Jakt/fiskeutstyr',
                chosen: false
            },
            {
                id: 'varigfritid1_3',
                value: "3",
                descriptionValue: 'Dykkerutstyr',
                chosen: false
            },
            {
                id: 'varigfritid1_4',
                value: "4",
                descriptionValue: 'Telt eller annet friluftutstyr',
                chosen: false
            },
            {
                id: 'varigfritid1_5',
                value: "5",
                descriptionValue: 'Annet kostbart fritidsutstyr',
                chosen: false
            },
            {
                id: 'varigfritid1_6',
                value: "6",
                descriptionValue: 'Ingen av disse',
                chosen: false
            },
        ]
    },
    inputType: "checkbox"
} as QuestionFormType
