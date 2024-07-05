// src/actions/authActions.js
import { signInWithPopup } from 'firebase/auth';
import { auth, db, provider, storage } from '../../../firebase';
import { clearUser, setUser } from '../reducers/userSlice';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { addDoc, collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { getArticles, setLoadingStatus } from '../reducers/articlesSlice';
import Compressor from 'compressorjs';

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


export const signOutAPI = () => {
    return (dispatch) => {
        auth.signOut().then(() => {
            dispatch(clearUser())
        })
    }
}

// POST ARTICLE
export const postArticleAPI = (payload) => {
    return (dispatch) => {
        dispatch(setLoadingStatus(true));

        if (payload.image) {
            // First, compress the image
            new Compressor(payload.image, {
                quality: 0.6,
                success(compressedImage) {
                    // Generate a unique file name
                    const fileName = generateFileName(payload.image.name);
                    const storageRef = ref(storage, fileName);
                    const uploadTask = uploadBytesResumable(storageRef, compressedImage);

                    uploadTask.on('state_changed',
                        (snapshot) => {
                            const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                            console.log('Uploading is ' + progress + '% done');
                        },
                        (error) => {
                            alert(error);
                            dispatch(setLoadingStatus(false));
                        },
                        () => {
                            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                                const collRef = collection(db, 'articles');
                                addDoc(collRef, {
                                    actor: {
                                        description: payload.user.email,
                                        title: payload.user.displayName,
                                        date: payload.timestamp,
                                        image: payload.user.photoURL,
                                        uid: payload.user.uid,
                                    },
                                    comments: 0,
                                    video: payload.video,
                                    description: payload.description,
                                    shareImg: downloadURL,
                                }).then(() => {
                                    dispatch(setLoadingStatus(false));
                                }).catch((error) => {
                                    alert(error);
                                    dispatch(setLoadingStatus(false));
                                });
                            }).catch((error) => {
                                alert(error);
                                dispatch(setLoadingStatus(false));
                            });
                        }
                    );
                },
                error(err) {
                    console.log(err.message);
                    dispatch(setLoadingStatus(false));
                },
            });
        } else {
            // If the post only contains text or a video link
            const collRef = collection(db, 'articles');
            addDoc(collRef, {
                actor: {
                    description: payload.user.email,
                    title: payload.user.displayName,
                    date: payload.timestamp,
                    image: payload.user.photoURL,
                    uid: payload.user.uid,
                },
                comments: 0,
                video: payload.video,
                description: payload.description,
                shareImg: "", // No image to share
            }).then(() => {
                dispatch(setLoadingStatus(false));
            }).catch((error) => {
                alert(error);
                dispatch(setLoadingStatus(false));
            });
        }
    };
};

function generateFileName(originalName) {
    const date = new Date();
    const timestamp = date.getTime(); // Gets the current time in timestamp format
    const fileExtension = originalName.split('.').pop(); // Extracts the file extension
    return `images/${timestamp}_${originalName}.${fileExtension}`;
}

