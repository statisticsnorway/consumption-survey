import { makeDummyComponent } from '../../utils/dummy';
import { WorkspacePanel } from '../../components/layout/Workspace';

const Help = () =>
    <WorkspacePanel>{makeDummyComponent('Info')}</WorkspacePanel>;

export default Help;
