import React, {ReactElement} from "react";
import {QuestionFormType} from "./questions/QuestionFormType";
import {isOneOfTheDependecyCriteriasFulfilled} from "./questions/questionFunctionsUtils";
import {OverviewLine} from "./OverviewLine";
import {Button} from "@statisticsnorway/ssb-component-library";

export interface StartpageProps {
    handleElementClick: Function,
    questions: QuestionFormType[],
    isSchemaFinished?: boolean
}

export const QuestionOverview = (
    {
        handleElementClick,
        questions,
        isSchemaFinished
    }: StartpageProps): ReactElement => {

    const questionWithFullfilledCrit = [...questions].filter(q => {
        return isOneOfTheDependecyCriteriasFulfilled(q, questions)
    })

    const questionsSortedByOrder = [...questionWithFullfilledCrit]
    questionsSortedByOrder.sort((a, b) => a.order - b.order)

    const sections = questionsSortedByOrder.filter(q => q.theme)
        .map(q => q.theme)
        .filter((value, index, self) => {
            return self.indexOf(value) === index
        })

    const content = (
        sections.map((section: string, index: number) => {
            const questionsWithinSection = questionsSortedByOrder.filter(q => q.theme && q.theme === section)
            const isDoneWithSection = questionsWithinSection.filter(q => q.hasAnswered).length === questionsWithinSection.length
            const firstQuestionInSection = questionsSortedByOrder.find(q => q.theme && q.theme === section)

            return (
                <div id={`section-${section}`}
                    className={"overview-line"}
                    onClick={() => {
                    if(isDoneWithSection || index === 0) {
                        handleElementClick(firstQuestionInSection)
                    }
                }}>
                    <OverviewLine
                        sectionName={section}
                        sectionDone={isDoneWithSection}
                        isClickable={index === 0 ? true : isDoneWithSection}
                    />
                </div>
            )
        })
    )

    return (
        <div className="flex-fill-remaining-vertical flex-container-column question-container">
            <div className="center-text width-100">
                <h1>
                    Spørreskjema
                </h1>
            </div>
            <div className="width-100">
                <p>
                    Spørreskjema inneholder spørsmål om enkeltstående utgifter som faller utenom føringsperioden,
                    eller utgifter som kan være vanskelig å huske at man har.
                    I tillegg er det noen spørsmål om boliglån og renter som kanskje krever at du har denne informasjonen tilgjengelig.
                </p>
            </div>
            {isSchemaFinished && (
                <div>
                    <Button primary onClick={(event: React.MouseEvent<HTMLElement>) => {
                        event.preventDefault()
                        console.log("Click")
                    }}>
                       Avslutt undersøkelse
                    </Button>
                </div>
            )}
            <div className="width-100 flex-fill-remaining-vertical">
                {
                  content
                }
            </div>
        </div>
    )
}