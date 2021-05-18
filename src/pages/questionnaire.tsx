import React from "react"
import { ConsumptionForm } from "../components/questionnaire/ConsumptionForm"
const testValues = [
	"hus1_1 == 1",
	"bol1_1 == 7",
	"bol2_1 == 7",
	"eier1_1 == 1",
	"eier2_1 == 1",
	"laan1_2 == 2",
	"lrent2_1 == 8",
	"bofest1_1 == 1",
	"futg1_1 == 1",
	"futg2_1 == Måned",
	"futg2_2 == 1000",
	"futg3_2 == 2",
	"fgjeld_1 == 100",
	"futg4_1 == 1000",
	"komavg_1 == 1",
	"komavg_2 == 2",
	"komavg3_1 == 10000",
	"komavg3_2 == 2000",
	"gar1_1 == 1",
	"gar1a_1 == 1",
	"gar1b_3 == 3",
]

function Questionnaire() {
	const header = document.getElementById("ssb-main-header") as HTMLElement
	header.style.display = "none"
	return <ConsumptionForm questionAnswers={testValues} />
}

export default Questionnaire
