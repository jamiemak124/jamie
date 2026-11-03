# Decor Republic — static website

A responsive, static rebuild of the public Decor Republic website, prepared for GitHub Pages. It has no Wix runtime or build step.

## Preview locally

Open `index.html` in a browser, or run a small local server from this folder:

```sh
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Publish with GitHub Pages

1. Create a GitHub repository and push these files to its `main` branch.
2. In the repository, open **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**, select `main` and `/ (root)`, then save.
4. Add your custom domain in the Pages settings and point its DNS records to GitHub Pages. GitHub will issue HTTPS after the DNS change propagates.

## Contact form

This static form opens a new email draft addressed to `info@decor-republic.com`. To accept enquiries without relying on the visitor's mail app, connect a hosted form endpoint before launch.

## Before launch

- Confirm the copied project photography, logos, contact details, testimonials and legal links are current and approved for reuse.
- Add privacy policy and terms pages, analytics consent, and social preview metadata if needed.
- This is a presentation site; Wix bookings, CMS/blog management, multilingual routing and other dynamic behavior are not included.

