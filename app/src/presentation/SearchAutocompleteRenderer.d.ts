import { BloggerDataService } from '../infrastructure/BloggerDataService';
export declare class SearchAutocompleteRenderer {
    private inputId;
    private bloggerService;
    private dropdown;
    private selectedIndex;
    private suggestions;
    constructor(inputId: string, bloggerService: BloggerDataService);
    private init;
    private handleInput;
    private render;
    private handleKeydown;
    private select;
    private hide;
}
