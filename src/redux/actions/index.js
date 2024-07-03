// src/actions/authActions.js
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../../firebase';
import { clearUser, setUser } from '../reducers/userSlice';

export const signInAPI = () => {
    return (dispatch) => {
        signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user;
                // Transform the user object to a serializable format
                const serializableUser = {
                    uid: user.uid,
                    displayName: user.displayName,
                    email: user.email,
                    photoURL: user.photoURL,
                    providerId: user.providerId,
                };
                dispatch(setUser(serializableUser));
            })
            .catch((error) => {
                alert(error.message);
            });
    };
};


export const signOutAPI = ()=> {
    return(dispatch) => {
        auth.signOut().then(() => {
            dispatch(clearUser())
        })
    }
}