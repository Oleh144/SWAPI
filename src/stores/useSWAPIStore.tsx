import { create } from 'zustand'
import { Hero } from "@/types/hero";
import { Starship } from "@/types/starship";

interface SWAPIStore {
    heroes: Hero[];
    starships: Starship[];
    nextPage: string;
    errors: string;
    loading: boolean;
    fetchHeroes: () => Promise<void>;
    fetchStarships: () => Promise<void>;
}

export const useSWAPIStore = create<SWAPIStore>((set, get, errors) => ({
    heroes: [],
    starships: [],
    nextPage: "https://sw-api.starnavi.io/people",
    errors: '',
    loading: false,

    fetchHeroes: async () => {
        const { nextPage, loading } = get();
        if (!nextPage || loading) return;

        set({ loading: true, errors: '' });

        try {
            const response = await fetch(nextPage)

            if (!response.ok) {
                set({ loading: false, errors: "Failed to fetch" })
                throw new Error("Failed to fetch");
            }
            const data = await response.json();

            set((state) => ({
                heroes: [...state.heroes, ...data.results],
                nextPage: data.next || null,
                loading: false,
            }));
        } catch (error) {
            set({ errors: "Failed to fetch", loading: false })
        }
    },

    fetchStarships: async () => {
        try {
            let allStarships: Starship[] = [];
            let nextUrl = "https://sw-api.starnavi.io/starships?page=1";

            while (nextUrl) {
                const response = await fetch(nextUrl)

                if (!response.ok) {
                    set({ errors: "Failed to fetch" })
                    throw new Error("Failed to fetch");
                }

                const data = await response.json();

                allStarships = [...allStarships, ...data.results]

                nextUrl = data.next || null;
            }

            set({ starships: allStarships })

        } catch (error) {
            set({ errors: "Failed to fetch" })
        }
    },
}))