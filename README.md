# exposure-keys [![Build Status](https://github.com/ffflorian/exposure-keys/workflows/Build/badge.svg)](https://github.com/ffflorian/exposure-keys/actions/) [![npm version](https://img.shields.io/npm/v/exposure-keys.svg?style=flat)](https://www.npmjs.com/package/exposure-keys) [![Dependabot Status](https://api.dependabot.com/badges/status?host=github&repo=ffflorian/exposure-keys)](https://dependabot.com)

A library to load Temporary Exposure Keys (TEK). For more information on the format see https://developers.google.com/android/exposure-notifications/exposure-key-file-format.

## Installation

Run `yarn add exposure-keys` or `npm install exposure-keys`.

## Usage

```ts
import * as fs from 'fs';
import {loadZip, loadKeys, loadSignature} from 'exposure-keys';

(async () => {
  const zippedData = await fs.promises.readFile('2019-06-24.bin');
  const unzippedData = await loadZip(zippedData);

  const keys = loadKeys(unzippedData.keys);
  const signature = loadSignature(unzippedData.signature);

  // ...
})().catch(error => console.error(error));
```
