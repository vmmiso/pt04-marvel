import { Routes, Route, Navigate } from 'react-router-dom';

import { useAuth } from './hooks/useAuth';
import ProtectedRoute from './components/ProtectedRoute';
import CharacterPage from './components/CharacterPage';
import Login from './components/Login';
import Home from './components/Home';
import Layout from './components/Layout';

import './App.css';

function App() {
    const { auth } = useAuth();

    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route path="/login" exact element={ auth?.username ? <Navigate to="/" /> : <Login /> } />
                <Route element={ <ProtectedRoute /> }>
                        <Route path="/" element={ <Home /> } />
                        <Route path="/character/:characterId" element={ <CharacterPage /> } />
                </Route>
                {/* <ProtectedRoute path="/" exact component={Home} /> */}
            </Route>
        </Routes>
    );
}

export default App;
