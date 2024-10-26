import './App.css'
import { useContext } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Search from './pages/Search'
import StockDetails from './pages/StockDetails'
import { GlobalContext } from './contexts/GlobalContext'
import { onAuthStateChanged } from '@firebase/auth'
import { auth, serverAuth } from './services/auth'
import Protected from './components/Protected'

function App() {
    const { state, dispatch } = useContext(GlobalContext);
    
    onAuthStateChanged(auth, (user) => {
        if (user && state.isAuthenticated != true) {
            serverAuth(user.uid)
                .then((res) => {
                    if (res)  dispatch({type: 'LOG_IN', uid: user.uid});
                })
                .catch((e) => {console.log(e)})
        } else if (!user && state.isAuthenticated != false){
            dispatch({type: 'LOG_OUT'})
        }
    });

    const router = createBrowserRouter([
        {
            path: '/',
            element: <Landing />,
        },
        {
            path: '/login',
            element: <Login />,
        },
        {
            path: '/register',
            element: <Register />,
        },
        {
            path: '/dashboard',
            element: <Protected children={<Dashboard />}/>,
        },
        {
            path: '/search',
            element: <Protected children={<Search />}/>,
        },
        {
            path: '/stock/:ticker',
            element: <Protected children={<StockDetails />}/>,
        },
    ])

    return <RouterProvider router={router} />
}

export default App
