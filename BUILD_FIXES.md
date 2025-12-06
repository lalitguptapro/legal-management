# Build Error Fixes

## Common Build Errors and Solutions

### 1. TypeScript Strict Mode Errors

If you're getting TypeScript errors, try:

```bash
# Check TypeScript errors
npx tsc --noEmit
```

### 2. Missing Environment Variables

Make sure `.env.local` exists with:
```
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
```

### 3. Clear Build Cache

```bash
# Delete .next folder
rm -rf .next
# Or on Windows:
Remove-Item -Recurse -Force .next

# Then rebuild
npm run build
```

### 4. Dependency Issues

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### 5. Type Errors

All files now use proper TypeScript types. If you see type errors:
- Check that all imports are correct
- Ensure 'use client' is on client components
- Verify all async functions are properly typed

## Quick Fix Commands

```bash
# 1. Clear cache and rebuild
rm -rf .next
npm run build

# 2. If that doesn't work, reinstall dependencies
rm -rf node_modules package-lock.json
npm install
npm run build

# 3. Check for TypeScript errors
npx tsc --noEmit
```

