import Auth from "../pages/Auth";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import Settings from "../pages/Settings";

export interface IRoute {
    path: string;
    Component: React.ComponentType;
}

export const publicRoutes:IRoute[] = [
    {
        path: '/',
        Component: Home,
    },
    {
        path: '/login',
        Component: Auth
    },
    {
        path: '/register',
        Component: Auth
    },
    {
        path:'/:profileName',
        Component: Profile
    }
]
export const authRoutes:IRoute[] = [
    {
        path: '/',
        Component:Home
    },
    {
        path:'/:profileName',
        Component: Profile
    },
    {
        path:'/settings',
        Component: Settings
    }
]
