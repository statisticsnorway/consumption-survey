import {QuestionFormType} from "../QuestionFormType";
import {Theme} from "../themes";

export const UTDANNING1: QuestionFormType = {
    id: 'utdanning1',
    order: 108,
    theme: Theme.education,
    questionText: 'Har du eller noen i husholdningen betalt skolepenger for noen av de følgende utdanninger de siste 12 månedene?',
    hasAnswered: false,
    answerValue: {
        answers: [
            {
                id: 'utdanning1_1',
                value: "1",
                descriptionValue: 'Privat barneskole eller ungdomsskole',
                chosen: false
            },
            {
                id: 'utdanning1_2',
                value: "2",
                descriptionValue: 'Videregående skole',
                chosen: false
            },
            {
                id: 'utdanning1_3',
                value: "3",
                descriptionValue: 'Høyskole eller universitet',
                chosen: false
            },
            {
                id: 'utdanning1_4',
                value: "4",
                descriptionValue: 'Folkehøyskole',
                chosen: false
            },
            {
                id: 'utdanning1_5',
                value: "5",
                descriptionValue: 'Annen utdanning',
                chosen: false
            },
            {
                id: 'utdanning1_6',
                value: "6",
                descriptionValue: 'Nei',
                chosen: false
            },
        ]
    },
    inputType: "checkbox"
} as QuestionFormType
