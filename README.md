## ✨ Features

- **Intuitive File Upload** - Drag & drop or click to select files
- **Real-time Progress** - Visual feedback during upload process  
- **File Management** - Browse, preview, and download uploaded files
- **Authentication** - Secure user login and registration
- **Responsive Design** - Seamless experience across all devices
- **Theme Customization** - Light/dark mode support
- **Form Validation** - Prevent errors with built-in validation

## 🌐 Live Demo

Visit our [live demo](https://your-demo-url.com) to see the application in action.

## 📸 Screenshots

<div align="center">
  <img src="/api/placeholder/800/450" alt="Dashboard view" width="80%" />
  <p><em>Dashboard with file upload area and file listings</em></p>
  
  <img src="/api/placeholder/800/450" alt="Upload in progress" width="80%" />
  <p><em>File upload in progress with visual feedback</em></p>
</div>

## 🏁 Getting Started

### Prerequisites

- Node.js 16.x or higher
- npm 7.x or higher (or yarn 1.22+)

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/file-upload-frontend.git
cd file-upload-frontend
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
```

3. **Set up environment variables**

Create a `.env` file in the root directory:

```
REACT_APP_API_URL=http://localhost:8080/api
REACT_APP_MAX_FILE_SIZE=10485760  # 10MB in bytes
```

4. **Start the development server**

```bash
npm start
# or
yarn start
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## 🔧 Configuration

### API Configuration

Edit the `.env` file to point to your backend API:

```
REACT_APP_API_URL=https://your-api-url.com/api
```

### Tailwind Configuration

Customize Tailwind by editing `tailwind.config.js`:

```js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#4da6ff',
          DEFAULT: '#0078ff',
          dark: '#0055cc',
        },
        // Add your custom colors here
      },
    },
  },
  plugins: [],
}
```

### MUI Theme

Customize Material UI components by editing `src/theme/index.js`.

## 📁 Project Structure

```
📦 file-upload-frontend
 ┣ 📂 public
 ┃ ┣ 📜 favicon.ico
 ┃ ┗ 📜 index.html
 ┣ 📂 src
 ┃ ┣ 📂 assets
 ┃ ┃ ┣ 📂 images
 ┃ ┃ ┗ 📂 styles
 ┃ ┣ 📂 components
 ┃ ┃ ┣ 📂 common
 ┃ ┃ ┣ 📂 layout
 ┃ ┃ ┗ 📂 uploads
 ┃ ┣ 📂 context
 ┃ ┣ 📂 hooks
 ┃ ┣ 📂 pages
 ┃ ┣ 📂 services
 ┃ ┣ 📂 theme
 ┃ ┣ 📂 utils
 ┃ ┣ 📜 App.jsx
 ┃ ┗ 📜 index.js
 ┣ 📜 .env
 ┣ 📜 .gitignore
 ┣ 📜 package.json
 ┣ 📜 README.md
 ┗ 📜 tailwind.config.js
```

## 🚢 Deployment

### Build for Production

```bash
npm run build
# or
yarn build
```

This will create an optimized production build in the `build` folder.

### Deployment Options

- **Vercel**: Connect your GitHub repository for automatic deployments
- **Netlify**: Drag and drop the `build` folder or connect your repository
- **GitHub Pages**: Deploy the `build` folder to GitHub Pages
- **Docker**: Use the included Dockerfile to build a container

## 🧰 Technologies Used

- **React 18** - Component-based UI library
- **React Router 6** - Navigation and routing
- **Tailwind CSS** - Utility-first CSS framework
- **Material UI** - React component library
- **Axios** - HTTP client for API requests
- **React Query** - Server state management
- **React Hook Form** - Form validation
- **Zustand** - State management
- **React Dropzone** - File upload functionality

## 🔄 Integration with Backend

This frontend is designed to work with our [Spring Boot File Upload API](https://github.com/anuradhajayathunga/backend-itpm.git). The integration points include:

- User authentication and registration
- File upload endpoints
- File listing and management
- Download functionality

## 🧪 Testing

Run the test suite with:

```bash
npm test
# or
yarn test
```

## 🤝 Contributing

Contributions are always welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

Please make sure your code follows our coding standards and includes appropriate tests.

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](../../../../c:/Users/Anuradha/Downloads/LICENSE) file for details.

## 👥 Authors

- **Your Name** - [GitHub Profile](https://github.com/anuradhajayathunga)

## 🙏 Acknowledgments

- [Create React App](https://create-react-app.dev/) for the project bootstrap
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS
- [Material UI](https://mui.com/) for the component library
- All the contributors who have helped shape this project

---

<div align="center">
  <p>⭐ Star this repo if you found it useful! ⭐</p>
  <p>Built with ❤️ by <a href="https://github.com/anuradhajayathunga">Your Name</a></p>
</div>
