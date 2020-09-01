import { makeDummyComponent } from '../../utils/dummy';
import { WorkspacePanel } from '../../components/layout/Workspace';

const Help = () =>
    <WorkspacePanel>{makeDummyComponent('Help')}</WorkspacePanel>;

export default Help;
