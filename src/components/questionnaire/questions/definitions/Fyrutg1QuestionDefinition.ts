import {QuestionFormType} from "../QuestionFormType";
import {Theme} from "../themes";

export const FYRUTG1: QuestionFormType = {
    id: 'fyrutg1',
    theme: Theme.powerDwelling,
    order: 42,
    questionText: 'Hva slags oppvarming har dere i boligen?',
    hasAnswered: false,
    answerValue: {
        answers: [
            {
                id: 'fyrutg1_1',
                value: "1",
                descriptionValue: 'Elektrisitet',
                chosen: false
            },
            {
                id: 'fyrutg1_2',
                value: "2",
                descriptionValue: 'Varmepumpe',
                chosen: false
            },
            {
                id: 'fyrutg1_3',
                value: "3",
                descriptionValue: 'Fjernvarme',
                chosen: false
            },
            {
                id: 'fyrutg1_4',
                value: "4",
                descriptionValue: 'Vedfyring/pellets',
                chosen: false
            },
            {
                id: 'fyrutg1_5',
                value: "5",
                descriptionValue: 'Jord/bergvarme',
                chosen: false
            },
            {
                id: 'fyrutg1_6',
                value: "6",
                descriptionValue: 'Parafin/oljefyring',
                chosen: false
            },
            {
                id: 'fyrutg1_7',
                value: "7",
                descriptionValue: 'Gass (Installert med rør)',
                chosen: false
            },
            {
                id: 'fyrutg1_8',
                value: "8",
                descriptionValue: 'Gass fra beholder',
                chosen: false
            },
            {
                id: 'fyrutg1_9',
                value: "9",
                descriptionValue: 'Annet',
                chosen: false
            },
        ]
    },
    inputType: "checkbox"
} as QuestionFormType

// Betaler dere [du/dere] fellesutgifter til borettslag eller sameie? --- JA
// Eier [du/dere] som selveier eller gjennom borettslag? ----- Borettslag