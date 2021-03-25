import React, {ReactElement, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {QuestionFormType} from "./QuestionFormType";
import {BaseQuestion} from "./BaseQuestion";
import {SubHeader} from "../SubHeader";
import {Button, Dialog} from "@statisticsnorway/ssb-component-library";
import {getNextQuestionByOrder, getPreviousAnsweredQuestion} from "./questionFunctionsUtils";
import {Dispatch} from "redux";
import {ArrowLeft, ArrowRight} from "react-feather";
import {useFocus, useStateHistory} from "../../../hocs/webform/hooks";
import {changeFocus} from "../../../store/actionCreators";
import {HistoryBlock, QuestionState} from "../../../store/reducers/questionReducer";

interface QuestionInfo {
    id: string
    element: ReactElement | null
}

export const ConsumptionForm: React.FC = () => {
    const questions: QuestionFormType[] = useSelector(
        (state: QuestionState) => {
            return state.questions
        });

    const dispatch: Dispatch<any> = useDispatch()
    const focusId: string = useFocus()
    const history: HistoryBlock[] = useStateHistory()

    const [focusList, setFocusList] = useState([] as QuestionInfo[]);

    useEffect(() => {
        const focusList = questions.map(q => {
            return {
                id: q.id,
                element: <BaseQuestion questionId={`${q.id}`}/>
            }
        })
        setFocusList(focusList)
    }, []);

    console.log({questions})

    const element = focusList.find(questionElement => questionElement.id === focusId);
    const currentQuestion = questions.find(questionElement => questionElement.id === focusId) as QuestionFormType
    const currentQuestionId  = currentQuestion?.id as string;



    return (
        <div className="height-100 flex-container-column"
             onKeyPress={(event: React.KeyboardEvent<HTMLDivElement>): void => {
                 if(event.key === 'Enter'){
                     const nextQuestion = getNextQuestionByOrder(currentQuestion, questions);
                     dispatch(changeFocus(
                         nextQuestion.id as string,
                         {
                             fromQuestionId: currentQuestionId,
                             toQuestionId: nextQuestion.id,
                             stepDirection: "forward"
                         } as HistoryBlock
                     ))
                 }
             }}
        >


            <SubHeader cat={"Dette er husgreier"} />

            <div className="flex-fill-remaining-vertical flex-container-column question-container">
                {element?.element}

                {(currentQuestion && currentQuestion.helperText) &&
                (
                    <div className="margin-tp-20 fsize-15">
                        <Dialog type='info' title={currentQuestion.helperText.title}>
                            {currentQuestion.helperText.content}
                        </Dialog>
                    </div>
                )
                }

                <div className="flex-fill-remaining-vertical flex-elements-bottom">
                    <div className="width-100 flex-container padding-bm-50">
                        <div className="width-50 question-nav-buttons-left">
                            <Button secondary
                                    id={`nav-button-left-id-${currentQuestionId}-2`}
                                    onClick={ (event: React.MouseEvent<HTMLElement>) => {
                                        event.preventDefault();

                                        const questionToNavigateTo = getPreviousAnsweredQuestion(currentQuestionId, history);

                                        dispatch(changeFocus(
                                            questionToNavigateTo,
                                            {
                                                fromQuestionId: currentQuestionId,
                                                toQuestionId: questionToNavigateTo,
                                                stepDirection: "back"
                                            } as HistoryBlock
                                        ))
                                    }}
                            >
                                <div className="flex-container">
                                    <div
                                        className="padding-lt-rt-10px">
                                        Forrige
                                    </div>
                                    <ArrowLeft
                                        className="arrow-icon"
                                        size={22}
                                        color={"#00824D"}
                                        onClick={event => {
                                            event.preventDefault();
                                        }}
                                    />
                                </div>
                            </Button>
                        </div>
                        <div className="width-50 question-nav-buttons-right">
                            <Button primary
                                    id={`nav-button-right-id-${currentQuestionId}-2`}
                                    onClick={(event: React.MouseEvent<HTMLElement>) => {
                                        event.preventDefault();

                                        const nextQuestion = getNextQuestionByOrder(currentQuestion, questions);

                                        dispatch(changeFocus(
                                            nextQuestion.id as string,
                                            {
                                                fromQuestionId: currentQuestionId,
                                                toQuestionId: nextQuestion.id,
                                                stepDirection: "forward"
                                            } as HistoryBlock
                                        ))
                                    }}
                            >
                                <div className="flex-container">
                                    <div>
                                        <ArrowRight
                                            className="arrow-icon"
                                            size={22}
                                            color={"white"}
                                            onClick={event => {
                                                event.preventDefault();
                                            }}
                                        />
                                    </div>

                                    <div
                                        className="padding-lt-rt-10px">
                                        Neste
                                    </div>
                                </div>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
};

//TODO legge til Futg3

// ALTERNATIVE WAY TO GET NEW QUESTION
// const cri = currentQuestion?.alternativeNextQuestionCriteria
//
// let criKake = "";
// if(cri){
//     let criKake = getAlternativeNextQuestion(cri, questions)
//     console.log({criKake})
// }
//
// if (criKake !== "") {
//     console.log(`ALTERN Change focus to ${criKake}`)
//
//     dispatch(changeFocus(
//         criKake as string,
//         {
//             fromQuestionId: currentQuestionId,
//             toQuestionId: criKake,
//             stepDirection: "forward"
//         } as HistoryBlock
//     ))
// } else {
//     console.log(`MAIN Change focus to ${defaultNextQuestion}`)
//     dispatch(changeFocus(
//         defaultNextQuestion as string,
//         {
//             fromQuestionId: currentQuestionId,
//             toQuestionId: defaultNextQuestion as string,
//             stepDirection: "forward"
//         } as HistoryBlock
//     ))
// }
