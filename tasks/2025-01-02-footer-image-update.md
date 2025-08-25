# Product Requirements Document: Footer Image and Icon Update

## Introduction/Overview

This feature involves updating the footer component to replace existing SVG images with new PNG logo images and Lucide React icons. The current footer uses SVG files for all visual elements, which need to be modernized with a new logo design (available in Notion) and standardized icon library (Lucide React). This update will improve visual consistency and reduce the number of static assets in the project.

## Goals

1. Replace the Exercise FTUI footer logo (SVG) with new PNG logo images from Notion
2. Replace all utility icons (location, email, Instagram, LinkedIn) with Lucide React icons
3. Organize assets properly with logo images in a dedicated `/public/logo/` folder
4. Remove unused SVG assets after successful replacement
5. Maintain all existing functionality including social media link clicks

## User Stories

1. **As a website visitor**, I want to see a modern, high-quality footer logo so that the brand appears professional and up-to-date.

2. **As a website visitor**, I want to see consistent, crisp icons throughout the footer so that the interface feels cohesive and well-designed.

3. **As a mobile user**, I want the footer to display properly on my device with appropriately sized images and icons that are easy to see and interact with.

4. **As a user**, I want to be able to click on social media icons to visit the Exercise FTUI social profiles, just as I could before the update.

## Functional Requirements

1. **Logo Image Replacement**

    - Download the new PNG logo images from the Notion ticket
    - Create a new folder `/public/logo/` if it doesn't exist
    - Save logo images with lowercase naming convention (e.g., `exer-footer.png`)
    - Ensure PNG images have transparent backgrounds
    - Replace the logo Image component source in both desktop and mobile views (lines 24 and 88 in `src/components/footer/page.tsx`)

2. **Icon Replacement with Lucide**

    - Install Lucide React library if not already installed (`npm install lucide-react`)
    - Import required Lucide icons: MapPin (for location), Mail (for email), Instagram, Linkedin
    - Replace all icon Image components with corresponding Lucide icon components
    - Maintain the same sizing and styling as current icons
    - Preserve click handlers for social media icons (Instagram and LinkedIn)

3. **Asset Organization**

    - Move new logo PNG files to `/public/logo/` directory
    - Keep the existing `/public/footer/aurora.png` background image unchanged
    - Update all image source paths in the footer component

4. **Code Updates Required**

    - Update `src/components/footer/page.tsx`:
        - Replace Image imports for icons with Lucide icon imports
        - Update logo Image src paths to point to `/logo/` directory
        - Replace icon Image components with Lucide icon components
        - Maintain all existing CSS classes and styling
        - Preserve onClick handlers for social media icons

5. **Asset Cleanup**
    - After successful implementation and testing, remove the following unused SVG files:
        - `/public/Exer-Footer.svg`
        - `/public/location.svg`
        - `/public/email.svg`
        - `/public/instagramWhite.svg`
        - `/public/linkedinWhite.svg`
    - Only remove files that are no longer referenced anywhere in the codebase

## Non-Goals (Out of Scope)

1. Changing the footer layout or design structure
2. Modifying the aurora.png background image
3. Adding new functionality or links to the footer
4. Changing the footer's responsive behavior
5. Updating footer text content or contact information
6. Modifying the color scheme or typography
7. Creating new image assets from scratch

## Design Considerations

1. **Logo Images**

    - PNG format with transparent background
    - Should maintain similar dimensions to current SVG (288x144 for desktop, 160x80 for mobile)
    - Images sourced from Notion ticket (developer needs access)

2. **Lucide Icons**

    - Use default Lucide icon sizing (24px for desktop, adjust for mobile as needed)
    - Maintain the current color scheme (icons should match text color)
    - Apply the same hover effects if any exist

3. **Visual Consistency**
    - Ensure smooth transition from SVG to PNG/Lucide without layout shifts
    - Maintain current spacing and alignment
    - Test on both desktop and mobile viewports

## Technical Considerations

1. **Dependencies**

    - Add `lucide-react` package to project dependencies
    - Ensure Next.js Image component properly handles PNG files

2. **Performance**

    - PNG logo files should be reasonably sized (recommended under 200KB each)
    - Lucide icons are lightweight and performant by default

3. **Implementation Steps**

    - First, add Lucide React dependency
    - Download and place logo images in correct directory
    - Update one section at a time (desktop first, then mobile)
    - Test functionality before removing old assets
    - Use git to track changes and allow rollback if needed

4. **File Structure**
    ```
    public/
    ├── logo/
    │   └── [new logo png files with lowercase names]
    └── footer/
        └── aurora.png (keep unchanged)
    ```

## Success Metrics

1. All footer images and icons display correctly on desktop and mobile devices
2. Social media links remain functional and open in new tabs
3. No console errors related to missing images or invalid imports
4. Page load time remains the same or improves
5. All unused SVG files are removed from the repository
6. Footer maintains its current responsive behavior

## Open Questions

1. Access to Notion ticket - ensure developer has access to download the logo PNG files
2. Specific logo filename preferences beyond lowercase convention
3. Any specific Lucide icon style variants preferred (outline vs. filled)?
4. Should we implement any loading states or placeholders for the PNG images?
5. Are there any other components in the codebase that reference the footer SVG files that need updating?

---

**Assigned to:** Junior Developer  
**Created:** January 2, 2025  
**Priority:** Medium  
**Estimated Effort:** 2-3 hours

# Implementation

## Tasks

-   [ ] 1.0 Set up assets and dependencies
-   [ ] 2.0 Update footer component for desktop view
-   [ ] 3.0 Update footer component for mobile view
-   [ ] 4.0 Test and verify functionality
-   [ ] 5.0 Clean up unused assets
