// import {Suspense} from 'react'
// import SearchBar from "@/components/common/Search";
// import TestList from "@/components/manga/list/TestList";
//
// export default async function SearchResult(props: {
//     searchParams?: Promise<{
//         query?: string
//     }>
// }) {
//     const searchParams = await props.searchParams;
//     const query = searchParams?.query || '';
//     return (
//         <main className="p-4 mt-16 mx-auto">
//             <h1 className="text-2xl font-bold mb-4">Search results</h1>
//             {/* Hiển thị lại searchbar */}
//             <SearchBar/>
//             {query ? (
//                 <div className="mt-4">
//                     <p className="text-gray-600 mb-4">
//                         The search results for: &quot;{query}&quot;
//                     </p>
//                     <Suspense fallback={<SearchSkeleton/>}>
//                         <TestList query={query}/>
//                     </Suspense>
//                 </div>
//             ) : (
//                 <p className="mt-4 text-gray-600">
//                     Please enter the keywords to search.
//                 </p>
//             )}
//         </main>
//     )
// }
//
// function SearchSkeleton() {
//     return (
//         <div className="space-y-4 mt-4">
//             {[1, 2, 3].map((i) => (
//                 <div key={i} className="animate-pulse">
//                     <div className="h-4 bg-gray-200 rounded w-3/4"></div>
//                     <div className="h-4 bg-gray-200 rounded w-1/2 mt-2"></div>
//                 </div>
//             ))}
//         </div>
//     )
// }
import {Suspense} from "react"
import SearchBar from "@/components/common/Search"
import TestList from "@/components/manga/list/TestList"
import {Skeleton} from "@/components/ui/skeleton"

export default async function SearchResult(props: {
    searchParams?: Promise<{
        query?: string
    }>
}) {
    const searchParams = await props.searchParams
    const query = searchParams?.query || ""

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight">Search Results</h1>
            <SearchBar/>
            {query ? (
                <div className="space-y-4">
                    <p className="text-muted-foreground">
                        Showing results for: <span className="font-medium">"{query}"</span>
                    </p>
                    <Suspense fallback={<SearchSkeleton/>}>
                        <TestList query={query}/>
                    </Suspense>
                </div>
            ) : (
                <p className="text-muted-foreground">
                    Please enter keywords to search for manga.
                </p>
            )}
        </div>
    )
}

function SearchSkeleton() {
    return (
        <div className="space-y-4">
            {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center space-x-4">
                    <Skeleton className="h-12 w-12 rounded"/>
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-[250px]"/>
                        <Skeleton className="h-4 w-[200px]"/>
                    </div>
                </div>
            ))}
        </div>
    )
}