export interface MangaListProps {
  id: string;
  title: string;
  description: string;
  coverUrl: string;
  category?: "popular" | "new" | "trending";
  nextCursor?: string | null;
  link?: string;
  tags?: any;
}
export interface MangaListAPIResponse {
  data: Array<{
    id: string;
    attributes: {
      tags: Array<{
        attributes: {
          name: {
            en?: string;
            ja?: string;
          };
        };
      }>;
      title: { en?: string; ja?: string };
      altTitles: Array<{
        en?: string;
        ru?: string;
        th?: string;
        ja?: string;
        "zh-hk": string;
        it?: string;
        fr?: string;
        "ja-ro"?: string;
      }>;
      description: {
        en?: string;
        ja?: string;
        zh?: string;
        es?: string;
        fr?: string;
        ru?: string;
        "pt-br"?: string;
      };
    };
    relationships: Array<{
      type: string;
      attributes: { fileName: string };
    }>;
  }>;
}
export interface MangaGridProps {
  category?: "popular" | "new" | "trending";
}

// Detail Manga
// Interface for Titles
interface Title {
  "ja-ro"?: string;
  en?: string;
}

// Interface for Alt Titles
interface AltTitle {
  [language: string]: string;
}

// Interface for Description
interface Description {
  en: string;
  [language: string]: string;
}

// Interface for Tag Attributes
interface TagAttributes {
  name: {
    en: string;
    [language: string]: string;
  };
  description?: Record<string, never>; // Empty object
  group: string;
  version: number;
}

// Interface for Tags
interface Tag {
  id: string;
  type: string;
  attributes: TagAttributes;
  relationships: Relationship[];
}

// Interface for Links
interface Links {
  al?: string;
  ap?: string;
  bw?: string;
  kt?: string;
  mu?: string;
  nu?: string;
  amz?: string;
  cdj?: string;
  ebj?: string;
  mal?: string;
  raw?: string;
  engtl?: string;
  [key: string]: string | undefined;
}

// Interface for Attributes
interface Attributes {
  title: Title;
  altTitles: AltTitle[];
  description: Description;
  isLocked: boolean;
  links: Links;
  originalLanguage: string;
  lastVolume: string;
  lastChapter: string;
  publicationDemographic: string;
  status: string;
  year: number;
  contentRating: string;
  tags: Tag[];
  state: string;
  chapterNumbersResetOnNewVolume: boolean;
  createdAt: string;
  updatedAt: string;
  version: number;
  availableTranslatedLanguages: string[];
  latestUploadedChapter: string;
  chapter?: string;
  readableAt: string | number;
  translatedLanguage: string;
}

// Interface for Relationships
interface Relationship {
  id: string;
  type: string;
  related?: string;
  attributes: { fileName: string; name: string };
}

// Interface for Data

interface chapter extends Attributes {
  attributes: Attributes;
  id: string;
  chapter: string;
}
export interface Data {
  id: string;
  type: string;
  attributes: Attributes;
  relationships: Relationship[];
}

// Interface for Response main
export interface Response {
  result: string;
  response: string;
  data: Data;
  chapters: chapter[];
  total: number;
}
// manga detail:
// export interface MangaDetailResponse {
//   data: {
//     id: string;
//     attributes: {
//       title: {
//         en: string;
//       };
//       description: {
//         en: string;
//       };
//       // Các thuộc tính khác tùy theo API response
//     };
//     relationships: {
//       id: string;
//       type: string;
//     }[];
//   };
// }

// interface Chapter {
//   id: string;
//   attributes: {
//     chapter: string;
//     title: string;
//     translatedLanguage: string;
//     // Các thuộc tính khác của chap
//   };
// }

// export interface ChapterDetailResponse {
//   data: Chapter;
// }

// export interface ChaptersResponse {
//   data: Chapter[];
// }

// chappter detail real:
// Interface cho relationship của chapter
interface Relationship {
  id: string;
  type: string;
}

// Interface cho attributes của chapter
interface ChapterAttributes {
  volume: string | null;
  chapter: string;
  title: string | null;
  translatedLanguage: string;
  externalUrl: string | null;
  publishAt: string;
  readableAt: string;
  createdAt: string;
  updatedAt: string;
  pages: number;
  version: number;
}

// Interface chính cho chi tiết chapter
interface ChapterDetail {
  id: string;
  type: string;
  attributes: ChapterAttributes;
  relationships: Relationship[];
}

// Interface cho toàn bộ response
export interface ChapterDetailResponse {
  result: string;
  response: string;
  data: ChapterDetail;
  pages: string[];
  nextChapterId: () => void;
  prevChapterId: () => void;
}

// pages cua 1 chapter
// Interface cho dữ liệu của một chapter
interface ChapterData {
  hash: string;
  data: string[]; // Danh sách các file hình ảnh chất lượng đầy đủ
  dataSaver: string[]; // Danh sách các file hình ảnh tiết kiệm dữ liệu
}

// Interface chính cho phản hồi của chapter
export interface ChapterResponse {
  result: string;
  baseUrl: string; // URL cơ sở để truy xuất các file hình ảnh
  chapter: ChapterData; // Dữ liệu liên quan đến chapter
}

//pagination props

export interface PaginationProps {
  category: "popular" | "new" | "trending" | "seasonal" | string;
  fetchNextPage?: () => void;
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
}
type Category = "popular" | "new" | "trending" | "seasonal";

export interface PageProps {
  category: Category;
  searchParams?: { [key: string]: string | undefined };
}
