import {QuestionFormType} from "../QuestionFormType";
import {Theme} from "../themes";

export const OPPGRADF1: QuestionFormType = {
    id: 'oppgradf1',
    theme: Theme.renovationHolidayHome,
    order: 58,
    questionText: 'Har du/dere hatt utgifter til oppgradering av fritidsboligen  som har bidratt til å øke fritidsboligens verdi de siste 12 månedene?',
    hasAnswered: false,
    answerValue: {
        answers: [
            {
                id: 'oppgradf1_1',
                value: "1",
                descriptionValue: 'Påbygg eller tilbygg på boligen?',
                chosen: false
            },
            {
                id: 'oppgradf1_2',
                value: "2",
                descriptionValue: 'Totalrenovering av fritidsbolig innvendig?',
                chosen: false
            },
            {
                id: 'oppgradf1_3',
                value: "3",
                descriptionValue: 'Nytt kjøkken?',
                chosen: false
            },
            {
                id: 'oppgradf1_4',
                value: "4",
                descriptionValue: 'Bygging av nytt bad eller totalrenovering av gammelt bad??',
                chosen: false
            },
            {
                id: 'oppgradf1_5',
                value: "5",
                descriptionValue: 'Etterisolering?',
                chosen: false
            },
            {
                id: 'oppgradf1_6',
                value: "6",
                descriptionValue: 'Utskifting av det elektriske anlegget?',
                chosen: false
            },
            {
                id: 'oppgradf1_7',
                value: "7",
                descriptionValue: 'Ny kledning utvendig?',
                chosen: false
            },
            {
                id: 'oppgradf1_8',
                value: "8",
                descriptionValue: 'Nytt tak?',
                chosen: false
            },
            {
                id: 'oppgradf1_9',
                value: "9",
                descriptionValue: 'Annet',
                chosen: false
            },
            {
                id: 'oppgradf1_10',
                value: "10",
                descriptionValue: 'Ingen av disse',
                chosen: false
            },

        ]
    },
    dependentOnQuestionCriteria: [
        [
            {
                questionId: "fritidsn1",
                questionValue: "1",
            },
        ],
        [
            {
                questionId: "fritidsn1",
                questionValue: "2",
            },
        ],
        [
            {
                questionId: "fritidsn1",
                questionValue: "3",
            },
        ]
    ],
    defaultNextQuestion: "oppgradf2",
    inputType: "checkbox"
} as QuestionFormType
