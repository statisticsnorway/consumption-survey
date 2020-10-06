import { useRouter } from 'next/router';
import SettingsPanel from '../../components/blocks/SettingsPanel';
import { WorkspacePanel } from '../../components/layout/Workspace';

const Settings = () => {
    const router = useRouter();

    return (
        <WorkspacePanel>
            <h3>Innstillinger</h3>
            <SettingsPanel
                title="PIN"
                description="Endre PIN"
                onClick={() => { router.push('/support/manage-pin')}}
            />
        </WorkspacePanel>
    );
}

export default Settings;

