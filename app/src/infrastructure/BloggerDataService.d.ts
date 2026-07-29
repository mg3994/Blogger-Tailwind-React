export declare class BloggerDataService {
    fetchFeedData(maxResults?: number, startIndex?: number, labels?: string | string[], searchQuery?: string): Promise<{
        entries: any[];
        totalResults: number;
    }>;
    extractSchemaFromEntry(entry: any): any | null;
    fetchSearchSuggestions(query: string): Promise<string[]>;
}
