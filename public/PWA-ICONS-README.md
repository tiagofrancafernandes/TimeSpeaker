# PWA Icons

This directory should contain the following PWA icons for the TimeSpeaker application:

## Required Icons

### Standard Icons (any purpose)
- **icon-192x192.png** - 192x192 pixels
- **icon-512x512.png** - 512x512 pixels

### Maskable Icons (for adaptive icons on Android)
- **icon-maskable-192x192.png** - 192x192 pixels
- **icon-maskable-512x512.png** - 512x512 pixels

## Icon Guidelines

### Standard Icons
- Should include padding around the main icon
- Safe zone: Keep important content within 80% of the canvas
- File format: PNG with transparency
- Background: Can be transparent

### Maskable Icons
- Must fill the entire canvas
- No transparency in the background
- Safe zone: Keep important content within 80% of the canvas (circular area)
- The OS may mask/crop the icon in various shapes (circle, rounded square, etc.)

## How to Generate Icons

### Option 1: Using Online Tools
1. Go to https://realfavicongenerator.net/ or https://www.pwabuilder.com/imageGenerator
2. Upload your logo/icon
3. Generate and download PWA icons
4. Place the generated files in this directory

### Option 2: Using Image Editing Software
1. Create a 512x512 pixel canvas
2. For standard icons:
   - Add transparent background
   - Place your logo with padding
3. For maskable icons:
   - Add solid background color (matching theme)
   - Place logo in the center safe zone
4. Export as PNG
5. Resize to create 192x192 versions

### Option 3: Using CLI Tools
```bash
# Install sharp-cli
npm install -g sharp-cli

# Resize images
sharp -i your-logo-512.png -o icon-512x512.png resize 512 512
sharp -i your-logo-512.png -o icon-192x192.png resize 192 192
sharp -i your-logo-maskable-512.png -o icon-maskable-512x512.png resize 512 512
sharp -i your-logo-maskable-512.png -o icon-maskable-192x192.png resize 192 192
```

## Design Recommendations

### Colors
- Use the app's theme color: `#6366f1` (Indigo)
- Or match your brand colors

### Content
- Include the TimeSpeaker logo or a clock icon
- Keep it simple and recognizable at small sizes
- Consider using a microphone + clock combination

### Testing
After adding icons, test on:
- Android (Chrome, Samsung Browser)
- iOS (Safari)
- Desktop (Chrome, Edge, Firefox)

## Current Status

⚠️ **Placeholder icons needed!**

The PWA configuration is complete but requires actual icon files.
Please add the 4 icon files listed above to enable full PWA functionality.

## More Information

- [Web.dev PWA Icons Guide](https://web.dev/maskable-icon/)
- [Maskable.app Editor](https://maskable.app/editor)
- [PWA Builder Docs](https://docs.pwabuilder.com/)
