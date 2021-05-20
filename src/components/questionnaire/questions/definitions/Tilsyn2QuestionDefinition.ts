import {QuestionFormType} from "../QuestionFormType";

export const TILSYN2: QuestionFormType = {
    id: 'tilsyn2',
    order: 121,
    questionText: 'Hvilken eller hvilke reisemåter er det snakk om? (tick off)',
    hasAnswered: false,
    answerValue: {
        answers: [
            {
                id: 'tilsyn2_1',
                value: "1",
                descriptionValue: 'Barnehage eller familiebarnehage med kommunal støtte',
                chosen: false
            },
            {
                id: 'tilsyn2_2',
                value: "2",
                descriptionValue: 'Barnepark',
                chosen: false
            },
            {
                id: 'tilsyn2_3',
                value: "3",
                descriptionValue: 'Dagmamma, au-pair eller lignende',
                chosen: false
            },
            {
                id: 'tilsyn2_4',
                value: "4",
                descriptionValue: 'Skolefritidsordning (SFO), Aktivitetsskole (AKS)',
                chosen: false
            },
            {
                id: 'tilsyn2_5',
                value: "5",
                descriptionValue: 'Slektninger, bekjente',
                chosen: false
            },
            {
                id: 'tilsyn2_6',
                value: "6",
                descriptionValue: 'Avlastningsordning for barn med nedsatt funksjonsevne',
                chosen: false
            },
            {
                id: 'tilsyn2_7',
                value: "7",
                descriptionValue: 'Annen type barnepass',
                chosen: false
            },
        ]
    },
    dependentOnQuestionCriteria: [
        [
            {
                questionId: "tilsyn1",
                questionValue: "1"
            }
        ]
    ],
    inputType: "checkbox"
} as QuestionFormType
