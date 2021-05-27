import {
	CHANGE_ALL,
	CHANGE_FOCUS,
	CHANGE_FORM_VALUE, CHANGE_MULTIPLE_QUESTIONS_AND_FOCUS,
	CHANGE_QUESTION_LIST,
} from "../actionTypes"
import { QuestionAction } from "../actionCreators"
import { HUS1 } from "../../components/questionnaire/questions/definitions/Hus1QuestionDefinition"
import { LRENT2 } from "../../components/questionnaire/questions/definitions/Lrent2QuestionDefinition"
import { BOL1 } from "../../components/questionnaire/questions/definitions/Bol1QuestionDefinition"
import { BOL2 } from "../../components/questionnaire/questions/definitions/Bol2QuestionDefinition"
import { EIER1 } from "../../components/questionnaire/questions/definitions/Eier1QuestionDefinition"
import { EIER2 } from "../../components/questionnaire/questions/definitions/Eier2QuestionDefinition"
import { LAAN1 } from "../../components/questionnaire/questions/definitions/Laan1QuestionDefinition"
import { LAAN2 } from "../../components/questionnaire/questions/definitions/Laan2QuestionDefinition"
import { FUTG1 } from "../../components/questionnaire/questions/definitions/FUtg1QuestionDefinition"
import { LUTG1 } from "../../components/questionnaire/questions/definitions/LUtg1QuestionDefinition"
import { HUSLEIE1 } from "../../components/questionnaire/questions/definitions/Husleie1QuestionDefinition"
import { HUSLEIE2 } from "../../components/questionnaire/questions/definitions/Husleie2QuestionDefinition"
import { HUSLEIE3 } from "../../components/questionnaire/questions/definitions/Husleie3QuestionDefinition"
import { BOFEST1 } from "../../components/questionnaire/questions/definitions/Bofest1QuestionDefinition"
import { BOFEST1B } from "../../components/questionnaire/questions/definitions/Bofest1bQuestionDefinition"
import { HUSLEIE1B } from "../../components/questionnaire/questions/definitions/Husleie1bQuestionDefinition"
import { KOMAVG } from "../../components/questionnaire/questions/definitions/KomAvgQuestionDefinition"
import { GAR1 } from "../../components/questionnaire/questions/definitions/Gar1QuestionDefinition"
import { GAR1A } from "../../components/questionnaire/questions/definitions/Gar1aQuestionDefinition"
import { HUSLEIE1A } from "../../components/questionnaire/questions/definitions/Husleie1aQuestionDefinition"
import { FUTG2 } from "../../components/questionnaire/questions/definitions/Futg2QuestionDefinition"
import { FUTG3 } from "../../components/questionnaire/questions/definitions/FUtg3QuestionDefinition"
import { FUTG4 } from "../../components/questionnaire/questions/definitions/Futg4QuestionDefinition"
import { GAR1B } from "../../components/questionnaire/questions/definitions/Gar1bQuestionDefinition"
import { OPPGRAD1 } from "../../components/questionnaire/questions/definitions/Oppgrad1QuestionDefinition"
import { TOMT2 } from "../../components/questionnaire/questions/definitions/Tomt2QuestionDefinition"
import { TOMT1 } from "../../components/questionnaire/questions/definitions/Tomt1QuestionDefinition"
import { OPPGRAD2 } from "../../components/questionnaire/questions/definitions/Oppgrad2QuestionDefinition"
import { OPPUSS1 } from "../../components/questionnaire/questions/definitions/Oppuss1QuestionDefinition"
import { OPPUSS2 } from "../../components/questionnaire/questions/definitions/Oppuss2QuestionDefinition"
import { LRENT1 } from "../../components/questionnaire/questions/definitions/Lrent1QuestionDefinition"
import { FRITIDSN1 } from "../../components/questionnaire/questions/definitions/FritidsN1QuestionDefinition"
import { FRITIDSN2 } from "../../components/questionnaire/questions/definitions/FritidsN2QuestionDefinition"
import { FRITIDSN3 } from "../../components/questionnaire/questions/definitions/FritidsN3QuestionDefinition"
import { FRITIDSN4 } from "../../components/questionnaire/questions/definitions/FritidsN4QuestionDefinition"
import { FYRUTG1 } from "../../components/questionnaire/questions/definitions/Fyrutg1QuestionDefinition"
import { FYRUTG2 } from "../../components/questionnaire/questions/definitions/Fyrutg2QuestionDefinition"
import { LEIEFRITID } from "../../components/questionnaire/questions/definitions/LeieFritidQuestionDefinition"
import { UTGIFTFRITID1 } from "../../components/questionnaire/questions/definitions/UtgiftFritid1QuestionDefinition"
import { UTGIFTFRITID2 } from "../../components/questionnaire/questions/definitions/UtgiftFritid2QuestionDefinition"
import { BILSOLGT1 } from "../../components/questionnaire/questions/definitions/Bilsolgt1QuestionDefinition"
import { BILSOLGT } from "../../components/questionnaire/questions/definitions/BilsolgtQuestionDefinition"
import { VED3 } from "../../components/questionnaire/questions/definitions/Ved3QuestionDefinition"
import { VED2 } from "../../components/questionnaire/questions/definitions/Ved2QuestionDefinition"
import { VED1 } from "../../components/questionnaire/questions/definitions/Ved1QuestionDefinition"
import { PAKK2 } from "../../components/questionnaire/questions/definitions/Pakk2QuestionDefinition"
import { PAKK1 } from "../../components/questionnaire/questions/definitions/Pakk1QuestionDefinition"
import { UTDANNING1 } from "../../components/questionnaire/questions/definitions/Utdanning1QuestionDefinition"
import { UTDANNING2 } from "../../components/questionnaire/questions/definitions/Utdanning2QuestionDefinition"
import { VARIGFRITID1 } from "../../components/questionnaire/questions/definitions/VarigFritid1QuestionDefinition"
import { VARIGMØBLER1 } from "../../components/questionnaire/questions/definitions/VarigMøbler1QuestionDefinition"
import { VARIGUNDERH1 } from "../../components/questionnaire/questions/definitions/VarigUnderh1QuestionDefinition"
import { FGJELD } from "../../components/questionnaire/questions/definitions/FgjeldQuestionDefinition"
import { KOMAVG3 } from "../../components/questionnaire/questions/definitions/KomAvg3QuestionDefinition"
import { ELUTG1 } from "../../components/questionnaire/questions/definitions/Elutg1QuestionDefinition"
import { ELUTG2B } from "../../components/questionnaire/questions/definitions/Elutg2_BQuestionDefinition"
import { ELUTG2A } from "../../components/questionnaire/questions/definitions/Elutg2_AQuestionDefinition"
import { LEIEFRITIDEL } from "../../components/questionnaire/questions/definitions/LeiefritidElQuestionDefinition"
import { REISER1 } from "../../components/questionnaire/questions/definitions/Reiser1QuestionDefinition"
import { REISER2 } from "../../components/questionnaire/questions/definitions/Reiser2QuestionDefinition"
import { OPPGRADF1 } from "../../components/questionnaire/questions/definitions/OppgradF1QuestionDefinition"
import { OPPGRADF2 } from "../../components/questionnaire/questions/definitions/OppgradF2QuestionDefinition"
import { OPPUSSF1 } from "../../components/questionnaire/questions/definitions/OppussF1QuestionDefinition"
import { OPPUSSF2 } from "../../components/questionnaire/questions/definitions/OppussF2QuestionDefinition"
import { FYRUTGFRI1 } from "../../components/questionnaire/questions/definitions/FyrutgFri1QuestionDefinition"
import { FYRUTGFRI2 } from "../../components/questionnaire/questions/definitions/FyrutgFri2QuestionDefinition"
import { SEPREGNFRI } from "../../components/questionnaire/questions/definitions/SepRegnFriQuestionDefinition"
import { FRITIDSUTL1 } from "../../components/questionnaire/questions/definitions/FritidsUtl1QuestionDefinition"
import { FRITIDSUTL2 } from "../../components/questionnaire/questions/definitions/FritidsUtl2QuestionDefinition"
import { FRITIDSUTL3 } from "../../components/questionnaire/questions/definitions/FritidsUtl3QuestionDefinition"
import { FRITIDSUTL4 } from "../../components/questionnaire/questions/definitions/FritidsUtl4QuestionDefinition"
import { ELUTGFRI1A } from "../../components/questionnaire/questions/definitions/ElutgFri1_AQuestionDefinition"
import { ELUTGFRI1B } from "../../components/questionnaire/questions/definitions/ElutgFri1_BQuestionDefinition"
import { VARIGMØBLER2 } from "../../components/questionnaire/questions/definitions/VarigMøbler2QuestionDefinition.ts"
import { VARIGTRANSPORT1 } from "../../components/questionnaire/questions/definitions/VarigTransport1QuestionDefinition"
import { VARIGTRANSPORT2 } from "../../components/questionnaire/questions/definitions/VarigTransport2QuestionDefinition"
import { VARIGUNDERH2 } from "../../components/questionnaire/questions/definitions/VarigUnderh2QuestionDefinition"
import { VARIGKUNST1 } from "../../components/questionnaire/questions/definitions/VarigKunst1QuestionDefinition"
import { VARIGKUNST2 } from "../../components/questionnaire/questions/definitions/VarigKunst2QuestionDefinition"
import { FORS1 } from "../../components/questionnaire/questions/definitions/Fors1QuestionDefinition"
import { FORS2 } from "../../components/questionnaire/questions/definitions/Fors2QuestionDefinition"
import { VARIGFRITID2 } from "../../components/questionnaire/questions/definitions/VarigFritid2QuestionDefinition"
import { TOMTF1 } from "../../components/questionnaire/questions/definitions/TomtF1QuestionDefinition"
import { TOMTF2 } from "../../components/questionnaire/questions/definitions/TomtF2QuestionDefinition"
import { LEIEFRITIDU1 } from "../../components/questionnaire/questions/definitions/LeieFritidU1QuestionDefinition"
import { LEIEFRITIDU2 } from "../../components/questionnaire/questions/definitions/LeieFritidU2QuestionDefinition"
import { BIL1 } from "../../components/questionnaire/questions/definitions/Bil1QuestionDefinition"
import { BIL2 } from "../../components/questionnaire/questions/definitions/Bil2QuestionDefinition"
import { BILVERDINY } from "../../components/questionnaire/questions/definitions/BilverdiNYQuestionDefinition"
import { BILVERDIBRUKT } from "../../components/questionnaire/questions/definitions/BilverdiBruktQuestionDefinition"
import { BILSOLGT2 } from "../../components/questionnaire/questions/definitions/Bilsolgt2QuestionDefinition"
import { VARIGFRITID15 } from "../../components/questionnaire/questions/definitions/VarigFritid15QuestionDefinition"
import { OPPGRAD15 } from "../../components/questionnaire/questions/definitions/Oppgrad15QuestionDefinition"
import { OPPGRADF15 } from "../../components/questionnaire/questions/definitions/OppgradF15QuestionDefinition"
import { OPPUSSF15 } from "../../components/questionnaire/questions/definitions/OppussF15QuestionDefinition"
import { OPPUSS15 } from "../../components/questionnaire/questions/definitions/Oppuss15QuestionDefinition"
import { VARIGMØBLER15 } from "../../components/questionnaire/questions/definitions/VarigMøbler15QuestionDefinition"
import { VARIGTRANSPORT15 } from "../../components/questionnaire/questions/definitions/VarigTransport15QuestionDefinition"
import { VARIGUNDERH15 } from "../../components/questionnaire/questions/definitions/VarigUnderh15QuestionDefinition"
import { TOMTF15 } from "../../components/questionnaire/questions/definitions/TomtF15QuestionDefinition"
import { TOMT15 } from "../../components/questionnaire/questions/definitions/Tomt15QuestionDefinition"
import { FYRUTG15 } from "../../components/questionnaire/questions/definitions/Fyrutg15QuestionDefinition"
import { FYRUTGFRI15 } from "../../components/questionnaire/questions/definitions/FyrutgFri15QuestionDefinition"
import { FRITIDSUTL15 } from "../../components/questionnaire/questions/definitions/FritidsUtl15QuestionDefinition"
import {AnswerValueType, QuestionFormType} from "../../components/questionnaire/questions/QuestionFormType"
import {VED315} from "../../components/questionnaire/questions/definitions/Ved315QuestionDefinition";
import {UTDANNING15} from "../../components/questionnaire/questions/definitions/Utdanning15QuestionDefinition";

export type HistoryBlock = {
	fromQuestionId: string
	fromQuestionIdAnswers?: AnswerValueType[]
	toQuestionId: string
	stepDirection: "forward" | "back"
	stepCount: number
}

export type QuestionState = {
	questions: QuestionFormType[]
	currentFocus: string
	history: HistoryBlock[]
}

export const defaultState: QuestionState = {
	questions: [
		HUS1,
		// HUS2,

		BOL1,
		BOL2,

		EIER1,
		EIER2,

		LAAN1,
		LAAN2,

		LUTG1,

		LRENT1,
		LRENT2,

		BOFEST1,
		BOFEST1B,

		HUSLEIE1,
		HUSLEIE1A,
		HUSLEIE1B,
		HUSLEIE2,
		HUSLEIE3,

		FUTG1,
		FUTG2,
		FUTG3,
		FUTG4,

		KOMAVG,
		//KOMAVG2,
		KOMAVG3,
		//KOMAVG4,

		GAR1,
		GAR1A,
		GAR1B,

		OPPGRAD1,
		OPPGRAD15,
		OPPGRAD2,

		OPPUSS1,
		OPPUSS15,
		OPPUSS2,

		TOMT1,
		TOMT15,
		TOMT2,

		ELUTG1,
		ELUTG2A,
		ELUTG2B,

		FYRUTG1,
		FYRUTG15,
		FYRUTG2,

		// Tatt ut
		// BOLIGFORS1,
		// BOLIGFORSSAMLET,

		FRITIDSN1,
		FRITIDSN2,

		LEIEFRITID,
		LEIEFRITIDEL,

		UTGIFTFRITID1,
		UTGIFTFRITID2,

		FRITIDSN3,
		FRITIDSN4,

		OPPGRADF1,
		OPPGRADF15,
		OPPGRADF2,

		OPPUSSF1,
		OPPUSSF15,
		OPPUSSF2,

		TOMTF1,
		TOMTF15,
		TOMTF2,

		// Tatt ut
		// BOLIGFORSFRI1,
		// BOLIGFORSFRISAMLET,

		FYRUTGFRI1,
		FYRUTGFRI15,
		FYRUTGFRI2,


		SEPREGNFRI,



		ELUTGFRI1A,
		ELUTGFRI1B,

		// MAngler FyrUtfri2 ????? Feil spørsmål
		FRITIDSUTL1,
		FRITIDSUTL2,
		FRITIDSUTL15,
		FRITIDSUTL3,
		FRITIDSUTL4,

		LEIEFRITIDU1,
		LEIEFRITIDU2,



		// MAngler FritidsN2 ??? Feil navn på spørsmål

		LEIEFRITID,

		VED1,
		VED2,
		VED3,
		VED315,

		BIL1,
		BIL2,
		BILVERDINY,
		BILVERDIBRUKT,

		// Mangler Bileie
		// Mangler BileieB
		// Mangler BileieC  ?? Spørsmålasnummer er ikke satt
		// Mangler Bilnybrukt
		// Mangler Bilverdi1-10
		// Mangler BilverdiB

		BILSOLGT,
		BILSOLGT1,
		BILSOLGT2,
		// Mangler Bilsolgt2

		REISER1,
		REISER2,

		PAKK1,
		PAKK2,

		UTDANNING1,
		UTDANNING15,
		UTDANNING2,

		VARIGMØBLER1,
		VARIGMØBLER15,
		VARIGMØBLER2,

		VARIGTRANSPORT1,
		VARIGTRANSPORT15,
		VARIGTRANSPORT2,

		VARIGUNDERH1,
		VARIGUNDERH15,
		VARIGUNDERH2,

		VARIGFRITID1,
		VARIGFRITID2,
		VARIGFRITID15,

		VARIGKUNST1,
		VARIGKUNST2,

		// MAnger VarigAnnet1
		// MAnger VarigAnnet2

		FORS1,
		FORS2,

		FGJELD,

		// Tatt ut
		// TILSYN1,
		// TILSYN2,
		// TILSYN3,

		// FLY1,    INN_AKTIVE
		// FLY2,
		// BÅT1,
		// BÅT2,

		// Tatt ut
		// ARBREIS1,
		// ARBREIS2,
		// ARBREIS3,
		// ARBREIS4,
		// ARBREIS5,

		/*
        Disse spørsmålene er tatt ut av skjema i excelarket


        */
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
		case CHANGE_ALL: {
			if (!action.questions) {
				throw DOMException
			}
			return {
				...state,
				questions: action.questions,
				currentFocus: action.focus,
				history: action.allHistory,
			}
		}
		case CHANGE_QUESTION_LIST:
			if (!action.questions) {
				throw DOMException
			}
			return {
				...state,
				questions: action.questions,
			}
		case CHANGE_MULTIPLE_QUESTIONS_AND_FOCUS:
			if(!action.questions || !action.history) {
				throw DOMException
			}

			const updatedQuestions = action.questions as QuestionFormType[];
			const nextHistory2: HistoryBlock = action.history as HistoryBlock;

			const updatedQuestionList = state.questions.filter(questionsFromState => {
				return !(updatedQuestions.filter(updatedQuestion => updatedQuestion.id === questionsFromState.id).length > 0)
			});

			updatedQuestions.forEach(q => updatedQuestionList.push(q))

			return {
				...state,
				currentFocus: action.focus as string,
				history: [...state.history, nextHistory2],
				questions: updatedQuestionList
			};
	}

	return state
}

export default questionReducer
