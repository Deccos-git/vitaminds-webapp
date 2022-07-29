import { Routes, Route} from "react-router-dom";
import Layout from '../components/dashboard/Layout'
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Wall from "../pages/dashboard/Wall";
import Stories from '../pages/dashboard/Stories'
import CreateStorie from "../pages/dashboard/CreateStorie";

const Navigation = () => {
  return (
    <Routes>
        <Route path={`/dashboard`} element={<Layout/>} >
            <Route exact path={`/dashboard/wall`} element={<Wall/>}/>
            <Route exact path={`/dashboard/stories`} element={<Stories/>}/>
            <Route exact path={`/dashboard/createstorie`} element={<CreateStorie/>}/>
        </Route>
        <Route path={`/`} >
            <Route exact path={`/`} element={<Login/>}/>
            <Route exact path={`/login`} element={<Login/>}/>
            <Route exact path={`/register`} element={<Register/>}/>
        </Route>
    </Routes>
  )
}

export default Navigation