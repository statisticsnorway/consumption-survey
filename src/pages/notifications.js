import { makeDummyComponent } from "../utils/dummy";
import { WorkspacePanel } from '../components/layout/Workspace';

const Notifications = () =>
    <WorkspacePanel>{makeDummyComponent('Notifications')}</WorkspacePanel>;

export default Notifications;