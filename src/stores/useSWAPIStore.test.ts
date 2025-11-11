import { describe, it, expect, vi } from "vitest";
import { useSWAPIStore } from "./useSWAPIStore";
import { act } from "react";

describe("useSWAPIStore — fetchHeroes", () => {
    it("set loading = true while fetching", async () => {
        const mockFetch = vi.fn().mockResolvedValue({
            ok: true,
            json: async () => ({ results: [], next: null }),
        });
        vi.stubGlobal("fetch", mockFetch);

        const store = useSWAPIStore.getState();
        const promise = store.fetchHeroes();

        expect(useSWAPIStore.getState().loading).toBe(true);

        await promise;
        expect(useSWAPIStore.getState().loading).toBe(false);

        vi.unstubAllGlobals();
    });
});

describe("useSWAPIStore", () => {
    beforeEach(() => {
        vi.resetAllMocks();
        useSWAPIStore.setState({
            heroes: [],
            starships: [],
            nextPage: "https://sw-api.starnavi.io/people?page=1",
            errors: "",
            loading: false,
        });
    });

    it("set error if !respons.ok", async () => {
        vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
            ok: false,
            json: vi.fn().mockResolvedValue({}),
        }));

        const store = useSWAPIStore.getState();

        await act(async () => {
            await store.fetchHeroes();
        });

        const { errors } = useSWAPIStore.getState();

        expect(errors).toBe("Failed to fetch");

        vi.unstubAllGlobals();
    });
});