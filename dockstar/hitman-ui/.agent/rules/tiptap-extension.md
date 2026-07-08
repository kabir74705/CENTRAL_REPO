# Tiptap Extensions

This directory contains custom extensions and configurations for the Tiptap editor used in DocStar.

## Golden Rule

- **For editor-related new features, ALWAYS search for already existing features and extensions in the editor and reuse them before building from scratch.**

## Directory Structure

- **`extensions/`**: Contains the individual extension logic.
- **`bubbleMenu.jsx`**: Logic for the floating menu that appears when selecting text.
- **`slashMenu.jsx`**: Logic for the "/" command menu.
- **`tiptap.jsx`**: The main editor component initialization.

## Custom Extensions

### Core Extensions

- **`VideoExtension.jsx`**: Handles embedding and rendering of video content.
- **`anchorExtension.js`**: implementation for anchor links (jumplinks) within documents.
- **`breadCrumbExtension.jsx`**: Manages breadcrumb navigation structures within the editor.
- **`calloutExtension.jsx`**: Provides "Callout" or "Alert" blocks (Info, Warning, Error boxes).
- **`codeBlockExtension.jsx`**: Handles code block formatting and syntax highlighting.
- **`collapsibleExtension.jsx`**: Provides collapsible (accordion/toggle) sections.
- **`customImage.jsx`**: Enhanced Image extension supporting resizing, alignment, and detailed captions.
- **`embedUrlExtension.jsx`**: Handles generic URL embeds (e.g., iframes or special link previews).
- **`imagePasteExtension.jsx`**: Handles logic for pasting images directly from the clipboard (uploading and inserting).
- **`linkedPagesExtension.jsx`**: Handles rendering linked pages or bookmarks inside the editor.

### Complex Modules

- **`buttonExtension/`**:
  - `buttonExtension.jsx`: Tiptap extension node definition.
  - `buttonModal.jsx`: UI for configuring button properties (URL, label, style).
- **`linkedPage/`**:
  - `linkedPageNodeView.jsx`: React component to render the linked page card/link in the editor.
  - `linkedPageModal.jsx`: UI to search and select pages to link.
  - `renderChilds.jsx`: Recursive rendering logic for child pages/items.
- **`embedExtension/`**: Directory for checking specific embed logic.
  - `embedExtension.jsx`: Tiptap extension node definition.
  - `embedModal.jsx`: UI for configuring embed properties (URL, label, style).

## Editor Components

- **`BubbleMenu`**: The floating toolbar appears on text selection (Bold, Italic, Link, Comment).
- **`SlashMenu`**: The command menu triggered by typing `/` (Add Heading, Table, Image, Callout).
- **`FloatingMenu`**: (If used) typically appears on empty lines for quick actions.