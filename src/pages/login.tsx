import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { UserContext } from '../contexts';
import { WorkspacePanel } from '../components/layout/Workspace';

const Login = () => {
    const router = useRouter();
    const [userName, setUserName] = useState('');
    const [error, setError] = useState(null);
    const {isAuthenticated, login} = useContext(UserContext);

    useEffect(() => {
        if (isAuthenticated) {
            router.push('/dashboard/Dashboard');
        }
    }, [isAuthenticated]);

    const onSubmit = async (e) => {
        e.preventDefault();

        await login(userName);

        /*
        axios.post('/bff/login', {user: userName})
            .then(async (res) => {
                const authInfo = await res.data;
                try {
                    setAuthInfo(authInfo.token, authInfo.userInfo, null);
                } catch (err) {
                    console.log('could not update authInfo', err);
                }
                router.push('/dashboard/Dashboard');
            })
            .catch((err) => {
                setError(JSON.stringify(err));
            });
        */
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
