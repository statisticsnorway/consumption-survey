import {AnswerValueType, QuestionAnswerType, QuestionFormType, QuestionProps} from "./QuestionFormType";
import React, {ChangeEvent, ReactElement, useEffect} from "react";
import {Dispatch} from "redux";
import {useDispatch, useSelector} from "react-redux";
import {
    extractCriteria,
    findCurrentChosenAnswerValue,
    findCurrentChosenAnswerValueByAnswers,
    getRadioButtonOptionsForQuestion,
    getRadioButtonOptionsForQuestionByAnswers,
    getRadioButtonOptionsForQuestionWithAnswerIds,
    isOneOfTheDependecyCriteriasFulfilled,
    isQuestionNestedWithAdditionalQuestions,
    shouldShowQuestionBasedOnDependentQuestions
} from "./questionFunctionsUtils";
import RadioGroup from "../RadioGroup";
import {
    updateMultipleQuestionAnswerToStoreText,
    updateNestedQuestionAnswerToStore,
    updateQuestionAnswerToStore,
    updateQuestionAnswerToStoreText
} from "./UpdateQuestionValue";
import {CheckboxGroup, Input, Dropdown} from "@statisticsnorway/ssb-component-library";
import InputAlt from "../InputAlt";
import {HistoryBlock, QuestionState} from "../../../store/reducers/questionReducer";
import {useSelectedQuestion, useSelectMultipleQuestions, useStateHistory} from "../../../hocs/webform/hooks";
import CheckboxGroupAlt from "./CheckboxGroupAlt";


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
    const history: HistoryBlock[] = useStateHistory()

    const headerDependedOn = useSelectMultipleQuestions(dependentHeaderText?.dependentAnswer?.map(q => q.questionId));
    const headerDependentCriteria = extractCriteria(headerDependedOn, dependentHeaderText?.dependentAnswer);

    let currentQuestionDependsOnThisDomElement: any = undefined;

    useEffect(() => {
        //TODO Comment out animate for now. Have to prioritize differently before pilot
        // ANIMATE

        const inputElement = document.getElementById(`answer-input-${questionId}-id`)
        const inputSelectDepElement = document.getElementById(`answer-input-select-${questionId}-id`)
        const radioElement = document.getElementById(`answer-radiogroup-${questionId}-id`)
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

    if (currentQuestion.dependentOnQuestionCriteria && !isOneOfTheDependecyCriteriasFulfilled(currentQuestion.dependentOnQuestionCriteria, questions)) {
        return null;
    }

    let headerText
    if (dependentHeaderText) {
        const shouldShowAlternativeHeader = shouldShowQuestionBasedOnDependentQuestions(headerDependentCriteria)
        headerText = shouldShowAlternativeHeader ? dependentHeaderText.questionHeaderText : currentQuestion.questionText
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

    console.log({availableAnswerOptions})

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
                    {headerText ? headerText : currentQuestion.questionText}
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

                {!isMultipleQuestionsInOne && currentQuestion.inputType === 'text' &&
                <InputAlt
                    id={`answer-input-${questionId}-id`}
                    label={""}
                    value={currentChosenValue}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                        updateQuestionAnswerToStoreText(
                            event.target.value,
                            currentQuestion,
                            dispatch,
                            (currentQuestion.answerValue.answers as AnswerValueType[])[0].id
                        )
                    }}
                />
                }

                {!isMultipleQuestionsInOne && currentQuestion.inputType === 'checkbox' &&
                <CheckboxGroupAlt
                    id={`answer-checkbox-${questionId}-id`}
                    orientation="column"
                    onChange={(eventValue: string) => {
                        updateMultipleQuestionAnswerToStoreText(eventValue, currentQuestion, dispatch)
                    }}
                    items={availableAnswerOptions}
                    selectedValues={((currentQuestion.answerValue.answers) as AnswerValueType[]).map(a => {
                        return a.chosen ? a.value : ""
                    })}
                />
                }

                {!isMultipleQuestionsInOne && currentQuestion.inputType === 'text-checkbox' &&
                <div>
                    <InputAlt
                    id={`answer-input-checkbox-${questionId}-id`}
                    label={""}
                    value={(currentQuestion.answerValue.answers as AnswerValueType[])[0].value}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                        console.log({event})
                        updateQuestionAnswerToStoreText(
                            event.target.value,
                            currentQuestion,
                            dispatch,
                            (currentQuestion.answerValue.answers as AnswerValueType[])[0].id
                        )
                    }}
                />
                    <div className={"flex-container-column padding-tp-bm-20px"}>
                    <CheckboxGroupAlt
                        id={`answer-text-checkbox-${questionId}-id`}
                        orientation="column"
                        onChange={(eventValue: string) => {
                            console.log({eventValue})
                            updateMultipleQuestionAnswerToStoreText(eventValue, currentQuestion, dispatch)
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

                {!isMultipleQuestionsInOne && (currentQuestion.inputType === 'multifield-text' || currentQuestion.inputType === 'multifield-text-with-sum') &&
                (
                    <div className={"flex-container-column padding-tp-bm-20px"}>
                        {
                            availableAnswerOptionsWithAnswerIds.map(a => {
                                return (
                                    <div className={"padding-tp-bm-20px"}>

                                        <InputAlt
                                            type={"text"}
                                            label={a.label}
                                            id={`answer-input-${questionId}-${a.id}-id`}
                                            value={a.value}
                                            onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                                updateQuestionAnswerToStoreText(event.target.value, currentQuestion, dispatch, a.id)
                                            }}
                                        />
                                    </div>
                                )
                            })
                        }
                        {currentQuestion.inputType === 'multifield-text-with-sum' && (
                            <div className={`padding-tp-bm-20px`}>
                                {
                                    (
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
                                    )
                                }
                            </div>
                        )
                        }
                    </div>
                )}

                {!isMultipleQuestionsInOne && currentQuestion.inputType === 'text-optional-timeperiod' &&
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
                            console.log({item})
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
                            <InputAlt
                                id={`answer-input-select-${questionId}-id`}
                                label={(currentQuestion.answerValue.answers as AnswerValueType[])[1].descriptionValue as string}
                                value={(currentQuestion.answerValue.answers as AnswerValueType[])[1].value as string}
                                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                    updateQuestionAnswerToStoreText(
                                        event.target.value,
                                        currentQuestion,
                                        dispatch,
                                        (currentQuestion.answerValue.answers as AnswerValueType[])[1].id
                                    )
                                }}
                            />
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
