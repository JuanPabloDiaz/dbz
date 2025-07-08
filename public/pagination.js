// Simple pagination handler for static Dragon Ball site
window.DragonBallPagination = {
  // Characters pagination
  initCharacters: function () {
    const url = new URL(window.location.href);
    const page = parseInt(url.searchParams.get('page') || '1');
    const name = url.searchParams.get('name') || '';

    if (page > 1 || name) {
      this.loadCharacters(page, name);
    }
    this.setupHandlers('characters');
  },

  // Planets pagination
  initPlanets: function () {
    const url = new URL(window.location.href);
    const page = parseInt(url.searchParams.get('page') || '1');
    const name = url.searchParams.get('name') || '';

    if (page > 1 || name) {
      this.loadPlanets(page, name);
    }
    this.setupHandlers('planets');
  },

  // Transformations pagination
  initTransformations: function () {
    const url = new URL(window.location.href);
    const page = parseInt(url.searchParams.get('page') || '1');
    const name = url.searchParams.get('name') || '';

    if (page > 1 || name) {
      this.loadTransformations(page, name);
    }
    this.setupHandlers('transformations');
  },

  // Load characters data
  loadCharacters: async function (page, name) {
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
  loadPlanets: async function (page, name) {
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
  loadTransformations: async function (page, name) {
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
  updateCharacters: function (data, page) {
    const grid = document.querySelector('.characters-grid');
    const resultsInfo = document.querySelector('.results-info');
    const pageInfo = document.querySelector('.page-info');

    if (resultsInfo)
      resultsInfo.textContent = `Showing ${data.meta.itemCount} of ${data.meta.totalItems} characters`;
    if (pageInfo) pageInfo.textContent = `Page ${page} of ${data.meta.totalPages}`;

    if (grid && data.items && data.items.length > 0) {
      grid.innerHTML = data.items.map((char) => this.createCharacterCard(char)).join('');
    }
  },

  // Update planets content
  updatePlanets: function (data, page) {
    const grid = document.querySelector('.planets-grid');
    const resultsInfo = document.querySelector('.results-info');
    const pageInfo = document.querySelector('.page-info');

    if (resultsInfo)
      resultsInfo.textContent = `Showing ${data.meta.itemCount} of ${data.meta.totalItems} planets`;
    if (pageInfo) pageInfo.textContent = `Page ${page} of ${data.meta.totalPages}`;

    if (grid && data.items && data.items.length > 0) {
      grid.innerHTML = data.items.map((planet) => this.createPlanetCard(planet)).join('');
    }
  },

  // Update transformations content
  updateTransformations: function (data, page) {
    const grid = document.querySelector('.transformations-grid');
    const resultsInfo = document.querySelector('.results-info');
    const pageInfo = document.querySelector('.page-info');

    if (resultsInfo)
      resultsInfo.textContent = `Showing ${data.meta.itemCount} of ${data.meta.totalItems} transformations`;
    if (pageInfo) pageInfo.textContent = `Page ${page} of ${data.meta.totalPages}`;

    if (grid && data.items && data.items.length > 0) {
      grid.innerHTML = data.items
        .map((transformation) => this.createTransformationCard(transformation))
        .join('');
    }
  },

  // Create character card HTML
  createCharacterCard: function (character) {
    return `
      <div class="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-dragon-gold/20">
        <div class="relative">
          <img src="${character.image}" alt="${character.name}" class="w-full h-64 object-contain bg-gray-900" loading="lazy" />
          <div class="absolute top-2 right-2 bg-dragon-orange px-2 py-1 rounded-full text-xs font-bold text-gray-900">
            ${character.race || 'Unknown'}
          </div>
          ${character.gender ? `<div class="absolute top-2 left-2 bg-dragon-blue px-2 py-1 rounded-full text-xs font-bold">
            ${character.gender}
          </div>` : ''}
        </div>
        <div class="p-4">
          <h3 class="text-xl font-manga text-dragon-gold mb-2">${character.name}</h3>
          <div class="grid grid-cols-2 gap-2 text-sm mb-3">
            <div class="bg-gray-700 p-2 rounded">
              <span class="text-dragon-orange-light font-semibold">Ki:</span>
              <span class="text-white ml-1">${character.ki || 'Unknown'}</span>
            </div>
            <div class="bg-gray-700 p-2 rounded">
              <span class="text-dragon-orange-light font-semibold">Max Ki:</span>
              <span class="text-white ml-1">${character.maxKi || 'Unknown'}</span>
            </div>
          </div>
          ${character.affiliation ? `<div class="mb-3">
            <span class="inline-block bg-dragon-blue px-2 py-1 rounded-full text-xs font-semibold">
              ${character.affiliation}
            </span>
          </div>` : ''}
          ${character.originPlanet ? `<div class="mb-3">
            <span class="text-namek-green font-semibold text-sm">Origin:</span>
            <span class="text-white ml-1 text-sm">${character.originPlanet.name}</span>
          </div>` : ''}
          ${character.transformations && character.transformations.length > 0 ? `<div class="mb-3">
            <span class="text-saiyan-yellow font-semibold text-sm">Transformations:</span>
            <span class="text-white ml-1 text-sm">${character.transformations.length}</span>
          </div>` : ''}
          <div class="flex justify-between items-center mt-4">
            <a href="/characters/${character.id}" class="bg-dragon-gradient text-white px-4 py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 text-sm">
              View Details
            </a>
            <div class="flex space-x-1">
              ${Array.from({ length: 5 }).map((_, i) => {
                const kiValue = character.ki ? parseInt(character.ki.replace(/\D/g, '')) / 1000000000 : 0;
                const filled = i < Math.min(kiValue, 5);
                return `<span class="${filled ? 'text-yellow-400' : 'text-gray-400'} text-lg">⭐</span>`;
              }).join('')}
            </div>
          </div>
        </div>
      </div>
    `;
  },

  // Create planet card HTML
  createPlanetCard: function (planet) {
    return `
      <div class="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-namek-green/20">
        <div class="relative">
          <img src="${planet.image}" alt="${planet.name}" class="w-full h-64 object-cover" loading="lazy" />
          <div class="absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-bold ${planet.isDestroyed ? 'bg-dragon-red' : 'bg-namek-green'}">
            ${planet.isDestroyed ? 'Destroyed' : 'Active'}
          </div>
        </div>
        <div class="p-4">
          <h3 class="text-xl font-manga text-namek-green-light mb-2">${planet.name}</h3>
          ${planet.description ? `<p class="text-gray-300 text-sm mb-3 line-clamp-3">${planet.description}</p>` : ''}
          ${planet.characters && planet.characters.length > 0 ? `<div class="mb-3">
            <span class="text-dragon-gold font-semibold text-sm">Characters:</span>
            <span class="text-white ml-1 text-sm">${planet.characters.length}</span>
          </div>` : ''}
          <div class="flex justify-between items-center mt-4">
            <a href="/planets/${planet.id}" class="bg-gradient-to-r from-namek-green to-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 text-sm">
              Explore Planet
            </a>
            <div class="flex items-center space-x-1">
              <span class="text-lg">🌍</span>
              <span class="text-sm text-gray-400">
                ${planet.isDestroyed ? 'Lost' : 'Thriving'}
              </span>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  // Create transformation card HTML
  createTransformationCard: function (transformation) {
    return `
      <div class="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-saiyan-yellow/20">
        <div class="relative">
          <img src="${transformation.image}" alt="${transformation.name}" class="w-full h-64 object-contain bg-gray-900" loading="lazy" />
          <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div class="absolute bottom-2 left-2 right-2">
            <h3 class="text-lg font-manga text-saiyan-yellow">${transformation.name}</h3>
          </div>
        </div>
        <div class="p-4">
          <div class="bg-gray-700 p-2 rounded mb-3">
            <span class="text-saiyan-yellow font-semibold">Ki Level:</span>
            <span class="text-white ml-1">${transformation.ki}</span>
          </div>
          <div class="flex justify-between items-center">
            <a href="/transformations/${transformation.id}" class="bg-saiyan-gradient text-gray-900 px-4 py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 text-sm">
              View Form
            </a>
            <div class="flex space-x-1">
              ${Array.from({ length: 3 }).map(() => `<span class="text-lg text-saiyan-yellow animate-energy-pulse">⚡</span>`).join('')}
            </div>
          </div>
        </div>
      </div>
    `;
  },

  // Setup event handlers
  setupHandlers: function (type) {
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
  updateUrl: function (page, filters) {
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
  showLoading: function (type) {
    const grid = document.querySelector(`.${type}-grid`);
    if (grid) {
      grid.innerHTML = `<div class="col-span-full text-center py-16"><div class="animate-spin text-6xl">${type === 'characters' ? '⚡' : type === 'planets' ? '🌍' : '⚡'}</div><p class="text-gray-300 mt-4">Loading ${type}...</p></div>`;
    }
  },

  // Show error state
  showError: function (type) {
    const grid = document.querySelector(`.${type}-grid`);
    if (grid) {
      grid.innerHTML = `<div class="col-span-full text-center py-16"><div class="text-6xl mb-4">😵</div><h3 class="text-2xl font-manga text-red-400 mb-2">Error Loading ${type}</h3><p class="text-gray-300">Please try again later</p></div>`;
    }
  },
};
