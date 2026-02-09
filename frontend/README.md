# GrowExam Frontend

Angular 17 frontend for GrowExam online learning platform.

## Features

- Standalone components with lazy loading
- Signal-based state management
- Tailwind CSS styling
- JWT authentication with route guards
- Responsive mobile-first design

## Setup

1. Install dependencies:
```bash
npm install
```

2. Update environment:
Edit `src/environments/environment.ts` with your backend API URL

3. Start development server:
```bash
npm start
```

Application will run on `http://localhost:4200`

## Build for Production

```bash
npm run build
```

Output will be in `dist/` directory.

## Deployment (Vercel)

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

3. Set environment variables in Vercel dashboard:
   - Update `environment.prod.ts` with production API URL

## Project Structure

```
src/
├── app/
│   ├── components/       # Reusable components
│   ├── pages/           # Page components
│   ├── services/        # API services
│   ├── guards/          # Route guards
│   ├── models/          # TypeScript interfaces
│   └── app.routes.ts    # Route configuration
├── environments/        # Environment configs
└── styles.css          # Global styles
```

## Features Implemented

### Public Pages
- Landing page with hero section
- Course catalog with search and filters
- Course detail page

### Authentication
- Login and signup
- JWT token management
- Protected routes

### Student Features
- Dashboard with enrolled courses
- Progress tracking
- Quiz taking with timer
- Results history

### Admin Features
- Dashboard with analytics
- Course CRUD operations
- Student activity monitoring

## Default Test Accounts

After backend seeding:
- Admin: `admin@growexam.com` / `admin123`
- Student: `student@test.com` / `student123`
