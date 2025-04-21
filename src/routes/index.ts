import HomePage from '@/pages/home'
import TodoPage from '@/pages/todo'
import MolePage from '@/pages/mole'

export const routes = [
    {
        path: '/',
        name: 'Home',
        component: HomePage
    },
    {
        path: '/todo',
        name: 'Todo',
        component: TodoPage
    },
    {
        path: '/mole',
        name: 'Mole',
        component: MolePage
    }
];