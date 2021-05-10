import {QuestionFormType} from "../QuestionFormType";
import {Theme} from "../themes";

export const GAR1B: QuestionFormType = {
    id: 'gar1b',
    theme: Theme.garageExpendatures,
    order: 35,
    questionText: 'Hvor store er utgiftene til parkering?',
    hasAnswered: false,
    answerValue: {
        answers: [
            {
                id: 'gar1b_1',
                value: "Måned",
                descriptionValue: 'Velg period mnd/kvartal/år',
                chosen: false
            },
            {
                id: 'gar1b_2',
                value: "",
                descriptionValue: 'Legg inn sum. 1-1.00.000',
                chosen: true
            },
            {
                id: 'gar1b_3',
                value: "3",
                descriptionValue: 'Vet ikke',
                chosen: false,
                hidden: true
            }
        ]
    },
    dependentOnQuestionCriteria: [
        [
            {
                questionId: "gar1a",
                questionValue: "1"
            }
        ]
    ],
    inputType: "number-optional-timeperiod-checkbox",
    inputPostfix: "cash"
} as QuestionFormType
