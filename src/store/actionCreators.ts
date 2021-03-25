import {QuestionFormType} from "../components/questionnaire/questions/QuestionFormType";
import {CHANGE_FOCUS, CHANGE_FORM_VALUE} from "./actionTypes";
import {Dispatch} from "redux";
import {HistoryBlock} from "./reducers/questionReducer";

export type QuestionAction = {
    type: string
    question?: QuestionFormType
    focus?: string,
    history?: HistoryBlock
}

export type FocusAction = {
    type: string
    focus: string
}

export type AppAction = {
    type: string
    question: QuestionFormType
    focus: string
}

export type DispatchType = (args: QuestionAction) => QuestionAction
export type DispatchTypeFocus = (args: FocusAction) => FocusAction

export const changeFormValue = (question: QuestionFormType) => (dispatch: Dispatch) => {
    const action: QuestionAction = {
        type: CHANGE_FORM_VALUE,
        question
    }

    dispatch(action)
}
export const changeFocus = (focusId: string, history: HistoryBlock) => (dispatch: Dispatch) => {
    const action: QuestionAction = {
        type: CHANGE_FOCUS,
        focus: focusId,
        history: history
    }

    dispatch(action)
}

export const backNavigation = (focusId: string, history: HistoryBlock) => (dispatch: Dispatch) => {
    const action: QuestionAction = {
        type: CHANGE_FOCUS,
        focus: focusId,
        history: history
    }

    dispatch(action)
}
