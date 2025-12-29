# StudyFlow Webshop – Lumino Labs

Professional webshop for StudyFlow, a digital learning and productivity software by Lumino Labs.

**Disclaimer:** This webshop is developed as part of a university course on Data Protection and IT Law. While fully compliant with legal and accessibility standards, no real purchases are processed.

---

## Project Overview

## Structure
- `webshop/` – Site source (HTML/CSS/JS, assets)
- Key pages: `index.html`, `about.html`, `trademarks.html`, `license.html`, `privacy.html`, `accessibility.html`, `contact.html`, `impressum.html`, `credits.html`

## Accessibility
- WCAG 2.2 AA oriented: semantic HTML, focus styles, skip link, alt text
- Optional axe-core audit: append `?axe` to URL (logs to console)

## Legal
- GDPR privacy, Austrian Impressum, License terms, Trademark classes
- Credits page documents font/icon/tool licenses

## Run locally
Open `webshop/index.html` in a browser or use a simple server:

```bash
# Python
python -m http.server 8080 -d webshop
# PowerShell
Start-Process -FilePath powershell -ArgumentList "-NoProfile -Command \"cd webshop; python -m http.server 8080\""
```

Browse http://localhost:8080

## Deploy (GitHub Pages)
- Create a repo and push this `webshop/` folder
- In repo Settings → Pages: Source = `main`, Folder = `/webshop`
- Wait for publish; use the Pages URL for public access

## Notes
- All interactive processes are mocked; no backend
- Replace placeholder contact and Impressum details with real company info
