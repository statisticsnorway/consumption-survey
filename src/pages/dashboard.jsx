import { makeDummyComponent } from '../utils/dummy';
import { WorkspacePanel } from '../components/layout/Workspace';

import workspaceStyles from '../components/layout/styles/workspace.module.scss';

const Dashboard = () =>
    <WorkspacePanel>{makeDummyComponent('Dashboard')}</WorkspacePanel>;

export default Dashboard;
