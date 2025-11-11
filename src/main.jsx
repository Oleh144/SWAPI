import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from "react-router";
import { ChakraProvider, createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";
import HeroGraph from "@/components/HeroGraph.tsx";

const router = createBrowserRouter([
        {
            path: '/',
            element: <App />,
        },
        {
            path: '/graph',
            element: <HeroGraph />,
        },
    ],
    {
        basename: '/SWAPI',
    }
);

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
        <ChakraProvider value={ system }>
            <RouterProvider router={ router }>
            </RouterProvider>
        </ChakraProvider>
    </StrictMode>
)
