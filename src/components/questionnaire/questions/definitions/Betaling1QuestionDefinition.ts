import {QuestionFormType} from "../QuestionFormType";
import {Theme} from "../themes";

export const BETALING1: QuestionFormType = {
    id: 'betaling1',
    theme: Theme.paymentOptions,
    order: 126,
    questionText: 'Hvordan betaler husholdningen vanligvis for dagligvarer?',
    hasAnswered: false,
    answerValue: {
        answers: [
            {
                id: 'betaling1_1',
                value: "1",
                descriptionValue: 'Debetkort hvor man drar/tæpper kortet i terminal',
                chosen: false
            },
            {
                id: 'betaling1_2',
                value: "2",
                descriptionValue: 'Kredittkort, f. eks. MasterCard, American Express eller Trumf visa hvor man drar/tæpper kortet i terminal',
                chosen: false
            },
            {
                id: 'betaling1_3',
                value: "3",
                descriptionValue: 'Kontanter',
                chosen: false
            },
            {
                id: 'betaling1_4',
                value: "4",
                descriptionValue: 'Mobilbetaling, f. eks. Apple Pay, Google Pay, Coopay eller lignende',
                chosen: false
            },
            {
                id: 'betaling1_5',
                value: "5",
                descriptionValue: 'Smartklokke',
                chosen: false
            },
            {
                id: 'betaling1_6',
                value: "6",
                descriptionValue: 'Annet',
                chosen: false
            },
        ]
    },
    inputType: "checkbox"
} as QuestionFormType

