import {create} from 'zustand'

export const useSWAPIStore = create((set, get) => ({
    heroes: [],
    nextPage: "https://sw-api.starnavi.io/people",
    errors: '',
    loading: false,

    fetchHeroes: async () => {
        const {nextPage, loading} = get();

        if (!nextPage || loading) return;
        set({loading: true});

        try {
            const response = await fetch(nextPage)

            if (!response.ok) {
                set({loading: false, errors: "Failed to fetch"})
                throw new Error("Failed to fetch");
            }
            const data = await response.json();

            set((state) => ({
                heroes: [...state.heroes, ...data.results],
                nextPage: data.next || null,
                loading: false,
            }));
        } catch (error) {
            set({errors: error && "Failed to fetch", loading: false})
        }

    },
}))