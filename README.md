# ouzx.me - Edge-First Personal Blog Platform

A modern, high-performance personal blog platform built with Next.js and Hono, leveraging Cloudflare's infrastructure for optimal content delivery and edge computing capabilities.

## 📑 Table of Contents

- [Vision & Purpose](#-vision--purpose)
- [Technical Foundation](#-technical-foundation)
- [Project Philosophy](#-project-philosophy)
- [Development Approach](#-development-approach)
- [Core Features](#core-features)
- [Dependencies](#dependencies)
  - [Frontend (Web)](#frontend-web)
  - [Backend (API)](#backend-api)
  - [Media & Content](#media--content)
  - [Development & Testing](#development--testing)
- [Project Structure](#project-structure)
- [Available Scripts](#available-scripts)
  - [Development](#development)
  - [Database](#database)
  - [Testing & Linting](#testing--linting)
  - [Git Workflow](#git-workflow)
  - [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)
- [Author](#author)

## 🎯 Vision & Purpose

This project represents more than just a blog platform—it's an educational journey from a functional blog (ozxk-dev) to an ambitious edge-native application (ouzx.me). Built with transparency at its core, it serves as:

- 📚 A learning resource for enterprise-grade architecture
- 🔬 A living laboratory for modern development practices
- 🌐 A showcase of edge-native capabilities
- 🤝 An open platform for collaboration and knowledge sharing

## 🏗️ Technical Foundation

- **Frontend**: Next.js with TypeScript
- **Backend**: Hono
- **Infrastructure**: Cloudflare Edge
- **Package Management**: pnpm and turborepo (Monorepo structure)
- **Project Management**: GitHub Projects

## 💡 Project Philosophy

This platform is built as an open learning experience, documenting the entire journey from conception to implementation. Every decision, challenge, and solution is transparently shared, making it a valuable resource for developers interested in:

- Edge computing architecture
- Modern JavaScript frameworks
- Enterprise-grade development practices
- Project management methodologies
- Open-source collaboration

## 🔄 Development Approach

The project follows a systematic, educational approach where:

- Each feature addition is properly documented
- Development decisions are explained
- Best practices are demonstrated
- Real-world patterns are prioritized over theoretical implementations
- Community collaboration is encouraged

The entire development process, including project management and documentation, is open source, allowing developers to:

- Follow along with the development journey
- Understand architectural decisions
- Learn from practical implementations
- Contribute to the platform's evolution

---

---

## Core Features

TBD

## Dependencies

### Frontend (Web)

TBD

### Backend (API)

TBD

### Media & Content

TBD

### Development & Testing

TBD

## Project Structure

```
📦 ouzx.me
├── 📂 apps
│ ├── 📂 web
│ └── 📂 api
├── 📂 packages
│ ├── 📂 config
│ ├── 📂 logger
│ ├── 📂 eslint-config
│ └── 📂 typescript-config
├── 📂 .github
├── 📂 .husky
└── 📂 docs
```

## Available Scripts

### Development

- `dev`: Run development environment
- `build`: Build all applications
- `start`: Start production environment
- `test`: Run test suite
- `lint`: Check code style
- `typecheck`: Run type checking

### Database

TBD

### Testing & Linting

TBD

### Git Workflow

- **`main` branch**: All development happens here. Open Pull Requests against `main`.
- **`prod` branch**: This is the production branch. It's automatically kept in sync with `main` through the release train. Direct pushes are discouraged.

### Deployment

This project uses a "Release Train" model for automated deployments, powered by GitHub Actions.

1.  **Developer Opens a PR to `main`**: All feature development and bug fixes are submitted as pull requests to the `main` branch. This triggers preview deployments and automated checks.
2.  **PR is Merged to `main`**: Once a pull request is reviewed and approved, it's merged into `main`.
3.  **Release Train is Triggered**: The merge to `main` kicks off the `release-train` GitHub Action workflow.
    - The workflow analyzes the commit messages in the pull request to determine the correct version bump (`major`, `minor`, or `patch`).
    - It bumps the version numbers in the `package.json` files for the affected applications (`web`, `api`).
    - It pushes the version bump commit back to `main`.
4.  **Automated PR to `prod`**: The workflow then automatically opens a pull request from `main` to the `prod` branch. This PR contains the new version bumps.
5.  **Auto-Merge to `prod`**: The pull request to `prod` is automatically merged, ensuring that the `prod` branch is updated with the latest changes from `main`.
6.  **Release and Deployment**:
    - The merge to `prod` triggers the final step of the release train.
    - It creates Git tags and a GitHub Release for the new version(s).
    - Cloudflare Pages/Workers automatically detects the changes pushed to the `prod` branch and deploys the new versions of the `web` and `api` applications.

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit changes using conventional commits
4. Push to the branch
5. Open a Pull Request
   TBD

## License

MIT License - see [LICENSE](LICENSE) for details

## Author

Oguzhan Kandakoglu - [@ouzx](https://github.com/ouzx)
