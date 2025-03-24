import "./App.css";
import { BrowserRouter, NavLink, Route, Routes } from "react-router";
import Users from "./pages/Users";
import Pets from "./pages/Pets";
import Orders from "./pages/Orders";

function App() {
    return (
        <BrowserRouter>
            <div className="react-header">
                <img
                    src="https://react.dev/favicon.ico"
                    alt="React Logo"
                    className="react-logo"
                    width={40}
                    height={40}
                />
                <h1>PetStore React</h1>
            </div>
            <nav>
                <NavLink to="/">Users</NavLink>
                <NavLink to="/pets">Pets</NavLink>
                <NavLink to="/orders">Orders</NavLink>
            </nav>
            <Routes>
                <Route path="/" Component={Users} />
                <Route path="/pets" Component={Pets} />
                <Route path="/orders" Component={Orders} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
