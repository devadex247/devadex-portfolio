# Project Screenshot Images Directory

Place your project screenshot images in this folder (`public/images/projects/`).

### Suggested Directory Structure & Naming Conventions:

```
public/images/projects/
├── medos/
│   ├── overview.png       (Main dashboard / hero view)
│   ├── triage.png         (AI Triage & MEWS score view)
│   ├── audit.png          (Immutable audit log view)
│   └── mobile.png         (Mobile viewport view)
├── ogametrics/
│   ├── dashboard.png      (Analytics overview)
│   ├── rag-search.png     (Vector search & RAG interface)
│   └── mobile.png         (Mobile view)
├── get2learn/
│   ├── overview.png       (Learning platform dashboard)
│   ├── roadmap.png        (Learning path / course view)
│   └── mobile.png         (Mobile view)
├── rankbloom/
│   ├── hero.png           (Agency landing page)
│   ├── ai-chat.png        (Chat Bloom AI assistant)
│   └── mobile.png         (Mobile layout)
├── text-stream/
│   ├── terminal.png       (CLI terminal execution view)
│   └── output.png         (Metrics & clipboard output)
├── spatial-nexus/
│   ├── map.png            (Interactive map view)
│   └── postgis-api.png    (Spatial query & GeoJSON response)
└── africut-sell-ai/
    ├── mobile-app.png     (Mobile product video upload)
    └── sales-kit.png      (Generated social sales kit)
```

### Supported Image Formats:
- `.png`, `.jpg`, `.jpeg`, `.webp`, `.svg`

All images placed here can be referenced in `src/content/projects/index.ts` using paths like `/images/projects/medos/overview.png`.
