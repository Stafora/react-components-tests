import '@/assets/styles/main.css'
import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { routes } from './routes'
import { LoadingProvider, useLoading } from '@/providers/LoadingContext';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import Layout from '@/components/layouts'

export default function App() {
    return (
        <LoadingProvider>
            <BrowserRouter>
                <GlobalLoader />
                <Routes>
                    {routes.map(({ path, component: Component }) => (
                        <Route
                            key={path}
                            path={path}
                            element={
                                <React.Suspense fallback={<div>Loading...</div>}>
                                    <Layout>
                                        <Component />
                                    </Layout>
                                </React.Suspense>
                            }
                        />
                    ))}
                </Routes>
            </BrowserRouter>
        </LoadingProvider>
    );
}

const GlobalLoader = () => {
    const { loading } = useLoading();

    if (loading) {
        return <LoadingSpinner />;
    }

    return null;
};