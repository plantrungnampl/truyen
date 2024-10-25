"use client";
import React, {useCallback} from "react";
import {
    useQueryClient,
    useSuspenseInfiniteQuery,
} from "@tanstack/react-query";
import MangaCarousel from "./MangaCarousel";
import Loading from "@/app/loading";
import Error from "../../common/Error";

import Paganation from "../../common/Paganation";
import axios from "axios";
import {MangaListAPIResponse} from "@/types/type";

export const fetchMangaDetail = async (id: string) => {
    const {data} = await axios.get(`/api/detailManga`, {
        params: {id},
    });
    return data;
};
import {MangaListProps} from "../../../types/type";

const MangaList: React.FC<MangaListProps> = ({category}) => {
    const fetchSeasonalManga = async (
        pageParams: number
    ): Promise<MangaListProps[]> => {
        const {data} = await axios.get<MangaListAPIResponse>(
            `http://localhost:3000/api/mangaList`,
            {
                params: {
                    page: pageParams,
                    limit: 20,
                    category: category,
                },
            }
        );

        return data.data.map((manga) => {
            const cover = manga.relationships.find((rel) => rel.type === "cover_art");
            return {
                id: manga.id,
                title: manga.attributes.title.en || "Unknown Title",
                description:
                    manga.attributes.description.en || "No description available",
                coverUrl: cover
                    ? `https://uploads.mangadex.org/covers/${manga.id}/${cover.attributes.fileName}`
                    : "",
                link: `manga/${manga.id}`,
            };
        });
    };
    const queryClient = useQueryClient();

    const handlePrefetch = useCallback(
        (id: string) => {
            queryClient.prefetchQuery({
                queryKey: ["detailManga", id],
                queryFn: () => fetchMangaDetail(id),
            });
        },
        [queryClient]
    );

    const {
        data: mangaList,
        isFetching,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        error,
    } = useSuspenseInfiniteQuery({
        queryKey: ["mangaList", category],
        queryFn: ({pageParam = 1}) => fetchSeasonalManga(pageParam),
        getNextPageParam: (lastPage) =>
            lastPage?.length === 20 ? lastPage.length + 1 : undefined,
        refetchOnWindowFocus: false,
        initialPageParam: 1,
    });

    if (isFetching) return <Loading/>;
    if (error) return <Error message={error.message}/>;

    const mangaListData = mangaList?.pages.flat() ?? [];

    return (
        <div>
            <MangaCarousel
                handlePrefetch={handlePrefetch}
                mangaList={mangaListData}
            />
            <Paganation
                category={category ?? "popular"}
                fetchNextPage={fetchNextPage}
                hasNextPage={hasNextPage ?? false}
                isFetchingNextPage={isFetchingNextPage}
            />
        </div>
    );
};

export default MangaList;
