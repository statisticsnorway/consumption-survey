import React, {ReactElement} from "react";
import {QuestionFormType} from "./questions/QuestionFormType";
import {isOneOfTheDependecyCriteriasFulfilled} from "./questions/questionFunctionsUtils";
import {OverviewLine} from "./OverviewLine";
import {Button} from "@statisticsnorway/ssb-component-library";

export interface StartpageProps {
    handleElementClick: Function,
    questions: QuestionFormType[],
    onFinishedClicked: () => void
}

export const QuestionOverview = (
    {
        handleElementClick,
        questions,
        onFinishedClicked
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
        });

    const contentList =  sections.map((section: string, index: number) => {
        const questionsWithinSection = questionsSortedByOrder.filter(q => q.theme && q.theme === section)
        const isDoneWithSection = questionsWithinSection.filter(q => q.hasAnswered).length === questionsWithinSection.length
        const firstQuestionInSection = questionsSortedByOrder.find(q => q.theme && q.theme === section)
        return {
            isDoneWithSection,
            firstQuestionInSection,
            section,
            index
        }
    });

    return (
        <div className="flex-fill-remaining-vertical flex-container-column question-container">
            <div className="center-text width-100">
                <h1>
                    Spørreskjema
                </h1>
            </div>
            <div className="width-100">
                {!(contentList.filter(c => c.isDoneWithSection).length === sections.length) && (
                    <p>
                        Du er allerede godt i gang. Forsett slik!
                    </p>
                )}
                <p>
                    Listen under viser til en hver tid hvor langt du har kommet i spørreskjema.
                    Når hele spørreskjema er besvart må du bekrefte svarene dine ved å sende inn med knappen nederst på denne siden.
                </p>
                <p>
                    Fortsett spørreskjema ved å trykke på en kategori
                </p>
            </div>
            {contentList.filter(c => c.isDoneWithSection).length === sections.length && (
                <div className={`padding-tp-bm-15px`}>
                    <Button primary onClick={(event: React.MouseEvent<HTMLElement>) => {
                        event.preventDefault()
                        onFinishedClicked()
                    }}>
                        Avslutt undersøkelse
                    </Button>
                </div>
            )}
            <div className="width-100 flex-fill-remaining-vertical">
                {
                    contentList.map(contentItem =>
                        <div id={`section-${contentItem.section}`}
                             key={`section-${contentItem.section}`}
                             className={"overview-line"}
                             onClick={() => {
                                 if(contentItem.isDoneWithSection || contentItem.index === 0) {
                                     handleElementClick(contentItem.firstQuestionInSection)
                                 }
                             }}>
                            <OverviewLine
                                sectionName={contentItem.section}
                                sectionDone={contentItem.isDoneWithSection}
                                isClickable={contentItem.index === 0 ? true : contentItem.isDoneWithSection}
                            />
                        </div>)
                }
            </div>
        </div>
    )
}