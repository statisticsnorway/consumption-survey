import React, {ReactElement, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { QuestionFormType} from "./questions/QuestionFormType";
import {BaseQuestion} from "./questions/BaseQuestion";
import {SubHeader} from "./SubHeader";
import {AppHeader} from "./AppHeader";
import {Button, Dialog} from "@statisticsnorway/ssb-component-library";
import {
    doesQuestionHaveVetIkkeOptionAndIsHidden,
    getAnsweredValues,
    getNextQuestionByOrder,
    getPreviousAnsweredQuestion, isLastQuestionInSchema, isQuestionAnswered
} from "./questions/questionFunctionsUtils";
import {Dispatch} from "redux";
import {ArrowLeft, ArrowRight} from "react-feather";
import {Startpage} from "./Startpage";
import {QuestionOverview} from "./QuestionOverview";
import {HistoryBlock, QuestionState} from "../../store/reducers/questionReducer";
import {useFocus, useStateHistory} from "../../hocs/webform/hooks";
import {changeFocus, unhideAnswerOption} from "../../store/actionCreators";

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
    const [noAnswers, setNoAnswers] = useState(false)
    const [isStarted, setIsStarted] = useState(false)
    const [isOverview, setIsOverview] = useState(false)
    const [isLastQuestion, setIsLastQuestion] = useState(false)

    useEffect(() => {
        const focusList = questions.map(q => {
            return {
                id: q.id,
                element: <BaseQuestion questionId={`${q.id}`}/>
            }
        })
        setFocusList(focusList)
    }, [questions]);

    const handleNext = (currentQuestion : QuestionFormType) => {
        if (isQuestionAnswered(currentQuestion, questions)) {
            setNoAnswers(false)

            try {
                const nextQuestion = getNextQuestionByOrder(currentQuestion, questions);
                setIsLastQuestion(false)

                dispatch(changeFocus(
                    nextQuestion.id as string,
                    {
                        fromQuestionId: currentQuestionId,
                        toQuestionId: nextQuestion.id,
                        stepDirection: "forward"
                    } as HistoryBlock
                ))
            } catch (e: any) {
                const isLastQuestion = isLastQuestionInSchema(currentQuestion, questions)
                if(isLastQuestion) {
                    setIsLastQuestion(true)
                    setIsOverview(true)
                }
            }
        }
        else {
            setNoAnswers(true)

            if(doesQuestionHaveVetIkkeOptionAndIsHidden(currentQuestion)){
                dispatch(unhideAnswerOption(currentQuestion))
            }
        }
    }

    const setIsStartedTrue = () => {
        setIsStarted(true)
    }

    const setIsOverviewTrue = () => {
        setIsOverview(true)
    }

    const setFocusToClickedSection = (firstQuestionInSection: QuestionFormType) => {
        setIsOverview(false)

        dispatch(changeFocus(
            firstQuestionInSection.id as string,
            {
                fromQuestionId: currentQuestionId,
                toQuestionId: firstQuestionInSection.id,
                stepDirection: "forward"
            } as HistoryBlock
        ))
    }

    const element = focusList.find(questionElement => questionElement.id === focusId);
    const currentQuestion = questions.find(questionElement => questionElement.id === focusId) as QuestionFormType
    const currentQuestionId  = currentQuestion?.id as string;

    return (
        <>
            <div style={{position: 'absolute', right: '0', backgroundColor: 'white', zIndex: 0, padding: '30px', border: '2px solid #7cc'}}>
                {`current question: ${currentQuestion.id}`}
                <ul>
                    {getAnsweredValues(questions).map(val => {
                        return (
                            <li key={`${val}-id`}>
                                {val}
                            </li>)
                    })
                    }
                </ul>
            </div>
        <div className="height-100 flex-container-column"
             onKeyPress={(event: React.KeyboardEvent<HTMLDivElement>): void => {
                 if(event.key === 'Enter'){
                     handleNext(currentQuestion)
                 }
             }}
        >
            <AppHeader />
            {(isStarted && !isOverview) && (
                <div className="height-100 flex-container-column">
                    <SubHeader
                        cat={currentQuestion.theme ? currentQuestion.theme : ''}
                        clicker={setIsOverviewTrue}
                    />

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
                        {noAnswers &&
                        <div className="margin-tp-20 fsize-15 margin-bt-10">
                            <Dialog type='warning' title='Du må svare på spørmålet for å gå videre'>

                            </Dialog>

                        </div>
                        }


                        <div className="flex-fill-remaining-vertical flex-elements-bottom">
                            <div className="width-100 flex-container padding-bm-50">
                                <div className={`width-50 question-nav-buttons-left ${currentQuestion.order === 1 ? "hide" : ""}`}
                                >
                                    <Button secondary
                                            id={`nav-button-left-id-${currentQuestionId}-2`}
                                            onClick={ (event: React.MouseEvent<HTMLElement>) => {
                                                event.preventDefault();

                                                const questionToNavigateTo = getPreviousAnsweredQuestion(currentQuestionId, history);
                                                setNoAnswers(false)
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
                                <div className="width-50 question-nav-buttons-right"      style={{zIndex: 1}}    >
                                    <Button primary
                                            id={`nav-button-right-id-${currentQuestionId}-2`}
                                            onClick={(event: React.MouseEvent<HTMLElement>) => {
                                                event.preventDefault();
                                                handleNext(currentQuestion)
                                            }
                                            }
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
            )}

            {(currentQuestion.order === 1 && !isStarted && !currentQuestion.hasAnswered) && (
                <Startpage clicker={setIsStartedTrue}/>
            )}

            {isOverview && (
                <QuestionOverview handleElementClick={setFocusToClickedSection} questions={questions} isSchemaFinished={isLastQuestion} />
            )}
        </div>
        </>
    )
};
