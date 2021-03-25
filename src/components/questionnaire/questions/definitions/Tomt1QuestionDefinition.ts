import {QuestionFormType} from "../QuestionFormType";

export const TOMT1: QuestionFormType = {
    id: 'tomt1',
    order: 40,
    questionText: 'Har du/dere i løpet av de siste 12 månedene hatt utgifter til',
    hasAnswered: false,
    answerValue: {
        answers: [
            {
                id: 'tomt1_1',
                value: "1",
                descriptionValue: 'Graving eller planering på tomten?',
                chosen: false
            },
            {
                id: 'tomt1_2',
                value: "2",
                descriptionValue: 'å oppføre eller vedlikeholde uteplass?',
                chosen: false
            },
            {
                id: 'tomt1_3',
                value: "3",
                descriptionValue: 'å oppføre eller vedlikeholde støttemur eller gjerder?',
                chosen: false
            },
            {
                id: 'tomt1_4',
                value: "4",
                descriptionValue: 'å oppføre eller vedlikeholde adkomstvei?',
                chosen: false
            },
            {
                id: 'tomt1_5',
                value: "5",
                descriptionValue: 'andre oppgraderings- eller vedlikeholdstiltak på tomten?',
                chosen: false
            },
            {
                id: 'tomt1_6',
                value: "6",
                descriptionValue: 'å oppføre eller vedlikeholde garasje eller uthus?',
                chosen: false
            },
        ]
    },
    defaultNextQuestion: "tomt2",
    inputType: "checkbox"
} as QuestionFormType
