import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Home, ErrorPage } from '../components/layouts';
import PrivateRoute from './PrivateRoute';
import Create from '../components/layouts/Create';

const AppRouter = () => {
    return (
        // <PrivateRoute>
        <Router>
            <Routes>
                <Route
                    path="/" element={<Home />}
                    errorElement={<ErrorPage />}>
                </Route>
                <Route path="/create" element={<Create />} />
            </Routes>
        </Router>
        // </PrivateRoute>
    );
}

export default AppRouter