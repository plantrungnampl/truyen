export interface MangaChapter {
  id: string;
  attributes: {
    chapter: string;
    title: {
      en: string;
    };
    readableAt: string;
    translatedLanguage: string;
  };
}

export interface MangaTag {
  attributes: {
    name: {
      en: string;
    };
  };
}

export interface MangaData {
  id: string;
  attributes: {
    title: {
      en: string;
    };
    description: {
      en: string;
    };
    contentRating: string;
    status: string;
    availableTranslatedLanguages: string[];
    tags: MangaTag[];
  };
  relationships: {
    type: string;
    attributes?: {
      name?: string;
      fileName?: string;
    };
  }[];
}

export interface MangaDetailResponse {
  data: MangaData;
  chapters: MangaChapter[];
  total: number;
}

export interface Comment {
  id: number;
  user: string;
  text: string;
  avatar: string;
}

// ===================================//

// types/mangadex.ts

// Common types
export interface Relationship {
  id: string;
  type: string;
  related?: string;
  attributes?: Record<string, unknown>;
}

// Chapter types
export interface ChapterAttributes {
  volume: string | null;
  chapter: string | null;
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

export interface ChapterData {
  id: string;
  type: "chapter";
  attributes: ChapterAttributes;
  relationships: Relationship[];
}

export interface ChapterDetailResponse {
  result: "ok" | "error";
  response: "entity";
  data: ChapterData;
}

// Chapter pages types
export interface ChapterPages {
  hash: string;
  data: string[];
  dataSaver: string[];
}

export interface AtHomeResponse {
  result: "ok" | "error";
  baseUrl: string;
  chapter: ChapterPages;
}

// List chapters response
export interface ChapterListResponse {
  result: "ok" | "error";
  response: "collection";
  data: ChapterData[];
  limit: number;
  offset: number;
  total: number;
}

// Final response type
export interface DetailedChapterResponse extends ChapterDetailResponse {
  pages: string[];
  nextChapterId: string | null;
  prevChapterId: string | null;
}
