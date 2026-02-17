# Docker Compose Setup

This project uses a multi-file Docker Compose configuration for different environments.

## 📁 File Structure

```
├── docker-compose.yml       # Base configuration (shared)
├── docker-compose.dev.yml   # Development overrides
├── docker-compose.prod.yml  # Production overrides
├── Makefile                 # Quick commands
```

## 🚀 Quick Start

### Using Makefile (Recommended)

```bash
# Development with hot-reload
make dev

# Production
make prod

# View help
make help
```

### Using Docker Compose Directly

```bash
# Development
docker compose -f docker-compose.yml -f docker-compose.dev.yml up --watch

# Production
docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d
```

## 🛠️ Available Commands

### Development

| Command          | Description                          |
| ---------------- | ------------------------------------ |
| `make dev`       | Start development with hot-reload    |
| `make dev-build` | Rebuild images and start development |
| `make dev-down`  | Stop development environment         |

### Production

| Command           | Description                             |
| ----------------- | --------------------------------------- |
| `make prod`       | Start production (detached)             |
| `make prod-build` | Rebuild images and start production     |
| `make prod-pull`  | Pull latest images and start production |
| `make prod-down`  | Stop production environment             |

### Utilities

| Command              | Description                                 |
| -------------------- | ------------------------------------------- |
| `make logs`          | View all service logs                       |
| `make logs-backend`  | View backend logs only                      |
| `make logs-frontend` | View frontend logs only                     |
| `make clean`         | Remove all containers, networks, and images |

## 🔧 Configuration Files

### `docker-compose.yml` (Base)

Contains shared configuration between environments:

- Service definitions
- Network configuration
- Port mappings
- Environment file references

### `docker-compose.dev.yml` (Development)

Development-specific overrides:

- Build target: `development`
- Watch mode enabled for hot-reload
- File syncing configuration

### `docker-compose.prod.yml` (Production)

Production-specific overrides:

- Build target: `production`
- Restart policy: `always`
- Production environment variables

## 🌐 Access Points

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000

## 📋 Environment Variables

Create `.env` files in:

- `./backend/.env` - Backend environment variables
- `./frontend/.env` - Frontend environment variables

See `.env.example` in the project root for required variables.

## 🔥 Hot Reload (Development)

The development environment uses Docker Compose's `watch` feature:

- **File changes**: Automatically synced to container (instant)
- **Package.json changes**: Triggers container rebuild
- **Ignored files**: `node_modules/`, `.next/`, `.git/`, `.env`, `*.log`

## 🚢 Using Pre-built Images (Production)

The production setup uses pre-built images from Docker Hub instead of building locally.

### Pull Latest Images

```bash
# Pull latest images
make prod-pull

# Or manually
docker compose -f docker-compose.yml -f docker-compose.prod.yml pull
```

### Available Images

- Backend: `kavinda100/skillstake-backend:latest`
- Frontend: `kavinda100/skillstake-frontend:latest`

### Deploy to Production Server

1. Clone the repository:

```bash
git clone https://github.com/kavinda-100/SkillStake.git
cd SkillStake
```

2. Create environment files:

```bash
cp .env.example backend/.env
cp .env.example frontend/.env
# Edit the .env files with production values
```

3. Pull and start services:

```bash
make prod-pull
```

4. Verify deployment:

```bash
docker compose -f docker-compose.yml -f docker-compose.prod.yml ps
```

### Update to Latest Version

```bash
# Pull latest images
docker compose -f docker-compose.yml -f docker-compose.prod.yml pull

# Restart services with new images
docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d
```

## 🏭 Production Deployment

For production deployment:

```bash
# Build and start
make prod-build

# Check status
docker compose -f docker-compose.yml -f docker-compose.prod.yml ps

# View logs
make logs

# Stop
make prod-down
```

## 🧹 Cleanup

```bash
# Stop and remove everything (including volumes)
make clean

# Or manually
docker compose -f docker-compose.yml -f docker-compose.dev.yml down -v --rmi all
```

## 💡 Tips

1. **First time setup**: Always run with `--build` flag to build images
2. **Environment changes**: Restart containers after `.env` changes
3. **Dependency changes**: Use `dev-build` or `prod-build` to rebuild
4. **Database migrations**: Run inside backend container
5. **Port conflicts**: Ensure ports 3000 and 5000 are free

## 🐛 Troubleshooting

**Issue**: Port already in use

```bash
# Find process using the port
lsof -i :3000
lsof -i :5000

# Kill the process or change port in docker-compose.yml
```

**Issue**: Watch mode not working

```bash
# Ensure Docker Compose v2.22.0 or higher
docker compose version

# Rebuild containers
make dev-build
```

**Issue**: Changes not reflecting

```bash
# Check if file is in ignore list
# Restart with build
make dev-down
make dev-build
```

## 📚 Additional Resources

- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Docker Compose Watch](https://docs.docker.com/compose/file-watch/)
- [Multi-file Compose](https://docs.docker.com/compose/extends/)
