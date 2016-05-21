install::
	@pnpm install
	@(cd node_modules/react-gateway && pnpm install && pnpm run build)

build::
	@DEBUG='sitegen:*' node ../lib/bin/sitegen-$@.js --inline-css

serve::
	@DEBUG='sitegen:*' node ../lib/bin/sitegen-$@.js

serve-build::
	@(cd build && python -m SimpleHTTPServer 3000)

clean::
	@rm -rf build
