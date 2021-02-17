import { MoreVertical } from 'react-feather';
import { InstructionStep } from './Instructions';
import DrawerIcon from './assets/iOS/DrawerIcon';
import AddToHomeIcon from './assets/iOS/AddToHomeIcon';
import AddOp from './assets/iOS/AddOp';
import SSBAppIcon from './assets/iOS/SSBAppIcon';
import InstallInstructions from './InstallInstructions';
import ChromeAppIcon from './assets/android/ChromeAppIcon';

const steps: InstructionStep[] = [
    {
        text: 'Åpne nettside til Forbruksundersøkelsen in Chrome nettleseren',
        figure: <ChromeAppIcon />
    },
    {
        text: 'Trykk på knappen ved siden av adresse linje (i toppen til høyre).',
        figure: <MoreVertical width={24} height={24} />,
    }, {
        text: 'I listen over valg trykker du på knappen «Legg til på Hjem-skjermen»',
    }, {
        text: 'Trykk «Legg til» fra «Installer App» popup-vinduet',
        figure: <AddOp/>
    }, {
        text: 'Det tar et par sekunder før Android gir beskjed om at Appen er installert',
    },{
        text: 'Sånn! Nå kan du bruke verktøyet som en helt vanlig app på telefonen.',
        figure: <SSBAppIcon/>,
    },
];

const AndroidInstallInstructions = ({ t }) => (
    <InstallInstructions
        headerTextOpen={t('headerTextOpen')}
        headerTextClosed={t('headerTextClosed')}
        instructions={steps}
    />
);

export default AndroidInstallInstructions;
