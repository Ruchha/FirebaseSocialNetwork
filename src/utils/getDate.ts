import { FieldValue, Timestamp } from "firebase/firestore"


export const getDate = (postedOn: FieldValue) => {
    if (postedOn) {
      const timestamp: Timestamp = postedOn as Timestamp
      const date: Date = timestamp.toDate()
      return date.toLocaleString()
    } else {
      return
    }
  }