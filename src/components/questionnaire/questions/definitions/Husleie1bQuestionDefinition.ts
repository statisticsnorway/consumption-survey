import {QuestionFormType} from "../QuestionFormType";
import {Theme} from "../themes";

export const HUSLEIE1B: QuestionFormType = {
    id: 'husleie1b',
    theme: Theme.ownerExpedenaturesEconomy,
    order: 17,
    questionText: 'Har du redusert leie fordi..',
    hasAnswered: false,
    answerValue: {
        answers: [
            {
                id: 'husleie1b_1',
                value: "1",
                descriptionValue: 'Får dekket husleie av det offentlige ',
                chosen: false
            },
            {
                id: 'husleie1b_2',
                value: "2",
                descriptionValue: 'Får dekket husleie eller leier av arbeidsgiver',
                chosen: false
            },
            {
                id: 'husleie1b_3',
                value: "3",
                descriptionValue: 'Leier av familie eller venner',
                chosen: false
            },
            {
                id: 'husleie1b_r',
                value: "4",
                descriptionValue: 'Av andre grunner?',
                chosen: false
            }
        ]
    },
    dependentOnQuestionCriteria: [
        [
            {
                questionId: "husleie1a",
                questionValue: "2"
            }
        ]
    ],
    inputType: "radio"
} as QuestionFormType
