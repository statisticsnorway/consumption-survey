import {
	CHANGE_FOCUS,
	CHANGE_FORM_VALUE,
	CHANGE_QUESTION_LIST,
} from "./actionTypes"
import { Dispatch } from "redux"
import { HistoryBlock } from "./reducers/questionReducer"
import {
	AnswerValueType,
	QuestionFormType,
} from "../components/questionnaire/questions/QuestionFormType"

export type QuestionAction = {
	type: string
	question?: QuestionFormType
	questions?: QuestionFormType[]
	focus?: string
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

export const changeQuestionList =
	(questions: QuestionFormType[]) => (dispatch: Dispatch) => {
		const action: QuestionAction = {
			type: CHANGE_QUESTION_LIST,
			questions,
		}
		dispatch(action)
	}

export const changeFormValue =
	(question: QuestionFormType) => (dispatch: Dispatch) => {
		const action: QuestionAction = {
			type: CHANGE_FORM_VALUE,
			question,
		}

		dispatch(action)
	}
export const changeFocus =
	(focusId: string, history: HistoryBlock) => (dispatch: Dispatch) => {
		const action: QuestionAction = {
			type: CHANGE_FOCUS,
			focus: focusId,
			history: history,
		}

		dispatch(action)
	}

export const unhideAnswerOption =
	(question: QuestionFormType) => (dispatch: Dispatch) => {
		;(question.answerValue.answers as AnswerValueType[]).forEach(
			(a: AnswerValueType) => {
				if (a.descriptionValue?.toLowerCase() === "vet ikke") {
					a.hidden = false
				}
			}
		)

		console.log({ question })

		const action: QuestionAction = {
			type: CHANGE_FORM_VALUE,
			question,
		}

		dispatch(action)
	}

export const backNavigation =
	(focusId: string, history: HistoryBlock) => (dispatch: Dispatch) => {
		const action: QuestionAction = {
			type: CHANGE_FOCUS,
			focus: focusId,
			history: history,
		}

		dispatch(action)
	}
