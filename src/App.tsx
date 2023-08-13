import Header from "./components/UI/Header"
import { BrowserRouter } from "react-router-dom"
import AppRouter from "./components/AppRouter"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { useEffect, FC } from "react"
import { useAppDispatch } from "./hooks/redux"
import { setUser } from "./store/reducers/userSlice"
import "./App.css"

const App: FC = () => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    const auth = getAuth()
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUser({ email: user.email, id: user.uid, avatarUrl: user.photoURL }))
      } else {
        console.log("brudda who are you")
      }
    })
  }, [])

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <AppRouter />
      </BrowserRouter>
    </div>
  )
}

export default App
