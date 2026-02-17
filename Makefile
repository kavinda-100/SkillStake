.PHONY: help dev dev-build dev-down prod prod-build prod-down logs logs-backend logs-frontend clean

# Default target
help:
	@echo "SkillStake Docker Compose Commands"
	@echo ""
	@echo "Development:"
	@echo "  make dev        - Start development with hot-reload"
	@echo "  make dev-build  - Rebuild and start development"
	@echo "  make dev-down   - Stop development environment"
	@echo ""
	@echo "Production:"
	@echo "  make prod       - Start production (detached)"
	@echo "  make prod-build - Rebuild and start production"
	@echo "  make prod-pull  - Pull latest images and start production"
	@echo "  make prod-down  - Stop production environment"
	@echo ""
	@echo "Utilities:"
	@echo "  make logs       - View all logs"
	@echo "  make logs-backend - View backend logs only"
	@echo "  make logs-frontend - View frontend logs only"
	@echo "  make clean      - Remove all containers, networks, and images"

# Development commands
dev:
	docker compose -f docker-compose.yml -f docker-compose.dev.yml up --watch

dev-build:
	docker compose -f docker-compose.yml -f docker-compose.dev.yml up --build --watch

dev-down:
	docker compose -f docker-compose.yml -f docker-compose.dev.yml down

# Production commands
prod:
	docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d

prod-build:
	docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build

prod-pull:
    docker compose -f docker-compose.yml -f docker-compose.prod.yml pull
    docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d

prod-down:
	docker compose -f docker-compose.yml -f docker-compose.prod.yml down

# Utility commands
logs:
	docker compose logs -f

logs-backend:
	docker compose logs -f backend

logs-frontend:
	docker compose logs -f frontend

clean:
	docker compose -f docker-compose.yml -f docker-compose.dev.yml down -v --rmi all
	docker compose -f docker-compose.yml -f docker-compose.prod.yml down -v --rmi all
