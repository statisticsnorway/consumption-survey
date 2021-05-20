import {QuestionFormType} from "../QuestionFormType";
import {Theme} from "../themes";

export const TOMTF1: QuestionFormType = {
    id: 'tomtf1',
    theme: Theme.renovationHolidayHome,
    order: 62,
    questionText: 'Har du/dere i løpet av de siste 12 månedene hatt utgifter til',
    hasAnswered: false,
    answerValue: {
        answers: [
            {
                id: 'tomtf1_1',
                value: "1",
                descriptionValue: 'Graving eller planering på tomten?',
                chosen: false
            },
            {
                id: 'tomtf1_2',
                value: "2",
                descriptionValue: 'Oppføring eller vedlikehold av uteplass?',
                chosen: false
            },
            {
                id: 'tomtf1_3',
                value: "3",
                descriptionValue: 'Oppføring eller vedlikehold av støttemur eller gjerder?',
                chosen: false
            },
            {
                id: 'tomtf1_4',
                value: "4",
                descriptionValue: 'Oppføring eller vedlikehold av adkomstvei?',
                chosen: false
            },
            {
                id: 'tomtf1_5',
                value: "5",
                descriptionValue: 'Oppføring eller vedlikehold av garasje eller uthus?',
                chosen: false
            },
            {
                id: 'tomtf1_6',
                value: "6",
                descriptionValue: 'Annet',
                chosen: false
            },
            {
                id: 'tomtf1_7',
                value: "7",
                descriptionValue: 'Ingen av disse',
                chosen: false
            },
        ]
    },
    dependentOnQuestionCriteria: [
        [
            {
                questionId: "fritidsn1",
                questionValue: "4",
                specialCompare: "logicNot"
            },
        ],
    ],
    inputType: "checkbox"
} as QuestionFormType
