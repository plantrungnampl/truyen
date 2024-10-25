import Image from "next/image";
import {MangaListAPIResponse} from "@/types/type";
import Link from "next/link";
import {Card, CardContent, CardFooter} from "@/components/ui/card";
import {ScrollArea} from "@/components/ui/scroll-area";
import {Badge} from "@/components/ui/badge";

export default function MangaSearchItem({query, dataManga}: { query: string; dataManga: MangaListAPIResponse }) {
    return (
        <div className="container mx-auto px-4 py-8">
            {dataManga.data.length === 0 ? (
                <p className="text-center text-lg text-muted-foreground">No results found for "{query}"</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {dataManga.data.map((manga) => {
                        const coverImage = manga.relationships.find((rel) => rel.type === "cover_art")?.attributes?.fileName
                        const author = manga.relationships.find((rel) => rel.type === "author")?.attributes?.name
                        const description = manga.attributes.description.en

                        return (
                            <Link key={manga.id} href={`manga/${manga.id}`} className="group">
                                <Card
                                    className="h-full overflow-hidden transition-all duration-300 hover:shadow-lg">
                                    <div className="relative aspect-[2/3] overflow-hidden">
                                        {coverImage ? (
                                            <Image
                                                src={`https://uploads.mangadex.org/covers/${manga.id}/${coverImage}`}
                                                alt={manga.attributes.title.en || "Cover image"}
                                                fill
                                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            />
                                        ) : (
                                            <div className="flex h-full items-center justify-center bg-muted">
                                                <span
                                                    className="text-sm text-muted-foreground">No cover available</span>
                                            </div>
                                        )}
                                    </div>
                                    <CardContent className="p-4">
                                        <h2 className="mb-2 line-clamp-2 text-lg font-semibold group-hover:text-primary">
                                            {manga.attributes.title.en || "Unknown Title"}
                                        </h2>
                                        <p className="mb-2 text-sm text-muted-foreground">
                                            Author: {author || "Unknown"}
                                        </p>
                                        <ScrollArea className="h-24">
                                            <p className="text-sm text-muted-foreground">{description}</p>
                                        </ScrollArea>
                                    </CardContent>
                                    <CardFooter className="flex items-center justify-between p-4">
                                        <Badge variant="secondary">{manga.attributes.status}</Badge>
                                        {manga.attributes.year && (
                                            <span
                                                className="text-sm text-muted-foreground">{manga.attributes.year}</span>
                                        )}
                                    </CardFooter>
                                </Card>
                            </Link>
                        )
                    })}
                </div>
            )}
        </div>
    )
}

