import {QuestionFormType} from "../../components/questionnaire/questions/QuestionFormType";
import {CHANGE_FOCUS, CHANGE_FORM_VALUE} from "../actionTypes";
import {QuestionAction} from "../actionCreators";
import {HUS2} from "../../components/questionnaire/questions/definitions/Hus2QuestionDefinition";
import {HUS1} from "../../components/questionnaire/questions/definitions/Hus1QuestionDefinition";
import {LRENT2} from "../../components/questionnaire/questions/definitions/Lrent2QuestionDefinition";
import {BOL1} from "../../components/questionnaire/questions/definitions/Bol1QuestionDefinition";
import {BOL2} from "../../components/questionnaire/questions/definitions/Bol2QuestionDefinition";
import {EIER1} from "../../components/questionnaire/questions/definitions/Eier1QuestionDefinition";
import {EIER2} from "../../components/questionnaire/questions/definitions/Eier2QuestionDefinition";
import {LAAN1} from "../../components/questionnaire/questions/definitions/Laan1QuestionDefinition";
import {LAAN2} from "../../components/questionnaire/questions/definitions/Laan2QuestionDefinition";
import {FUTG1} from "../../components/questionnaire/questions/definitions/FUtg1QuestionDefinition";
import {LUTG1} from "../../components/questionnaire/questions/definitions/LUtg1QuestionDefinition";
import {HUSLEIE1} from "../../components/questionnaire/questions/definitions/Husleie1QuestionDefinition";
import {HUSLEIE2} from "../../components/questionnaire/questions/definitions/Husleie2QuestionDefinition";
import {HUSLEIE3} from "../../components/questionnaire/questions/definitions/Husleie3QuestionDefinition";
import {BOFEST1} from "../../components/questionnaire/questions/definitions/Bofest1QuestionDefinition";
import {BOFEST1B} from "../../components/questionnaire/questions/definitions/Bofest1bQuestionDefinition";
import {HUSLEIE1B} from "../../components/questionnaire/questions/definitions/Husleie1bQuestionDefinition";
import {KOMAVG} from "../../components/questionnaire/questions/definitions/KomAvgQuestionDefinition";
import {GAR1} from "../../components/questionnaire/questions/definitions/Gar1QuestionDefinition";
import {GAR1A} from "../../components/questionnaire/questions/definitions/Gar1aQuestionDefinition";
import {HUSLEIE1A} from "../../components/questionnaire/questions/definitions/Husleie1aQuestionDefinition";
import {FUTG2} from "../../components/questionnaire/questions/definitions/Futg2QuestionDefinition";
import {FUTG3} from "../../components/questionnaire/questions/definitions/FUtg3QuestionDefinition";
import {FUTG4} from "../../components/questionnaire/questions/definitions/Futg4QuestionDefinition";
import {GAR1B} from "../../components/questionnaire/questions/definitions/Gar1bQuestionDefinition";
import {OPPGRAD1} from "../../components/questionnaire/questions/definitions/Oppgrad1QuestionDefinition";
import {TOMT2} from "../../components/questionnaire/questions/definitions/Tomt2QuestionDefinition";
import {TOMT1} from "../../components/questionnaire/questions/definitions/Tomt1QuestionDefinition";
import {OPPGRAD2} from "../../components/questionnaire/questions/definitions/Oppgrad2QuestionDefinition";
import {OPPUSS1} from "../../components/questionnaire/questions/definitions/Oppuss1QuestionDefinition";
import {OPPUSS2} from "../../components/questionnaire/questions/definitions/Oppuss2QuestionDefinition";
import {LRENT1} from "../../components/questionnaire/questions/definitions/Lrent1QuestionDefinition";

export type HistoryBlock = {
    fromQuestionId: string
    toQuestionId: string
    stepDirection: "forward" | "back"
}

export type QuestionState = {
    questions: QuestionFormType[]
    currentFocus: string
    history: HistoryBlock[]
}

const defaultState: QuestionState = {
    questions: [
        HUS1,
        HUS2,
        LRENT1,
        LRENT2,
        BOL1,
        BOL2,
        EIER1,
        EIER2,
        LAAN1,
        LAAN2,
        LUTG1,
        FUTG1,
        FUTG2,
        FUTG3,
        FUTG4,
        KOMAVG,
        BOFEST1,
        BOFEST1B,
        HUSLEIE1,
        HUSLEIE2,
        HUSLEIE3,
        HUSLEIE1A,
        HUSLEIE1B,
        GAR1,
        GAR1A,
        GAR1B,
        OPPGRAD1,
        OPPGRAD2,
        OPPUSS1,
        OPPUSS2,
        TOMT1,
        TOMT2,
        OPPGRAD1
    ],
    currentFocus: 'hus1',
    history: [{
        fromQuestionId: 'beginning',
        toQuestionId: 'hus1',
        stepDirection: "forward"
    }
    ]
} as QuestionState;

const questionReducer = (state: QuestionState = defaultState, action: QuestionAction): QuestionState => {
    switch (action.type) {
        case CHANGE_FORM_VALUE:
            if(!action.question) {
                throw DOMException
            }

            const changeQ: QuestionFormType = action.question;

            const qNewList = state.questions.filter(s => s.id !== changeQ.id);
            qNewList.push(changeQ);

            return {
                ...state,
                questions: qNewList
            };
        case CHANGE_FOCUS:
            if(!action.focus) {
                throw DOMException
            }

            const focusId: string = action.focus;
            const nextHistory: HistoryBlock = action.history as HistoryBlock;

            return {
                ...state,
                currentFocus: focusId,
                history: [...state.history, nextHistory]
            };
    }

    return state
}

export default questionReducer