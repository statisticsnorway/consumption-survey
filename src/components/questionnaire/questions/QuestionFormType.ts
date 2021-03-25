
export interface QuestionFormType {
    id: string
    order: number,
    questionText: string
    hasAnswered: boolean
    answerValue: QuestionAnswerType
    defaultNextQuestion?: string
    alternativeNextQuestionCriteria?: NextQuestionCriteria[]
    dependentOnQuestionCriteria?: DependentOnQuestionCriteria[][]
    helperText?: HelperBox
    inputType?: "radio" | "text" | "checkbox" |
        "text-optional-timeperiod" | "multifield-text" |
        "multifield-text-with-sum" | "text-checkbox"
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
    chosen: boolean
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
}

export interface HeaderTextDependentOnQuestionCriteria {
    questionHeaderText: string
    dependentAnswer: DependentOnQuestionCriteria[]
}

export interface QuestionProps {
    questionId: string
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
