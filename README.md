# Portfolio Website - Egi Agung Santoso Pardede

A modern, responsive portfolio website showcasing projects and professional information. Built with vanilla HTML, CSS, and JavaScript.

## Features

- ✨ **Modern Design**: Clean, professional layout with smooth animations
- 🌓 **Dark/Light Mode**: Toggle between themes with persistent preference
- 📱 **Fully Responsive**: Optimized for desktop, tablet, and mobile devices
- 🎨 **Animated Loading Screen**: Business card animation on page load
- 🔍 **Portfolio Filtering**: Filter projects by category
- ⚡ **Fast Performance**: Optimized for quick loading
- ♿ **Accessible**: ARIA labels and keyboard navigation support

## File Structure

```
Portofolio/
├── index.html      # Main HTML file
├── styles.css      # All CSS styles and animations
├── script.js       # JavaScript functionality
└── README.md       # This file
```

## Local Development

To view the website locally:

1. Clone or download this repository
2. Open `index.html` in your web browser
3. That's it! No build process or dependencies required.

Alternatively, you can use a local server:

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (http-server)
npx http-server

# Using PHP
php -S localhost:8000
```

Then navigate to `http://localhost:8000` in your browser.

## Deployment to GitHub Pages

Follow these step-by-step instructions to deploy your portfolio to GitHub Pages:

### Step 1: Create a GitHub Repository

1. Go to [GitHub](https://github.com) and sign in to your account
2. Click the **"+"** icon in the top right corner and select **"New repository"**
3. Repository name options:
   - **Option A (Recommended for root domain)**: Name it `<your-username>.github.io` (e.g., `egipardede.github.io`)
     - This will make your site available at `https://<your-username>.github.io`
   - **Option B (For subdirectory)**: Name it anything you want (e.g., `portfolio`)
     - This will make your site available at `https://<your-username>.github.io/portfolio`
4. Set the repository to **Public** (required for free GitHub Pages)
5. **Do NOT** initialize with README, .gitignore, or license (since you already have files)
6. Click **"Create repository"**

### Step 2: Upload Files to GitHub

#### Option A: Using GitHub Web Interface

1. On your new repository page, click **"uploading an existing file"**
2. Drag and drop all your files (`index.html`, `styles.css`, `script.js`, `README.md`) into the upload area
3. Scroll down and click **"Commit changes"**

#### Option B: Using Git Command Line

1. Open your terminal/command prompt
2. Navigate to your project folder:
   ```bash
   cd path/to/your/portfolio
   ```
3. Initialize Git (if not already initialized):
   ```bash
   git init
   ```
4. Add all files:
   ```bash
   git add .
   ```
5. Commit the files:
   ```bash
   git commit -m "Initial commit: Portfolio website"
   ```
6. Add your GitHub repository as remote:
   ```bash
   git remote add origin https://github.com/<your-username>/<repository-name>.git
   ```
   Replace `<your-username>` and `<repository-name>` with your actual values.
7. Push to GitHub:
   ```bash
   git branch -M main
   git push -u origin main
   ```

### Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click on **"Settings"** tab (at the top of the repository)
3. Scroll down to the **"Pages"** section in the left sidebar
4. Under **"Source"**, select:
   - **Branch**: `main` (or `master` if that's your default branch)
   - **Folder**: `/ (root)`
5. Click **"Save"**

### Step 4: Access Your Website

1. GitHub will provide you with a URL. It will be:
   - `https://<your-username>.github.io` (if you named the repo `<username>.github.io`)
   - `https://<your-username>.github.io/<repository-name>` (if you used a different name)
2. **Wait 1-10 minutes** for GitHub to build and deploy your site
3. Refresh the page if it doesn't load immediately
4. Your portfolio is now live! 🎉

### Step 5: (Optional) Custom Domain

If you want to use a custom domain (e.g., `www.egipardede.com`):

1. In your repository **Settings > Pages**, add your custom domain in the **"Custom domain"** field
2. Configure your DNS settings with your domain provider:
   - Add a `CNAME` record pointing to `<your-username>.github.io`
   - Or add `A` records pointing to GitHub's IP addresses:
     - `185.199.108.153`
     - `185.199.109.153`
     - `185.199.110.153`
     - `185.199.111.153`
3. GitHub will automatically create a `CNAME` file in your repository
4. Wait for DNS propagation (can take up to 48 hours)

## Troubleshooting

### 404 Error / Page Not Found

- **Wait a few minutes**: GitHub Pages can take up to 10 minutes to build
- **Check the branch**: Ensure you selected the correct branch in Settings > Pages
- **Check the folder**: Make sure you selected `/ (root)` as the source folder
- **Clear browser cache**: Try a hard refresh (Ctrl+F5 or Cmd+Shift+R)
- **Check URL**: Make sure you're using the correct URL format

### Styles Not Loading

- Ensure `styles.css` is in the root directory
- Check that the `<link>` tag in `index.html` points to `styles.css` (not `/styles.css` if using a subdirectory)
- Open browser DevTools (F12) and check the Console for 404 errors

### JavaScript Not Working

- Ensure `script.js` is in the root directory
- Check that the `<script>` tag in `index.html` points to `script.js`
- Open browser DevTools Console to check for JavaScript errors

### Images Not Displaying

- The portfolio uses Unsplash images via CDN, so they should load automatically
- If images don't load, check your internet connection
- You can replace image URLs in `index.html` with your own hosted images

### Bypass Jekyll (if needed)

If GitHub Pages tries to process your site with Jekyll and causes issues:

1. Create a file named `.nojekyll` (no extension) in your repository root
2. Add it to your repository and push:
   ```bash
   touch .nojekyll
   git add .nojekyll
   git commit -m "Add .nojekyll to bypass Jekyll"
   git push
   ```

## Updating Your Portfolio

To update your portfolio:

1. Edit the files locally (`index.html`, `styles.css`, or `script.js`)
2. Commit and push changes:
   ```bash
   git add .
   git commit -m "Update portfolio content"
   git push
   ```
3. Changes will be live within a few minutes

## Customization

### Adding New Portfolio Items

1. Open `index.html`
2. Find the `<!-- Portfolio Grid -->` section
3. Copy an existing `.portfolio-card` div
4. Update:
   - `data-category` attribute (for filtering)
   - Image URL in `<img src="...">`
   - Category, title, description, and link
5. Save and deploy

### Changing Colors

1. Open `styles.css`
2. Find the `:root` section at the top
3. Modify the CSS variables:
   ```css
   --primary-color: #007BFF;  /* Change to your preferred color */
   --secondary-color: #6C757D;
   --background-color: #F8F9FA;
   ```

### Modifying Content

- **Header/Subheader**: Edit the `.hero-section` in `index.html`
- **About Section**: Edit the `.about-section` in `index.html`
- **Social Links**: Update the `.social-links` section in `index.html`

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

This project is open source and available for personal use.

## Contact

**Egi Agung Santoso Pardede**
- Portfolio: [Your GitHub Pages URL]
- Email: [Your Email]
- LinkedIn: [Your LinkedIn]
- GitHub: [Your GitHub]

---

**Built with ❤️ using vanilla HTML, CSS, and JavaScript**

