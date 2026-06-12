import {BrowserRouter, Route, Routes} from "react-router";
import {About, Home, NotFound, UserOverview, TodoListOverview} from "./pages";
import {Layout} from "./components";


const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout/>}>
                    <Route path={'/'} element={<Home/>}/>
                    <Route path={'/users'} element={<UserOverview />} />
                    <Route path={'/users/:user_id/todo-lists'} element={<TodoListOverview/>}/>
                    <Route path={'/about'} element={<About/>}/>
                    <Route path={'*'} element={<NotFound/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App;