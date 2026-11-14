# Color Mixture

A lightweight, mobile-friendly color mixer built with plain HTML, CSS and JavaScript. No framework, installation or account is required.

## Features

- Mix two colors with a balance slider
- Choose colors using native color pickers
- View an approximate color name, HEX value and RGB values
- Enter a HEX code or adjust red, green and blue channels
- Copy the current HEX code
- Try preset colors or generate a random mixture
- Responsive layout for phones and desktop browsers

## Run locally

1. Download or clone this repository.
2. Open `index.html` in a modern browser.

For local development, you can also run a simple static server from this folder:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Publish with GitHub Pages

1. Open the repository on GitHub.
2. Go to **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Select the `main` branch and `/(root)`, then save.
5. Wait for GitHub Pages to publish the site. The public URL will appear in the Pages section.

## Notes

Color names are approximate: the app compares the selected color with a small built-in list and displays the closest match. It is not a complete color-name database.

## License

You may use and modify this project for personal or educational purposes.
