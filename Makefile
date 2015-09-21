.DELETE_ON_ERROR:

BABEL_OPTIONS = --stage 0 --optional runtime
BIN           = ./node_modules/.bin
TESTS         = $(shell find src -path '*/__tests__/*.js')
BIN-SRC				= $(wildcard src/bin/*)
BIN-LIB       = $(BIN-SRC:src/bin/%=bin/%)
SRC           = $(filter-out $(TESTS), $(shell find src -name '*' -type f))
LIB           = $(SRC:src/%=lib/%)
NODE          = $(BIN)/babel-node $(BABEL_OPTIONS)
MOCHA_OPTIONS = --compilers js:babel/register --require ./src/__tests__/setup.js
MOCHA					= NODE_ENV=test iojs $(BIN)/mocha $(MOCHA_OPTIONS)

build:
	@$(MAKE) -j 8 $(LIB) $(BIN-LIB)

example::
	@$(BIN)/heatpack ./example/index.js

lint:
	@$(BIN)/eslint src

test:
	@$(MOCHA) -- $(TESTS)

ci:
	@$(MOCHA) --watch -- $(TESTS)

version-major version-minor version-patch:
	@npm version $(@:version-%=%)

publish: build
	@git push --tags origin HEAD:master
	@npm publish --access public

clean:
	@rm -rf ./lib ./bin

lib/%: src/%
	@echo "Building $<"
	@mkdir -p $(@D)
	@$(BIN)/babel $(BABEL_OPTIONS) -o $@ $<

bin/%: src/bin/%
	@echo "Building command wrapper $<"
	@mkdir -p $(@D)
	@echo '#!/usr/bin/env node' > $@
	@echo 'require("../${<:src/bin/%=lib/bin/%}");' >> $@
	@chmod +x $@
