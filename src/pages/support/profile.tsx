import { makeDummyComponent } from '../../utils/dummy';
import { WorkspacePanel } from '../../components/layout/Workspace';

const Profile = () =>
    <WorkspacePanel>{makeDummyComponent('Profile')}</WorkspacePanel>;

export default Profile;
