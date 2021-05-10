import {QuestionFormType} from "../QuestionFormType";

export const TILSYN3: QuestionFormType = {
    id: 'tilsyn3',
    order: 122,
    questionText: 'Hvor store utgifter hadde du/dere til disse tiltakene? Dersom betaling til håndverkere også dekket materialer eller innredning, kan du oppgi alt under «til håndverkere».',
    hasAnswered: false,
    answerValue: {
        answers: [
            {
                id: 'tilsyn3_1',
                value: "",
                descriptionValue: 'Barnehage eller familiebarnehage med kommunal støtte',
                chosen: true
            },
            {
                id: 'tilsyn3_2',
                value: "",
                descriptionValue: 'Barnepark',
                chosen: true
            },
            {
                id: 'tilsyn3_3',
                value: "",
                descriptionValue: 'Dagmamma, au-pair eller lignende',
                chosen: true
            },
            {
                id: 'tilsyn3_4',
                value: "",
                descriptionValue: 'Skolefritidsordning (SFO), Aktivitetsskole (AKS)',
                chosen: true
            },
            {
                id: 'tilsyn3_5',
                value: "",
                descriptionValue: 'Slektninger, bekjente',
                chosen: true
            },
            {
                id: 'tilsyn3_6',
                value: "",
                descriptionValue: 'Avlastningsordning for barn med nedsatt funksjonsevne',
                chosen: true
            },
            {
                id: 'tilsyn3_7',
                value: "",
                descriptionValue: 'Annen type barnepass',
                chosen: true
            },
        ]
    },
    dependentOnQuestionCriteria: [
        [
            {
                questionId: "tilsyn2",
                questionValue: "",
            }
        ]
    ],
    inputType: "multifield-number-dependent",
    inputPostfix: "cash"
} as QuestionFormType
