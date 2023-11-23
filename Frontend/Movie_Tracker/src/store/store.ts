import { create } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from "@react-native-async-storage/async-storage";
import MovieData from "../data/MovieData";

export const useStore = create(
    persist(
        (set,get) => ({
            WatchList: MovieData,
            ContinueList: MovieData,
            RecommendationList: MovieData,
        }),{name:'movie-app', storage:createJSONStorage(() => AsyncStorage)}
    )

)