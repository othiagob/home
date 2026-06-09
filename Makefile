HUGO_VERSION ?= 0.147.9
HUGO_IMAGE ?= ghcr.io/gohugoio/hugo:v$(HUGO_VERSION)
HUGO_LOCAL := $(shell command -v hugo 2>/dev/null)

.PHONY: setup serve build clean

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
