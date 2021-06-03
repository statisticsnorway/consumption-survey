import { InstructionStep } from './Instructions';
import DrawerIcon from './assets/iOS/DrawerIcon';
import AddToHomeIcon from './assets/iOS/AddToHomeIcon';
import AddOp from './assets/iOS/AddOp';
import SSBAppIcon from './assets/iOS/SSBAppIcon';
import InstallInstructions from './InstallInstructions';

const steps: InstructionStep[] = [
    {
        text: 'Trykk på knappen i bunnen av skjermen på telefonen din.',
        figure: <DrawerIcon/>,
    }, {
        text: 'I listen over valg trykker du på knappen «Legg til på Hjem-skjermen»',
        figure: <AddToHomeIcon/>,
    }, {
        text: 'Trykk «Legg til»',
        figure: <AddOp/>
    }, {
        text: 'Sånn! Nå kan du bruke verktøyet som en helt vanlig app på telefonen.',
        figure: <SSBAppIcon/>,
    },
];

const IOSInstallInstructions = ({t}) => (
    <InstallInstructions
        headerTextOpen={t('headerTextOpen')}
        headerTextClosed={t('headerTextClosed')}
        instructions={steps}
    />
);

export default IOSInstallInstructions;
