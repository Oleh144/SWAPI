import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {createBrowserRouter, RouterProvider} from "react-router";
import {ChakraProvider, createSystem, defaultConfig, defineConfig} from "@chakra-ui/react";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
    },
]);

const config = defineConfig({
    theme: {
        tokens: {
            colors: {},
        },
    },
})

const system = createSystem(defaultConfig, config)

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <ChakraProvider value={system}>
            <RouterProvider router={router}>
                <App />
            </RouterProvider>
        </ChakraProvider>
    </StrictMode>
)
