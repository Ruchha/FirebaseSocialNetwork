import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import { store } from "./store"
import App from "./App"
import { initializeApp } from 'firebase/app'
import { getFirestore } from "firebase/firestore"

const app = initializeApp({
  apiKey: "AIzaSyCJy-dEDn5Ut-xjaJcl5RMTVHTfx_rtdiU",
  authDomain: "socialne-83a04.firebaseapp.com",
  projectId: "socialne-83a04",
  storageBucket: "socialne-83a04.appspot.com",
  messagingSenderId: "529186107535",
  appId: "1:529186107535:web:cdeef62274c5cc71dac0fa"
});
export const db = getFirestore(app)



ReactDOM.createRoot(document.getElementById("root")!).render(

    <Provider store={store}>
      <App />
    </Provider>

)
