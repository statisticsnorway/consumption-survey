import {AnswerValueType, QuestionAnswerType, QuestionFormType} from "./QuestionFormType";
import {Dispatch} from "redux";
import {changeFormValue} from "../../../store/actionCreators";

export const updateQuestionAnswerToStore = (eventValue: string, currentQuestion: QuestionFormType, dispatch: Dispatch<any>) => {
    const chosenValue: string | number | boolean = eventValue;
    if (!eventValue) {
        return;
    }

    const updatedQuestion = {
        ...currentQuestion,
        answerValue: {
            answers: (currentQuestion.answerValue.answers as AnswerValueType[])
                .map((answerValue: AnswerValueType) => {
                if (answerValue.value === chosenValue) {
                    return {
                        ...answerValue,
                        chosen: true
                    }
                }
                return {
                    ...answerValue,
                    chosen: false
                }
            }),
        },
        hasAnswered: true
    }

    dispatch(changeFormValue(updatedQuestion))
}

export const updateNestedQuestionAnswerToStore = (eventValue: string, currentQuestion: QuestionFormType, dispatch: Dispatch<any>) => {
    const chosenValue: string | number | boolean = eventValue;
    if (!eventValue) {
        return;
    }

    if((currentQuestion.answerValue.answers as QuestionAnswerType[])[0].answers !== undefined){
        const questionAnswerTypes = currentQuestion.answerValue.answers as QuestionAnswerType[]

        const updatedQuestion = {
            ...currentQuestion,
            answerValue: {
                answers: questionAnswerTypes.map(questionAnswer => {
                    return {
                        ...questionAnswer,
                        answers: (questionAnswer.answers as AnswerValueType[])
                            .map(answerValue => {
                                const answerLevel = chosenValue.split("_")[0];
                                if((answerValue.value as string).includes(`${answerLevel}_`)){
                                    if (answerValue.value === chosenValue) {
                                        return {
                                            ...answerValue,
                                            chosen: true
                                        }
                                    }
                                    return {
                                        ...answerValue,
                                        chosen: false
                                    }
                                }

                                return {...answerValue};
                            })
                    } as QuestionAnswerType
                })
            }
        } as QuestionFormType

        dispatch(changeFormValue(updatedQuestion))
    }

    return null;
}

export const updateQuestionAnswerToStoreText = (eventValue: string, currentQuestion: QuestionFormType, dispatch: Dispatch<any>, answerId?: string) => {
    const valueFromForm: string | number | boolean = eventValue;
    if (eventValue === undefined || eventValue === null) {
        return;
    }

    const updatedQuestion = {
        ...currentQuestion,
        answerValue: {
            answers: (currentQuestion.answerValue.answers as AnswerValueType[])
                .map((answerValue: AnswerValueType) => {
                    if(answerId){
                        if(answerValue.id === answerId){
                            return {
                                ...answerValue,
                                value: valueFromForm
                            }
                        } else {
                            return {
                                ...answerValue
                            }
                        }
                    } else {
                        return {
                            ...answerValue,
                            value: valueFromForm
                        }
                    }
            }),
        },
        hasAnswered: true
    }

    dispatch(changeFormValue(updatedQuestion))
}

export const updateMultipleQuestionAnswerToStoreText = (eventValue: string, currentQuestion: QuestionFormType, dispatch: Dispatch<any>) => {
    const valueFromForm: string | number | boolean = eventValue;
    if (!eventValue) {
        return;
    }

    const updatedQuestion = {
        ...currentQuestion,
        answerValue: {
            answers: (currentQuestion.answerValue.answers as AnswerValueType[])
                .map((answerValue: AnswerValueType) => {
                    return {
                        ...answerValue,
                        chosen: valueFromForm.includes(answerValue.value as string)
                    }
                }),
        },
        hasAnswered: (valueFromForm.length > 1)
    }

    dispatch(changeFormValue(updatedQuestion))
}


// Kan ikke brukes sannsynligvis. I hvert fall ikke i render-
export const updateQuestionToNotAnsweredToStore = (question: QuestionFormType, dispatch: Dispatch<any>) => {
    dispatch(changeFormValue({
        ...question,
        hasAnswered: false
    }))
}
