/**
 * @flow
 */

import assert from 'assert';
import MemoryFS from 'memory-fs';
import {page, collection} from '../Route';
import RouteCompiler from '../RouteCompiler';

declare function describe(): any;
declare function it() : any;

describe('sitegen/routing/RouteCompiler', function() {

  it('generates from a single page', async function() {
    let fs = new MemoryFS();
    let route = page('./Site');
    let compiler = new RouteCompiler({fs});
    await compiler.render(route);
    assert(true);
  });

  it('generates from a page w/ subpages', async function() {
    let fs = new MemoryFS();
    let route = page('./Site', {
      index: page('./Ok'),
      about: page('./About'),
    });
    let compiler = new RouteCompiler({fs});
    await compiler.render(route);
    assert(true);
  });

  it('generates from a single collection', async function() {
    let fs = new MemoryFS();
    fs.mkdirSync('/posts');
    fs.writeFileSync('/posts/1.md', '1.md');
    fs.writeFileSync('/posts/2.md', '2.md');
    let route = collection('/Site', '/posts/*.md');
    let compiler = new RouteCompiler({fs});
    await compiler.render(route);
    assert(true);
  });

  it('generates from a single collection with pagination', async function() {
    let fs = new MemoryFS();
    fs.mkdirSync('/posts');
    fs.writeFileSync('/posts/1.md', '1.md');
    fs.writeFileSync('/posts/2.md', '2.md');
    let route = collection('/Site', '/posts/*.md', {paginate: {size: 1}});
    let compiler = new RouteCompiler({fs});
    await compiler.render(route);
    assert(true);
  });

});
