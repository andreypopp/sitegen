OUTPUT = ./output

install::
	@pnpm install
	@(cd node_modules/react-gateway && pnpm install && pnpm run build)

build::
	@DEBUG='sitegen:*' node ../lib/bin/sitegen-$@.js \
		--inline-css \
		--output $(OUTPUT) \
		--public-path /sitegen/

serve::
	@DEBUG='sitegen:*' node ../lib/bin/sitegen-$@.js \
		--public-path /sitegen/

publish::
	@./node_modules/.bin/gh-pages -d $(OUTPUT)

clean::
	@rm -rf $(OUTPUT)
