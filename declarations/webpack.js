declare module "webpack" {
  declare type Stats = {
    compilation: WebpackCompilation;
  };

  declare type Compilation = {
    errors: Array<Error>;
    warnings: Array<Error>;
  };

  declare type Compiler = {
    debug?: Logger;
    plugin(name: string, callback: Function): void;
  };

  declare type Asset
    = {source(): string}
    | {_source: {source(): string}}

  declare type AssetCollection = {
    [key: string]: Asset;
  };
}

