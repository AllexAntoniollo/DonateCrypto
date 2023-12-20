import { Route, BrowserRouter, Routes, Navigate } from 'react-router-dom';
import Home from './Home';
import Donate from './donate';
import Create from './create';

function Router() {

    type Props = {
        children: JSX.Element
    }

    function PrivateRoute({ children }: Props) {
        const isAuth = localStorage.getItem("wallet") !== null;
        return isAuth ? children : <Navigate to="/" />;
    }


    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />

                <Route path="/donate" element={
                    <PrivateRoute>
                        <Donate />
                    </PrivateRoute>
                } />
                <Route path="/create" element={
                    <PrivateRoute>
                        <Create />
                    </PrivateRoute>
                } />

            </Routes>
        </BrowserRouter>
    )
}

export default Router;