import { collection, query, where } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { IUser } from "../models/IUser";
import { db } from "../firebase/firebase";

export function useGetUser(id:string){
    const q = query(collection(db, "users"), where("id", "==", id))
    const [value] = useCollection(q);
    const user = value?.docs[0].data() as IUser | undefined
    return user
}
