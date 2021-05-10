import {QuestionFormType} from "../QuestionFormType";
import {Theme} from "../themes";

export const HUSLEIE2: QuestionFormType = {
    id: 'husleie2',
    theme: Theme.rentDwelling,
    order: 18,
    questionText: 'Hvor mye betaler [du/dere] i fellesutgifter eller husleie pr. måned',
    hasAnswered: false,
    answerValue: {
        answers: [
            {
                id: 'husleie2_1',
                value: "",
                descriptionValue: '1-99.997 Kroner',
                chosen: true
            }
        ]
    },
    dependentOnQuestionCriteria: [
        [
            {
                questionId: "husleie1",
                questionValue: "1"
            },
            {
                questionId: "eier1",
                questionValue: "2"
            }
        ]
    ],
    inputType: "number",
    inputPostfix: "cash"
} as QuestionFormType
