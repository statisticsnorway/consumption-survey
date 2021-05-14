import {QuestionFormType} from "../QuestionFormType";
import {Theme} from "../themes";

export const LAAN2: QuestionFormType = {
    id: 'laan2',
    theme: Theme.ownerExpedenaturesEconomy,
    order: 8,
    questionText: 'Hvor mye gjenstår av dette/disse lånet/lånene?',
    hasAnswered: false,
    answerValue: {
        answers: [
            {
                id: 'laan2_1',
                value: "",
                descriptionValue: '1-1.000.000.000',
                chosen: true
            }
        ]
    },
    helperText: {
        title: "Info",
        content: "Oppgi 0 dersom du ikke betaler på lånet. Ta ikke med med nedbetaling av fellesgjeld over husleien."
    },
    dependentOnQuestionCriteria: [
        [
            {
                questionId: "laan1",
                questionValue: "1"
            }
        ]
    ],
    inputType: "number",
    inputPostfix: "cash"
} as QuestionFormType
