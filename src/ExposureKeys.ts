import {TemporaryExposureKeyExport, TEKSignatureList} from '../proto/export';
import {loadAsync} from 'jszip';

function isZip(fileContent: Buffer): boolean {
  // eslint-disable-next-line no-magic-numbers
  return new Buffer([0x50, 0x4b]).compare(fileContent.slice(0, 2)) === 0;
}

export async function loadZip(fileContent: Buffer): Promise<{keys: Buffer; signature: Buffer}> {
  if (!isZip(fileContent)) {
    throw new Error('The file you are trying to load is not a zip file.');
  }

  const unzippedData = await loadAsync(fileContent);
  const keys = await unzippedData.file('export.bin')?.async('nodebuffer');
  const signature = await unzippedData.file('export.sig')?.async('nodebuffer');

  if (!keys) {
    throw new Error(`The zip file doesn't contain keys.`);
  }

  if (!signature) {
    throw new Error(`The zip file doesn't contain a signature.`);
  }

  return {keys, signature};
}

export function loadKeys(fileContent: Buffer): TemporaryExposureKeyExport {
  if (isZip(fileContent)) {
    throw new Error('You are trying to load a zip file. Please use loadZip() for that.');
  }

  // see https://developers.google.com/android/exposure-notifications/exposure-key-file-format
  const bytesPadding = 16;
  return TemporaryExposureKeyExport.decode(fileContent.slice(bytesPadding));
}

export function loadSignature(fileContent: Buffer): TEKSignatureList {
  return TEKSignatureList.decode(fileContent);
}
