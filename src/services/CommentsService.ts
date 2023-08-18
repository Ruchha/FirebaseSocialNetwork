import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/dist/query/react"
import { IFirebaseError } from "../models/IFirebaseError"
import { addDoc, collection, query, where } from "firebase/firestore"
import { db } from "../firebase/firebase"
import { IComment } from "../models/IComment"
import { useCollectionData } from "react-firebase-hooks/firestore"

export const commentsAPI = createApi({
    reducerPath:"commentsAPI",
    baseQuery: fakeBaseQuery<IFirebaseError>(),
    tagTypes:['Comment'],
    endpoints: build => ({
        addComment: build.mutation({
            async queryFn({commentId,commentedOn,commentMessage,posterEmail,posterId, postId}:IComment){
                await addDoc(collection(db, "comments"), {
                    commentId,
                    commentedOn,
                    commentMessage,
                    posterEmail,
                    posterId,
                    postId
                  })
                  return {data: {}}
            }, invalidatesTags:['Comment']          
        }),
    })
})

export function useGetCommentsQuery(postId:number){
    const q = query(collection(db, "comments"), where("postId", "==", postId))
    const [data] = useCollectionData(q);
    const comments = data as IComment[] | undefined;
    return comments
}
