import React from "react"
import { ConsumptionForm } from "../components/questionnaire/ConsumptionForm"

import { useTranslation } from 'react-i18next';
function Questionnaire() {
	const {t} = useTranslation('questionnaire');
	const header = document.getElementById("ssb-main-header") as HTMLElement
	header.style.display = "none"
	return <ConsumptionForm />
}

export default Questionnaire
