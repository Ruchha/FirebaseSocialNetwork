import { getDownloadURL, ref } from 'firebase/storage';
import { FC } from 'react';
import { db, storage } from '../firebase/firebase';
import { useUploadFile } from 'react-firebase-hooks/storage';
import { getAuth, updateProfile } from 'firebase/auth';
import { collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { setUser } from '../store/reducers/userSlice';

const Settings: FC = () => {

    const [uploadFile, uploading, snapshot, error] = useUploadFile();
    const auth = getAuth()
    const dispatch = useAppDispatch()
    const user = useAppSelector(state => state.userReducer)
    async function loadAvatar(e){
        e.preventDefault()
        const avatar = e.target[0].files[0]
        const avatarsRef = ref(storage, '/userAvatars/' + auth.currentUser?.uid)
       await uploadFile(avatarsRef, avatar, {
            contentType: 'image/jpeg'
        })
        const url = await getDownloadURL(avatarsRef)
        dispatch(setUser({...user, avatarUrl: url}))
        updateProfile(auth.currentUser!,{
            photoURL: url
        })
        const q = query(collection(db, "users"), where("id", "==", auth.currentUser?.uid))
                const snapshot = await getDocs(q)
                const userId = snapshot.docs[0].id;
        await updateDoc(doc(db, "users", userId), {
            avatarUrl: url
          })
    }

    return (
        <form onSubmit={loadAvatar}>
            <input type='file'/>
            <button>Изменить свой аватар</button>
        </form>
);
};

export default Settings