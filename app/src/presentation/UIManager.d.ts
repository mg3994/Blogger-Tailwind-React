export declare class UIManager {
    static el<T extends HTMLElement>(id: string): T | null;
    static query<T extends HTMLElement>(selector: string): T | null;
    static setContent(idOrSelector: string, content: string): void;
    static setHtml(idOrSelector: string, html: string): void;
    static toggleClass(idOrSelector: string, className: string, force?: boolean): void;
    static injectModalStyles(): void;
    static injectModelViewer(): Promise<void>;
    static injectLeaflet(): Promise<void>;
    static show3DViewer(url: string): Promise<void>;
    static hide3DViewer(): void;
    static showToast(message: string, type?: 'success' | 'error' | 'info'): void;
}
