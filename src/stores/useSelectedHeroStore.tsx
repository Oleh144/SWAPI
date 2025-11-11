import { create } from 'zustand'
import { Hero } from "@/types/hero";

interface SelectedHeroState {
    selectedHero: Hero | null;
    setSelectedHero: (hero: Hero) => void;
}

export const useSelectedHeroStore = create<SelectedHeroState>((set) => ({
    selectedHero: null,
    setSelectedHero: (hero) => set({ selectedHero: hero }),
}))