import {QuestionFormType} from "../QuestionFormType";
import {Theme} from "../themes";

export const LRENT2: QuestionFormType = {
    id: 'lrent2',
    theme: Theme.ownerExpedenaturesEconomy,
    order: 12,
    questionText: 'Hva er rentesatsen for boliglånet /lånene med sikkerhet i boligen nå? Oppgi i prosent',
    hasAnswered: false,
    answerValue: {
        answers: [
            {
                id: 'lrent2_1',
                value: "",
                descriptionValue: 'Rentesats for boliglånet',
                chosen: true
            },
            {
                id: 'lrent2_2',
                value: "2",
                descriptionValue: 'Vet ikke',
                chosen: false,
                hidden: true
            }
        ]
    },
    inputType: "number-checkbox",
    inputPostfix: "percent"
} as QuestionFormType
