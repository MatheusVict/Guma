# About Page Setup Instructions

## Audio Files
To enable the ambient sound on the About page, add the following audio files to the `public` directory:

- `ambient-sound.mp3` - Main ambient sound file (MP3 format)
- `ambient-sound.ogg` - Fallback ambient sound file (OGG format for better browser compatibility)

### Recommended Audio Characteristics:
- **Volume**: Soft, ambient background music or nature sounds
- **Duration**: 2-5 minutes (will loop automatically)
- **File Size**: Keep under 2MB for faster loading
- **Type**: Instrumental, ambient, or nature sounds (avoid vocals or distracting elements)

### Audio Suggestions:
- Soft piano melodies
- Ambient electronic sounds
- Nature sounds (rain, forest, ocean waves)
- Minimalist instrumental music

## Team Member Photos
To add actual photos of the team members, replace the placeholder avatars by:

1. Add photos to `src/assets/img/team/` directory
2. Update the `teamMembers` array in `AboutView.vue`:
   ```javascript
   {
     id: 1,
     name: 'Matheus',
     description: '...',
     image: '/src/assets/img/team/matheus.jpg', // Update this path
     delay: '0s'
   }
   ```

### Photo Recommendations:
- **Size**: 300x300px minimum (square format works best)
- **Format**: JPG or PNG
- **Style**: Professional headshots or casual team photos
- **Background**: Clean, consistent backgrounds work best

## Customization
You can customize the team descriptions in the `teamMembers` array in `AboutView.vue`. The current descriptions are fun and personality-focused, but you can adjust them to be more professional or technical as needed.

## Navigation
The About page is accessible via:
- URL: `/about`
- Hamburger menu: "About Opaleiros" option
- The menu automatically shows different options based on the current page

## Animations
The page includes several animations:
- Floating background elements
- Staggered team member card animations
- Hover effects on cards and stats
- Glowing text effects
- Shimmer effects on avatars

All animations respect user preferences and will be disabled if the user has `prefers-reduced-motion` set.