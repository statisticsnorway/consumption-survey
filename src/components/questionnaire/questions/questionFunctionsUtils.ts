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
        .filter(answer => !answer.hidden)
        .map(answer => {
            return {"label": answer.descriptionValue, "value": answer.value} as RadioButtonOption
        })
}

export const getRadioButtonOptionsForQuestionWithAnswerIds = (question: QuestionFormType): RadioButtonOption[] => {
    return (question?.answerValue.answers as AnswerValueType[])
        .filter(answer => !answer.hidden)
        .map(answer => {
            return {"label": answer.descriptionValue, "value": answer.value, "id": answer.id} as RadioButtonOption
        })
}

export const getRadioButtonOptionsForQuestionByAnswers = (answers: AnswerValueType[]): RadioButtonOption[] => {
    return answers
        .filter(answer => !answer.hidden)
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
                    id: criteria.answerId ? criteria.answerId : `${criteria?.questionId}_${criteria?.questionValue}`,
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

export const getNextQuestionByOrder = (currentQuestion: QuestionFormType, questions: QuestionFormType[]): QuestionFormType => {
    const order = currentQuestion.order;

    const availableQuestions = questions
        .filter(q => q.order > order)
        .filter(q => {
            return isOneOfTheDependecyCriteriasFulfilled(q, questions)
        })

    if(!availableQuestions || availableQuestions.length === 0) {
        throw new Error("Not any available question after " + currentQuestion.id)
    }

    return getLowestOrderQuestion(availableQuestions);
};

export const isLastQuestionInSchema = (currentQuestion: QuestionFormType, questions: QuestionFormType[]): boolean => {
    const order = currentQuestion.order;

    const availableQuestions = questions
        .filter(q => q.order > order)
        .filter(q => {
            return isOneOfTheDependecyCriteriasFulfilled(q, questions)
        })

    return !availableQuestions || availableQuestions.length === 0
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

export const isOneOfTheDependecyCriteriasFulfilled = (question: QuestionFormType, questions: QuestionFormType[]): boolean => {
    if(!question.dependentOnQuestionCriteria) {
        return true
    }
    /*if(question.dependentOnQuestionCriteria && question.inputType === "multifield-text-dependent") {
        return true
    }*/

    const boolListOfFulfilledCriteria = (question.dependentOnQuestionCriteria as DependentOnQuestionCriteria[][])
        .map(d => isDependecyFulfilled(d, questions));

    return boolListOfFulfilledCriteria.includes(true)
}

export const getAnsweredValues = (questions: QuestionFormType[]): string[] => {
    const boolListOfFulfilledCriteria = questions
        .map(d => d.answerValue)
        .flatMap(a => {
            const anny = a.answers as AnswerValueType[]
            return anny.filter(b => b.chosen && b.value && b.value !== "").map(ba => `${ba.id} == ${ba.value as string}`)
        })

    return boolListOfFulfilledCriteria
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

export const isQuestionAnswered = (question: QuestionFormType, questions: QuestionFormType[]) => {
    const answers = question.answerValue.answers as AnswerValueType[]

    if(question.inputType === 'multifield-number-dependent-with-sum' || question.inputType === 'multifield-number-dependent') {
        const regex = /^(\D+)(?=\d*)/g
        // @ts-ignore
        const questId = question.id.match(regex)[0]
        let crit: DependentOnQuestionCriteria | null  = null
        question.dependentOnQuestionCriteria?.forEach(c => {
            for(let i = 0; i < c.length; i++) {
                const idHit = c[i].questionId.match(regex)
                if(idHit != null) {
                    if(idHit[0] === questId) {
                        if(crit) {
                            if(crit?.questionId < c[i].questionId) {
                                crit = c[i]
                            }
                        }
                        else{
                            crit = c[i]
                        }
                    }
                }
            }
        })

        const priorQuestion = questions.find(q => crit?.questionId === q.id)
        const pAnswers = priorQuestion?.answerValue.answers as AnswerValueType[]
        const priorAnsweredQuestions = pAnswers.filter((a : AnswerValueType) => a.chosen)
        const sameQuestions = answers.filter(a => priorAnsweredQuestions.find(p =>  a.id.split('_')[1] === p.id.split('_')[1]))
        if(question.inputType === 'multifield-number-dependent-with-sum') {
            for (let i = 0; i < sameQuestions.length; i = i + 2) {
                if ((!sameQuestions[i].value) && (!sameQuestions[i + 1].value)) {
                    return false
                }
            }
            return true
        }
        else {
            for (let i = 0; i < sameQuestions.length; i++) {
                if ((!sameQuestions[i].value)) {
                    return false
                }
            }
            return true
        }

    }

    //other types
    else {
        const answersChecked = answers.filter(a => a.chosen && a.value)
        return answersChecked.length > 0
    }
}

const isCriteriaForfilled = (critera: DependentOnQuestionCriteria, questions: QuestionFormType[]): boolean => {
    const criteriaQuestion = questions.find(q => q.id === critera.questionId);
    const questionAnswer = (criteriaQuestion?.answerValue.answers as AnswerValueType[]);
    const chosenAnswerMultiple = questionAnswer.filter(a => a.chosen)

    if(critera.answerId && critera.answerId !== "") {
        return chosenAnswerMultiple.filter(a => {
            if(critera.answerId === a.id){
                if(critera.specialCompare === "moreThan"){
                    return parseInt(a.value as string) > parseInt(critera.questionValue)
                } else if(critera.specialCompare === "lessThan") {
                    return parseInt(a.value as string) < parseInt(critera.questionValue)
                } else {
                    return a.value as string === critera.questionValue
                }
            }

            return false
        })
            .length > 0;
    }

    if(critera.specialCompare === "logicNot") {
        return chosenAnswerMultiple.filter(answer => {
            const codeId = `${critera.questionId}_${critera.questionValue}`;
            return answer.id === codeId;
        })
            .length === 0;
    }

    if(critera.specialCompare === "moreThan") {
        return chosenAnswerMultiple.filter(answer => {
            if(answer.value && answer.value !== "") {
                return parseInt(answer.value as string) > parseInt(critera.questionValue)
            }
            return false;
        })
            .length > 0;
    }
    return chosenAnswerMultiple
        .filter(answer => {
           return answer?.value as string  === critera.questionValue || critera.questionValue === ""
        })
        .length > 0;
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
        // const pos = cumulativeOffset(dependentElement)
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

export const getInputPostfix = (inputPostfixType: "text" | "kvm" | "percent" | "l" | "cash" | "amount") => {
    if(inputPostfixType === "text") return "";
    if(inputPostfixType === "kvm") return "kvm";
    if(inputPostfixType === "percent") return "%";
    if(inputPostfixType === "l") return "l";
    if(inputPostfixType === "cash") return "kr";
    if(inputPostfixType === "amount") return "Antall";

    return ""
}
export const doesQuestionHaveVetIkkeOptionAndIsHidden = (currentQuestion: QuestionFormType) => {
    return (currentQuestion.answerValue.answers as AnswerValueType[]).filter((a: AnswerValueType) => {
        return a.descriptionValue?.toLowerCase() === 'vet ikke' && a.hidden
    })
        .length > 0
}
