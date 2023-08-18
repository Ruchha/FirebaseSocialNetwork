import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/dist/query/react'
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { addDoc, collection } from 'firebase/firestore';
import { IFirebaseError } from '../models/IFirebaseError';
import { db } from '../firebase/firebase';



export const authAPI = createApi({
    reducerPath:"authAPI",
    baseQuery: fakeBaseQuery<IFirebaseError>(),
    endpoints: build => ({
        login: build.mutation({
            async queryFn({email, password}){
                const auth = getAuth();
                const response = await signInWithEmailAndPassword(auth, email, password)
                return {data: response.user}

            }
        }

        ),
        register:build.mutation({
            async queryFn({email, password, firstName, lastName}){
                const auth = getAuth();
                const response = await createUserWithEmailAndPassword(auth, email, password)
                await addDoc(collection(db, "users"), {
                    id: response.user.uid,
                    email,
                    firstName,
                    lastName,
                    avatarUrl: "",
                  })
                return {data: response.user}
            }
        }),
        logout:build.mutation({
            async queryFn(){
                const auth = getAuth();
                await signOut(auth) 
                return {data: {}}
            }
        }),
    })
})
