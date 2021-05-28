import {
	CHANGE_FOCUS,
	CHANGE_FORM_VALUE, CHANGE_MULTIPLE_QUESTIONS_AND_FOCUS,
	CHANGE_QUESTION_LIST,
} from "./actionTypes"
import { Dispatch } from "redux"
import { HistoryBlock } from "./reducers/questionReducer"
import {
	AnswerValueType,
	QuestionFormType,
} from "../components/questionnaire/questions/QuestionFormType"
import {getNextQuestionByOrder} from "../components/questionnaire/questions/questionFunctionsUtils";

export type QuestionAction = {
	type: string
	question?: QuestionFormType
	questions?: QuestionFormType[]
	focus?: string
	history?: HistoryBlock
	allHistory?: HistoryBlock[]
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

export const changeQuestionListAndFocus = (
	updatedQuestions: QuestionFormType[],
	questions: QuestionFormType[],
	currentQuestion: QuestionFormType,
	history: HistoryBlock[]
) => (dispatch: Dispatch) => {

	const updatedQuestionList = questions.filter(questionFromFullList => {
		return !(updatedQuestions.filter(updatedQuestion => updatedQuestion.id === questionFromFullList.id).length > 0)
	});

	updatedQuestions.forEach(q => updatedQuestionList.push(q))

	try{
		const nextQuestion = getNextQuestionByOrder(currentQuestion, updatedQuestionList);

		const focusQuestionId = nextQuestion.id
		const newHistoryEntry = {
			fromQuestionId: currentQuestion.id,
			fromQuestionIdAnswers: currentQuestion.answerValue.answers,
			toQuestionId: nextQuestion.id,
			stepDirection: "forward",
			stepCount: history ? history.length + 1 : 1
		} as HistoryBlock

		const action: QuestionAction = {
			type: CHANGE_MULTIPLE_QUESTIONS_AND_FOCUS,
			questions: questions,
			focus: focusQuestionId,
			history: newHistoryEntry
		}

		dispatch(action)
	} catch (e: any) {
		console.log("Error in dispatch")
		console.log({e})
	}
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
