.PHONY: build clean

build:
	chmod +x scripts/build.sh
	./scripts/build.sh

clean:
	chmod +x scripts/clean.sh
	./scripts/clean.sh
