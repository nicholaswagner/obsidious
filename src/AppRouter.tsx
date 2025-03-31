import { Alert } from '@mui/material'
import { createRouter, RouterProvider } from '@tanstack/react-router'

import { routeTree } from './routeTree.gen'

export const router = createRouter({
    basepath: import.meta.env.BASE_URL,
    routeTree,
    defaultPreload: 'intent',
    defaultStaleTime: 5000,
    scrollRestoration: true,
    defaultComponent: () => {
        return (
            <h1>
                <Alert variant="filled" severity="info">
                    oops
                </Alert>
            </h1>
        )
    },
    defaultNotFoundComponent: () => (
        <h1>
            <Alert variant="filled">404</Alert>
        </h1>
    ),
})

export const AppRouter = () => {
    return <RouterProvider router={router} />
}
