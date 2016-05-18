build::
	@DEBUG='sitegen:*' node ../lib/bin/sitegen-$@.js --inline-css .

serve::
	@DEBUG='sitegen:*' node ../lib/bin/sitegen-$@.js .

serve-build::
	@(cd build && python -m SimpleHTTPServer 3000)
