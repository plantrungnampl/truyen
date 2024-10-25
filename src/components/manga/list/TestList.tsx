import axios from "axios";
import React from "react";
import {MangaListAPIResponse} from "@/types/type";
import MangaSearchItem from "@/components/manga/shared/MangaSearchItem";

export default async function TestList({query}: { query: string }) {
    const response = await axios.get<MangaListAPIResponse>(
        "http://localhost:3000/api/searchManga",
        {
            params: {query},
        }
    );
    const dataManga = response.data;

    return (
        <MangaSearchItem query={query} dataManga={dataManga}/>
    );
}
