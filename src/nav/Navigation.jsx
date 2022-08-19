import { Routes, Route} from "react-router-dom";
import Layout from '../components/dashboard/Layout'
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Wall from "../pages/dashboard/Wall";
import Stories from '../pages/dashboard/Stories'
import CreateStorie from "../pages/dashboard/CreateStorie";
import Story from "../pages/dashboard/Story";
import Group from "../pages/dashboard/Group";
import Academy from "../pages/dashboard/Academy";
import Profile from "../pages/auth/Profile";

const Navigation = () => {
  return (
    <Routes>
        <Route path={`/dashboard`} element={<Layout/>} >
            <Route exact path={`/dashboard/wall`} element={<Wall/>}/>
            <Route exact path={`/dashboard/stories`} element={<Stories/>}/>
            <Route path={`/dashboard/story/:id`} element={<Story/>}/>
            <Route exact path={`/dashboard/createstorie`} element={<CreateStorie/>}/>
            <Route path={`/dashboard/group/:id`} element={<Group/>}/>
            <Route path={`/dashboard/academy/:id`} element={<Academy/>}/>
            <Route path={`/dashboard/profile/:id`} element={<Profile/>}/>
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