#!/usr/bin/env node
/**
 * @copyright 2016-present, Sitegen team
 */

import commander from 'commander';

commander
  .command('serve', 'Serve sitegen site')
  .command('build', 'Build sitegen site')
  .parse(process.argv);
