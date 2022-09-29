// 
// Redirecting the user to home page
//
import axios from "axios"
import { useEffect } from "react"
import { useHistory } from "react-router-dom"

export const useRedirect = (userAuthStatus) => {
    const history = useHistory();

    useEffect(() => {
        const handleMount = async () => {
            try {
                await axios.post('/dj-rest-auth/token/refresh/')
                // if user is logged in
                if (userAuthStatus === 'loggedIn'){
                    history.push('/');
                }
            } catch (err) {
                // if user is logged out
                if (userAuthStatus === 'loggedOut'){
                    history.push('/');
                }
            }
        }
        handleMount();
    }, [history, userAuthStatus]);
}