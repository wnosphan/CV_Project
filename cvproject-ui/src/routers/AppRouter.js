import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home, ErrorPage } from '../components/layouts';
import PrivateRoute from './PrivateRoute';

const AppRouter = () => {
    // const protectLayout = (
    //     <PrivateRoute>
    //         <Home />
    //     </PrivateRoute>
    // )
    return (
        <Router>
            <Routes>
                <Route
                    path="/" element={<Home />}
                    errorElement={<ErrorPage />}>
                    <Route path="/create" />
                </Route>
            </Routes>
        </Router>
    );
}

export default AppRouter