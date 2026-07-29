import { UIManager } from './UIManager';
export class SearchAutocompleteRenderer {
    inputId;
    bloggerService;
    dropdown = null;
    selectedIndex = -1;
    suggestions = [];
    constructor(inputId, bloggerService) {
        this.inputId = inputId;
        this.bloggerService = bloggerService;
        this.init();
    }
    init() {
        const input = UIManager.el(this.inputId);
        if (!input)
            return;
        input.setAttribute('autocomplete', 'off');
        // Create dropdown
        this.dropdown = document.createElement('div');
        this.dropdown.className = 'antinna-search-dropdown';
        // Find a suitable parent that spans the search bar
        const group = (input.closest('.search-input-group') || input.parentElement);
        if (group) {
            group.style.setProperty('position', 'relative', 'important');
            group.appendChild(this.dropdown);
        }
        let debounceTimer;
        input.oninput = () => {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => this.handleInput(input.value), 300);
        };
        input.onkeydown = (e) => this.handleKeydown(e);
        document.addEventListener('click', (e) => {
            if (!input.contains(e.target) && !this.dropdown?.contains(e.target)) {
                this.hide();
            }
        });
    }
    async handleInput(value) {
        if (value.length < 2) {
            this.hide();
            return;
        }
        this.suggestions = await this.bloggerService.fetchSearchSuggestions(value);
        this.render();
    }
    render() {
        if (!this.dropdown)
            return;
        if (this.suggestions.length === 0) {
            this.hide();
            return;
        }
        this.dropdown.innerHTML = this.suggestions.map((s, i) => `
        <div class="antinna-search-item ${i === this.selectedIndex ? 'active' : ''}"
             onclick="window.handleSuggestionClick('${s.replace(/'/g, "\\'")}')">
            ${s}
        </div>
    `).join('');
        window.handleSuggestionClick = (val) => this.select(val);
        this.dropdown.style.display = 'block';
    }
    handleKeydown(e) {
        if (this.dropdown?.style.display !== 'block')
            return;
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            this.selectedIndex = (this.selectedIndex + 1) % this.suggestions.length;
            this.render();
        }
        else if (e.key === 'ArrowUp') {
            e.preventDefault();
            this.selectedIndex = (this.selectedIndex - 1 + this.suggestions.length) % this.suggestions.length;
            this.render();
        }
        else if (e.key === 'Enter' && this.selectedIndex >= 0) {
            e.preventDefault();
            this.select(this.suggestions[this.selectedIndex]);
        }
        else if (e.key === 'Escape') {
            this.hide();
        }
    }
    select(val) {
        const input = UIManager.el(this.inputId);
        if (input) {
            input.value = val;
            this.hide();
            input.form?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
        }
    }
    hide() {
        if (this.dropdown) {
            this.dropdown.style.display = 'none';
            this.selectedIndex = -1;
        }
    }
}
