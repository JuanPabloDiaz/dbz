// Client-side pagination handler for static sites
class PaginationHandler {
  constructor() {
    this.init();
  }

  init() {
    // Check if we're on a paginated page
    const url = new URL(window.location.href);
    const page = parseInt(url.searchParams.get('page') || '1');
    const name = url.searchParams.get('name') || '';
    const race = url.searchParams.get('race') || '';
    const gender = url.searchParams.get('gender') || '';
    const affiliation = url.searchParams.get('affiliation') || '';

    // If we have query parameters, load the appropriate data
    if (page > 1 || name || race || gender || affiliation) {
      this.loadPageData(page, { name, race, gender, affiliation });
    }

    // Handle pagination clicks
    this.setupPaginationHandlers();
  }

  async loadPageData(page, filters = {}) {
    try {
      // Show loading state
      this.showLoading();

      // Build API URL
      const apiUrl = new URL('https://dragonball-api.com/api/characters');
      apiUrl.searchParams.set('page', page.toString());
      apiUrl.searchParams.set('limit', '12');

      Object.entries(filters).forEach(([key, value]) => {
        if (value) {
          apiUrl.searchParams.set(key, value);
        }
      });

      const response = await fetch(apiUrl.toString());
      const data = await response.json();

      // Update the page content
      this.updatePageContent(data, page, filters);
      
      // Update pagination
      this.updatePagination(data.meta, data.links);

      // Update URL without reloading
      this.updateUrl(page, filters);

    } catch (error) {
      console.error('Error loading page data:', error);
      this.showError();
    }
  }

  updatePageContent(data, page, filters) {
    const grid = document.querySelector('.characters-grid');
    const resultsInfo = document.querySelector('.results-info');
    const pageInfo = document.querySelector('.page-info');

    if (!grid || !resultsInfo || !pageInfo) return;

    // Update results info
    resultsInfo.textContent = `Showing ${data.meta.itemCount} of ${data.meta.totalItems} characters`;
    pageInfo.textContent = `Page ${page} of ${data.meta.totalPages}`;

    // Update grid content
    if (data.items && data.items.length > 0) {
      grid.innerHTML = data.items.map(character => this.createCharacterCard(character)).join('');
    } else {
      grid.innerHTML = this.createEmptyState();
    }
  }

  createCharacterCard(character) {
    return `
      <a href="/characters/${character.id}" class="group">
        <div class="bg-gray-800 rounded-lg overflow-hidden shadow-lg border border-gray-700 hover:border-saiyan-yellow transition-all duration-300 transform hover:scale-105">
          <div class="aspect-w-3 aspect-h-4 bg-gray-700">
            <img 
              src="${character.image}" 
              alt="${character.name}"
              class="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
              loading="lazy"
            />
          </div>
          <div class="p-4">
            <h3 class="text-xl font-manga text-saiyan-yellow mb-2 group-hover:text-dragon-orange transition-colors">${character.name}</h3>
            <div class="flex flex-wrap gap-2 mb-3">
              ${character.race ? `<span class="px-2 py-1 bg-namek-green text-white text-xs rounded-full">${character.race}</span>` : ''}
              ${character.gender ? `<span class="px-2 py-1 bg-dragon-blue text-white text-xs rounded-full">${character.gender}</span>` : ''}
            </div>
            <p class="text-gray-300 text-sm mb-3 line-clamp-3">${character.description || 'A powerful warrior from the Dragon Ball universe.'}</p>
            <div class="flex items-center justify-between">
              <span class="text-dragon-gold text-sm">Power Level: ${character.ki || 'Unknown'}</span>
              <span class="text-xs text-gray-400">View Details →</span>
            </div>
          </div>
        </div>
      </a>
    `;
  }

  createEmptyState() {
    return `
      <div class="col-span-full text-center py-16">
        <div class="text-6xl mb-4">🐉</div>
        <h3 class="text-2xl font-manga text-saiyan-yellow mb-2">No Characters Found</h3>
        <p class="text-gray-300 mb-6">Try adjusting your search terms</p>
        <a href="/characters" class="bg-saiyan-gradient text-gray-900 px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300">
          Reset Search
        </a>
      </div>
    `;
  }

  updatePagination(meta, links) {
    const pagination = document.querySelector('.pagination-container');
    if (!pagination) return;

    // Update pagination component with new data
    // This would require updating the pagination component to be more dynamic
  }

  updateUrl(page, filters) {
    const url = new URL(window.location.href);
    
    if (page > 1) {
      url.searchParams.set('page', page.toString());
    } else {
      url.searchParams.delete('page');
    }

    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        url.searchParams.set(key, value);
      } else {
        url.searchParams.delete(key);
      }
    });

    window.history.replaceState({}, '', url.toString());
  }

  setupPaginationHandlers() {
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a[href*="page="]');
      if (!link) return;

      e.preventDefault();
      
      const url = new URL(link.href);
      const page = parseInt(url.searchParams.get('page') || '1');
      const filters = {
        name: url.searchParams.get('name') || '',
        race: url.searchParams.get('race') || '',
        gender: url.searchParams.get('gender') || '',
        affiliation: url.searchParams.get('affiliation') || ''
      };

      this.loadPageData(page, filters);
    });
  }

  showLoading() {
    const grid = document.querySelector('.characters-grid');
    if (grid) {
      grid.innerHTML = '<div class="col-span-full text-center py-16"><div class="animate-spin text-6xl">⚡</div><p class="text-gray-300 mt-4">Loading characters...</p></div>';
    }
  }

  showError() {
    const grid = document.querySelector('.characters-grid');
    if (grid) {
      grid.innerHTML = '<div class="col-span-full text-center py-16"><div class="text-6xl mb-4">😵</div><h3 class="text-2xl font-manga text-red-400 mb-2">Error Loading Characters</h3><p class="text-gray-300">Please try again later</p></div>';
    }
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => new PaginationHandler());
} else {
  new PaginationHandler();
}
