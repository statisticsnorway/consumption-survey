import { useEffect, useState } from 'react';
import { makeDummyComponent } from '../../utils/dummy';
import axios from 'axios';
import { WorkspacePanel } from '../../components/layout/Workspace';

const Profile = () => {
    const [result, setResult] = useState('--');

    useEffect(() => {
        axios.get('/bff/profile', { withCredentials: true })
            .then(res => res.data)
            .then((res) => {
                setResult(JSON.stringify(res));
            })
            .catch(err => {
                setResult(JSON.stringify(err));
            })
    }, []);

    return (
        <WorkspacePanel>
            <h2>Profile</h2>
            {result}
        </WorkspacePanel>
    );
};

export default Profile;
