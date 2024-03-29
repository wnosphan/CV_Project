import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import {  Create, MainContent } from '~/components/layouts/main/MainContent';
import {ErrorPage} from '~/components/layouts';
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