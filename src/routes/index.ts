import HomePage from '@/pages/home'
import TodoPage from '@/pages/todo'

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
    }
];