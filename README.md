# @src Directory Structure

This directory contains the reorganized source code for the Exercise 2025 Open Recruitment project, following Next.js best practices.

## Structure

```
@src/
├── app/                 # Next.js App Router pages and layouts
├── components/          # React components and UI elements
├── utils/              # Utility functions and helpers
├── hooks/              # Custom React hooks
├── lib/                # Library functions and configurations
├── types/              # TypeScript type definitions
├── middleware.ts       # Next.js middleware
├── components.json     # shadcn/ui components configuration
├── eslint.config.mjs   # ESLint configuration
├── postcss.config.mjs  # PostCSS configuration
├── tailwind.config.ts  # Tailwind CSS configuration
├── tsconfig.json       # TypeScript configuration
├── next.config.js      # Next.js configuration
├── next.config.ts      # Next.js TypeScript configuration
├── next-env.d.ts      # Next.js environment types
└── index.ts           # Main exports from @src
```

## Import Paths

After reorganization, update your import statements to use the new `@src` path:

### Before (old structure)
```typescript
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'
import { cn } from '@/lib/utils'
import { Dashboard } from '@/app/dashboard/page'
```

### After (new structure)
```typescript
import { Button } from '@/src/components/ui/button'
import { useToast } from '@/src/hooks/use-toast'
import { cn } from '@/src/lib/utils'
import { Dashboard } from '@/src/app/dashboard/page'
```

## Configuration Files

The following configuration files have been moved to `@src/`:

- **TypeScript**: `tsconfig.json`
- **Next.js**: `next.config.js`, `next.config.ts`
- **Tailwind**: `tailwind.config.ts`
- **ESLint**: `eslint.config.mjs`
- **PostCSS**: `postcss.config.mjs`
- **shadcn/ui**: `components.json`

## Next Steps

1. **Update tsconfig.json paths** (if needed)
2. **Update import statements** throughout your codebase
3. **Test the build** to ensure everything works correctly
4. **Update CI/CD pipelines** if they reference old file paths
5. **Update Next.js app router configuration** if needed

## Scripts

Two reorganization scripts are available:

### Bash Script (Unix/macOS/Git Bash)
```bash
bash scripts/move-to-src.sh
```

### PowerShell Script (Windows)
```powershell
# Run the reorganization
.\scripts\move-to-src.ps1

# Preview changes without making them
.\scripts\move-to-src.ps1 -WhatIf
```

## Benefits of This Structure

- **Better organization**: Related code is grouped together
- **Clearer imports**: `@src/` prefix makes it obvious where code comes from
- **Easier maintenance**: Configuration files are centralized
- **Better scalability**: Easier to add new features and maintain code
- **Follows conventions**: Aligns with Next.js and React best practices
- **App Router support**: App directory is properly organized within @src

## Troubleshooting

If you encounter issues after reorganization:

1. **Check import paths**: Ensure all imports use `@src/`
2. **Verify configuration**: Check that config files are properly referenced
3. **Clear cache**: Run `npm run build` to ensure clean compilation
4. **Check TypeScript**: Ensure `tsconfig.json` paths are correct
5. **App Router**: Verify that Next.js can still find the app directory

## Rollback

If you need to revert the changes:

1. Move all folders and files back to the root
2. Update import statements to use old paths
3. Update configuration files to reference old locations

---

**Note**: This reorganization improves code organization but requires updating import statements throughout the codebase. Plan accordingly and test thoroughly after making changes.

