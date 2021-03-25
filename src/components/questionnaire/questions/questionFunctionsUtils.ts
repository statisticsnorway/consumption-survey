import {
    AnswerValueType,
    DependentOnQuestionCriteria,
    NextQuestionCriteria,
    QuestionAnswerType,
    QuestionDependency,
    QuestionFormType,
    RadioButtonOption
} from "./QuestionFormType";
import {HistoryBlock} from "../../../store/reducers/questionReducer";

export const findCurrentChosenAnswerValue = (currentQuestion: QuestionFormType) => {
    return (currentQuestion?.answerValue.answers as AnswerValueType[])
        .find(answer => answer.chosen)?.value
}

export const findCurrentChosenAnswerValueByAnswers = (answerValues: AnswerValueType[]) => {
    return answerValues
        .find(answer => answer.chosen)?.value
}

export const getRadioButtonOptionsForQuestion = (question: QuestionFormType): RadioButtonOption[] => {
    return (question?.answerValue.answers as AnswerValueType[])
        .map(answer => {
            return {"label": answer.descriptionValue, "value": answer.value} as RadioButtonOption
        })
}

export const getRadioButtonOptionsForQuestionWithAnswerIds = (question: QuestionFormType): RadioButtonOption[] => {
    return (question?.answerValue.answers as AnswerValueType[])
        .map(answer => {
            return {"label": answer.descriptionValue, "value": answer.value, "id": answer.id} as RadioButtonOption
        })
}

export const getRadioButtonOptionsForQuestionByAnswers = (answers: AnswerValueType[]): RadioButtonOption[] => {
    return answers
        .map(answer => {
            return {"label": answer.descriptionValue, "value": answer.value} as RadioButtonOption
        })
}

export const shouldShowQuestionBasedOnDependentQuestions = (
    dependencies: QuestionDependency[]
): boolean => {
    return dependencies.map(d => {
        return (d.question.answerValue.answers as AnswerValueType[])
            .filter(answer => answer.chosen && answer.value === d.dependentAnswer.value)
            .length > 0
    })
        .filter(bool => bool)
        .length === dependencies.length
}

export const extractCriteria = (questionsDependedOn: QuestionFormType[] | undefined, dependentOnQuestionCriteria: DependentOnQuestionCriteria[] | undefined): QuestionDependency[] => {
    const dependentCriteria = dependentOnQuestionCriteria?.map(criteria => {
            const questionDependentOn = questionsDependedOn?.find(question => question.id === criteria.questionId)
            return {
                question: questionDependentOn,
                dependentAnswer: {
                    id: `${criteria?.questionId}_${criteria?.questionValue}`,
                    value: criteria?.questionValue,
                    chosen: true
                }
            } as QuestionDependency
        }
    ) as QuestionDependency[];

    return dependentCriteria;
}

export const getPreviousAnsweredQuestion = (currentQuestionId: string, questionHistory: HistoryBlock[]): string => {
    const filtered = questionHistory.filter((his: HistoryBlock) => {
        return his.stepDirection === "forward" && his.toQuestionId === currentQuestionId
    })

    const previousQuestionHistoryBlock = filtered[filtered.length - 1];
    return previousQuestionHistoryBlock.fromQuestionId
}

export const getAlternativeNextQuestion = (critera: NextQuestionCriteria[], questions: QuestionFormType[]): string => {
    const questionIdsToGoTo = critera
        .map(c => isAlternativeNextQuestionPathCriteriaFulfilled(c, questions))
        .filter((questionId: string) => questionId !== "")

    if (questionIdsToGoTo.length === 0) {
        return ""
    }

    // Always return first fulfilled criteria for now
    return questionIdsToGoTo[0]
}

export const isAlternativeNextQuestionPathCriteriaFulfilled = (critera: NextQuestionCriteria, questions: QuestionFormType[]): string => {
    const questionsInCriteria = questions.filter(q => {
        return critera.nextQuestionDependencies?.find(c => {
            return c.questionId === q.id
        }) !== undefined
    })

    const criterasMatched = questionsInCriteria.filter(q => {
        const questionCriteria = (critera.nextQuestionDependencies as DependentOnQuestionCriteria[]).find(c => c.questionId === q.id);
        const questionAnswer = (q.answerValue.answers as AnswerValueType[]);
        const chosenAnswer = questionAnswer.find(a => a.chosen)

        return chosenAnswer?.value as string === questionCriteria?.questionValue;
    });

    return criterasMatched.length === questionsInCriteria.length ? critera.nextQuestionId : "";
}

export const getNextQuestionByOrder = (currentQuestion: QuestionFormType, questions: QuestionFormType[]) => {
    const order = currentQuestion.order;

    const availableQuestions = questions
        .filter(q => q.order > order)
        .filter(q => {
            if(!q.dependentOnQuestionCriteria) {
                return true
            }
            return isOneOfTheDependecyCriteriasFulfilled(q.dependentOnQuestionCriteria, questions)
        })

    return getLowestOrderQuestion(availableQuestions);
};

const getLowestOrderQuestion = (questions: QuestionFormType[]): QuestionFormType => {
    let lowestOrderQuestion = questions[0]
    let lowValue = lowestOrderQuestion.order;

    questions.forEach(q => {
        if(q.order < lowValue) {
            lowValue = q.order;
        }
    })

    return questions.find(q => q.order === lowValue) as QuestionFormType;
}

export const isOneOfTheDependecyCriteriasFulfilled = (critera: DependentOnQuestionCriteria[][], questions: QuestionFormType[]): boolean => {
    const boolListOfFulfilledCriteria = critera.map(d => isDependecyFulfilled(d, questions));

    return boolListOfFulfilledCriteria.includes(true)
}

export const isAllDependecyCriteriasFulfilled = (critera: DependentOnQuestionCriteria[][], questions: QuestionFormType[]): boolean => {
    const deppy = critera.map(d => isDependecyFulfilled(d, questions));

    return !deppy.includes(false)
}

const isDependecyFulfilled = (critera: DependentOnQuestionCriteria[], questions: QuestionFormType[]): boolean => {
    const fullfilledCriteria = critera.filter(criteria => {
        return isCriteriaForfilled(criteria, questions)
    });

    return critera.length === fullfilledCriteria.length;
}

const isCriteriaForfilled = (critera: DependentOnQuestionCriteria, questions: QuestionFormType[]): boolean => {
    const criteriaQuestion = questions.find(q => q.id === critera.questionId);
    const questionAnswer = (criteriaQuestion?.answerValue.answers as AnswerValueType[]);
    const chosenAnswerForQuestion = questionAnswer.find(a => a.chosen)

    return chosenAnswerForQuestion?.value as string === critera.questionValue;
}

export const isQuestionNestedWithAdditionalQuestions = (answer: AnswerValueType[] | QuestionAnswerType[]): boolean => {
    const anyOfAnswerTypeOrQuestionType: any = answer as any;

    if(anyOfAnswerTypeOrQuestionType && anyOfAnswerTypeOrQuestionType.length > 0 && anyOfAnswerTypeOrQuestionType[0].id){
        return false;
    }

    return true;
}

export const cumulativeOffset = (element: HTMLElement) => {
    var top = 0, left = 0;
    do {
        top += element.offsetTop || 0;
        left += element.offsetLeft || 0;
        element = element.offsetParent as HTMLElement;
    } while (element);

    return {
        top: top,
        left: left
    };
};

export const animateUp = (previousQuestionId: string, currentQuestionId: string) => {
    const dependentElement = document.getElementById(`main-container-question-${previousQuestionId}`);
    const currentQElement = document.getElementById(`main-container-question-${currentQuestionId}`);

    if (dependentElement) {
        const pos = cumulativeOffset(dependentElement)
        const heightEle = dependentElement.offsetHeight;
        // const posBeforeMove = pos.top + 40      // Vil ikke virke fordi POS den endres når elementet flyttes
        const addy = (heightEle - 240) < 0 ? (heightEle - 240) * -1 : (heightEle - 240);

        dependentElement.classList.add("width-100");
        dependentElement.classList.add("hide-behind-top-n5-lt-10")

        setTimeout(() => {
            dependentElement.style.top = `${addy}px`
            dependentElement.style.left = `${30}px`
        }, 200)

        if (currentQElement) {
            currentQElement.classList.add("trans-all")
            currentQElement.style.background = 'url("full_bakgrunn_lilla.svg") no-repeat';
            currentQElement.style.backgroundSize = 'cover';

            setTimeout(() => {
                const dependentElement = document.getElementById(`main-container-question-${previousQuestionId}`);
                if (dependentElement) {
                    currentQElement.classList.remove("hide")
                    currentQElement.classList.add("show")
                    currentQElement.classList.add("margin-tp-50")
                    currentQElement.classList.add("padding-tp-70px")
                    currentQElement.classList.add("padding-bm-40px")

                }
            }, 800)
        }
    }
}

export const removeAnimationCssClasses = (questionid: string) => {
    const removeEle = document.getElementById(`main-container-question-${questionid}`);

    if (removeEle) {
        removeEle.classList.remove("margin-tp-50", "padding-tp-70px", "padding-bm-40px", "trans-all")
        removeEle.style.background = 'white'
    }
}
