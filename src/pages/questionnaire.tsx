import React from "react"
import { ConsumptionForm } from "../components/questionnaire/ConsumptionForm"

function Questionnaire() {
	const header = document.getElementById("ssb-main-header") as HTMLElement
	header.style.display = "none"
	return <ConsumptionForm />
}

export default Questionnaire
