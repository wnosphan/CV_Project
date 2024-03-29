import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { ErrorPage, Create } from '../components/layouts';
import MainContent from '../components/Content/MainContent';
import PrivateRoute from './PrivateRoute';

const AppRouter = () => {
    return (
        <PrivateRoute>
            <Router>
                <Routes>
                    <Route
                        path="/" element={<MainContent />}
                        errorElement={<ErrorPage />}>
                    </Route>
                    <Route path="/create" element={<Create />} />
                </Routes>
            </Router>
        </PrivateRoute>
    );
}

export default AppRouter