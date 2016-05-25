.DELETE_ON_ERROR:

BIN           = ../../node_modules/.bin
TESTS         = $(shell find src -path '*/__tests__/*-test.js')
SRC           = $(filter-out $(TESTS) $(FIXTURES), $(shell find src -name '*.js'))
LIB           = $(SRC:src/%=lib/%)
MOCHA_OPTS    = -R dot --require babel-core/register

build::
	@$(MAKE) -j 8 $(LIB)

lint::
	@$(BIN)/eslint src

check::
	@$(BIN)/flow --show-all-errors src

test::
	@$(BIN)/mocha $(MOCHA_OPTS) $(TESTS)

ci::
	@$(BIN)/mocha $(MOCHA_OPTS) --watch --watch-extensions json,md $(TESTS)

sloc::
	@$(BIN)/sloc -e __tests__ src

version-major version-minor version-patch:: lint
	@npm version $(@:version-%=%)

publish:: build
	@git push --tags origin HEAD:master
	@npm publish

clean::
	@rm -rf lib

lib/%.js: src/%.js
	@echo "Building $<"
	@mkdir -p $(@D)
	@$(BIN)/babel $(BABEL_OPTIONS) -o $@ $<
