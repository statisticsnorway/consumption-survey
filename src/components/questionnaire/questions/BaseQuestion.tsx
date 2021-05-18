import {
    AnswerValueType,
    DependentOnQuestionCriteria,
    QuestionAnswerType,
    QuestionFormType,
    QuestionProps
} from "./QuestionFormType";
import React, {ChangeEvent, ReactElement, useEffect} from "react";
import {Dispatch} from "redux";
import {useDispatch, useSelector} from "react-redux";
import {
    extractCriteria,
    findCurrentChosenAnswerValue,
    findCurrentChosenAnswerValueByAnswers,
    getInputPostfix,
    getRadioButtonOptionsForQuestion,
    getRadioButtonOptionsForQuestionByAnswers,
    getRadioButtonOptionsForQuestionWithAnswerIds,
    isOneOfTheDependecyCriteriasFulfilled,
    isQuestionNestedWithAdditionalQuestions
} from "./questionFunctionsUtils";
import RadioGroup from "../RadioGroup";
import {
    updateCheckboxTextQuestionAnswerToStore,
    updateCheckboxTextQuestionWithTimePeriodAnswerToStore,
    updateMultipleQuestionAnswerToStoreTextIMprovedCheckComponent,
    updateNestedQuestionAnswerToStore,
    updateQuestionAnswerToStore,
    updateQuestionAnswerToStoreText
} from "./UpdateQuestionValue";
import {Dropdown} from "@statisticsnorway/ssb-component-library";
import InputAlt from "../InputAlt";
import CheckboxGroupAlt from "../CheckboxGroupAlt";
import InputNumberFormat from "../InputNumberFormat";
import CheckboxGroupAltBetter from "../CheckboxGroupAltBetter";
import {useSelectedQuestion} from "../../../hocs/webform/hooks";
import {QuestionState} from "../../../store/reducers/questionReducer";

const currentQuestionContainsAlternative = (answerDescription : string, currentAnswers : AnswerValueType[]) => {
    return currentAnswers.find( cAnswer  => answerDescription === cAnswer.descriptionValue) ? true : false
}

export function BaseQuestion(
    {
        questionId,
        dependentHeaderText
    }: QuestionProps): ReactElement | null {
    const dispatch: Dispatch<any> = useDispatch()
    const currentQuestion = useSelectedQuestion(questionId)
    const questions: QuestionFormType[] = useSelector((state: QuestionState) => {
        return state.questions
    });

    let currentQuestionDependsOnThisDomElement: any = undefined;

    useEffect(() => {
        // Update the document title using the browser API

        //TODO Comment out animate for now. Have to prioritize differently before pilot

        // if (currentQuestionDependsOnThisDomElement !== undefined) {
        //     if(currentQuestion.dependentOnQuestionCriteria){
        //         const previousQuestionId = getPreviousAnsweredQuestion(questionId, history);
        //         const allCriterias = currentQuestion.dependentOnQuestionCriteria.flatMap((d: DependentOnQuestionCriteria[]) => d);
        //
        //         const previousQuestion = allCriterias
        //             .filter(q => q.questionId === previousQuestionId)
        //             .map(q => questions.find(qi => qi.id === q.questionId))
        //
        //         if(previousQuestion && previousQuestion.length > 0 && previousQuestion[0]) {
        //             animateUp(previousQuestion[0]?.id, currentQuestion.id)
        //         } else {
        //             removeAnimationCssClasses(currentQuestion.id)
        //         }
        //     } else {
        //         removeAnimationCssClasses(currentQuestion.id)
        //     }
        // } else {
        //     removeAnimationCssClasses(currentQuestion.id)
        // }

        const inputElement = document.getElementById(`answer-input-${questionId}-id`)
        const inputSelectDepElement = document.getElementById(`answer-input-select-${questionId}-id`)
        // const radioElement = document.getElementById(`answer-radiogroup-${questionId}-id`)
        if (inputElement) {   // Hack because SSB Input is buggy with initial value
            const val = (inputElement as HTMLInputElement);
            val.value = findCurrentChosenAnswerValue(currentQuestion) as string;
        }
        if(inputSelectDepElement) {
            const inputVal = (inputSelectDepElement as HTMLInputElement);
            const val = (currentQuestion.answerValue.answers as AnswerValueType[])[1].value as string
            inputVal.value = val;
        }
    });

    if (currentQuestion.dependentOnQuestionCriteria && !isOneOfTheDependecyCriteriasFulfilled(currentQuestion, questions)) {
        return null;
    }

    const isMultipleQuestionsInOne = isQuestionNestedWithAdditionalQuestions(currentQuestion.answerValue.answers);
    const currentChosenValue = findCurrentChosenAnswerValue(currentQuestion);

    const availableAnswerOptions = getRadioButtonOptionsForQuestion(currentQuestion);
    const availableAnswerOptionsWithAnswerIds = getRadioButtonOptionsForQuestionWithAnswerIds(currentQuestion);

    if (currentQuestion.dependentOnQuestionCriteria && currentQuestion.dependentOnQuestionCriteria[0]) {
        // const previousQuestion = getPreviousAnsweredQuestion(questionId, history);
        //
        // const allCriterias = currentQuestion.dependentOnQuestionCriteria.flatMap((d: DependentOnQuestionCriteria[]) => d);
        //
        // currentQuestionDependsOnThisDomElement = allCriterias.filter(q => q.questionId === previousQuestion)
        //     .map(q => {
        //         const depQ = questions.find(qi => qi.id === q.questionId);
        //         return <BaseQuestion questionId={`${depQ?.id}`}/>
        //     })
    }

    const showOrHide = currentQuestionDependsOnThisDomElement ? "hide" : "show";

    return (
        <div id={`main-container-question-${questionId}`} className={`${showOrHide} width-100`}>
            {currentQuestionDependsOnThisDomElement && (
                <div className="width-100" id={`dependent-element-${questionId}`}>
                    {currentQuestionDependsOnThisDomElement}
                </div>
            )}
            <div className={`${currentQuestionDependsOnThisDomElement ? "padding-lt-rt-20px" : ""}`}
                 id={`sub-container-${questionId}`}>
                <h4 id={`header-text-${questionId}`}>
                    {currentQuestion.questionText}
                </h4>

                {!isMultipleQuestionsInOne && currentQuestion.inputType === 'radio' &&
                <RadioGroup
                    id={`answer-radiogroup-${questionId}-id`}
                    orientation={"column"}
                    selectedValue={currentChosenValue}
                    items={availableAnswerOptions}
                    onChange={(eventValue: string) => {
                        updateQuestionAnswerToStore(eventValue, currentQuestion, dispatch)
                    }}
                    disabled={false}
                />
                }
                {!isMultipleQuestionsInOne && currentQuestion.inputType === 'number' &&
                <div className={"flex-container flex-row-center-vertical"}>
                    <InputNumberFormat value={currentChosenValue as string}
                                       label={""}
                                       autoFocus={true}
                                       onChange={(event :ChangeEvent<HTMLInputElement>) => {
                                           updateQuestionAnswerToStoreText(
                                               event.target.value,
                                               currentQuestion,
                                               dispatch,
                                               (currentQuestion.answerValue.answers as AnswerValueType[])[0].id
                                           )
                                       }
                                       } id={`answer-input-select-${questionId}-id`}/>
                    <div className={"fsize-18 padding-lt-10px"}>
                        {currentQuestion.inputPostfix ? getInputPostfix(currentQuestion.inputPostfix) : "" }
                    </div>
                </div>
                }
                {!isMultipleQuestionsInOne && (currentQuestion.inputType === 'text') &&
                <div className={"flex-container flex-row-center-vertical"}>
                    <InputAlt
                        id={`answer-input-${questionId}-id`}
                        label={""}
                        autoFocus={true}
                        value={currentChosenValue}
                        type={currentQuestion.inputType}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => {
                            updateQuestionAnswerToStoreText(
                                event.target.value,
                                currentQuestion,
                                dispatch,
                                (currentQuestion.answerValue.answers as AnswerValueType[])[0].id
                            )
                        }}
                    />

                    <div className={"fsize-18 padding-lt-10px"}>
                        {currentQuestion.inputPostfix ? getInputPostfix(currentQuestion.inputPostfix) : "" }
                    </div>
                </div>
                }

                {!isMultipleQuestionsInOne && currentQuestion.inputType === 'checkbox' &&
                <CheckboxGroupAltBetter
                    id={`answer-checkbox-${questionId}-id`}
                    orientation="column"
                    onChange={(eventValue: string) => {
                        updateMultipleQuestionAnswerToStoreTextIMprovedCheckComponent(eventValue, currentQuestion, dispatch)
                    }}
                    items={availableAnswerOptions}
                    selectedValues={(
                        () => {
                            const checkboxArray = ((currentQuestion.answerValue.answers) as AnswerValueType[]).map(a => {
                                return a.chosen ? a.value : ""
                            })
                            return [...checkboxArray]
                        })()
                    }
                />
                }

                {!isMultipleQuestionsInOne && currentQuestion.inputType === 'text-checkbox' &&
                <div>

                    <div className={"flex-container flex-row-center-vertical"}>
                        <InputAlt
                            id={`answer-input-checkbox-${questionId}-id`}
                            label={""}
                            autoFocus={true}
                            value={(currentQuestion.answerValue.answers as AnswerValueType[])[0].value}
                            onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                updateQuestionAnswerToStoreText(
                                    event.target.value,
                                    currentQuestion,
                                    dispatch,
                                    (currentQuestion.answerValue.answers as AnswerValueType[])[0].id
                                )
                            }}
                        />
                        <div className={"fsize-18 padding-lt-10px"}>
                            {currentQuestion.inputPostfix ? getInputPostfix(currentQuestion.inputPostfix) : "" }
                        </div>
                    </div>
                    <div className={"flex-container-column padding-tp-bm-20px"}>
                        <CheckboxGroupAlt
                            id={`answer-text-checkbox-${questionId}-id`}
                            orientation="column"
                            onChange={(eventValue: string) => {
                                updateCheckboxTextQuestionAnswerToStore(eventValue, currentQuestion, dispatch)
                            }}
                            items={availableAnswerOptionsWithAnswerIds.filter(a => (a.id as string).includes("_2"))}
                            selectedValues={((currentQuestion.answerValue.answers) as AnswerValueType[])
                                .filter(a => (a.id as string).includes("_2"))
                                .map(a => a.chosen ? a.value : "")
                            }
                        />
                    </div>
                </div>
                }

                {!isMultipleQuestionsInOne && currentQuestion.inputType === 'number-checkbox' &&
                <div>

                    <div className={"flex-container flex-row-center-vertical"}>
                        <InputNumberFormat value={(currentQuestion.answerValue.answers as AnswerValueType[])[0].value as string}
                                           label={""}
                                           autoFocus={true}
                                           onChange={(event :ChangeEvent<HTMLInputElement>) => {
                                               updateQuestionAnswerToStoreText(
                                                   event.target.value,
                                                   currentQuestion,
                                                   dispatch,
                                                   (currentQuestion.answerValue.answers as AnswerValueType[])[0].id
                                               )
                                           }
                                           }
                                           id={`answer-input-select-${questionId}-id`}/>

                        <div className={"fsize-18 padding-lt-10px"}>
                            {currentQuestion.inputPostfix ? getInputPostfix(currentQuestion.inputPostfix) : "" }
                        </div>
                    </div>

                    <div className={"flex-container-column padding-tp-bm-20px"}>
                        <CheckboxGroupAlt
                            id={`answer-text-checkbox-${questionId}-id`}
                            orientation="column"
                            onChange={(eventValue: string) => {
                                updateCheckboxTextQuestionAnswerToStore(eventValue, currentQuestion, dispatch)
                            }}
                            items={availableAnswerOptionsWithAnswerIds.filter(a => (a.id as string).includes("_2"))}
                            selectedValues={((currentQuestion.answerValue.answers) as AnswerValueType[])
                                .filter(a => (a.id as string).includes("_2"))
                                .map(a => a.chosen ? a.value : "")
                            }
                        />
                    </div>
                </div>
                }
                {!isMultipleQuestionsInOne && currentQuestion.inputType === 'number-optional-timeperiod-checkbox' &&
                <div>
                    <div className={`padding-tp-bm-20px`}>
                        <Dropdown
                            header={`${(currentQuestion.answerValue.answers[0] as AnswerValueType).descriptionValue}`}
                            selectedItem={{
                                title: (currentQuestion.answerValue.answers[0] as AnswerValueType).value,
                                id: `${(currentQuestion.answerValue.answers[0] as AnswerValueType).value}-id-${questionId}`,
                            }}
                            items={[
                                {"id": `mnd-id-${questionId}`, "title": "Måned"},
                                {"id": `kvrt-id-${questionId}`, "title": "Kvartal"},
                                {"id": `aar-id-${questionId}`, "title": "År"},
                            ]}
                            onSelect={(item: {id: string, title: string}) => {
                                updateQuestionAnswerToStoreText(
                                    item.title,
                                    currentQuestion,
                                    dispatch,
                                    (currentQuestion.answerValue.answers as AnswerValueType[])[0].id
                                )
                            }}
                        />
                    </div>

                    <div className={"flex-container flex-row-center-vertical"}>
                        <InputNumberFormat value={(currentQuestion.answerValue.answers as AnswerValueType[])[1].value as string}
                                           label={""}
                                           autoFocus={true}
                                           onChange={(event :ChangeEvent<HTMLInputElement>) => {
                                               if((currentQuestion.answerValue.answers as AnswerValueType[])[2].chosen) {
                                                   updateQuestionAnswerToStoreText(
                                                       event.target.value,
                                                       currentQuestion,
                                                       dispatch,
                                                       (currentQuestion.answerValue.answers as AnswerValueType[])[1].id
                                                   )
                                                   return
                                               }
                                               if(event.target.value) (currentQuestion.answerValue.answers as AnswerValueType[])[0].chosen = true
                                               else (currentQuestion.answerValue.answers as AnswerValueType[])[0].chosen = false
                                               updateQuestionAnswerToStoreText(
                                                   event.target.value,
                                                   currentQuestion,
                                                   dispatch,
                                                   (currentQuestion.answerValue.answers as AnswerValueType[])[1].id
                                               )
                                           }
                                           }
                                           id={`answer-input-select-${questionId}-id`}/>
                        <div className={"fsize-18 padding-lt-10px"}>
                            {currentQuestion.inputPostfix ? getInputPostfix(currentQuestion.inputPostfix) : "" }
                        </div>
                    </div>

                    <div className={"flex-container-column padding-tp-bm-20px"}>
                        <CheckboxGroupAlt
                            id={`answer-text-checkbox-${questionId}-id`}
                            orientation="column"
                            onChange={(eventValue: string) => {
                                updateCheckboxTextQuestionWithTimePeriodAnswerToStore(eventValue, currentQuestion, dispatch)
                            }}
                            items={availableAnswerOptionsWithAnswerIds.filter(a => (a.id as string).includes("_3"))}
                            selectedValues={((currentQuestion.answerValue.answers) as AnswerValueType[])
                                .filter(a => (a.id as string).includes("_3"))
                                .map(a => a.chosen ? a.value : "")
                            }
                        />
                    </div>
                </div>

                }
                {!isMultipleQuestionsInOne && (currentQuestion.inputType === 'multifield-text' || currentQuestion.inputType === 'multifield-text-with-sum') &&
                (
                    <div className={"flex-container-column padding-tp-bm-20px"}>
                        {
                            availableAnswerOptionsWithAnswerIds.map((a, index) => {
                                return (
                                    <div className={"padding-tp-bm-20px"} key={`${a.id}-multifield-radio`}>
                                        <div className={"flex-container flex-row-center-vertical"}>
                                            <InputAlt
                                                type={"text"}
                                                label={a.label}
                                                autoFocus={index === 0}
                                                id={`answer-input-${questionId}-${a.id}-id`}
                                                value={a.value}
                                                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                                    updateQuestionAnswerToStoreText(event.target.value, currentQuestion, dispatch, a.id)
                                                }}
                                            />
                                            <div className={"fsize-18 padding-lt-10px"}>
                                                <div className={"flex-container-column"}>
                                                    <div className={"height-16"}></div>
                                                    {currentQuestion.inputPostfix ? getInputPostfix(currentQuestion.inputPostfix) : "" }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                        {currentQuestion.inputType === 'multifield-text-with-sum' && (
                            <div className={`padding-tp-bm-20px`}>
                                {
                                    (
                                        <div className={"flex-container flex-row-center-vertical"}>
                                            <InputAlt
                                                label={"Sum"}
                                                id={`answer-input-${questionId}-sum-id`}
                                                disabled={true}
                                                value={String(
                                                    availableAnswerOptionsWithAnswerIds.map(a => a.value ? parseInt(a.value) : 0)
                                                        .reduce((previousValue, currentValue) => {
                                                            const prevVal = previousValue ? previousValue : 0;
                                                            const currVal = currentValue ? currentValue : 0;
                                                            return prevVal + currVal
                                                        })
                                                )
                                                }
                                            />
                                            <div className={"fsize-18 padding-lt-10px"}>
                                                {currentQuestion.inputPostfix ? getInputPostfix(currentQuestion.inputPostfix) : "" }
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                        )
                        }
                    </div>
                )}

                {!isMultipleQuestionsInOne && (currentQuestion.inputType === 'multifield-number' ) &&
                (
                    <div className={"flex-container-column padding-tp-bm-20px"}>
                        {
                            availableAnswerOptionsWithAnswerIds.map((a, index) => {
                                return (
                                    <div className={"padding-tp-bm-20px"} key={`${a.id}-multifield-number-radio`}>

                                        <div className={"flex-container flex-row-center-vertical"}>
                                            <InputNumberFormat
                                                value={a.value}
                                                label={a.label}
                                                autoFocus={index === 0}
                                                onChange={(event :ChangeEvent<HTMLInputElement>) => {
                                                    updateQuestionAnswerToStoreText(
                                                        event.target.value,
                                                        currentQuestion,
                                                        dispatch,
                                                        a.id)
                                                }
                                                }
                                                id={`answer-input-select-${questionId}-id`}
                                            />

                                            <div className={"fsize-18 padding-lt-10px"}>
                                                <div className={"flex-container-column"}>
                                                    <div className={"height-16"}></div>
                                                    {currentQuestion.inputPostfix ? getInputPostfix(currentQuestion.inputPostfix) : "" }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                )}


                {!isMultipleQuestionsInOne && (currentQuestion.inputType === 'multifield-number-siffer-dependent') &&
                (
                    <div className={`padding-tp-bm-20px`}>
                        {
                            availableAnswerOptionsWithAnswerIds
                                .filter(a => {
                                    if(currentQuestion?.dependentOnQuestionCriteria) {
                                        const criteriaForQuestion = currentQuestion?.dependentOnQuestionCriteria[0] as DependentOnQuestionCriteria[]
                                        const criteriaQuestion = questions.find(q => criteriaForQuestion[0].questionId === q.id) as QuestionFormType
                                        const previousQuestionList = [criteriaQuestion] as QuestionFormType[]
                                        const criteria = extractCriteria(previousQuestionList, criteriaForQuestion)

                                        const answerV = (criteriaQuestion.answerValue.answers as AnswerValueType[]).find(a => a.id === criteria[0]?.dependentAnswer.id) as AnswerValueType
                                        const answerId = a.id as string;
                                        const idNumber = answerId.split("_")[1];
                                        const intVal = parseInt(answerV.value as string);
                                        return parseInt(idNumber) <= intVal;
                                    }

                                    return false;
                                })
                                .map((a, index) => {
                                    return (
                                        <div className={"padding-tp-bm-20px"} key={`${a.id}-multifield-number-siffer-dep`}>
                                            <div className={"flex-container flex-row-center-vertical"}>
                                                <InputNumberFormat
                                                    label={a.label}
                                                    autoFocus={index === 0}
                                                    id={`answer-input-${questionId}-${a.id}-id`}
                                                    value={a.value}
                                                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                                        updateQuestionAnswerToStoreText(event.target.value, currentQuestion, dispatch, a.id)
                                                    }}
                                                />

                                                <div className={"fsize-18 padding-lt-10px"}>
                                                    <div className={"flex-container-column"}>
                                                        <div className={"height-16"}></div>
                                                        {currentQuestion.inputPostfix ? getInputPostfix(currentQuestion.inputPostfix) : "" }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                        }
                    </div>
                )}

                {!isMultipleQuestionsInOne && (currentQuestion.inputType === 'multifield-text-dependent' || currentQuestion.inputType === 'multifield-number-dependent') && currentQuestion.dependentOnQuestionCriteria &&
                (
                    <div className={"flex-container-column padding-tp-bm-20px"}>
                        {
                            (extractCriteria(questions, currentQuestion.dependentOnQuestionCriteria[0] as DependentOnQuestionCriteria[])[0]
                                    .question
                                    .answerValue
                                    .answers as AnswerValueType[]
                            )
                                .filter(a => a.chosen && currentQuestionContainsAlternative(a.descriptionValue as string, currentQuestion.answerValue.answers as AnswerValueType[]))
                                .map((a, index) => {
                                    const answer = (currentQuestion.answerValue.answers as AnswerValueType[])
                                        .find(inner => {
                                            return inner.descriptionValue?.toLocaleLowerCase() === a.descriptionValue?.toLocaleLowerCase()
                                        }) as AnswerValueType

                                    return (
                                        <div className={"padding-tp-bm-20px"}>
                                            {currentQuestion.inputType === 'multifield-text-dependent' && <InputAlt
                                                type={"text"}
                                                label={answer.descriptionValue as string}
                                                id={`answer-input-${currentQuestion.id}-${answer.id}-id`}
                                                value={answer.value}
                                                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                                    updateQuestionAnswerToStoreText(event.target.value, currentQuestion, dispatch, answer.id)
                                                }}
                                            />}
                                            {currentQuestion.inputType === 'multifield-number-dependent' && (
                                                <div className={"flex-container flex-row-center-vertical"}>
                                                    <InputNumberFormat
                                                        label={answer.descriptionValue as string}
                                                        id={`answer-input-${currentQuestion.id}-${answer.id}-id`}
                                                        value={answer.value as string}
                                                        autoFocus={index === 0}
                                                        onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                                            updateQuestionAnswerToStoreText(event.target.value, currentQuestion, dispatch, answer.id)
                                                        }}
                                                    />
                                                    <div className={"fsize-18 padding-lt-10px"}>
                                                        <div className={"flex-container-column"}>
                                                            <div className={"height-16"}></div>
                                                            {currentQuestion.inputPostfix ? getInputPostfix(currentQuestion.inputPostfix) : "" }
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                            }
                                        </div>
                                    )
                                })
                        }
                    </div>
                )}

                {!isMultipleQuestionsInOne && (currentQuestion.inputType === 'multifield-text-dependent-with-sum' || currentQuestion.inputType === 'multifield-number-dependent-with-sum') && currentQuestion.dependentOnQuestionCriteria &&
                (
                    <div className={"flex-container-column padding-tp-bm-20px"}>
                        {
                            (extractCriteria(questions, currentQuestion.dependentOnQuestionCriteria[0] as DependentOnQuestionCriteria[])[0]
                                    .question
                                    .answerValue
                                    .answers as AnswerValueType[]
                            )
                                .filter(a => a.chosen)
                                .map((a, outerIndex) => {
                                    const answers = (currentQuestion.answerValue.answers as AnswerValueType[])
                                        .filter(inner => {
                                            const splitted = inner.id.split("_");
                                            const innerSplitted = a.id.split("_");
                                            return splitted[1] === innerSplitted[1]
                                        }) as AnswerValueType[]

                                    const inputFields = answers.map((a, innerIndex) => {
                                        const focus = innerIndex === 0 && outerIndex === 0;
                                        return (
                                            <div className={"padding-tp-bm-20px"} key={`${a.id}-multifield-number-siffer-dep-with-sum`}>
                                                {currentQuestion.inputType === 'multifield-text-dependent-with-sum' && <InputAlt
                                                    type={"text"}
                                                    label={a.descriptionValue as string}
                                                    id={`answer-input-${currentQuestion.id}-${a.id}-id`}
                                                    value={a.value}
                                                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                                        updateQuestionAnswerToStoreText(event.target.value, currentQuestion, dispatch, a.id)
                                                    }}
                                                />}
                                                {currentQuestion.inputType === 'multifield-number-dependent-with-sum' && (

                                                    <div className={"flex-container flex-row-center-vertical"}>
                                                        <InputNumberFormat
                                                            id={`answer-input-${currentQuestion.id}-${a.id}-id`}
                                                            autoFocus={focus}
                                                            onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                                                updateQuestionAnswerToStoreText(event.target.value, currentQuestion, dispatch, a.id)
                                                            }}
                                                            value={a.value as string}
                                                            label={a.descriptionValue as string}/>

                                                        <div className={"fsize-18 padding-lt-10px"} >
                                                            <div className={"flex-container-column"}>
                                                                <div className={"height-16"}></div>
                                                                {currentQuestion.inputPostfix ? getInputPostfix(currentQuestion.inputPostfix) : "" }
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                                }
                                            </div>
                                        )
                                    })

                                    const sum =  (
                                        <div className={`padding-tp-bm-20px`} key={`${a.id}-multifield-number-siffer-dep-sum-field`}>
                                            {currentQuestion.inputType === 'multifield-text-dependent-with-sum' ?
                                                (

                                                    <div className={"flex-container flex-row-center-vertical"}>
                                                        <InputAlt
                                                            label={"Sum"}
                                                            id={`answer-input-${a.id}-sum-id`}
                                                            disabled={true}
                                                            value={String(
                                                                answers.map(a => a.value ? parseInt(a.value) : 0)
                                                                    .reduce((previousValue, currentValue) => {
                                                                        const prevVal = previousValue ? previousValue : 0;
                                                                        const currVal = currentValue ? currentValue : 0;
                                                                        return prevVal + currVal
                                                                    })
                                                            )
                                                            }
                                                        />
                                                        <div className={"fsize-18 padding-lt-10px"}>
                                                            {currentQuestion.inputPostfix ? getInputPostfix(currentQuestion.inputPostfix) : "" }
                                                        </div>
                                                    </div>
                                                )
                                                :
                                                (
                                                    <div className={"flex-container flex-row-center-vertical"}>
                                                        <InputNumberFormat
                                                            label={"Sum"}
                                                            id={`answer-input-${a.id}-sum-id`}
                                                            disabled={true}
                                                            value={String(
                                                                answers.map(a => a.value ? parseInt(a.value) : 0)
                                                                    .reduce((previousValue, currentValue) => {
                                                                        const prevVal = previousValue ? previousValue : 0;
                                                                        const currVal = currentValue ? currentValue : 0;
                                                                        return prevVal + currVal
                                                                    })
                                                            )
                                                            }
                                                        />
                                                        <div className={"fsize-18 padding-lt-10px"}>
                                                            {currentQuestion.inputPostfix ? getInputPostfix(currentQuestion.inputPostfix) : "" }
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        </div>
                                    )

                                    return (
                                        <div>
                                            <h4>{a.descriptionValue}</h4>
                                            {inputFields}
                                            {sum}
                                        </div>
                                    )
                                })
                        }
                    </div>
                )}

                {!isMultipleQuestionsInOne && (currentQuestion.inputType === 'text-optional-timeperiod' || currentQuestion.inputType === 'number-optional-timeperiod') &&
                (
                    <div className={"flex-container-column padding-tp-bm-20px"}>
                        <div className={`padding-tp-bm-20px`}>
                            <Dropdown
                                header={`${(currentQuestion.answerValue.answers[0] as AnswerValueType).descriptionValue}`}
                                selectedItem={{
                                    title: (currentQuestion.answerValue.answers[0] as AnswerValueType).value,
                                    id: `${(currentQuestion.answerValue.answers[0] as AnswerValueType).value}-id-${questionId}`,
                                }}
                                items={[
                                    {"id": `mnd-id-${questionId}`, "title": "Måned"},
                                    {"id": `kvrt-id-${questionId}`, "title": "Kvartal"},
                                    {"id": `aar-id-${questionId}`, "title": "År"},
                                ]}
                                onSelect={(item: {id: string, title: string}) => {
                                    updateQuestionAnswerToStoreText(
                                        item.title,
                                        currentQuestion,
                                        dispatch,
                                        (currentQuestion.answerValue.answers as AnswerValueType[])[0].id
                                    )
                                }}
                            />
                        </div>
                        <div className={`padding-tp-bm-20px`}>
                            {currentQuestion.inputType === 'text-optional-timeperiod' && <InputAlt
                                id={`answer-input-select-${questionId}-id`}
                                label={(currentQuestion.answerValue.answers as AnswerValueType[])[1].descriptionValue as string}
                                value={(currentQuestion.answerValue.answers as AnswerValueType[])[1].value as string}
                                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                    if(event.target.value) (currentQuestion.answerValue.answers as AnswerValueType[])[0].chosen = true
                                    else (currentQuestion.answerValue.answers as AnswerValueType[])[0].chosen = false
                                    updateQuestionAnswerToStoreText(
                                        event.target.value,
                                        currentQuestion,
                                        dispatch,
                                        (currentQuestion.answerValue.answers as AnswerValueType[])[1].id
                                    )
                                }}
                            />}
                            {currentQuestion.inputType === 'number-optional-timeperiod' && (

                                <div className={"flex-container flex-row-center-vertical"}>
                                    <InputNumberFormat value={(currentQuestion.answerValue.answers as AnswerValueType[])[1].value as string}
                                                       label={""}
                                                       autoFocus={true}
                                                       onChange={(event :ChangeEvent<HTMLInputElement>) => {
                                                           if(event.target.value) (currentQuestion.answerValue.answers as AnswerValueType[])[0].chosen = true
                                                           else (currentQuestion.answerValue.answers as AnswerValueType[])[0].chosen = false
                                                           updateQuestionAnswerToStoreText(
                                                               event.target.value,
                                                               currentQuestion,
                                                               dispatch,
                                                               (currentQuestion.answerValue.answers as AnswerValueType[])[1].id
                                                           )
                                                       }

                                                       }
                                                       id={`answer-input-select-${questionId}-id`}
                                    />
                                    <div className={"fsize-18 padding-lt-10px"}>
                                        {currentQuestion.inputPostfix ? getInputPostfix(currentQuestion.inputPostfix) : "" }
                                    </div>
                                </div>
                            )
                            }
                        </div>
                    </div>
                )
                }

                {isMultipleQuestionsInOne && (
                    (currentQuestion.answerValue.answers as QuestionAnswerType[])
                        .map(questionAnswer => {
                            const availableAnswerOptionsInner = getRadioButtonOptionsForQuestionByAnswers(questionAnswer.answers as AnswerValueType[]);
                            const currentChosenValueInner = findCurrentChosenAnswerValueByAnswers(questionAnswer.answers as AnswerValueType[]);

                            return <RadioGroup
                                id={`${questionId}-id-${questionAnswer.header}`}
                                header={questionAnswer.header}
                                orientation="row"
                                selectedValue={currentChosenValueInner}
                                items={availableAnswerOptionsInner}
                                onChange={(eventValue: string) => {
                                    updateNestedQuestionAnswerToStore(eventValue, currentQuestion, dispatch)
                                }}
                            />
                        })
                )
                }
            </div>
        </div>
    );
}
