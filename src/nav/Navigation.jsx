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
import Notifications from "../pages/topbar/Notifications";
import Chats from "../pages/topbar/Chats";
import Search from "../pages/topbar/Search";
import Settings from "../pages/auth/Settings";
import AddArticle from "../pages/dashboard/AddArticle";
import AddGroup from "../pages/dashboard/AddGroup";
import Article from "../pages/dashboard/Article";
import Chat from "../pages/dashboard/Chat";

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
            <Route path={`/dashboard/settings/:id`} element={<Settings/>}/>
            <Route path={`/dashboard/notifications/:id`} element={<Notifications/>}/>
            <Route path={`/dashboard/chats/:id`} element={<Chats/>}/>
            <Route path={`/dashboard/chat/:id`} element={<Chat/>}/>
            <Route path={`/dashboard/search`} element={<Search/>}/>
            <Route path={`/dashboard/addgroup/:id`} element={<AddGroup/>}/>
            <Route path={`/dashboard/addarticle/:id`} element={<AddArticle/>}/>
            <Route path={`/dashboard/article/:id`} element={<Article/>}/>
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