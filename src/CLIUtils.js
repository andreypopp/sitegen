import path       from 'path';
import commander  from 'commander';
import pkg        from '../package.json';

export function listFormatter(items = []) {
  return function(item) {
    items.push(item);
    return items;
  }
}

export function parse(argv, params = {allowOutput: false}) {
  let parser = commander
    .version(pkg.version)
    .usage('sitegen-serve [options] <site>')
    .description('Serve site')
    .option('-L, --lib <directory>', 'site library directory (default: $site/lib)')
    .option('-r, --require <entry>', 'additional entry to require', listFormatter(), []);


  if (params.allowOutput) {
    parser = parser.option('-o, --output <directory>', 'output directory');
  }

  let options = parser.parse(process.argv);

  let cwd = process.cwd();
  let site = path.join(cwd, options.args[0] || '.');

  return {
    site,
    options: {
      ...options,
      output: options.output ? path.join(cwd, options.output) : options.output,
      lib: options.lib ? path.join(cwd, options.lib) : options.lib,
      require: options.require.map(item => path.join(cwd, item))
    }
  };
}
