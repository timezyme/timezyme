---
title: Supported Formats
description: Document types and media formats that TimeZyme can transform
navigation:
  icon: i-lucide-file-text
---

## Overview

TimeZyme's transformation engine supports a wide variety of document formats, ensuring you can transform virtually any content into visual stories. Our AI adapts its processing based on the input format to extract maximum value from each document type.

## Document Formats

### Text Documents

#### PDF Files
The most common format for professional documents:

- **Native PDFs**: Best quality, full text extraction
- **Scanned PDFs**: OCR processing for text recognition
- **Interactive PDFs**: Preserves form fields and links
- **Password-Protected**: Supported with authentication

**Best Practices:**
- Use text-based PDFs over scanned images
- Ensure good scan quality for OCR accuracy
- Include metadata for better categorization
- Keep file size under 50MB for optimal processing

#### Microsoft Office

**Word Documents (.docx, .doc)**
- Full formatting preservation
- Embedded images and charts extracted
- Comments and tracked changes processed
- Styles and headers recognized for structure

**PowerPoint (.pptx, .ppt)**
- Slide-by-slide transformation
- Speaker notes included
- Animations converted to static visuals
- Master slide themes recognized

**Excel (.xlsx, .xls)**
- Data tables converted to visualizations
- Multiple sheets processed
- Formulas evaluated for results
- Charts extracted and enhanced

#### Plain Text Formats

**Text Files (.txt)**
- Universal compatibility
- Markdown syntax recognized
- Code blocks preserved
- Fast processing

**Markdown (.md)**
- Native structure support
- Code syntax highlighting
- Link preservation
- Table recognition

**Rich Text (.rtf)**
- Basic formatting maintained
- Compatible across platforms
- Image embedding supported
- Style information preserved

### Academic Formats

#### Research Documents

**LaTeX (.tex)**
- Mathematical equations rendered
- Bibliography processing
- Figure references maintained
- Academic structure preserved

**BibTeX (.bib)**
- Citation network creation
- Author relationship mapping
- Publication timeline generation
- Source linking

#### Technical Documentation

**XML/HTML**
- Structure fully preserved
- Semantic markup utilized
- Embedded media extracted
- Link relationships mapped

**JSON/YAML**
- Data structure visualization
- Nested relationships shown
- Schema understanding
- API documentation support

### Specialized Formats

#### eBooks and Publications

**EPUB (.epub)**
- Chapter navigation
- Metadata extraction
- Image optimization
- Table of contents generation

**MOBI (.mobi)**
- Kindle format support
- Bookmark preservation
- Highlight extraction
- Note integration

#### Presentation Formats

**Google Slides**
- Direct import via API
- Real-time synchronization
- Collaboration history
- Version tracking

**Keynote (.key)**
- Mac presentation support
- Animation conversion
- Theme extraction
- Media optimization

## Media Handling

### Images Within Documents

TimeZyme intelligently processes embedded images:

| Format | Support Level | Processing |
|--------|--------------|------------|
| JPEG/JPG | Full | Compression optimization |
| PNG | Full | Transparency preserved |
| GIF | Full | Animation frame extraction |
| SVG | Full | Vector scaling maintained |
| WebP | Full | Modern format optimization |
| TIFF | Partial | Converted to web format |
| BMP | Partial | Converted to optimized format |

### Charts and Diagrams

Special handling for data visualizations:

- **Excel Charts**: Converted to interactive D3.js
- **PowerPoint Diagrams**: Rebuilt as SVG
- **Scientific Plots**: Data points extracted
- **Infographics**: Elements separated and enhanced

### Embedded Media

**Videos**
- Thumbnail extraction
- Timeline marker creation
- Transcript processing (if available)
- Duration metadata

**Audio**
- Waveform visualization
- Transcript integration
- Time-stamped segments
- Speaker identification

## Data Formats

### Structured Data

**CSV Files**
- Automatic chart generation
- Column type detection
- Statistical analysis
- Relationship discovery

**Database Exports**
- Table relationship mapping
- Schema visualization
- Query result formatting
- Index optimization hints

### Code and Configuration

**Source Code**
- Syntax highlighting
- Dependency graphs
- Function relationship maps
- Documentation extraction

**Configuration Files**
- Settings visualization
- Dependency tracking
- Value comparison
- Change history

## Format-Specific Features

### PDF Optimization

TimeZyme's PDF processing includes:

1. **Text Layer Extraction**
   - Selectable text preservation
   - Font information retention
   - Layout analysis
   - Column detection

2. **Image Processing**
   - Resolution optimization
   - Compression without quality loss
   - Vector graphic preservation
   - Color space conversion

3. **Metadata Utilization**
   - Author information
   - Creation/modification dates
   - Keywords and tags
   - Document properties

### Office Document Intelligence

Advanced features for Office formats:

**Style Recognition**
- Heading hierarchy
- List structures
- Table formatting
- Custom styles

**Content Extraction**
- Embedded objects
- Smart art conversion
- Chart data retrieval
- Form field values

**Relationship Mapping**
- Cross-references
- Hyperlinks
- Bookmarks
- Table of contents

## File Size and Limitations

### Size Limits

| Document Type | Maximum Size | Recommended |
|--------------|--------------|-------------|
| PDF | 50 MB | < 20 MB |
| Office Files | 100 MB | < 50 MB |
| Text Files | 10 MB | < 5 MB |
| Images | 25 MB each | < 10 MB |
| Archives | 200 MB | < 100 MB |

### Performance Considerations

**Processing Time by Size:**
- < 1 MB: 5-10 seconds
- 1-10 MB: 10-30 seconds
- 10-50 MB: 30-90 seconds
- > 50 MB: 90+ seconds

### Batch Processing

For multiple documents:
- ZIP archive support (up to 200 MB)
- Folder structure preservation
- Parallel processing
- Bulk transformation options

## Unsupported Formats

### Currently Unsupported

While we're constantly expanding support, these formats are not yet supported:

- **CAD Files**: DWG, DXF (coming soon)
- **Video Editing**: Final Cut, Premiere projects
- **3D Models**: OBJ, FBX, STL
- **Proprietary Formats**: Some industry-specific formats

### Workarounds

For unsupported formats:
1. **Export to PDF**: Most reliable method
2. **Convert to Office**: Use native export features
3. **Print to PDF**: Universal fallback
4. **API Integration**: Custom converters

## Format Detection

### Automatic Detection

TimeZyme automatically:
- Identifies file types
- Detects encoding
- Recognizes languages
- Determines optimal processing

### Manual Override

When needed, you can:
- Specify format explicitly
- Set encoding preferences
- Choose processing options
- Define output preferences

## Best Practices by Format

### For Best Results

**PDFs:**
- Use searchable PDFs
- Include bookmarks
- Embed fonts
- Add metadata

**Office Documents:**
- Use styles consistently
- Include alt text for images
- Maintain clear structure
- Update table of contents

**Text Files:**
- Use UTF-8 encoding
- Include clear headers
- Format with Markdown
- Break into sections

**Data Files:**
- Include headers
- Use consistent formatting
- Provide data types
- Document units

## Future Format Support

### Coming Soon

We're actively working on:
- **CAD Drawings**: Technical diagram support
- **Medical Imaging**: DICOM format
- **Legal Documents**: Specialized formatting
- **Music Notation**: Sheet music visualization

### Request a Format

Need support for a specific format? Contact us at support@timezyme.com with:
- Format name and extension
- Sample files
- Use case description
- Processing requirements

## API Format Handling

For developers using our API:

```javascript
const options = {
  format: 'auto', // or specify: 'pdf', 'docx', etc.
  encoding: 'UTF-8',
  extractImages: true,
  preserveFormatting: true,
  ocrEnabled: true
};

const result = await timezyme.transform(file, options);
```

## Conclusion

TimeZyme's extensive format support ensures that no matter how your information is stored, it can be transformed into engaging visual stories. Our AI adapts to each format's unique characteristics, extracting maximum value while preserving essential information.

Ready to transform your documents? Start with our [Quick Start Guide](/docs/getting-started/quick-start-guide) →