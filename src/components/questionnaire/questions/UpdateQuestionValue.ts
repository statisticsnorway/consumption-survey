import {
	AnswerValueType, DependentOnQuestionCriteria,
	QuestionAnswerType,
	QuestionFormType,
} from "./QuestionFormType"
import { Dispatch } from "redux"
import { changeFormValue } from "../../../store/actionCreators"

export const updateQuestionAnswerToStore = (
	eventValue: string,
	currentQuestion: QuestionFormType,
	dispatch: Dispatch<any>
) => {
	const chosenValue: string | number | boolean = eventValue
	if (!eventValue) {
		return
	}

	const updatedQuestion = {
		...currentQuestion,
		answerValue: {
			answers: (currentQuestion.answerValue.answers as AnswerValueType[]).map(
				(answerValue: AnswerValueType) => {
					if (answerValue.value === chosenValue) {
						return {
							...answerValue,
							chosen: true,
						}
					}
					return {
						...answerValue,
						chosen: false,
					}
				}
			),
		},
		hasAnswered: true,
	}

	dispatch(changeFormValue(updatedQuestion))
}

export const updateNestedQuestionAnswerToStore = (
	eventValue: string,
	currentQuestion: QuestionFormType,
	dispatch: Dispatch<any>
) => {
	const chosenValue: string | number | boolean = eventValue
	if (!eventValue) {
		return
	}

	if (
		(currentQuestion.answerValue.answers as QuestionAnswerType[])[0].answers !==
		undefined
	) {
		const questionAnswerTypes = currentQuestion.answerValue
			.answers as QuestionAnswerType[]

		const updatedQuestion = {
			...currentQuestion,
			answerValue: {
				answers: questionAnswerTypes.map((questionAnswer) => {
					return {
						...questionAnswer,
						answers: (questionAnswer.answers as AnswerValueType[]).map(
							(answerValue) => {
								const answerLevel = chosenValue.split("_")[0]
								if ((answerValue.value as string).includes(`${answerLevel}_`)) {
									if (answerValue.value === chosenValue) {
										return {
											...answerValue,
											chosen: true,
										}
									}
									return {
										...answerValue,
										chosen: false,
									}
								}

								return { ...answerValue }
							}
						),
					} as QuestionAnswerType
				}),
			},
		} as QuestionFormType

		dispatch(changeFormValue(updatedQuestion))
	}

	return null
}

export const updateQuestionAnswerToStoreText = (
	eventValue: string,
	currentQuestion: QuestionFormType,
	dispatch: Dispatch<any>,
	answerId?: string
) => {
	const valueFromForm: string | number | boolean = eventValue
	if (eventValue === undefined || eventValue === null) {
		return
	}

	const updatedQuestion = {
		...currentQuestion,
		answerValue: {
			answers: (currentQuestion.answerValue.answers as AnswerValueType[]).map(
				(answerValue: AnswerValueType) => {
					if (answerId) {
						if (answerValue.id === answerId) {
							return {
								...answerValue,
								value: valueFromForm,
							}
						} else {
							return {
								...answerValue,
							}
						}
					} else {
						return {
							...answerValue,
							value: valueFromForm,
						}
					}
				}
			),
		},
		hasAnswered: true,
	}

	dispatch(changeFormValue(updatedQuestion))
}

export const updateCheckboxTextQuestionAnswerToStore = (
	eventValue: string,
	currentQuestion: QuestionFormType,
	dispatch: Dispatch<any>
) => {
	const valueFromForm: string | number | boolean = eventValue
	if (!eventValue) {
		return
	}
	const checked = valueFromForm.includes(
		(currentQuestion.answerValue.answers as AnswerValueType[])[1]
			.value as string
	)
	const updatedQuestion = {
		...currentQuestion,
		answerValue: {
			answers: [
				{
					id: (currentQuestion.answerValue.answers as AnswerValueType[])[0].id,
					value: (currentQuestion.answerValue.answers as AnswerValueType[])[0]
						.value,
					descriptionValue: (
						currentQuestion.answerValue.answers as AnswerValueType[]
					)[0].descriptionValue,
					chosen: !checked,
				},
				{
					id: (currentQuestion.answerValue.answers as AnswerValueType[])[1].id,
					value: (currentQuestion.answerValue.answers as AnswerValueType[])[1]
						.value,
					descriptionValue: (
						currentQuestion.answerValue.answers as AnswerValueType[]
					)[1].descriptionValue,
					chosen: checked,
				},
			],
		},
		hasAnswered: valueFromForm.length > 1, //TODO Kan bare ha gått forbi spørsmålet
	}
	dispatch(changeFormValue(updatedQuestion))
}

export const updateCheckboxTextQuestionWithTimePeriodAnswerToStore = (
	eventValue: string,
	currentQuestion: QuestionFormType,
	dispatch: Dispatch<any>
) => {
	const valueFromForm: string | number | boolean = eventValue
	if (!eventValue) {
		return
	}
	const checked = valueFromForm.includes(
		(currentQuestion.answerValue.answers as AnswerValueType[])[2]
			.value as string
	)
	const updatedQuestion = {
		...currentQuestion,
		answerValue: {
			answers: [
				{
					id: (currentQuestion.answerValue.answers as AnswerValueType[])[0].id,
					value: (currentQuestion.answerValue.answers as AnswerValueType[])[0]
						.value,
					descriptionValue: (
						currentQuestion.answerValue.answers as AnswerValueType[]
					)[0].descriptionValue,
					chosen: checked
						? false
						: !!(currentQuestion.answerValue.answers as AnswerValueType[])[1]
								.value,
				},
				{
					id: (currentQuestion.answerValue.answers as AnswerValueType[])[1].id,
					value: (currentQuestion.answerValue.answers as AnswerValueType[])[1]
						.value,
					descriptionValue: (
						currentQuestion.answerValue.answers as AnswerValueType[]
					)[1].descriptionValue,
					chosen: !checked,
				},
				{
					id: (currentQuestion.answerValue.answers as AnswerValueType[])[2].id,
					value: (currentQuestion.answerValue.answers as AnswerValueType[])[2]
						.value,
					descriptionValue: (
						currentQuestion.answerValue.answers as AnswerValueType[]
					)[2].descriptionValue,
					chosen: checked,
				},
			],
		},
		hasAnswered: valueFromForm.length > 1, //TODO Kan bare ha gått forbi spørsmålet
	}
	dispatch(changeFormValue(updatedQuestion))
}

export const updateMultipleQuestionAnswerToStoreText = (
	eventValue: string,
	currentQuestion: QuestionFormType,
	dispatch: Dispatch<any>
) => {
	const valueFromForm: string | number | boolean | string[] = eventValue
	if (!eventValue) {
		return
	}

	let arrayOfNoneOfThese: string[] = []
	if (valueFromForm && Array.isArray(valueFromForm)) {
		arrayOfNoneOfThese = valueFromForm.filter((v) => {
			const a = (currentQuestion.answerValue.answers as AnswerValueType[]).find(
				(a) => {
					if (v && v !== "") {
						return (a.value as string).toLowerCase() === v
					}
					return false
				}
			) as AnswerValueType

			if (a) {
				return (
					(a.descriptionValue as string)
						.toLowerCase()
						.includes("ingen av disse") ||
					(a.descriptionValue as string).toLowerCase() === "nei"
				)
			} else {
				return false
			}
		})
	}

	let updatedQuestion = {
		...currentQuestion,
		answerValue: {
			answers: (currentQuestion.answerValue.answers as AnswerValueType[]).map(
				(answerValue: AnswerValueType) => {
					if (arrayOfNoneOfThese.length > 0 && Array.isArray(valueFromForm)) {
						const chose =
							arrayOfNoneOfThese.filter((v) => {
								return valueFromForm.includes(v) && answerValue.value === v
							}).length > 0

						return {
							...answerValue,
							chosen: chose,
						}
					} else {
						return {
							...answerValue,
							chosen: valueFromForm.includes(answerValue.value as string),
						}
					}
				}
			),
		},
	}

	updatedQuestion = {
		...updatedQuestion,
		hasAnswered:
			(updatedQuestion.answerValue.answers as AnswerValueType[]).filter(
				(a) => a.chosen
			).length > 0,
	}

	dispatch(changeFormValue(updatedQuestion))
}

export const updateMultipleQuestionAnswerToStoreTextIMprovedCheckComponent = (
	eventValue: string,
	currentQuestion: QuestionFormType,
	dispatch: Dispatch<any>
) => {
	const valueFromForm: string | number | boolean | string[] = eventValue
	if (!eventValue) {
		return
	}

	const ingenAvDisseValgIsPressed =
		(currentQuestion.answerValue.answers as AnswerValueType[]).filter((a) => {
			if (
				a.descriptionValue &&
				(a.descriptionValue.toLowerCase().includes("ingen av disse") ||
					(a.descriptionValue as string).toLowerCase() === "nei")
			) {
				return a.value === eventValue
			}
			return false
		}).length > 0

	let ingenAvDisseIsAlreadyTicked =
		(currentQuestion.answerValue.answers as AnswerValueType[]).filter((a) => {
			if (
				a.descriptionValue &&
				(a.descriptionValue.toLowerCase().includes("ingen av disse") ||
					(a.descriptionValue as string).toLowerCase() === "nei")
			) {
				return a.chosen
			}
			return false
		}).length > 0

	let updatedQuestion = {
		...currentQuestion,
		answerValue: {
			answers: (currentQuestion.answerValue.answers as AnswerValueType[]).map(
				(answerValue: AnswerValueType) => {
					const currentAnswerIsIngenAvDisse =
						(answerValue.descriptionValue as string)
							.toLowerCase()
							.includes("ingen av disse") ||
						(answerValue.descriptionValue as string).toLowerCase() === "nei"

					if (ingenAvDisseValgIsPressed) {
						if (currentAnswerIsIngenAvDisse) {
							const tickIt = answerValue.value === eventValue
							return {
								...answerValue,
								chosen: ingenAvDisseIsAlreadyTicked ? !tickIt : tickIt,
							}
						} else {
							return {
								...answerValue,
								chosen: false,
							}
						}
					} else {
						const tickIt = valueFromForm === (answerValue.value as string)
						const chosen = answerValue.chosen ? !tickIt : tickIt

						if (ingenAvDisseIsAlreadyTicked) {
							return {
								...answerValue,
								chosen: currentAnswerIsIngenAvDisse ? false : chosen,
							} as AnswerValueType
						} else {
							return {
								...answerValue,
								chosen: chosen,
							} as AnswerValueType
						}
					}
				}
			),
		},
	}

	updatedQuestion = {
		...updatedQuestion,
		hasAnswered:
			(updatedQuestion.answerValue.answers as AnswerValueType[]).filter(
				(a) => a.chosen
			).length > 0,
	}

	console.log(currentQuestion.id)
	console.log({ valueFromForm })

	dispatch(changeFormValue(updatedQuestion))
}

// Kan ikke brukes sannsynligvis. I hvert fall ikke i render-
export const updateQuestionToNotAnsweredToStore = (
	question: QuestionFormType,
	dispatch: Dispatch<any>
) => {
	dispatch(
		changeFormValue({
			...question,
			hasAnswered: false,
		})
	)
}

export const updateQuestionAnswerToStoreFromExternal = (
	eventValue: string,
	currentQuestion: QuestionFormType
) => {
	const chosenValue: string | number | boolean = eventValue
	if (!eventValue) {
		return
	}

	const updatedQuestion = {
		...currentQuestion,
		answerValue: {
			answers: (currentQuestion.answerValue.answers as AnswerValueType[]).map(
				(answerValue: AnswerValueType) => {
					if (answerValue.value === chosenValue) {
						return {
							...answerValue,
							chosen: true,
						}
					}
					return {
						...answerValue,
						chosen: false,
					}
				}
			),
		},
		hasAnswered: true,
	}

	return updatedQuestion
}

export const updateNestedQuestionAnswerToStoreFromExternal = (
	eventValue: string,
	currentQuestion: QuestionFormType
) => {
	const chosenValue: string | number | boolean = eventValue
	if (!eventValue) {
		return
	}

	if (
		(currentQuestion.answerValue.answers as QuestionAnswerType[])[0].answers !==
		undefined
	) {
		const questionAnswerTypes = currentQuestion.answerValue
			.answers as QuestionAnswerType[]

		const updatedQuestion = {
			...currentQuestion,
			answerValue: {
				answers: questionAnswerTypes.map((questionAnswer) => {
					return {
						...questionAnswer,
						answers: (questionAnswer.answers as AnswerValueType[]).map(
							(answerValue) => {
								const answerLevel = chosenValue.split("_")[0]
								if ((answerValue.value as string).includes(`${answerLevel}_`)) {
									if (answerValue.value === chosenValue) {
										return {
											...answerValue,
											chosen: true,
										}
									}
									return {
										...answerValue,
										chosen: false,
									}
								}

								return { ...answerValue }
							}
						),
					} as QuestionAnswerType
				}),
			},
		} as QuestionFormType

		return updatedQuestion
	}

	return null
}

export const updateQuestionAnswerToStoreTextFromExternal = (
	eventValue: string,
	currentQuestion: QuestionFormType,
	answerId?: string
) => {
	const valueFromForm: string | number | boolean = eventValue
	if (eventValue === undefined || eventValue === null) {
		return
	}

	const updatedQuestion = {
		...currentQuestion,
		answerValue: {
			answers: (currentQuestion.answerValue.answers as AnswerValueType[]).map(
				(answerValue: AnswerValueType) => {
					if (answerId) {
						if (answerValue.id === answerId) {
							return {
								...answerValue,
								value: valueFromForm,
							}
						} else {
							return {
								...answerValue,
							}
						}
					} else {
						return {
							...answerValue,
							value: valueFromForm,
						}
					}
				}
			),
		},
		hasAnswered: true,
	}

	return updatedQuestion
}

export const updateCheckboxTextQuestionAnswerToStoreFromExternal = (
	eventValue: string,
	currentQuestion: QuestionFormType
) => {
	const valueFromForm: string | number | boolean = eventValue
	if (!eventValue) {
		return
	}
	const checked = valueFromForm.includes(
		(currentQuestion.answerValue.answers as AnswerValueType[])[1]
			.value as string
	)
	const updatedQuestion = {
		...currentQuestion,
		answerValue: {
			answers: [
				{
					id: (currentQuestion.answerValue.answers as AnswerValueType[])[0].id,
					value: (currentQuestion.answerValue.answers as AnswerValueType[])[0]
						.value,
					descriptionValue: (
						currentQuestion.answerValue.answers as AnswerValueType[]
					)[0].descriptionValue,
					chosen: !checked,
				},
				{
					id: (currentQuestion.answerValue.answers as AnswerValueType[])[1].id,
					value: (currentQuestion.answerValue.answers as AnswerValueType[])[1]
						.value,
					descriptionValue: (
						currentQuestion.answerValue.answers as AnswerValueType[]
					)[1].descriptionValue,
					chosen: checked,
				},
			],
		},
		hasAnswered: valueFromForm.length > 1, //TODO Kan bare ha gått forbi spørsmålet
	}
	return updatedQuestion
}

export const updateCheckboxTextQuestionWithTimePeriodAnswerToStoreFromExternal =
	(eventValue: string, currentQuestion: QuestionFormType) => {
		const valueFromForm: string | number | boolean = eventValue
		if (!eventValue) {
			return
		}
		const checked = valueFromForm.includes(
			(currentQuestion.answerValue.answers as AnswerValueType[])[2]
				.value as string
		)
		const updatedQuestion = {
			...currentQuestion,
			answerValue: {
				answers: [
					{
						id: (currentQuestion.answerValue.answers as AnswerValueType[])[0]
							.id,
						value: (currentQuestion.answerValue.answers as AnswerValueType[])[0]
							.value,
						descriptionValue: (
							currentQuestion.answerValue.answers as AnswerValueType[]
						)[0].descriptionValue,
						chosen: checked
							? false
							: !!(currentQuestion.answerValue.answers as AnswerValueType[])[1]
									.value,
					},
					{
						id: (currentQuestion.answerValue.answers as AnswerValueType[])[1]
							.id,
						value: (currentQuestion.answerValue.answers as AnswerValueType[])[1]
							.value,
						descriptionValue: (
							currentQuestion.answerValue.answers as AnswerValueType[]
						)[1].descriptionValue,
						chosen: !checked,
					},
					{
						id: (currentQuestion.answerValue.answers as AnswerValueType[])[2]
							.id,
						value: (currentQuestion.answerValue.answers as AnswerValueType[])[2]
							.value,
						descriptionValue: (
							currentQuestion.answerValue.answers as AnswerValueType[]
						)[2].descriptionValue,
						chosen: checked,
					},
				],
			},
			hasAnswered: valueFromForm.length > 1, //TODO Kan bare ha gått forbi spørsmålet
		}
		return updatedQuestion
	}

export const updateMultipleQuestionAnswerToStoreTextFromExternal = (
	eventValue: string,
	currentQuestion: QuestionFormType
) => {
	const valueFromForm: string | number | boolean | string[] = eventValue
	if (!eventValue) {
		return
	}

	let arrayOfNoneOfThese: string[] = []
	if (valueFromForm && Array.isArray(valueFromForm)) {
		arrayOfNoneOfThese = valueFromForm.filter((v) => {
			const a = (currentQuestion.answerValue.answers as AnswerValueType[]).find(
				(a) => {
					if (v && v !== "") {
						return (a.value as string).toLowerCase() === v
					}
					return false
				}
			) as AnswerValueType

			if (a) {
				return (
					(a.descriptionValue as string)
						.toLowerCase()
						.includes("ingen av disse") ||
					(a.descriptionValue as string).toLowerCase() === "nei"
				)
			} else {
				return false
			}
		})
	}

	const updatedQuestion = {
		...currentQuestion,
		answerValue: {
			answers: (currentQuestion.answerValue.answers as AnswerValueType[]).map(
				(answerValue: AnswerValueType) => {
					if (arrayOfNoneOfThese.length > 0 && Array.isArray(valueFromForm)) {
						const chose =
							arrayOfNoneOfThese.filter((v) => {
								return valueFromForm.includes(v) && answerValue.value === v
							}).length > 0

						return {
							...answerValue,
							chosen: chose,
						}
					} else {
						return {
							...answerValue,
							chosen: valueFromForm.includes(answerValue.value as string),
						}
					}
				}
			),
		},
		hasAnswered: valueFromForm.length > 1, //TODO Kan ha besvart men ingen relevante
	}

	return updatedQuestion
}

export const updateMultipleQuestionAnswerToStoreTextIMprovedCheckComponentFromExternal =
	(eventValue: string, currentQuestion: QuestionFormType) => {
		const valueFromForm: string | number | boolean | string[] = eventValue
		if (!eventValue) {
			return
		}

		const ingenAvDisseValgIsPressed =
			(currentQuestion.answerValue.answers as AnswerValueType[]).filter((a) => {
				if (
					a.descriptionValue &&
					(a.descriptionValue.toLowerCase().includes("ingen av disse") ||
						(a.descriptionValue as string).toLowerCase() === "nei")
				) {
					return a.value === eventValue
				}
				return false
			}).length > 0

		let ingenAvDisseIsAlreadyTicked =
			(currentQuestion.answerValue.answers as AnswerValueType[]).filter((a) => {
				if (
					a.descriptionValue &&
					(a.descriptionValue.toLowerCase().includes("ingen av disse") ||
						(a.descriptionValue as string).toLowerCase() === "nei")
				) {
					return a.chosen
				}
				return false
			}).length > 0
		console.log(currentQuestion, "current question")
		const updatedQuestion = {
			...currentQuestion,
			answerValue: {
				answers: (currentQuestion.answerValue.answers as AnswerValueType[]).map(
					(answerValue: AnswerValueType) => {
						const currentAnswerIsIngenAvDisse =
							(answerValue.descriptionValue as string)
								.toLowerCase()
								.includes("ingen av disse") ||
							(answerValue.descriptionValue as string).toLowerCase() === "nei"

						if (ingenAvDisseValgIsPressed) {
							if (currentAnswerIsIngenAvDisse) {
								const tickIt = answerValue.value === eventValue
								return {
									...answerValue,
									chosen: ingenAvDisseIsAlreadyTicked ? !tickIt : tickIt,
								}
							} else {
								return {
									...answerValue,
									chosen: false,
								}
							}
						} else {
							const tickIt = valueFromForm === (answerValue.value as string)
							const chosen = answerValue.chosen ? !tickIt : tickIt
							console.log(
								currentQuestion.id,
								"current value",
								valueFromForm,
								"matched against",
								answerValue.value,
								"is the same",
								tickIt,
								"then choose",
								chosen
							)

							if (ingenAvDisseIsAlreadyTicked) {
								return {
									...answerValue,
									chosen: currentAnswerIsIngenAvDisse ? false : chosen,
								} as AnswerValueType
							} else {
								return {
									...answerValue,
									chosen: chosen,
								} as AnswerValueType
							}
						}
					}
				),
			},
			hasAnswered: valueFromForm.length > 1, //TODO Kan ha besvart men ingen relevante
		}

		return updatedQuestion
	}
export const hydrateQuestionnaire = (answers, questions) => {
	const hydratedQuestions = questions.map((question) => {
		answers.forEach((answer) => {
			const splitAnswer = answer.split("_")
			if (question.id === splitAnswer[0]) {
				const value = answer.split(" == ")[1]

				switch (question.inputType) {
					case "radio":
						question = updateQuestionAnswerToStoreFromExternal(value, question)
						break
					case "checkbox":
						question =
							updateMultipleQuestionAnswerToStoreTextIMprovedCheckComponentFromExternal(
								value,
								question
							)
						break
					case "number-optional-timeperiod":
					case "text-optional-timeperiod":
						;(question.answerValue.answers as AnswerValueType[])[0].chosen =
							true
						question = updateQuestionAnswerToStoreTextFromExternal(
							value,
							question,

							(question.answerValue.answers as AnswerValueType[])[
								Number(splitAnswer[1][0]) - 1
							].id
						)
						break
					case "number-optional-timeperiod-checkbox":
						if (answer.includes("_3")) {
							question =
								updateCheckboxTextQuestionWithTimePeriodAnswerToStoreFromExternal(
									value,
									question
								)
						} else {
							;(question.answerValue.answers as AnswerValueType[])[0].chosen =
								true
							question = updateQuestionAnswerToStoreTextFromExternal(
								value,
								question,

								(question.answerValue.answers as AnswerValueType[])[
									Number(splitAnswer[1][0]) - 1
								].id
							)
						}
						break
					case "number-checkbox":
					case "text-checkbox":
						if (answer.includes("_2")) {
							question = updateCheckboxTextQuestionAnswerToStoreFromExternal(
								value,
								question
							)
						} else {
							question = updateQuestionAnswerToStoreTextFromExternal(
								value,
								question,
								(question.answerValue.answers as AnswerValueType[])[0].id
							)
						}
						break
					case "multifield-number-dependent-with-sum":
					case "multifield-text-dependent-with-sum":
					case "multifield-number-siffer-dependent":
					case "multifield-number-dependent":
					case "multifield-text-dependent":
					case "multifield-number-with-sum":
					case "multifield-text-with-sum":
					case "multifield-number":
					case "multifield-text":
					case "number":
					case "text":
						question = updateQuestionAnswerToStoreTextFromExternal(
							value,
							question,
							answer.split(" == ")[0]
						)
				}
				console.log(question)
			}
		})
		return question
	})
	return hydratedQuestions
}

export const getAllQuestionsThatAreDependentOnCurrent = (currentQuestion: QuestionFormType, questions: QuestionFormType[]): QuestionFormType[] => {
	const quest = [...questions].filter(q => {
		if(q.dependentOnQuestionCriteria){
			const dependencies = q.dependentOnQuestionCriteria as DependentOnQuestionCriteria[][]
			const ret = dependencies.filter((innerOneDependency: DependentOnQuestionCriteria[]) => {
				const innerDependency = innerOneDependency.filter((oneDependency: DependentOnQuestionCriteria) => {
					return oneDependency.questionId === currentQuestion.id
				})
				return innerDependency && innerDependency.length > 0;
			})

			return ret && ret.length > 0;
		} else {
			return false
		}
	})

	return resetValuesInQuestions(currentQuestion, quest,  questions)
}

export const resetValuesInQuestions = (currentQuestion: QuestionFormType, questions: QuestionFormType[], allQuestions: QuestionFormType[]): QuestionFormType[] => {
	const answeredQuestions = [...questions].filter(q => {
		return q.hasAnswered
	})


	if(!answeredQuestions || answeredQuestions.length === 0){
		return []
	}

	let finalQuestionChanges = [] as QuestionFormType[];

	answeredQuestions.forEach((q: QuestionFormType) => {

		if(q.hasAnswered) {
			q.hasAnswered = false;
			const subQuestionChanges = getAllQuestionsThatAreDependentOnCurrent(q, allQuestions)
			subQuestionChanges.forEach(r => finalQuestionChanges.push(r))

			const a = q.answerValue.answers as AnswerValueType[]

			a.forEach((a: AnswerValueType) => {
				a.chosen = false;


				if(
					q.inputType === "text" || q.inputType === "number" || q.inputType === "text-optional-timeperiod" ||
					q.inputType === "number-optional-timeperiod" || q.inputType === "number-optional-timeperiod-checkbox"  || q.inputType === "number-checkbox" ||
					q.inputType === "text-checkbox"  || q.inputType === "multifield-text-dependent"
					|| q.inputType === "multifield-number-dependent" || q.inputType === "multifield-text-dependent-with-sum"
					|| q.inputType === "multifield-number-siffer-dependent" || q.inputType === "multifield-number-dependent-with-sum"
					|| q.inputType === "multifield-number" || q.inputType === "multifield-text"
				){
					if(a.descriptionValue && a.descriptionValue.toLowerCase().includes("mnd/kvartal/år")){
						a.value = "Måned"
					} else if(a.descriptionValue && a.descriptionValue.toLowerCase().includes("vet ikke")) {

					} else if(a.value === '2' || a.value === '3') {

					} else if(
						q.inputType === "text" || q.inputType === "number" || q.inputType === "multifield-text-dependent"
						|| q.inputType === "multifield-number-dependent" || q.inputType === "multifield-text-dependent-with-sum"
						|| q.inputType === "multifield-number-siffer-dependent" || q.inputType === "multifield-number-dependent-with-sum"
						|| q.inputType === "number-checkbox" || q.inputType === "text-checkbox"
						|| q.inputType === "multifield-number" || q.inputType === "multifield-text"
						|| q.inputType === "number-optional-timeperiod-checkbox" || q.inputType === "number-optional-timeperiod"
					) {
						a.value = ""
						a.chosen = true
					} else {
						a.value = ""
					}
				}
			})
		}
	})

	answeredQuestions.forEach(p => finalQuestionChanges.push(p))

	return finalQuestionChanges
}
