# Scalable Architecture Guide

## Overview
This project has been refactored for better scalability. Here's how to add new pages efficiently.

## Architecture Changes

### 1. **ThemeContext** (`src/contexts/ThemeContext.tsx`)
- Centralized theme state management using React Context
- Eliminates prop drilling for dark mode
- Use: `const { isDarkMode, toggleDarkMode } = useTheme();`

### 2. **useTranslation Hook** (`src/hooks/useTranslation.ts`)
- Custom hook for language management
- Handles localStorage persistence
- Returns: `{ lang, t, changeLang }`
- Pages can now use this hook instead of receiving `t` as a prop

### 3. **Page Configuration** (`src/config/pageConfig.tsx`)
- Single source of truth for all pages
- Navigation and routes defined in one place
- Easily add/remove pages without touching App.tsx

## Adding a New Page

### Step 1: Create the Page Component
```typescript
// src/pages/MyNewPage.tsx
import type { MyNewPageTranslations } from "../translations";

type MyNewPageProps = {
  t: MyNewPageTranslations;
};

export default function MyNewPage({ t }: MyNewPageProps) {
  return (
    <div>
      <h2>{t.title}</h2>
      {/* Your content */}
    </div>
  );
}
```

### Step 2: Add Translations
```typescript
// In src/translations.ts

export type Translations = {
  nav: {
    home: string;
    // ... other nav items
    myNewPage: string;
  },
  // ... other properties
  myNewPage: {
    title: string;
    // ... other properties
  };
};

export const translations: Record<Language, Translations> = {
  is: {
    nav: {
      // ... other nav items
      myNewPage: "Mín Ný Síða",
    },
    // ... other translations
    myNewPage: {
      title: "Titill",
      // ... other translations
    },
  },
  en: {
    nav: {
      // ... other nav items
      myNewPage: "My New Page",
    },
    // ... other translations
    myNewPage: {
      title: "Title",
      // ... other translations
    },
  },
};
```

### Step 3: Register in Page Config
```typescript
// In src/config/pageConfig.tsx
import MyNewPage from "../pages/MyNewPage";

export function createPages(t: Translations): PageConfig[] {
  return [
    // ... existing pages
    {
      id: "myNewPage",
      path: "/my-new-page",
      label: "myNewPage",
      component: <MyNewPage t={t.myNewPage} />,
    },
  ];
}
```

**That's it!** The navigation link and route are automatically generated.

## Benefits of This Architecture

✅ **Single Page Addition**: Update `pageConfig.tsx` once instead of 3+ places  
✅ **Centralized Navigation**: All pages registered in one config file  
✅ **No Prop Drilling**: Use `useTheme()` hook anywhere  
✅ **Consistent Patterns**: All pages follow the same structure  
✅ **Easy Maintenance**: Adding/removing pages is straightforward  
✅ **Type-Safe**: Full TypeScript support with proper types  

## File Structure
```
src/
├── contexts/
│   └── ThemeContext.tsx       # Theme state management
├── hooks/
│   └── useTranslation.ts      # Translation hook
├── config/
│   └── pageConfig.tsx         # Page configuration
├── pages/
│   ├── Home.tsx
│   ├── Knowledge.tsx
│   ├── Experience.tsx
│   ├── References.tsx
│   └── MyNewPage.tsx          # Add new pages here
├── App.tsx                    # Simplified with hooks
└── main.tsx                   # ThemeProvider wrapper
```

## Migration Notes
- Old pages still work but have been simplified
- References component no longer needs `language` prop
- All state management is centralized
- Build continues to work as before
