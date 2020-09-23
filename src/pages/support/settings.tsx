import { makeDummyComponent } from '../../utils/dummy';
import { WorkspacePanel } from '../../components/layout/Workspace';

const Settings = () =>
    <WorkspacePanel>{makeDummyComponent('Innstillinger')}</WorkspacePanel>;

export default Settings;

