# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Ka-table is a customizable, extendable, lightweight React table component library. It's built with TypeScript and provides comprehensive data grid functionality including sorting, filtering, editing, grouping, pagination, and more.

## Common Commands

### Development Commands
- `npm start` - Start development server
- `npm run build` - Build production bundle
- `npm test` - Run tests in watch mode
- `npm run test:all` - Run all tests with watch mode
- `npm run test:coverage` - Run tests with coverage report
- `npm run lint` - Lint TypeScript files
- `npm run lint:fix` - Lint and fix TypeScript files

### Distribution Commands
- `npm run dist` - Build distribution files using TypeScript and Gulp
- `npm run pack` - Build and create npm package
- `npm run compile` - Compile TypeScript for distribution

### Test Execution
Tests use Jest with React Testing Library. Coverage is collected from `src/lib/Components/**/*.{ts,tsx}` and `src/lib/Utils/*.ts`.

## Architecture

### Core Structure
- **`src/lib/`** - Main library code (published as npm package)
  - **`Components/`** - React components organized by feature
  - **`Utils/`** - Utility functions for data manipulation, filtering, sorting, etc.
  - **`Models/`** - TypeScript interfaces and types
  - **`Reducers/`** - State management using reducer pattern
  - **`hooks/`** - Custom React hooks
  - **`Icons/`** - SVG icon components
  - **`index.ts`** - Main library exports

- **`src/Demos/`** - Demo applications showcasing features
- **`src/App.tsx`** - Demo application wrapper

### Key Components
- **Table** (`src/lib/Components/Table/Table.tsx`) - Main table component with controlled/uncontrolled modes
- **TableControlled/TableUncontrolled** - Different table state management approaches
- **Cell components** - Various cell types (CellComponent, CellEditor variants, CellText)
- **Row components** - DataRow, DetailsRow, FilterRow, GroupRow, HeadRow, etc.
- **Specialized components** - Paging, Loading, Sorting, Filtering components

### State Management
Uses reducer pattern with `kaReducer` for complex state management. Supports both controlled and uncontrolled modes:
- Controlled: Parent manages all state
- Uncontrolled: Internal state management with optional external control

### Data Flow
1. Data flows through utility functions in `src/lib/Utils/`
2. Components use standardized props interfaces
3. Actions dispatched through reducer pattern
4. Custom hooks provide reusable logic

### Testing Strategy
- Each component has corresponding `.test.tsx` file
- Utilities have `.test.ts` files
- Snapshot testing used extensively (see `__snapshots__/` directories)
- Coverage focused on library components and utilities

### Build Process
- Uses React Scripts for development
- TypeScript compilation for distribution (`tsc`)
- Gulp for additional build tasks (`gulpfile.js`)
- SCSS compilation for styling
- Distribution outputs to `dist/` directory

### Key Files
- `src/lib/index.ts` - Main library entry point
- `src/lib/enums.ts` - Enums for DataType, EditingMode, SortingMode, etc.
- `src/lib/types.ts` - Core TypeScript types
- `src/lib/props.ts` - Component prop interfaces
- `src/lib/style.scss` - Main stylesheet
- `src/lib/_default_theme.scss` - Default theme variables

### Development Patterns
- Components follow consistent naming: `ComponentName/ComponentName.tsx`
- Props interfaces prefixed with `I` (e.g., `ITableProps`)
- Extensive use of TypeScript generics for type safety
- Modular component architecture with clear separation of concerns
- Utils functions are pure and well-tested