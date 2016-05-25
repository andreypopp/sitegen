BIN = node ./node_modules/sitegen/lib/bin/
OUTPUT = ./output

install::
	@pnpm install
	@(cd node_modules/react-gateway && pnpm install && pnpm run build)

build::
	@DEBUG='sitegen:*' $(BIN)/sitegen-build \
		--inline-css \
		--output $(OUTPUT) \
		--public-path /sitegen/

serve::
	@DEBUG='sitegen:*' $(BIN)/sitegen-serve

publish::
	@./node_modules/.bin/gh-pages -d $(OUTPUT)

clean::
	@rm -rf $(OUTPUT)
