## Zyme Generation Playbook v4 - Draft Outline

### **Section 0: Guiding Principles & Goals**

**0.1. Core Mission:**
To transform source documents into interactive, multi-layered **Zymes** that significantly enhance comprehension, accelerate insight discovery, and provide a dynamic, engaging user experience. This Playbook outlines the standardized process for Zyme generation.

**0.2. Foundational Principles for Zyme Generation:**

*   **Insight-Centric Extraction:** The primary goal of the extraction process is to identify and isolate the most **salient information** and **core insights** from the source document. This moves beyond simple summarization to pinpointing the critical elements a user needs to understand.
*   **Structured & Layered Presentation:** Zymes will present information progressively across distinct levels (L0, L1, L2 for MVP), each tailored for a specific stage of understanding – from immediate overview to synthesized depth.
*   **Document-Type Adaptability:** While starting with Academic Papers for MVP, the generation process is designed to be adaptable, with future "recipes" or profiles for different document types (e.g., legal opinions, financial reports) to ensure optimal extraction and presentation relevant to that domain.
*   **User-Focused Design:**
    *   **Clarity & Comprehensibility:** Zyme content, especially at introductory levels (L1), will be refined for clarity and ease of understanding.
    *   **Visual Engagement:** L0 Zymes, in particular, will be designed as visually compelling "widgets" or "highlight cards," utilizing icons, simple data visualizations (stubs), and potentially generative imagery to enhance appeal and information density.
    *   **Interactivity & Customization:** Incorporate elements for user feedback (e.g., on content quality, visual appeal) and future customization (e.g., presentational tone, image styles).
*   **Iterative Refinement:** The Zyme generation process, including AI model prompts and extraction logic, is expected to be continuously improved based on user feedback, performance metrics, and advancements in AI capabilities (e.g., via RLHF).
*   **Architectural Simplicity & Extensibility (MVP Focus):** While the vision is expansive, the initial implementation will prioritize clear, manageable steps, building a robust foundation that can be extended with more sophisticated features and document types post-MVP.

**0.3. Goals for Zyme Levels (MVP):**

*   **L0 (At-a-Glance Overview & Key Highlights):**
    *   Provide immediate overall context via a concise **Zyme Abstract**.
    *   Showcase the most critical **Overall Document Key Insights** through visually distinct and informative "widget-style" cards.
    *   Serve as intuitive entry points into deeper Zyme content.
*   **L1 (Simplified & Structured Understanding):**
    *   Present a clear, simplified synthesis of the document's core content (derived from extracted insights), tailored for broad comprehension (e.g., "high-school level" default tone).
    *   Organize information logically by section, with clear titles and associated icons.
*   **L2 (Professionally Synthesized & In-Depth View):**
    *   Offer a more detailed, nuanced, and professionally toned synthesis of the document's content, reflecting the original document's style or user-preferred tone.
    *   Provide a comprehensive understanding based on the extracted insights, serving as TimeZyme's structured "understanding" of the document.
    *   Maintain clear links to original source material for verification.

**0.4. Initial Document Focus (MVP):**
The initial implementation and refinement of this Playbook will focus on **Academic Papers** due to their relatively standardized structure, which allows for more predictable parsing and extraction in the MVP phase.

---
### **Section 1: Phase 1: Document Ingestion & Initial Processing**

**Objective:** To reliably ingest source documents, convert them to a standardized internal format, and perform initial high-level parsing to extract foundational metadata and generate an overall abstract.

**1.1. Document Intake:**
*   **Input:** Source document. For MVP, primary input format will be PDF. Future considerations include DOCX, HTML, plain text, URLs.
*   **Process:**
    *   Securely receive/upload the document.
    *   Perform initial validation (e.g., file type, size limits).
    *   Assign a unique internal identifier to the source document.
*   **Output:** Validated source document with a unique ID.

**1.2. Document Type Classification (MVP Focus: Academic Papers):**
*   **Input:** Validated source document.
*   **Process:**
    *   **MVP Strategy:** Initially, the system may assume or require user tagging for "Academic Paper."
    *   **Future Enhancements:** Implement an AI-based classifier (e.g., fine-tuned LLM or traditional ML model trained on document features/text) to automatically determine the document type (Academic Paper, Legal Opinion, Financial Report, etc.). This classification will gate subsequent document-specific processing "recipes."
*   **Output:** Classified Document Type (e.g., `ACADEMIC_PAPER`).

**1.3. PDF-to-Markdown Conversion:**
*   **Input:** Source document (if PDF), Classified Document Type.
*   **Process:**
    *   Utilize a robust PDF-to-Markdown conversion service/library (e.g., leveraging advanced OCR and layout analysis tools like Mistral's OCR API, or open-source alternatives (e.g. docling) for specific cases).
    *   The conversion should aim to preserve as much structural information as possible, including headings, lists, tables (represented in Markdown format), and identify potential figure captions.
    *   For image-heavy PDFs or complex layouts where direct Markdown conversion is imperfect, store references to original page numbers or image locations for potential later use with "Show Original Text" features.
*   **Output:** Document content in standardized Markdown format. Associated images/figures extracted or referenced.

**1.4. Initial Structural & Metadata Parsing (from Markdown):**
*   **Input:** Document content in Markdown format.
*   **Process:**
    *   Parse the Markdown to identify and extract:
        *   **Document Title:** From the primary H1 heading or document metadata.
        *   **Author(s):** From metadata sections if present, or common patterns near the title.
        *   **Publication Date:** From metadata or common patterns.
        *   **Abstract (if explicitly present):** Identify and extract the author-provided abstract.
        *   **Conclusion (if explicitly present):** Identify and extract the author-provided conclusion section.
        *   **Explicit Section Headings:** Parse Markdown headings (e.g., `#`, `##`, `###`) to identify the document's explicit sectional structure and titles.
*   **Output:** Structured document metadata (Title, Author(s), Date) and a list of explicitly identified sections with their titles and raw Markdown content.

**1.5. Global Zyme Abstract Generation:**
*   **Input:** Cleaned document content (Markdown or key extracted parts like title, author-abstract, author-conclusion, and potentially the full text for shorter documents or key sections for longer ones via RAG).
*   **Process:**
    *   Employ an LLM to generate a concise (target 1-3 sentences, approx. ≤ 50 words) **Zyme Abstract**.
    *   **Prompting Strategy:** Guide the LLM to create an engaging overview that answers the "What? Why? How?" of the document:
        *   *What is this document's core subject or main topic?*
        *   *Why is this document significant or what primary question/problem does it address?*
        *   *How does the document approach its subject or what is its main contribution/finding (at a very high level)?*
    *   The aim is to provide immediate overall context for the user at the L0 Zyme view.
*   **Output:** Generated Global Zyme Abstract.

---
You are absolutely right! My apologies. The nested bullet-list formatting for section 2.2 was indeed not rendering well for a clear, hierarchical Markdown view. It can look a bit jumbled.

Let's reformat **Section 2.2** using a clearer structure with sub-headings for each step in the per-section extraction loop. This should be much more readable in a Markdown document.

---
### **Section 2: Phase 2: Section-Level Analysis & Extraction (MVP Focus: Academic Papers)**

**Objective:** To process each identified section of the document (primarily for Academic Papers in MVP) to extract its core insights, relevant metadata, and visual cues.

**Prerequisites:**
*   Document content in standardized Markdown format (from Section 1.3).
*   A list of explicitly identified sections with their titles and raw Markdown content (from Section 1.4).

**2.1. Defining "Sections" for Processing (MVP: Academic Papers):**
*   **Input:** List of explicitly identified sections from Markdown parsing (Section 1.4).
*   **Process:**
    *   For Academic Papers (MVP), sections will primarily be defined by the explicit Markdown headings (e.g., "Abstract," "Introduction," "Methods," "Results," "Discussion," "Conclusion," and other author-defined sections).
    *   Each such headed portion of the Markdown document will be treated as a distinct "section" for further analysis.
    *   Sub-sections (e.g., H3 under an H2) will be considered part of their parent H2 section for the purpose of extracting "Section Key Insights" but their sub-headings can be retained as structural metadata.
*   **Output:** A structured list of document sections, each containing its title and corresponding Markdown text content.

**2.2. Per-Section Iterative Extraction Loop:**

For each identified document section from step 2.1, perform the following sub-steps:

**2.2.1. Extract/Confirm Section Title**
    *   **Input:** Current section.
    *   **Process:** Use the heading identified in step 1.4/2.1 as the Section Title.
    *   **Output:** Section Title.

**2.2.2. Extract "Section Key Insights"**
    *   **Input:** Text content of the current section.
    *   **Process:**
        *   Employ an LLM to identify and extract a small number (e.g., target 1-3, maximum 4-5 if the section is dense and critical) of the most **salient insights** or **core informational points** from *within that specific section*.
        *   **Prompting Strategy:** "Read the following section titled '`[Section Title]`': `[Section Text]`. Identify and extract up to [M] distinct, concise sentences or key phrases that represent the most important information, findings, arguments, or definitions conveyed in *this section only*. These should be the essential points a reader needs to grasp from this part of the document."
        *   These extracted insights should be relatively self-contained and directly quotable or closely paraphrased from the section text.
    *   **Output:** A list of "Section Key Insights" (strings) for the current section.

**2.2.3. Extract Section Keywords/Tags**
    *   **Input:** Text content of the current section, Section Title.
    *   **Process:**
        *   Employ an LLM or dedicated keyword extraction algorithms (e.g., RAKE, YAKE!, or TF-IDF based methods if a corpus context is available) to identify relevant keywords and thematic tags for the section.
        *   **LLM Prompting Strategy (if used):** "Based on the following section titled '`[Section Title]`': `[Section Text]`, provide up to 5-7 relevant keywords or short phrases that accurately describe the main topics and concepts discussed."
    *   **Output:** A list of keywords/tags for the current section.

**2.2.4. Suggest Section Icon**
    *   **Input:** Section Title, Section Key Insights, Section Keywords.
    *   **Process (MVP Strategy):**
        *   **Option A (Simpler):** Map dominant section keywords or themes (e.g., "methodology," "results," "data," "conclusion") to a predefined, curated library of icons (e.g., from Iconify or a custom set).
        *   **Option B (LLM-assisted):** Prompt an LLM: "Given a document section about '`[Section Title/Keywords]`' with key insights like '`[Sample Key Insight]`', suggest 1-3 suitable, generic icon names from a library like Material Design Icons or Font Awesome that visually represent the core theme of this section." The system would then attempt to map these suggestions to actual available icons.
        *   The user will have the option to select/change this icon in the UI later.
    *   **Output:** A suggested icon identifier (e.g., `icon_methodology_gear`, `icon_results_chart_bar`).

**2.2.5. Generate Section Image Prompt (for optional GenAI Image)**
    *   **Input:** Section Title, Section Key Insights, Section Keywords.
    *   **Process:**
        *   Employ an LLM to generate a concise, descriptive image prompt suitable for a text-to-image generation model (e.g., DALL-E 3).
        *   **Prompting Strategy:** "Create a concise image generation prompt (max 20 words) for a metaphorical, abstract, or conceptual image that visually represents a document section about '`[Section Title/Keywords]`' which discusses '`[Sample Key Insight]`'. The image should be professional, visually engaging, and **must not contain any human figures or recognizable people**. Focus on concepts, data representation, or abstract visual metaphors."
        *   The user will have the option to trigger image generation using this prompt (or edit it) later.
    *   **Output:** A text-based image generation prompt for the current section.

**2.2.6. Store Original Section Text**
    *   **Input:** Markdown content of the current section.
    *   **Process:** Store the raw (or minimally cleaned) Markdown text of the section. This is crucial for the "Show Original Text" feature and for providing full context if needed.
    *   **Output:** Stored original section text.

---
You are absolutely right to call that out! My apologies. It seems my internal Markdown renderer for that nested list within Section 3.2 went a bit haywire and produced that "weird formatting." That's not the clear, professional structure we're aiming for.

Thank you for your sharp eyes and for stopping me. Let's correct Section 3.2 immediately with a cleaner, more standard Markdown structure using sub-headings, similar to how we fixed Section 2.2.

Here's the revised **Section 3** with a properly formatted **Section 3.2**:

---
### **Section 3: Phase 3: Document-Level Synthesis & L0 Content Generation**

**Objective:** To synthesize information from the entire document and the previously extracted section-level insights to generate the core content packages for the L0 Zyme view. This involves identifying the most critical overall insights and preparing them for a "widget-style" presentation.

**Prerequisites:**
*   Global Zyme Abstract (from Section 1.5).
*   Structured list of document sections, each with its extracted "Section Key Insights," keywords, icon/image prompt suggestions, and original text (from Section 2).
*   Full document content (Markdown).

**3.1. Derive "Overall Document Key Insights":**
*   **Input:** Full document content, Global Zyme Abstract, all "Section Key Insights."
*   **Process:**
    *   Employ an LLM to identify and extract/synthesize the **N most significant, impactful, or memorable insights** from the *entire document*. (For MVP, N will be ~6-8 to allow for up to 6 L0 cards, with some buffer for selection/ranking).
    *   **Prompting Strategy (KISS approach):**
        1.  "First, briefly re-confirm the primary purpose or main question this document addresses, considering its abstract: `[Global Zyme Abstract]` and overall content."
        2.  "Then, considering the entire document `[Full Document Text or key summaries/sections]` and the previously extracted section-level key insights `[List of all Section Key Insights]`, identify and synthesize up to [N] distinct **Overall Document Key Insights**. These should represent the absolute 'must-remember' points, critical findings, core claims, or definitive conclusions of the entire document. Prioritize insights from traditionally summary-rich sections like the Abstract, Introduction, and Conclusion, but also consider highly salient points from any section. Each insight should be concise and impactful."
    *   The LLM should aim for a balance, ensuring these overall insights are not merely repetitions of single section insights but represent a higher-level understanding or the most critical points from across the document.
*   **Output:** A list of N "Overall Document Key Insights" (strings or structured objects containing the insight text and potentially its source context).

**3.2. Formulate L0 Card Content Packages:**

For each "Overall Document Key Insight" identified in step 3.1, create a structured "content package" that will inform an L0 card, performing the following sub-steps:

**3.2.1. Formulate L0 Card Title**
    *   **Input:** The "Overall Document Key Insight" text.
    *   **Process:**
        *   If the insight is already very concise and title-like, it can be used directly.
        *   Otherwise, use an LLM to generate a short, compelling title (≤ 60 chars) that encapsulates the essence of the insight.
        *   **Prompting Strategy:** "Generate a concise and engaging title (max 10 words) for the following key insight: '`[Overall Document Key Insight Text]`'."
    *   **Output:** L0 Card Title.

**3.2.2. Identify/Generate Supporting KPI or Key Data (if applicable)**
    *   **Input:** The "Overall Document Key Insight" text, original document context around this insight.
    *   **Process:**
        *   Analyze the insight and its surrounding source text for any explicit quantitative data (percentages, numbers, statistics) that directly supports or exemplifies it.
        *   If found, extract the `[KPI_Value]` and a `[KPI_Label]`.
    *   **Output:** Optional KPI Value and Label.

**3.2.3. Suggest L0 Card Icon**
    *   **Input:** L0 Card Title, "Overall Document Key Insight" text, associated section themes (if the insight is strongly tied to a specific section's content).
    *   **Process:**
        *   Similar to Section Icon suggestion (2.2.4), use keyword/theme mapping or LLM suggestion to propose a relevant icon.
        *   If no KPI is present for the card, this icon becomes more prominent. It can also complement a KPI.
        *   The user will have the option to select/change this icon in the UI later.
    *   **Output:** A suggested icon identifier.

**3.2.4. Generate L0 Card Image Prompt (for optional GenAI Image)**
    *   **Input:** L0 Card Title, "Overall Document Key Insight" text.
    *   **Process:**
        *   Employ an LLM to generate a concise, descriptive image prompt suitable for a text-to-image generation model.
        *   **Prompting Strategy:** "Create a concise image generation prompt (max 20 words) for a metaphorical, abstract, or conceptual image that visually represents the key insight: '`[L0 Card Title/Overall Document Key Insight Text]`'. The image should be professional, visually engaging, and **must not contain any human figures or recognizable people**."
        *   The user will have the option to trigger image generation using this prompt (or edit it) later, and vote on the L0 overall document image.
    *   **Output:** A text-based image generation prompt for the L0 card.

**3.2.5. Suggest L0 Card "Widget Style" / Presentation Format**
    *   **Input:** The nature of the "Overall Document Key Insight" (e.g., is it a statistic, a core claim, a list of findings, a problem/solution pair?), presence of KPI.
    *   **Process:**
        *   Based on the type of insight, suggest a suitable presentation style for the L0 card. Examples:
            *   **KPI-centric:** Prominent number, label, small chart stub.
            *   **Conclusion-focused:** Clear title, the full insight as a sentence or short paragraph.
            *   **Theme-list:** Title, 2-3 short bullet points derived from or supporting the insight.
            *   **Problem/Solution:** Two-part presentation.
        *   This informs how the L0 card will be rendered in the UI to create visual diversity.
    *   **Output:** Suggested "Widget Style" identifier (e.g., `WIDGET_KPI_CHART`, `WIDGET_TEXT_QUOTE`, `WIDGET_BULLET_LIST`).

**3.2.6. Compile L0 Card Content Package**
    *   **Input:** Outputs from 3.2.1 - 3.2.5.
    *   **Process:** Aggregate all the formulated elements (Title, Insight Text, KPI, Icon, Image Prompt, Widget Style) into a structured object for this L0 card.
    *   **Output:** A complete L0 Card Content Package.

**3.3. Generate Overall Document Image Prompt:**
*   **Input:** Global Zyme Abstract, list of "Overall Document Key Insights."
*   **Process:**
    *   Employ an LLM to generate a concise, descriptive image prompt for an image that represents the *entire document* thematically.
    *   **Prompting Strategy:** "Create a concise image generation prompt (max 20 words) for a metaphorical, abstract, or conceptual image that visually represents a document whose abstract is '`[Global Zyme Abstract]`' and key insights include '`[Sample Overall Document Key Insight]`'. The image should be professional, visually engaging, **must not contain any human figures or recognizable people**, and be suitable as an L0 overview image."
    *   Users can vote on this image, triggering regeneration if downvoted significantly.
*   **Output:** A text-based image generation prompt for the overall document.

**3.4. Extract/Generate Overall Document Tags & Keywords:**
*   **Input:** Full document content, Global Zyme Abstract, "Overall Document Key Insights."
*   **Process:**
    *   Employ an LLM or keyword extraction algorithms to identify overarching keywords and thematic tags for the entire document.
    *   **LLM Prompting Strategy (if used):** "Based on the entire document (summarized by abstract '`[Global Zyme Abstract]`' and key insights like '`[Sample Overall Document Key Insight]`'), provide up to 7-10 relevant keywords or short phrases that accurately describe its main topics, themes, and concepts."
*   **Output:** A list of overall document keywords/tags.

**3.5. Extract Citations & References (Document Level):**
*   **Input:** Full document content (Markdown).
*   **Process:**
    *   Parse the document for explicit citations and reference list sections.
    *   Extract individual references. For MVP, this might be storing the raw reference text.
    *   Future enhancements: Parse structured citation data (authors, year, title, DOI) and attempt to link to other Zymes or external databases.
*   **Output:** A list of extracted citations/references.

---
### **Section 4: Phase 4: Zyme Level Generation (L0, L1, L2 for MVP)**

**Objective:** To construct the user-facing content for each Zyme level (L0, L1, L2) using the outputs from the previous phases, ensuring each level serves its distinct purpose in the progressive disclosure model.

**Prerequisites:**
*   Global Zyme Abstract (from Section 1.5).
*   Global Zyme Metadata (Title, Author, Date from Section 1.4).
*   Structured list of document sections, each with its "Section Key Insights," keywords, icon/image prompt suggestions, and original text (from Section 2).
*   List of "Overall Document Key Insights" and their L0 Card Content Packages (from Section 3).
*   Overall Document Image Prompt, Tags & Keywords, Citations & References (from Section 3).

**4.1. L0 Generation (At-a-Glance Overview & Key Highlights):**
*   **Input:** Global Zyme Abstract, Global Zyme Metadata, L0 Card Content Packages, Overall Document Image Prompt.
*   **Process:**
    1.  **Display Header:** Render the standard Zyme header (Logo, "L0 Highlights" breadcrumb, Search, Global Action Icon).
    2.  **Display Main Title Area:**
        *   Show the **Main Zyme Title**.
        *   Show the **Global Zyme Metadata** (Date, Author(s)).
    3.  **Display Zyme Abstract:** Render the 1-3 sentence Global Zyme Abstract.
    4.  **Display L0 Cards Grid:**
        *   Render up to six L0 cards based on the "L0 Card Content Packages." If more than six packages exist, display the top six (prioritized by salience score from Phase 3, or by order of extraction if salience scoring is deferred for MVP) with a "Reveal all" UIX element to show the remainder.
        *   Each L0 card is rendered according to its suggested "Widget Style" (from step 3.2.5), incorporating:
            *   L0 Card Title.
            *   KPI & Label (if applicable).
            *   L0 Card Icon (if applicable, especially if no KPI).
            *   The core "Overall Document Key Insight" text (presented as a sentence, short paragraph, or bullet points depending on widget style).
            *   Option to trigger GenAI image generation for the card (if an image prompt exists).
        *   The overall L0 document image (from prompt in 3.3) can be a centerpiece, background, or user-triggered.
    5.  **Keyword Linking:** Ensure keywords within the Zyme Abstract and L0 card content are styled and interactive.
*   **Output:** Fully rendered L0 Zyme view.

**4.2. L1 Generation (Simplified & Structured Understanding):**
*   **Input:** Global Zyme Abstract, "Overall Document Key Insights," all "Section Key Insights," Section Titles, suggested Section Icons. User's preferred tone setting (default "High-School").
*   **Process:**
    1.  **LLM-Powered Content Simplification & Synthesis:**
        *   For the **Global Zyme Abstract:** If needed, generate a simplified version suitable for the target tone (e.g., "Explain this abstract as you would to a high-school student: `[Original Abstract]`").
        *   For the **"Overall Document Key Insights" (if presented at L1):** Simplify each insight for the target tone.
        *   For **Each Document Section:**
            *   Take the "Section Key Insights" (from 2.2.2).
            *   Prompt an LLM to synthesize these into a concise, simplified summary of that section, written at the target tone. "Explain the key points of the following section titled '`[Section Title]`', which are '`[List of Section Key Insights]`', as you would to a high-school student. Use simple language and clear sentence structures."
    2.  **Structure L1 View:**
        *   Display the (simplified) Global Zyme Abstract.
        *   Optionally, display the (simplified) "Overall Document Key Insights" as a top-level list.
        *   Then, for each original document section:
            *   Display the **Section Title**.
            *   Display the suggested **Section Icon**.
            *   Display the **LLM-generated simplified summary** of that section.
            *   Provide a "Show Original Text" UIX element linked to the section's original text (from 2.2.6).
    3.  **Keyword Linking:** Ensure keywords within all L1 content are styled and interactive.
*   **Output:** Structured L1 Zyme view with simplified, synthesized content.

**4.3. L2 Generation (Professionally Synthesized & In-Depth View):**
*   **Input:** Global Zyme Abstract, "Overall Document Key Insights," all "Section Key Insights," Section Titles, suggested Section Icons, (optional) GenAI Section Image Prompts. User's preferred tone setting (e.g., "Original Document Tone," "Neutral Professional," or other user-selected options).
*   **Process:**
    1.  **LLM-Powered Content Re-synthesis for Target Tone:**
        *   For the **Global Zyme Abstract:** If the target tone differs from L0/L1, re-synthesize or select the appropriate version.
        *   For the **"Overall Document Key Insights" (if presented at L2):** Re-synthesize for the target tone.
        *   For **Each Document Section:**
            *   Take the "Section Key Insights" (from 2.2.2) and potentially the L1 simplified summary.
            *   Prompt an LLM to write a more detailed, polished, and professionally toned synthesis of that section, matching the user's target tone. "Based on the key insights '`[List of Section Key Insights]`' from the section titled '`[Section Title]`', write a comprehensive yet clear professional summary of this section, adopting a [Target Tone, e.g., 'formal academic', 'neutral business'] tone. Ensure the explanation is thorough and reflects a deep understanding."
    2.  **Structure L2 View:**
        *   Display the (target tone) Global Zyme Abstract.
        *   Optionally, display the (target tone) "Overall Document Key Insights."
        *   Then, for each original document section:
            *   Display the **Section Title**.
            *   Display the suggested **Section Icon**.
            *   Display the **LLM-generated professional synthesis** of that section.
            *   Display (or allow user to trigger generation of) the GenAI Section Image if a prompt exists.
            *   Provide a "Show Original Text" UIX element.
            *   Include relevant disclaimers ("AI-generated understanding") and feedback mechanisms (thumbs up/down).
    3.  **Keyword Linking:** Ensure keywords within all L2 content are styled and interactive.
*   **Output:** Structured L2 Zyme view with professionally synthesized, in-depth content.

**4.4. Keyword Linking Implementation (Across all Levels):**
*   **Input:** Extracted keywords/tags (from 2.2.3 and 3.4), Zyme content for L0, L1, L2.
*   **Process:**
    *   Identify occurrences of these keywords within the generated Zyme content.
    *   Style these keywords as interactive links (underline, color).
    *   On hover: Display a tooltip with a concise definition (sourced from a glossary Zyme or LLM-generated on the fly for MVP).
    *   On click: Open a side panel with a more detailed definition and/or navigate to a dedicated "Concept Zyme" for that term.
*   **Output:** Zyme views with interactive keyword links.

**4.5. "Show Original Text" UX Implementation:**
*   **Input:** Stored original section text (from 2.2.6).
*   **Process:**
    *   When a user activates the "Show Original Text" UIX element associated with a section in L1 or L2:
        *   Display the corresponding original Markdown/text snippet. This could be in a modal, a collapsible section, a side-by-side view, or by highlighting the relevant passage in an embedded view of the full source document (if feasible).
*   **Output:** Mechanism for users to access original source context.

---
### **Section 5: Phase 5: Visuals, UIX, & Feedback**

**Objective:** To define the processes and user interactions related to visual elements (icons, GenAI images), ensure a high-quality user experience (UIX) for new features, and establish mechanisms for user feedback to drive Zyme improvement.

**Prerequisites:**
*   Generated content for L0, L1, L2 Zyme levels (from Section 4).
*   Suggested icons and GenAI image prompts (from Sections 2 & 3).

**5.1. Icon Selection & Display Process:**

*   **Input:** Suggested icon identifiers for sections and L0 cards (from 2.2.4 & 3.2.3).
*   **Process & UIX:**
    1.  **Default Display:** The system initially displays the top-suggested icon (or a default placeholder if no suggestion is strong enough).
    2.  **User Customization (MVP Scope TBD, Ideal):**
        *   Allow users to click on a displayed icon (or an "edit icon" affordance).
        *   Present a small palette of 2-3 alternative LLM-suggested icons for that context, or allow searching/browsing a limited, curated icon library (e.g., based on tags associated with the section/card).
        *   User selection updates the icon for their view of the Zyme (and potentially provides feedback data).
*   **Storage:** The chosen icon identifier is stored with the respective Zyme section or L0 card metadata.
*   **Output:** Zyme views displaying relevant icons for sections and L0 cards.

**5.2. GenAI Image Generation & Interaction Process:**

*   **Input:** GenAI image prompts for the overall L0 document and individual sections/L0 cards (from 2.2.5, 3.2.4, 3.3).
*   **Process & UIX:**
    1.  **L0 Overall Document Image:**
        *   An initial GenAI image may be generated by the system using the prompt from 3.3 and displayed (e.g., as a background, centerpiece, or within a dedicated L0 card).
        *   **Voting Mechanism:** Provide simple "upvote/downvote" UIX elements for the displayed L0 overall image.
        *   If downvotes reach a certain threshold (or after a specific period with low upvotes), the system can automatically trigger a regeneration using the same or a slightly varied prompt, potentially incorporating feedback if captured.
        *   Users might also be given an option to explicitly request regeneration or suggest prompt modifications.
    2.  **Section/L0 Card GenAI Images:**
        *   These are primarily **user-triggered** for MVP to manage generation costs and relevance.
        *   A UIX element (e.g., "Visualize Concept," "Generate Image," or an icon) associated with a section (in L2) or an L0 card will be present if an image prompt exists.
        *   On user activation, the system sends the stored prompt to the image generation model.
        *   The generated image is then displayed within that section/card.
        *   **Style Customization (Post-MVP Ideal):** Allow users to select a preferred generative style (e.g., "Metaphorical," "Abstract," "Technical Illustration") before triggering generation, which would modify the base prompt.
*   **Storage:** Generated images are stored (e.g., S3) and linked to the Zyme/section. Prompts are stored with Zyme metadata.
*   **Output:** Zyme views potentially enhanced with AI-generated images.

**5.3. User Feedback Mechanisms for Zyme Content:**

*   **Input:** Displayed L1 and L2 synthesized content.
*   **Process & UIX:**
    1.  **Simple Feedback (e.g., Thumbs Up/Down):**
        *   Associate "thumbs up" / "thumbs down" icons with key blocks of synthesized content (e.g., each L1/L2 section summary, L0 card insight).
        *   Clicking these logs the feedback along with context (Zyme ID, section ID, content version).
    2.  **Detailed Feedback Modal:**
        *   If a user clicks "thumbs down" (or a dedicated "Report Issue" / "Provide Feedback" button):
            *   Open a modal dialog.
            *   Allow selection of issue type via predefined badges/tags (e.g., "Inaccurate," "Unclear," "Wrong Tone," "Missing Key Info," "Other").
            *   Provide a textarea for freeform comments.
            *   (Optional for MVP) Allow highlighting of specific problematic text within the Zyme content to be included with the feedback.
    3.  **Feedback for "Show Original Text":** After viewing original text, offer a simple prompt like "Did this Zyme section accurately represent the original?" (Yes/No/Partially).
*   **Storage:** Feedback is logged in a dedicated table, linked to `user_id`, `zyme_id`, `zyme_section_id`, content version, feedback type, and comments.
*   **Impact:** This data is critical for:
    *   Identifying areas for Zyme regeneration or manual review.
    *   Creating preference pairs for RLHF to improve underlying LLM generation quality.
    *   Driving Zyme versioning (see 5.4).
*   **Output:** A system for collecting structured and unstructured user feedback on Zyme content.

**5.4. Zyme Versioning (Conceptual Framework for MVP & Beyond):**

*   **Concept:** As Zymes are updated (due to user feedback, source document updates, or improved generation models), new versions of the Zyme content are created.
*   **MVP Implementation:**
    *   Each Zyme (or significant parts like L2 section syntheses) can have a version number or timestamp.
    *   When substantial feedback leads to a regeneration, a new version is created.
    *   Users might be notified of updates to Zymes they've interacted with.
*   **Future Enhancements:**
    *   Ability to view version history or compare versions.
    *   Rollback capabilities if a new version is problematic.
*   **Rationale:** Treats Zymes as living, improving knowledge assets rather than static outputs.
*   **Output:** A mechanism to track and manage different versions of Zyme content.

**5.5. UIX for Tone Selection (L2):**

*   **Input:** User settings, Zyme L2 view.
*   **Process & UIX:**
    1.  **Global Default:** Users can set a global default preferred tone (e.g., "High-School," "Neutral Professional," "Original Document Tone") in their profile settings, potentially per document type (e.g., "College" for Academic Papers, "Simple" for Medical Docs).
    2.  **Per-Zyme Override:** Within an L2 Zyme view, provide a UIX element (e.g., a dropdown menu) allowing the user to temporarily (for the session) or permanently (saved preference for that Zyme) switch the presentation tone.
    3.  Selecting a new tone triggers a re-synthesis/re-rendering of the L2 content for that tone (if not already cached).
*   **Output:** User interface for selecting and applying different presentation tones to L2 content.

---
### **Appendix: Prompt Engineering Guidelines (Illustrative Examples)**

This appendix provides example prompts for key LLM tasks within the Zyme generation process. These are conceptual starting points and should be adapted and refined based on the specific LLM used, the nature of the input documents, and observed output quality. The emphasis is on clarity and guiding the LLM effectively towards the desired output for each stage.

**A.1. Prompt for Global Zyme Abstract (Ref: Section 1.5)**

*   **Goal:** Generate a concise, engaging overview of the entire document.
*   **Example Prompt:**
    ```
    You are an expert academic analyst. Read the provided document content carefully.
    Your task is to generate a concise and engaging Zyme Abstract (1-3 sentences, approximately 30-50 words) that answers the following for a general audience:
    1. What is this document's core subject or main topic?
    2. Why is this document significant, or what primary question/problem does it address?
    3. How does the document approach its subject, or what is its main contribution/finding (at a very high level)?

    Document Content (or key excerpts like Title, Author-Abstract, Author-Conclusion):
    ---
    [Insert relevant document text here. For long documents, provide Title, Author-Provided Abstract, Author-Provided Introduction, and Author-Provided Conclusion. For shorter documents, more of the full text can be included.]
    ---

    Generate only the Zyme Abstract.
    ```

**A.2. Prompt for "Section Key Insights" (Ref: Section 2.2.2)**

*   **Goal:** Extract the most important, concise points from a specific document section.
*   **Example Prompt:**
    ```
    You are an analytical assistant. Carefully read the following document section titled "[Section Title]":
    ---
    [Insert full text of the current document section here]
    ---
    Identify and extract up to 3 (three) distinct, concise sentences or key phrases from this section that represent its most important information, findings, arguments, or definitions. These insights should be essential for understanding the core message of *this section only* and should be suitable for direct quotation or close paraphrase.

    List each extracted insight clearly.
    ```

**A.3. Prompt for "Overall Document Key Insights" (for L0 Cards) (Ref: Section 3.1)**

*   **Goal:** Identify the N most critical, memorable insights from the entire document.
*   **Example Prompt:**
    ```
    You are a senior analyst tasked with distilling a document down to its absolute essentials for a busy executive.
    Consider the entire document provided, its Global Zyme Abstract: "[Global Zyme Abstract]", and any previously identified section-level insights.

    Document (or key representative parts):
    ---
    [Insert full document text, or for very long documents, the Global Zyme Abstract, Introduction, Conclusion, and a list of all Section Key Insights.]
    ---

    Identify and synthesize exactly 6 (six) distinct "Overall Document Key Insights". These should be the absolute 'must-remember' points, critical findings, core claims, or definitive conclusions of the entire document. Prioritize information from traditionally summary-rich sections (Abstract, Introduction, Conclusion) but also consider highly salient points from any section. Each insight must be concise (ideally one sentence, max two short sentences) and impactful.

    Present these 6 insights as a numbered list.
    ```

**A.4. Prompt for L0 Card Title Generation (Ref: Section 3.2.1)**

*   **Goal:** Create a short, compelling title for an L0 card based on an "Overall Document Key Insight."
*   **Example Prompt:**
    ```
    Generate a concise and engaging title (maximum 7 words) for the following key insight, suitable for an L0 highlight card:

    Key Insight: "[Insert text of the Overall Document Key Insight here]"

    Title:
    ```

**A.5. Prompt for Section/L0 Card Image Prompt Generation (Ref: 2.2.5 & 3.2.4)**

*   **Goal:** Create a text-to-image prompt for a metaphorical/abstract visual.
*   **Example Prompt:**
    ```
    Create a concise image generation prompt (maximum 15 words) for a metaphorical, abstract, or conceptual image. The image should visually represent the core idea of: "[Insert L0 Card Title or a summary of the Section's theme/key insight here]".
    The image style should be professional and visually engaging.
    **Crucially, the image must not contain any human figures or recognizable people.**
    Focus on concepts, data representation, or abstract visual metaphors.

    Image Generation Prompt:
    ```

**A.6. Prompt for L1 Content Simplification (Ref: Section 4.2)**

*   **Goal:** Rephrase content for a "high-school" comprehension level.
*   **Example Prompt (for a section summary):**
    ```
    You are an expert educator skilled at explaining complex topics simply.
    The following is a summary of a document section titled "[Section Title]":
    ---
    [Insert text of the original or AI-generated section summary/key insights here]
    ---
    Rewrite this summary as you would explain it to a high-school student (approximately 10th-grade level). Use simpler vocabulary, shorter sentences, and clearer sentence structures. If an analogy would help clarify a complex point, feel free to include one. Ensure the core meaning and accuracy are preserved.

    Simplified Summary:
    ```

**A.7. Prompt for L2 Content Re-synthesis (Professional Tone) (Ref: Section 4.3)**

*   **Goal:** Generate a polished, professional synthesis of section content, matching a target tone.
*   **Example Prompt (for a section summary):**
    ```
    You are a professional technical writer and subject matter expert.
    The key insights from a document section titled "[Section Title]" are:
    ---
    [Insert list of "Section Key Insights" or the L1 simplified summary here]
    ---
    Synthesize these key insights into a comprehensive yet clear professional summary of this section. Adopt a [Target Tone - e.g., "formal academic," "neutral business report," "original document's scholarly"] tone.
    The summary should be well-structured, use appropriate terminology for the target tone, and provide a thorough understanding of the section's content.

    Professional Synthesis:
    ```

**General Prompting Considerations:**

*   **Clarity and Specificity:** Be as clear and specific as possible about the desired output format, length, style, and task.
*   **Role-Playing:** Assigning a role to the LLM (e.g., "You are an expert analyst," "You are an educator") can significantly improve the quality and relevance of its output.
*   **Provide Context:** Give the LLM sufficient context (e.g., the document abstract when asking for overall takeaways, section title when asking for section takeaways).
*   **Few-Shot Examples (Advanced):** For more complex tasks, providing 1-2 examples of desired input/output pairs (few-shot prompting) can dramatically improve performance, but for MVP, clear zero-shot prompts are a good start.
*   **Iterate:** Prompt engineering is an iterative process. Test prompts, analyze outputs, and refine the prompts based on results.
*   **Temperature/Top_p Settings:** Experiment with LLM temperature and top_p settings. Lower temperatures (e.g., 0.2-0.5) are often better for factual extraction and summarization where precision is key. Higher temperatures can be used for more creative tasks like image prompt generation.

---
