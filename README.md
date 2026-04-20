# Linux Path

<p align="center">
  <img src="public/images/penguinCar.png" width="300" alt="Linux Path Logo">
</p>

<h2 align="center">A New Life for LinuxJourney</h2>
<h4 align="center">An interactive learning platform that has helped thousands of people take their first steps into the world of Linux.</h4>

<p align="center">
  <img alt="Next.js" src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white">
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white">
  <img alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white">
  <img alt="Docker" src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white">
</p>

## Support the Project

If you find Linux Path helpful and want to support its development, consider buying me a coffee! Your support helps keep this project alive and enables continuous improvements to help more people learn Linux.

<p align="center">
  <a href="https://buymeacoffee.com/balsamic9239" target="_blank">
    <img src="https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png" alt="Buy Me A Coffee" style="height: 41px !important;width: 174px !important;">
  </a>
</p>

## Features

- 🐧 **Interactive Linux Learning**: Step-by-step lessons covering Linux fundamentals
- 🌍 **Multi-language Support**: Built with internationalization (i18n) using next-intl
- 📚 **Comprehensive Curriculum**: Structured chapters covering everything from basics to advanced topics
- 🎯 **Interactive Exercises**: Hands-on practice with real Linux commands
- 📱 **Responsive Design**: Beautiful, modern interface that works on all devices
- 🔧 **Easy Deployment**: Multiple deployment options including Docker
- 📖 **JSON-Based Content**: Flexible content management through JSON dictionaries
- 🚀 **Fast Performance**: Built with Next.js for optimal loading times

## Roadmap

Here are the exciting features coming to Linux Path:

| Feature                 | Status |
| ----------------------- | ------ |
| SSG                     | ✅     |
| Lesson generator script | ✅     |
| Dark Mode               | 📋     |
| New Lessons             | 📋     |
| View progress           | ✅     |

**Legend:**

- 🔄 In Development
- 📋 Planned
- 💡 Research Phase
- ✅ Complete

## Dictionary System

Linux Path uses a sophisticated dictionary system for content management and internationalization. For detailed information, see the [Dictionary Documentation](dictionaries/README.md).

### Dictionary Status

| Language      | Status         | Completion    |
| ------------- | -------------- | ------------- |
| 🇺🇸 English    | ✅ Complete    | 100% (Master) |
| 🇮🇹 Italian    | 🔄 In Progress | ~80%          |
| 🇩🇪 German     | ✅ Complete    | 100% (🤖 AI)  |
| 🇫🇷 French     | ✅ Complete    | 100% (🤖 AI)  |
| 🇪🇸 Spanish    | ✅ Complete    | 100% (🤖 AI)  |
| 🇮🇳 Hindi      | ✅ Complete    | 100% (🤖 AI)  |
| 🇯🇵 Japanese   | ✅ Complete    | 100% (🤖 AI)  |
| 🇵🇹 Portuguese | ✅ Complete    | 100% (🤖 AI)  |
| 🇷🇺 Russian    | ✅ Complete    | 100% (🤖 AI)  |
| 🇨🇳 Chinese    | ✅ Complete    | 100% (🤖 AI)  |

<small>Unfortunately, I am a native Italian speaker, so I cannot guarantee the accuracy or naturalness of the translations in other languages.</small>

## Quick Start

### Prerequisites

Choose one of the following:

- **Node.js**: 18.0+ and npm (for local development)
- **Docker**: Latest version (for containerized deployment)

### Option 1: Local Development

1. **Clone the repository**:

   ```bash
   git clone https://github.com/daquino94/linux-path.git
   cd linux-path
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Start the development server**:

   ```bash
   npm run dev
   ```

4. **Open your browser**:
   Navigate to `http://localhost:3000`

### Option 2: Production Build (Local)

1. **Clone and install** (same as above steps 1-2)

2. **Build the application**:

   ```bash
   npm run build
   ```

3. **Start the production server**:
   ```bash
   npm start
   ```

### Option 3: Docker Deployment

#### Using Docker Compose (Recommended)

1. **Clone the repository**:

   ```bash
   git clone https://github.com/daquino94/linux-path.git
   cd linux-path
   ```

2. **Run with Docker Compose**:
   ```bash
   docker-compose up -d
   ```

#### Manual Docker Build

1. **Build the Docker image**:

   ```bash
   docker build -t linux-path .
   ```

2. **Run the container**:
   ```bash
   docker run -d \
     --name linux-path \
     -p 3000:3000 \
     -e NODE_ENV=production \
     linux-path
   ```

## Architecture

### Multi-stage Docker Build

The project uses a sophisticated multi-stage Docker build process:

- **Stage 1 (Builder)**: Compiles and builds the Next.js application
- **Stage 2 (Runner)**: Creates a lean production image with only necessary files

This approach results in:

- ✅ Smaller final image size
- 🔒 Enhanced security (no build tools in production)
- ⚡ Faster deployment times
- 🧹 Cleaner production environment

### Technology Stack

- **Frontend Framework**: Next.js 15+ with App Router
- **Language**: TypeScript for type safety
- **Styling**: Tailwind CSS for responsive design
- **Internationalization**: next-intl for multi-language support
- **Content Management**: JSON-based dictionary system
- **Containerization**: Docker with multi-stage builds

## Configuration

### Environment Variables

The application can be configured using the following environment variables:

| Variable              | Description                   | Default                 |
| --------------------- | ----------------------------- | ----------------------- |
| `NODE_ENV`            | Environment mode              | `development`           |
| `PORT`                | Port to run the application   | `3000`                  |
| `NEXT_PUBLIC_APP_URL` | Public URL of the application | `http://localhost:3000` |

### Development Configuration

Create a `.env.local` file in the root directory:

```env
NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Adding New Content or contributing New Languages

please refer to this [documentation](/dictionaries/README.md)

## Contributing

We welcome contributions! Here's how you can help:

### Ways to Contribute

1. **🌍 Translations**: Help translate content to new languages
2. **📝 Content**: Improve existing lessons or add new ones
3. **🐛 Bug Reports**: Report issues you encounter
4. **💡 Feature Requests**: Suggest new features
5. **🔧 Code**: Submit pull requests with improvements

### Development Workflow

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes**: Follow the coding standards
4. **Test thoroughly**: Ensure everything works correctly
5. **Commit your changes**: `git commit -m 'Add amazing feature'`
6. **Push to branch**: `git push origin feature/amazing-feature`
7. **Open a Pull Request**: Describe your changes clearly

## Support

- 📖 **Documentation**: Check the [Dictionary Documentation](dictionaries/README.md)
- 🐛 **Issues**: Report bugs on the [GitHub Issues page](https://github.com/daquino94/linux-path/issues)
- 💬 **Discussions**: Join conversations in [GitHub Discussions](https://github.com/daquino94/linux-path/discussions)
- 📧 **Contact**: Reach out to the maintainers

## License

This project is licensed under the CC-BY-SA-4.0 License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- 🙋 **LinuxJourney**: Original inspiration for this project
- 🐧 **Linux Community**: For the wealth of knowledge and support
- 👥 **Contributors**: Everyone who has contributed to making this project better
- 🌟 **Users**: All the learners who use this platform to master Linux
