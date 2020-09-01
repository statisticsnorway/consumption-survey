import { makeDummyComponent } from '../../utils/dummy';
import { WorkspacePanel } from '../../components/layout/Workspace';

const Settings = () =>
    <WorkspacePanel>{makeDummyComponent('Settings')}</WorkspacePanel>;

export default Settings;

