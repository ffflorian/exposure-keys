import {TemporaryExposureKeyExport, TEKSignatureList} from '../proto/export';
import {loadAsync} from 'jszip';

export async function loadZip(fileContent: Buffer): Promise<{keys: Buffer; signature: Buffer}> {
  const unzippedData = await loadAsync(fileContent);
  const keys = await unzippedData.file('export.bin')?.async('nodebuffer');
  const signature = await unzippedData.file('export.sig')?.async('nodebuffer');

  if (!keys || !signature) {
    throw new Error('Invalid zip file');
  }

  return {keys, signature};
}

export function loadKeys(fileContent: Buffer): TemporaryExposureKeyExport {
  const bytesPadding = 16;
  return TemporaryExposureKeyExport.decode(fileContent.slice(bytesPadding));
}

export function loadSignature(fileContent: Buffer): TEKSignatureList {
  return TEKSignatureList.decode(fileContent);
}
