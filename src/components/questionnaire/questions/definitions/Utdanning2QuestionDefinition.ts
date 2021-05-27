import {QuestionFormType} from "../QuestionFormType";
import {Theme} from "../themes";

export const UTDANNING2: QuestionFormType = {
    id: 'utdanning2',
    order: 109,
    theme: Theme.education,
    questionText: 'Hvor mye betaler [du/dere] hver måned for?',
    subText: 'Hvis du/dere ikke betaler per måned, ber vi deg om å anslå hva utgiften er per måned.',
    hasAnswered: false,
    answerValue: {
        answers: [
            {
                id: 'utdanning2_1',
                value: "",
                descriptionValue: 'Privat barneskole eller ungdomsskole',
                chosen: true
            },
            {
                id: 'utdanning2_2',
                value: "",
                descriptionValue: 'Videregående skole',
                chosen: true
            },
            {
                id: 'utdanning2_3',
                value: "",
                descriptionValue: 'Høyskole eller universitet',
                chosen: true
            },
            {
                id: 'utdanning2_4',
                value: "",
                descriptionValue: 'Folkehøyskole',
                chosen: true
            },
            {
                id: 'utdanning2_5',
                value: "",
                descriptionValue: 'Annen utdanning',
                chosen: true
            },
        ]
    },
    dependentOnQuestionCriteria: [
        [
            {
                questionId: "utdanning1",
                questionValue: "1",
            }
        ],
        [
            {
                questionId: "utdanning1",
                questionValue: "2",
            }
        ],
        [
            {
                questionId: "utdanning1",
                questionValue: "3",
            }
        ],
        [
            {
                questionId: "utdanning1",
                questionValue: "4",
            }
        ],
        [
            {
                questionId: "utdanning1",
                questionValue: "5",
            }
        ],
    ],
    inputType: "multifield-number-dependent",
    inputPostfix: "cash"
} as QuestionFormType
