import { Face, Network } from '@haechi-labs/face-sdk';

const apiKey =
  'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDd78Yni6_bd579vy9lltxMRpwBe0aFcdyb7bX8wocmuBvqh-fFdbiB4xtcW66E9D2eMVUcJNAqCSIfkOcsUDZ5H0f3rb3ihofu2W0dQvUtZuEGtSKcfeOQLIgA0p6r4U-dIMtrFDXHD0UNZxo6Y0GFa2p3UxdKDia3Hgo77o_TQwIDAQAB';

export const face = new Face({
  apiKey,
  network: Network.POLYGON,
} as never);
