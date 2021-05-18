import {useContext, useEffect} from "react";
import {FireContext, UserContext} from "../contexts";

const IDPLogout = () => {
    const { logout } = useContext(UserContext);
    const {reset} = useContext(FireContext);

    const fireReset = async () => {
        reset()
    }

    useEffect(() => {
        const doFireLogout = async () => {
            console.log("Starting firebase logout")

            await logout()
            await fireReset()

            console.log("Finished firebase logout")
        };

        doFireLogout();
    }, []);
    return (
        <p>You are now logged out</p>
    );
};

export default IDPLogout;
