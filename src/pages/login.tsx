import { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { UserContext, UserInfoType } from '../components/common/contexts';
import { WorkspacePanel } from '../components/layout/Workspace';

const Login = () => {
    const router = useRouter();
    const [userName, setUserName] = useState('');
    const [error, setError] = useState(null);
    const {setAuthInfo} = useContext(UserContext)

    const onSubmit = async (e) => {
        e.preventDefault();

        axios.post('/bff/login', {user: userName})
            .then(async (res) => {
                const authInfo = await res.data;
                try {
                    setAuthInfo(authInfo.token, authInfo.userInfo, null);
                } catch (err) {
                    console.log('could not update authInfo', err);
                }
                router.push('/fb');
            })
            .catch((err) => {
                setError(JSON.stringify(err));
            });
    }

    const onUserNameChange = ({target}) => {
        setUserName(target.value);
    };

    return (
        <>
            <WorkspacePanel>
                {error &&
                <div style={{display: 'block', background: '#fcc', color: 'red'}}>
                    {error}
                </div>
                }
                <input value={userName} onChange={onUserNameChange}/>
                <button onClick={onSubmit}>Login</button>
            </WorkspacePanel>
        </>
    );
};

export default Login;
