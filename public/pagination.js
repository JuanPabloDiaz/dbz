// Simple pagination handler for static Dragon Ball site
window.DragonBallPagination = {
  // Characters pagination
  initCharacters: function() {
    const url = new URL(window.location.href);
    const page = parseInt(url.searchParams.get('page') || '1');
    const name = url.searchParams.get('name') || '';

    if (page > 1 || name) {
      this.loadCharacters(page, name);
    }
    this.setupHandlers('characters');
  },

  // Planets pagination
  initPlanets: function() {
    const url = new URL(window.location.href);
    const page = parseInt(url.searchParams.get('page') || '1');
    const name = url.searchParams.get('name') || '';

    if (page > 1 || name) {
      this.loadPlanets(page, name);
    }
    this.setupHandlers('planets');
  },

  // Transformations pagination
  initTransformations: function() {
    const url = new URL(window.location.href);
    const page = parseInt(url.searchParams.get('page') || '1');
    const name = url.searchParams.get('name') || '';

    if (page > 1 || name) {
      this.loadTransformations(page, name);
    }
    this.setupHandlers('transformations');
  },

  // Load characters data
  loadCharacters: async function(page, name) {
    try {
      this.showLoading('characters');
      const apiUrl = new URL('https://dragonball-api.com/api/characters');
      apiUrl.searchParams.set('page', page.toString());
      apiUrl.searchParams.set('limit', '12');
      if (name) apiUrl.searchParams.set('name', name);

      const response = await fetch(apiUrl.toString());
      const data = await response.json();
      this.updateCharacters(data, page);
      this.updateUrl(page, { name });
    } catch (error) {
      this.showError('characters');
    }
  },

  // Load planets data
  loadPlanets: async function(page, name) {
    try {
      this.showLoading('planets');
      const apiUrl = new URL('https://dragonball-api.com/api/planets');
      apiUrl.searchParams.set('page', page.toString());
      apiUrl.searchParams.set('limit', '9');
      if (name) apiUrl.searchParams.set('name', name);

      const response = await fetch(apiUrl.toString());
      const data = await response.json();
      this.updatePlanets(data, page);
      this.updateUrl(page, { name });
    } catch (error) {
      this.showError('planets');
    }
  },

  // Load transformations data
  loadTransformations: async function(page, name) {
    try {
      this.showLoading('transformations');
      const apiUrl = new URL('https://dragonball-api.com/api/transformations');
      apiUrl.searchParams.set('page', page.toString());
      apiUrl.searchParams.set('limit', '12');
      if (name) apiUrl.searchParams.set('name', name);

      const response = await fetch(apiUrl.toString());
      const data = await response.json();
      this.updateTransformations(data, page);
      this.updateUrl(page, { name });
    } catch (error) {
      this.showError('transformations');
    }
  },

  // Update characters content
  updateCharacters: function(data, page) {
    const grid = document.querySelector('.characters-grid');
    const resultsInfo = document.querySelector('.results-info');
    const pageInfo = document.querySelector('.page-info');

    if (resultsInfo) resultsInfo.textContent = `Showing ${data.meta.itemCount} of ${data.meta.totalItems} characters`;
    if (pageInfo) pageInfo.textContent = `Page ${page} of ${data.meta.totalPages}`;
    
    if (grid && data.items && data.items.length > 0) {
      grid.innerHTML = data.items.map(char => this.createCharacterCard(char)).join('');
    }
  },

  // Update planets content
  updatePlanets: function(data, page) {
    const grid = document.querySelector('.planets-grid');
    const resultsInfo = document.querySelector('.results-info');
    const pageInfo = document.querySelector('.page-info');

    if (resultsInfo) resultsInfo.textContent = `Showing ${data.meta.itemCount} of ${data.meta.totalItems} planets`;
    if (pageInfo) pageInfo.textContent = `Page ${page} of ${data.meta.totalPages}`;
    
    if (grid && data.items && data.items.length > 0) {
      grid.innerHTML = data.items.map(planet => this.createPlanetCard(planet)).join('');
    }
  },

  // Update transformations content
  updateTransformations: function(data, page) {
    const grid = document.querySelector('.transformations-grid');
    const resultsInfo = document.querySelector('.results-info');
    const pageInfo = document.querySelector('.page-info');

    if (resultsInfo) resultsInfo.textContent = `Showing ${data.meta.itemCount} of ${data.meta.totalItems} transformations`;
    if (pageInfo) pageInfo.textContent = `Page ${page} of ${data.meta.totalPages}`;
    
    if (grid && data.items && data.items.length > 0) {
      grid.innerHTML = data.items.map(transformation => this.createTransformationCard(transformation)).join('');
    }
  },

  // Create character card HTML
  createCharacterCard: function(character) {
    return `
      <a href="/characters/${character.id}" class="group">
        <div class="bg-gray-800 rounded-lg overflow-hidden shadow-lg border border-gray-700 hover:border-saiyan-yellow transition-all duration-300 transform hover:scale-105">
          <div class="aspect-w-3 aspect-h-4 bg-gray-700">
            <img src="${character.image}" alt="${character.name}" class="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300" loading="lazy" />
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
  },

  // Create planet card HTML
  createPlanetCard: function(planet) {
    return `
      <a href="/planets/${planet.id}" class="group">
        <div class="bg-gray-800 rounded-lg overflow-hidden shadow-lg border border-gray-700 hover:border-namek-green transition-all duration-300 transform hover:scale-105">
          <div class="aspect-w-16 aspect-h-9 bg-gray-700">
            <img src="${planet.image}" alt="${planet.name}" class="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300" loading="lazy" />
          </div>
          <div class="p-4">
            <h3 class="text-xl font-manga text-namek-green mb-2 group-hover:text-dragon-orange transition-colors">${planet.name}</h3>
            <p class="text-gray-300 text-sm mb-3 line-clamp-3">${planet.description || 'A mysterious world in the Dragon Ball universe.'}</p>
            <div class="flex items-center justify-between">
              <span class="text-namek-green text-sm">🌍 Planet</span>
              <span class="text-xs text-gray-400">Explore →</span>
            </div>
          </div>
        </div>
      </a>
    `;
  },

  // Create transformation card HTML
  createTransformationCard: function(transformation) {
    return `
      <a href="/transformations/${transformation.id}" class="group">
        <div class="bg-gray-800 rounded-lg overflow-hidden shadow-lg border border-gray-700 hover:border-saiyan-yellow transition-all duration-300 transform hover:scale-105">
          <div class="aspect-w-3 aspect-h-4 bg-gray-700">
            <img src="${transformation.image}" alt="${transformation.name}" class="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300" loading="lazy" />
          </div>
          <div class="p-4">
            <h3 class="text-xl font-manga text-saiyan-yellow mb-2 group-hover:text-dragon-orange transition-colors">${transformation.name}</h3>
            <p class="text-gray-300 text-sm mb-3 line-clamp-3">${transformation.description || 'A powerful transformation from the Dragon Ball universe.'}</p>
            <div class="flex items-center justify-between">
              <span class="text-saiyan-yellow text-sm">⚡ Transformation</span>
              <span class="text-xs text-gray-400">View Details →</span>
            </div>
          </div>
        </div>
      </a>
    `;
  },

  // Setup event handlers
  setupHandlers: function(type) {
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a[href*="page="]');
      if (!link) return;

      e.preventDefault();
      const url = new URL(link.href);
      const page = parseInt(url.searchParams.get('page') || '1');
      const name = url.searchParams.get('name') || '';

      if (type === 'characters') {
        this.loadCharacters(page, name);
      } else if (type === 'planets') {
        this.loadPlanets(page, name);
      } else if (type === 'transformations') {
        this.loadTransformations(page, name);
      }
    });
  },

  // Update URL without reload
  updateUrl: function(page, filters) {
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
  },

  // Show loading state
  showLoading: function(type) {
    const grid = document.querySelector(`.${type}-grid`);
    if (grid) {
      grid.innerHTML = `<div class="col-span-full text-center py-16"><div class="animate-spin text-6xl">${type === 'characters' ? '⚡' : type === 'planets' ? '🌍' : '⚡'}</div><p class="text-gray-300 mt-4">Loading ${type}...</p></div>`;
    }
  },

  // Show error state
  showError: function(type) {
    const grid = document.querySelector(`.${type}-grid`);
    if (grid) {
      grid.innerHTML = `<div class="col-span-full text-center py-16"><div class="text-6xl mb-4">😵</div><h3 class="text-2xl font-manga text-red-400 mb-2">Error Loading ${type}</h3><p class="text-gray-300">Please try again later</p></div>`;
    }
  }
};
