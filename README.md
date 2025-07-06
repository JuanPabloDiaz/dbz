# 🐉 Dragon Ball

A modern, responsive web application built with Astro that explores the Dragon Ball universe using the Dragon Ball API. Discover legendary warriors, mystical planets, and epic transformations with a beautifully designed interface that captures the spirit of the series.

## ✨ Features

- **Character Explorer**: Browse and search through legendary Dragon Ball characters
- **Planet Discovery**: Explore the mystical worlds across the galaxy
- **Transformation Gallery**: Witness epic power-ups and legendary forms
- **Responsive Design**: Optimized for all devices with a Dragon Ball-themed UI
- **Fast Performance**: Built with Astro for lightning-fast loading
- **Type Safety**: Full TypeScript integration
- **Modern Styling**: Beautiful UI with Tailwind CSS and custom animations

## 🚀 Tech Stack

- **[Astro](https://astro.build/)** - Modern static site generator
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Vitest](https://vitest.dev/)** - Fast unit testing framework
- **[Prettier](https://prettier.io/)** - Code formatting
- **[Dragon Ball API](https://dragonball-api.com/)** - Data source

## 🎨 Design Features

- **Dragon Ball Themed Colors**: Custom color palette inspired by the series
- **Animated Elements**: Floating Dragon Balls, energy pulses, and smooth transitions
- **Custom Fonts**: Orbitron for sci-fi feel, Bangers for manga-style headers
- **Responsive Grid Layouts**: Beautiful card-based interfaces
- **Interactive Navigation**: Smooth page transitions and hover effects

## 📦 Installation

1. Clone the repository:

```bash
git clone <your-repo-url>
cd dragon-ball-astro-site
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and visit `http://localhost:4321`

## 🛠️ Development Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run test` - Run tests
- `npm run test:ui` - Run tests with UI
- `npm run coverage` - Generate test coverage report

## 📡 API Integration

The site fetches data from the [Dragon Ball API](https://dragonball-api.com/) with the following endpoints:

### Characters

- `GET /api/characters` - Get all characters (paginated)
- `GET /api/characters/{id}` - Get character details with planet and transformations

### Planets

- `GET /api/planets` - Get all planets (paginated)
- `GET /api/planets/{id}` - Get planet details with characters

### Transformations

- `GET /api/transformations` - Get all transformations (paginated)
- `GET /api/transformations/{id}` - Get transformation details

## 🎯 Features Overview

### Character Pages

- Comprehensive character profiles with stats
- Origin planet information
- Transformation galleries
- Power level visualizations
- Filtering by race, gender, and affiliation

### Planet Pages

- Detailed planet information
- Inhabitant listings
- Environmental descriptions
- Status indicators (active/destroyed)

### Transformation Pages

- Power level analysis
- Transformation requirements
- Combat statistics
- Rarity classifications

## 🌟 Custom Animations

- **Energy Pulse**: Glowing effects for power indicators
- **Float Animation**: Floating Dragon Ball elements
- **Hover Effects**: Interactive card transformations
- **Gradient Backgrounds**: Dynamic color transitions

## 📱 Responsive Design

The site is fully responsive with breakpoints for:

- Mobile (320px+)
- Tablet (768px+)
- Desktop (1024px+)
- Large screens (1280px+)

## 🧪 Testing

The project includes unit tests for:

- API integration
- Component functionality
- Utility functions
- Type safety

Run tests with:

```bash
npm run test
```

## 🎨 Color Palette

- **Dragon Orange**: `#FF8C00` - Primary brand color
- **Dragon Gold**: `#FFD700` - Accent and highlights
- **Dragon Blue**: `#1E3A8A` - Secondary elements
- **Dragon Red**: `#DC2626` - Alerts and danger states
- **Saiyan Yellow**: `#FEF08A` - Transformation themes
- **Namek Green**: `#16A34A` - Planet themes

## 🔮 Future Enhancements

- Character comparison tool
- Power level calculator
- Battle simulator
- Favorites system
- Advanced search filters
- Character relationship maps
- Timeline explorer

## 📄 License

This project is for educational purposes. Dragon Ball is owned by Akira Toriyama and Toei Animation.

## 🙏 Acknowledgments

- [Dragon Ball API](https://dragonball-api.com/) for providing the data
- Akira Toriyama for creating the Dragon Ball universe
- The Astro team for the amazing framework
- The open-source community for the tools used

---

_"Power comes in response to a need, not a desire."_ - Goku
