# TimeZyme Story Presentation - Image Requirements

This document lists all the image placeholders in the TimeZyme story presentation that need to be replaced with actual images.

## Image Placeholders by Scene

### Scene 1: The Problem

**Complete Prompt:**
Cinematic still in the style of Blade Runner 2049 with cyberpunk aesthetic. A weary researcher in business casual attire sits at a modern desk, head in hands, overwhelmed by hundreds of swirling holographic documents and PDFs floating in 3D space around them. The wide-angle shot from a high-angle perspective looks down at 30 degrees, positioning the researcher in the lower third using rule of thirds composition. The setting is a dark, vast digital void with subtle grid lines on the floor, where papers float at various depths creating a tunnel effect of information overload. Dramatic chiaroscuro lighting emanates from a single laptop screen, illuminating the researcher's face from below with cool blue tones suggesting late-night work. Volumetric fog adds atmospheric depth while rim lighting on document edges creates separation in the chaos. Heavy shadows emphasize the isolation and frustration. The hyperrealistic 8K rendering features desaturated colors with cyan accent highlights on key documents, subtle film grain texture, and depth of field blur on distant papers to draw focus to the human element lost in digital overwhelm.

### Scene 3: Instant Clarity

**Complete Prompt:**
Cinematic UI showcase in the style of Minority Report's holographic interfaces. A sleek, floating Zyme interface card displays perfectly organized document data with glowing sections for authors, summary, and keywords. An animated circular progress meter smoothly fills to 75%, while subtle particle effects dance around interactive elements. The medium shot captures the interface from a straight-on frontal view, with the card filling 70% of the frame in a centered composition. The clean, minimalist digital environment features a gradient background transitioning from deep black to midnight blue, with gentle floating data particles suggesting organized information flow rather than chaos. Soft ambient lighting emanates from the interface itself, creating a gentle glow effect around the card edges. Cyan accent lights highlight key interface elements, while clinical lighting reinforces the sense of clarity and order. The ultra-modern design incorporates glass morphism effects with frosted glass appearance, rendered in pristine 8K resolution with perfectly sharp interface elements. The TimeZyme cyan color scheme provides brand consistency, while shallow depth of field with soft background blur and slight parallax effects create convincing 3D depth in this calm, professional atmosphere.

### Scene 4: Progressive Disclosure

**Complete Prompt:**
Cinematic transition shot with UI/UX showcase aesthetics and motion graphics polish. The wide shot captures a dynamic split-screen transformation where the left side displays a compact L0 Zyme summary card while the right reveals an expanded L1 detailed view. A 15-degree Dutch angle creates visual energy as the transition unfolds. Motion blur streaks between the two states suggest smooth, fluid transformation, with cyan light trails and energy particles flowing from left to right, visualizing the data expansion. The same clean digital environment from the previous scene provides continuity, but now features subtle motion trails and floating UI elements caught mid-transition. Dynamic lighting shifts across the frame, with brighter illumination on the expanded view drawing the eye to the newly revealed information. Depth layers showcase the UI hierarchy, with elements separating and reorganizing during the transition. The time-lapse effect captures the transformation moment perfectly, rendered in crisp 8K resolution where UI elements remain sharp while transition effects show artistic motion blur. This professional tech environment demonstrates the seamless user experience of diving deeper into TimeZyme's layered information architecture.

### Scene 5: The Knowledge Hop

**Complete Prompt:**
Cinematic action shot with dynamic UI animation and Tron-like light effects. A glowing cursor hovers over the highlighted keyword "NP-Completeness" which pulses with cyan light, ready to trigger the knowledge hop. The tracking shot follows the cursor movement from an over-the-shoulder perspective, creating a user POV experience. As the keyword is clicked, a second Zyme card slides in from the right with smooth, confident motion while a luminous connection line forms between the cards, visualizing the conceptual link. The dynamic digital workspace shows two Zyme cards positioned at complementary angles suggesting movement and connection. A particle trail follows the cursor path, leaving a wake of light that reinforces the interaction. Motion streaks accompany the card movement, with the camera performing a slight zoom during the transition to maintain perfect framing of both cards. The darker background creates contrast that makes the spotlight effect on active elements pop dramatically. The energetic tech environment pulses with life as data flows between the connected concepts. Sharp focus on interaction points guides the eye while motion blur on the sliding elements conveys speed and fluidity. This 8K rendering captures the magic moment of discovery when clicking a keyword instantly reveals related knowledge, demonstrating TimeZyme's revolutionary approach to information navigation.

### Scene 6: The Knowledge Graph

**Complete Prompt:**
Cinematic establishing shot in the style of Marvel's Jarvis interface with epic sci-fi grandeur. A vast network of interconnected Zyme cards floats majestically in an expansive digital cosmos, forming a constellation-like arrangement of knowledge. The central hero card glows larger and brighter than the surrounding nodes, which float at various distances creating true three-dimensional depth. Glowing connection lines pulse rhythmically with data flow between the cards, creating a living, breathing neural network visualization. The epic wide shot employs a slight low angle to convey the grandeur and scale of this knowledge universe, with a subtle pull-back camera movement revealing the true extent of the network. The setting is an infinite black space punctuated by a subtle star field, suggesting limitless possibilities and connections yet to be discovered. Each card self-illuminates with node-based lighting, while the connection lines glow with traveling data pulses that create organic movement throughout the network. Volumetric light rays emanate from the central node like a digital sunrise, while rim lighting on all cards ensures perfect separation and readability. The hero card is positioned using the golden ratio for optimal visual balance, with depth layers creating convincing parallax as cards recede into the distance. This 8K rendering with deep depth of field transforms abstract data relationships into an awe-inspiring visual metaphor for the interconnected nature of knowledge within the TimeZyme ecosystem.

### Scene 7: Join the Future

**Complete Prompt:**
Cinematic logo reveal with Apple-style minimalism and motion graphics polish. The TimeZyme logo materializes from converging light particles against a premium gradient background transitioning from deep space black to midnight blue. As the camera performs a slight push-in, the tagline "Research, Reimagined" appears below with an elegant fade-in. The centered logo, occupying a golden ratio position with ample breathing room, is self-illuminated with a soft cyan glow, creating a subtle lens flare on its reveal. Subtle animated particles orbit the logo and catch the light, suggesting data flow in a clean, professional environment. The final image, rendered in pristine 8K resolution with a slight vignette for focus, features subtle animation loops for a premium brand presentation.

## Technical Implementation Notes

✅ **Images have been implemented!** The story pages now display the actual images and videos.

### Current Implementation:
- Images are located in `/public/images/story/[scene-number]/`
- Each scene can have:
  - Static image: `story[n].jpeg`
  - Animated videos: `story[n]-animated-1.mp4`, `story[n]-animated-2.mp4`
- Videos autoplay, loop, and are muted for best user experience
- Images serve as poster frames for videos and fallbacks if videos fail to load

### File Structure:
```
/public/images/story/
├── 1/
│   ├── story1.jpeg
│   ├── story1-animated-1.mp4
│   └── story1-animated-2.mp4
├── 3/
│   ├── story3.jpeg
│   ├── story3-animated-1.mp4
│   └── story3-animated-2.mp4
├── 4/
│   ├── story4.jpeg
│   └── story4-animated-1.mp4
├── 5/
│   ├── story5.jpeg
│   ├── story5-animated-1.mp4
│   └── story5-animated-2.mp4
├── 6/
│   ├── story6.jpeg
│   ├── story6-animated-1.mp4
│   └── story6-animated-2.mp4
└── 7/
    ├── story7.jpeg
    ├── story7-animated-1.mp4
    └── story7-animated-2.mp4
```

Example:
```typescript
// In useStoryScenes.ts
content: {
  heading: 'The Research Overwhelm',
  imageSrc: '/images/story/scene-1-chaos.png', // Instead of imagePrompt
  text: '...'
}
```

```vue
<!-- In [scene].vue -->
<div v-if="scene?.content?.imageSrc" class="image-container">
  <img 
    :src="scene.content.imageSrc" 
    :alt="scene.title"
    class="w-full h-auto rounded-lg shadow-xl"
  />
</div>
```

## Recommended Image Specifications

- **Primary Dimensions:** 1280x832px (matches story viewport)
- **Aspect Ratio:** 1.54:1 (cinematic widescreen)
- **Alternative Sizes:**
  - Desktop HD: 1920x1248px
  - Mobile: 640x416px
- **Format:** WebP primary, PNG fallback
- **File Size:** 150-300KB for optimal quality/performance balance
- **Color Profile:** sRGB
- **Style Requirements:**
  - Dark theme with TimeZyme cyan (#06B6D4) accents
  - High contrast for text readability
  - Consistent lighting across all scenes
  - Professional, modern aesthetic