HUGO_VERSION ?= 0.147.9
HUGO_IMAGE ?= ghcr.io/gohugoio/hugo:v$(HUGO_VERSION)
HUGO_LOCAL := $(shell command -v hugo 2>/dev/null)

.PHONY: setup serve build clean docker-up docker-down docker-logs docker-build

setup:
	./scripts/setup-theme.sh

serve: setup
ifdef HUGO_LOCAL
	hugo server --buildDrafts --disableFastRender
else
	docker run --rm -it -p 1313:1313 -v "$(CURDIR):/project" -w /project $(HUGO_IMAGE) server --bind 0.0.0.0 --buildDrafts --disableFastRender
endif

build: setup
ifdef HUGO_LOCAL
	hugo --gc --minify
else
	docker run --rm -v "$(CURDIR):/project" -w /project $(HUGO_IMAGE) --gc --minify
endif

clean:
	rm -rf public resources

# Alias do Docker Compose (ver README.md para instruções completas).
docker-up:
	docker compose up

docker-down:
	docker compose down

docker-logs:
	docker compose logs -f

docker-build:
	docker compose run --rm blog --gc --minify
