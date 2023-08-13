import {Routes, Route} from "react-router-dom"
import { authRoutes, publicRoutes } from '../routes/routes';
import { useAppSelector } from "../hooks/redux";
export default function AppRouter() {
  const user = useAppSelector((state) => state.userReducer)

  return (
    user.id
    ?
    <>
    <Routes>
      {authRoutes.map(({path, Component}) =>
        <Route key={path} path={path} element={<Component/>}/> )}
    </Routes>
    </>
    :
    <>
    <Routes>
      {publicRoutes.map(({path, Component}) =>
      <Route key={path} path={path} element={<Component/>} />)}
    </Routes>
    </>
  )
  
}
