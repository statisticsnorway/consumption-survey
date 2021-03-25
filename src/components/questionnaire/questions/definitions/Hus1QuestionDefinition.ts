import {QuestionFormType} from "../QuestionFormType";

export const HUS1: QuestionFormType =
    {
        id: 'hus1',
        order: 1,
        questionText: 'Hva slags hustype bor du/dere i ?',
        hasAnswered: false,
        answerValue: {
            answers: [
                {
                    id: 'hus1_1',
                    value: "1",
                    descriptionValue: 'Enebolig',
                    chosen: false
                },
                {
                    id: 'hus1_2',
                    value: "2",
                    descriptionValue: 'Rekke',
                    chosen: false
                },
                {
                    id: 'hus1_3',
                    value: "3",
                    descriptionValue: 'Tre',
                    chosen: false
                },
                {
                    id: 'hus1_4',
                    value: "4",
                    descriptionValue: 'Leilighet',
                    chosen: false
                },
                {
                    id: 'hus1_5',
                    value: "5",
                    descriptionValue: 'Båt',
                    chosen: false
                }
            ]
        },
        defaultNextQuestion: "bol1",
        alternativeNextQuestionCriteria: [{
            currentQuestionValue: "4",
            nextQuestionId: "hus2",
            nextQuestionDependencies: [
                {
                    questionId: "hus1",
                    questionValue: "4"
                }
            ]
        }],
        inputType: "radio"
    } as QuestionFormType

