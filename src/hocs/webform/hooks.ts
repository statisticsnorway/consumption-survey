import {useSelector} from "react-redux";
import {HistoryBlock, QuestionState} from "../../store/reducers/questionReducer";
import {QuestionFormType} from "../../components/questionnaire/questions/QuestionFormType";

export const useSelectedQuestion = (id: string): QuestionFormType => {
    return useSelector(
        (state: QuestionState) => {
            const foundQuestion = state.questions.find((q: QuestionFormType) => q.id === id)

            if(!foundQuestion) {
                throw Object.assign(
                    new Error(`Can't find question by id: ${id}`),
                    { code: 404 }
                    )
            }

            return foundQuestion;
        }
    )
}

export const useSelectedQuestion2 = (id: string | undefined): QuestionFormType | undefined => {
    return useSelector(
        (state: QuestionState) => {
            if(!id) return undefined;
            return state.questions.find((q: QuestionFormType) => q.id === id)
        }
    )
}

export const useSelectMultipleQuestions = (ids: string[] | undefined): QuestionFormType[] | undefined => {
    return useSelector(
        (state: QuestionState) => {
            if(!ids) return undefined;

            return state.questions.filter((q: QuestionFormType) => {
                return ids.filter(i => i === q.id).length > 0
            })
        }
    )
}

export const useQuestionDependency = (id: string): QuestionFormType => {
    return useSelector(
        (state: QuestionState) => {
            const foundQuestion = state.questions.find((q: QuestionFormType) => q.id === id)

            if(!foundQuestion) {
                throw Object.assign(
                    new Error(`Can't find question by id: ${id}`),
                    { code: 404 }
                )
            }

            return foundQuestion;
        }
    )
}

export const useFocus = (): string => {
    return useSelector(
        (state: QuestionState) => {
            return state.currentFocus

        }
    )
}

export const useStateHistory = (): HistoryBlock[] => {
    return useSelector(
        (state: QuestionState) => {
            return state.history
        }
    )
}
