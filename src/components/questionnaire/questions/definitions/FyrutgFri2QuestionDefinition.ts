import {QuestionFormType} from "../QuestionFormType";
import {Theme} from "../themes";

export const FYRUTGFRI2: QuestionFormType = {
    id: 'fyrutgfri2',
    theme: Theme.powerHolidayHome,
    order: 67,
    questionText: 'Hvor store utgifter har du/dere til..',
    hasAnswered: false,
    answerValue: {
        answers: [

            {
                id: 'fyrutgfri2_2',
                value: "",
                descriptionValue: 'Varmepumpe',
                chosen: true
            },
            {
                id: 'fyrutgfri2_3',
                value: "",
                descriptionValue: 'Jord/bergvarme',
                chosen: true
            },
            {
                id: 'fyrutgfri2_4',
                value: "",
                descriptionValue: 'Vedfyring/pellets',
                chosen: true
            },
            {
                id: 'fyrutgfri2_5',
                value: "",
                descriptionValue: 'Parafin/oljefyring',
                chosen: true
            },
            {
                id: 'fyrutgfri2_6',
                value: "",
                descriptionValue: 'Gass (Installert med rør)',
                chosen: true
            },
            {
                id: 'fyrutgfri2_7',
                value: "",
                descriptionValue: 'Gass fra beholder',
                chosen: true
            },
            {
                id: 'fyrutgfri2_8',
                value: "",
                descriptionValue: 'Fjernvarme',
                chosen: true
            },
            {
                id: 'fyrutgfri2_9',
                value: "",
                descriptionValue: 'Annet',
                chosen: true
            },
        ]
    },
    dependentOnQuestionCriteria: [
        [
            {
                questionId: "fyrutgfri1",
                questionValue: ""
            },
        ]
    ],
    inputType: "multifield-number-dependent",
    inputPostfix: "cash"
} as QuestionFormType
