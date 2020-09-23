import { makeDummyComponent } from '../../utils/dummy';
import { WorkspacePanel } from '../../components/layout/Workspace';

const Profile = () =>
    <WorkspacePanel>{makeDummyComponent('Profil')}</WorkspacePanel>;

export default Profile;
