import {QuestionFormType} from "../QuestionFormType";
import {Theme} from "../themes";

export const UTGIFTFRITID2: QuestionFormType = {
    id: 'utgiftfritid2',
    theme: Theme.holidayHome,
    order: 53,
    questionText: 'Hvor mye har du betalt som din del av utgiftene de siste 12 månedene?',
    hasAnswered: false,
    answerValue: {
        answers: [
            {
                id: 'utgiftfritid2_1',
                value: "",
                descriptionValue: 'Beløp',
                chosen: true
            }
        ]
    },
    dependentOnQuestionCriteria: [
        [
            {
                questionId: "utgiftfritid1",
                questionValue: "2"
            },
        ]
    ],
    inputType: "number",
    inputPostfix: "cash"
} as QuestionFormType
