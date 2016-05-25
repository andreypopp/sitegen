declare module 'webpack' {

  declare class UglifyJsPlugin {

    constructor(params: mixed): UglifyJsPlugin;
  }

  declare var optimize: {
    UglifyJsPlugin: typeof UglifyJsPlugin;
  };

  declare type Stats = {
    compilation: Compilation;
    [key: string]: mixed;
  };

  declare type Compilation = {
    errors: Array<Error>;
    warnings: Array<Error>;
    [key: string]: mixed;
  };

  declare type Compiler = {
    plugin(name: string, callback: Function): void;
    [key: string]: mixed;
  };

  declare type Asset
    = {source(): string}
    | {_source: {source(): string}}

  declare type AssetCollection = {
    [key: string]: Asset;
  };
}

