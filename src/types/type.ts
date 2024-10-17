export interface MangaListProps {
  id: string;
  title: string;
  description: string;
  coverUrl: string;
  category?: "popular" | "new" | "trending";
  nextCursor?: string | null;
  link?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
interface Data {
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
}
