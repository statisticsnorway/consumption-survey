import {
	AnswerValueType,
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

	return updatedQuestion
}

export const updateNestedQuestionAnswerToStoreFromExternal = (
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

		return updatedQuestion
	}

	return null
}

export const updateQuestionAnswerToStoreTextFromExternal = (
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

	return updatedQuestion
}

export const updateCheckboxTextQuestionAnswerToStoreFromExternal = (
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
	return updatedQuestion
}

export const updateCheckboxTextQuestionWithTimePeriodAnswerToStoreFromExternal =
	(
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
	(
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
