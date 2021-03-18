import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { UserContext } from '../contexts';
import { WorkspacePanel } from '../components/layout/Workspace';

import workspaceStyles from '../components/layout/styles/workspace.module.scss';
import Loader from '../components/common/Loader';

const Login = () => {
    const router = useRouter();
    const [userName, setUserName] = useState('');
    const [error, setError] = useState(null);
    const {isAuthenticated, isLoggingIn, login, loginLogoutErrors} = useContext(UserContext);

    useEffect(() => {
        if (isAuthenticated) {
            router.push('/dashboard/Dashboard');
        }
    }, [isAuthenticated]);

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            await login(userName);
            setError(null);
        } catch (err) {
            console.log(err);
            setError(JSON.stringify(err));
        }

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
                {!isLoggingIn &&
                <>
                    <input value={userName} onChange={onUserNameChange}/>
                    <button onClick={onSubmit}> Login</button>
                </>
                }
                {isLoggingIn &&
                <Loader/>
                }
                {(error || loginLogoutErrors) &&
                <div className={workspaceStyles.error}>
                    {error}
                    {JSON.stringify(loginLogoutErrors)}
                    <p>Vennligst prøv igjen! </p>
                    <p>Hvis problemet vedvarer,
                        <a
                            className={workspaceStyles.action}
                            onClick={() => {
                                window.location.reload();
                            }}
                        >
                            Last inn på nytt
                        </a>
                    </p>
                </div>
                }

            </WorkspacePanel>
        </>
    );
};

export default Login;
