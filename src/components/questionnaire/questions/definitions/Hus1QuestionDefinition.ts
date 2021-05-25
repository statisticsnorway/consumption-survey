import {QuestionFormType} from "../QuestionFormType";
import {Theme} from "../themes";

export const HUS1: QuestionFormType =
    {
        id: 'hus1',
        order: 1,
        theme: Theme.dwelling,
        questionText: 'Bor [du/dere] i?',
        hasAnswered: false,
        answerValue: {
            answers: [
                {
                    id: 'hus1_1',
                    value: "1",
                    descriptionValue: 'Enebolig',
                    chosen: false
                },
                {
                    id: 'hus1_2',
                    value: "2",
                    descriptionValue: 'Rekke- eller tomannsbolig',
                    chosen: false
                },
                {
                    id: 'hus1_3',
                    value: "3",
                    descriptionValue: 'Tre-, eller firemannsbolig',
                    chosen: false
                },
                {
                    id: 'hus1_4',
                    value: "4",
                    descriptionValue: 'Leilighet i blokk, bygård eller annet hus med mange boliger',
                    chosen: false
                },
                {
                    id: 'hus1_5',
                    value: "5",
                    descriptionValue: 'Bor i båt, campingvogn eller bil',
                    chosen: false
                }
            ]
        },
        inputType: "radio"
    } as QuestionFormType

