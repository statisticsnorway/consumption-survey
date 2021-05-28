import {QuestionFormType} from "../QuestionFormType";
import {Theme} from "../themes";

export const FUTG4: QuestionFormType = {
    id: 'futg4',
    theme: Theme.ownerExpedenaturesEconomy,
    order: 23,
    questionText: 'Hvor mye av husleien/fellesutgiftene går til å dekke renter og avdrag på fellesgjeld?',
    hasAnswered: false,
    answerValue: {
        answers: [
            {
                id: 'futg4_1',
                value: "",
                descriptionValue: 'Beløp',
                chosen: true
            },
            {
                id: 'futg4_2',
                value: "2",
                descriptionValue: 'Vet ikke',
                chosen: false,
                hidden: true
            }
        ]
    },
    dependentOnQuestionCriteria: [
        [
            {
                questionId: 'fgjeld',
                questionValue: '2',
                specialCompare: "logicNot"
            },
            {
                questionId: 'fgjeld',
                questionValue: '3',
                specialCompare: "logicNot"
            },
            {
                questionId: 'futg1',
                questionValue: '1',
            },
        ],
    ],
    inputType: "number-checkbox",
    inputPostfix: "cash"
} as QuestionFormType

//TODO Teknisk sett åpen for bug siden fgjeld (fellesgjeld) KAN være 2 og 3 kr, bare veeeeeldig usannsynlig.