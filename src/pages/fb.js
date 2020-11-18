import { useEffect, useState, useContext } from 'react';

import fb from '../fb';
import NewPurchase from '../components/purchases/NewPurchase';
import { WorkspacePanel } from '../components/layout/Workspace';
import UserProvider from '../fb/UserProvider';
import { UserContext } from '../components/common/contexts';

const Purchases = () => {
    const [purchases, setPurchases] = useState([]);
    const [notification, setNotification] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);
    const [loginError, setLoginError] = useState(null);

    const {token, userInfo} = useContext(UserContext);

    const login = () => {
        fb.auth().signInAnonymously()
            .catch((err) => {
                setNotification(`Could not login anon: "${err.code}: ${err.message}"`);
            });
    };

    useEffect(() => {
        if (token) {
            fb.auth().signInWithCustomToken(token)
                .then((res) => {
                    console.log('loginSuccessful', res);
                    setLoggedIn(true);
                })
                .catch((err) => {
                    setLoginError(JSON.stringify(err));
                })
        }
    }, [token]);

    fb.auth()
        .onAuthStateChanged((user) => {
            if (user) {
                console.log('Logged-in user', user);
                setLoggedIn(true);
            } else {
                setNotification('Not logged in');
                setLoggedIn(false);
            }
        });

    useEffect(() => {
        fb.firestore()
            .collection(`/users/${userInfo.id}/purchases`)
            .onSnapshot(snapShot => {
                const purchaseRecords = snapShot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));

                setPurchases(purchaseRecords);
            });
    }, []);

    const logout = () => {
        fb.auth()
            .signOut()
            .then(() => {
                setNotification('Logged out');
                setTimeout(() => {
                    setNotification('');
                }, 2000)
            })
    };

    const purchasesDisp = (
        <div style={{ margin: '1rem 0', borderBottom: '1px solid #ccc' }}>
            {purchases.map(purchase => {
                return (
                    <div style={{display: 'block'}}>
                        <p>id: {purchase.id}</p>
                        <p>when: {JSON.stringify(purchase.when)}</p>
                        <p>#items: {purchase.items.length}</p>
                    </div>
                );
            })}
        </div>
    );

    return (
        <>
            <h3>Firebase PoC</h3>
            <WorkspacePanel>
                {loginError &&
                <div style={{display: 'block', background: '#fcc', color: 'red'}}>
                    {loginError}
                </div>
                }
                {loggedIn &&
                <>
                    {purchasesDisp}
                    <NewPurchase/>
                </>
                }
            </WorkspacePanel>
        </>
    );
};

export default Purchases;
