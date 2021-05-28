
export interface QuestionFormType {
    id: string
    theme: string,
    order: number,
    questionText: string,
    subText?: string
    hasAnswered: boolean
    answerValue: QuestionAnswerType
    defaultNextQuestion?: string
    alternativeNextQuestionCriteria?: NextQuestionCriteria[]
    dependentOnQuestionCriteria?: DependentOnQuestionCriteria[][]
    helperText?: HelperBox
    inputType?: "radio" | "text" | "number" | "checkbox" |
        "text-optional-timeperiod" | "number-optional-timeperiod" | "number-optional-timeperiod-checkbox" | "multifield-text" | "multifield-number" |
        "multifield-text-with-sum" | "multifield-number-with-sum" | "text-checkbox" | "number-checkbox" |"multifield-text-dependent" |
        "multifield-number-dependent" | "multifield-text-dependent-with-sum" | "multifield-number-dependent-with-sum" |
        "multifield-number-siffer-dependent"
    inputPostfix?: "text" | "kvm" | "percent" | "l" | "cash" | "amount"
}

export interface HelperBox {
    title: string
    content: string
}

export interface QuestionAnswerType {
    answers: AnswerValueType[] | QuestionAnswerType[]
    header?: string
}

export interface AnswerValueType {
    id: string
    value: string | undefined
    descriptionValue?: string | null
    chosen: boolean,
    hidden?: boolean
}

export interface QuestionDependency {
    question: QuestionFormType
    dependentAnswer: AnswerValueType
}

export interface NextQuestionCriteria{
    currentQuestionValue: string
    nextQuestionId: string,
    nextQuestionDependencies?: DependentOnQuestionCriteria[]
}

export interface NextQuestionCriteriaTwo{
    dependentQuestionId: string,
    dependentQuestionValue: string
}

export interface ListOfDependentOnQuestionCriteria {
    criteria: DependentOnQuestionCriteria[]
}

export interface DependentOnQuestionCriteria {
    questionId: string
    questionValue: string
    answerId?: string
    specialCompare?: "logicNot" | "moreThan" | "lessThan"
}

export interface HeaderTextDependentOnQuestionCriteria {
    questionHeaderText: string
    dependentAnswer: DependentOnQuestionCriteria[]
}

export interface QuestionProps {
    questionId: string
    questions?: QuestionAnswerType[]
    defaultNextQuestionId?: string
    dependentOnQuestionCriteria?: DependentOnQuestionCriteria[]
    alternativeNextQuestionCriteria?: NextQuestionCriteria
    inputFormType?: 'text' | 'radio' | "checkbox"
    dependentHeaderText?: HeaderTextDependentOnQuestionCriteria,
    showNav?: Boolean
}

export interface RadioButtonOption {
    label: string
    value: string
    id?: string
}


