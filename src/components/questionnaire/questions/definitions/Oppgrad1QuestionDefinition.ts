import {QuestionFormType} from "../QuestionFormType";
import {Theme} from "../themes";

export const OPPGRAD1: QuestionFormType = {
    id: 'oppgrad1',
    theme: Theme.renovationDwelling,
    order: 36,
    questionText: 'Hvilke utgifter har du/dere hatt til oppgradering av boligen de siste 12 månedene?',
    hasAnswered: false,
    answerValue: {
        answers: [
            {
                id: 'oppgrad1_1',
                value: "1",
                descriptionValue: 'Påbygg eller tilbygg på boligen',
                chosen: false
            },
            {
                id: 'oppgrad1_2',
                value: "2",
                descriptionValue: 'Utvidelse av boareal, for eksempel ved å innrede kjeller eller loft',
                chosen: false
            },
            {
                id: 'oppgrad1_3',
                value: "3",
                descriptionValue: 'Totalrenovering av boligen innvendig',
                chosen: false
            },
            {
                id: 'oppgrad1_4',
                value: "4",
                descriptionValue: 'Nytt kjøkken',
                chosen: false
            },
            {
                id: 'oppgrad1_5',
                value: "5",
                descriptionValue: 'Bygging av nytt bad eller totalrenovering av gammelt bad',
                chosen: false
            },
            {
                id: 'oppgrad1_6',
                value: "6",
                descriptionValue: 'Etterisolering',
                chosen: false
            },
            {
                id: 'oppgrad1_7',
                value: "7",
                descriptionValue: 'Nytt oppvarmingssytem',
                chosen: false
            },
            {
                id: 'oppgrad1_8',
                value: "8",
                descriptionValue: 'Utskifting av det elektriske anlegget',
                chosen: false
            },
            {
                id: 'oppgrad1_9',
                value: "9",
                descriptionValue: 'Nytt tak',
                chosen: false
            },
            {
                id: 'oppgrad1_10',
                value: "10",
                descriptionValue: 'Annet',
                chosen: false
            },
            {
                id: 'oppgrad1_11',
                value: "11",
                descriptionValue: 'Nei, ingen av disse',
                chosen: false
            },
        ]
    },
    dependentOnQuestionCriteria: [
        [
            {
                questionId: "eier1",
                questionValue: "1"
            }
        ]
    ],
    inputType: "checkbox"
} as QuestionFormType
