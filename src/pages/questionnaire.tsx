import React, {useContext} from "react"
import { ConsumptionForm } from "../components/questionnaire/ConsumptionForm"

import { useTranslation } from 'react-i18next';
import {FireContext, UserContext} from "../contexts";
import {useRouter} from "next/router";
import {PATHS} from "../uiConfig";

function Questionnaire() {
	const { firestore } = useContext(FireContext)
	const {userInfo} = useContext(UserContext)
	const router = useRouter();
	const {t} = useTranslation('questionnaire');
	const header = document.getElementById("ssb-main-header") as HTMLElement
	header.style.display = "none"
	return <ConsumptionForm onFinished={() => {
		firestore
			.doc(`/users/${userInfo.userName}/questionnaire/data`)
			.update(
				{
					status: "COMPLETE",
				},
			)
			router.push(PATHS.HOME)
		}

	} />
}

export default Questionnaire
