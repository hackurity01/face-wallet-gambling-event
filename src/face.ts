import { Face, Network } from '@haechi-labs/face-sdk';

export const isTestnet = (window as any).location.search.includes('testnet=true');

const apiKey = isTestnet
  ? 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC4Eysh41nvfVAHFsoOWlSYJuEH92Cg-Rvv-Ipf-152OHxCx6PgvcSGV-IyAyk2QnfqXz4drjsKbsKy_3M6FGwJXToFet7oGMpw7RFJIfJ2GECSnVowJuttuzO-U8sbC_IIurQyOECyBift75t1f-TTeshJSdiNsS0CLViKF6FMAQIDAQAB'
  : 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDd78Yni6_bd579vy9lltxMRpwBe0aFcdyb7bX8wocmuBvqh-fFdbiB4xtcW66E9D2eMVUcJNAqCSIfkOcsUDZ5H0f3rb3ihofu2W0dQvUtZuEGtSKcfeOQLIgA0p6r4U-dIMtrFDXHD0UNZxo6Y0GFa2p3UxdKDia3Hgo77o_TQwIDAQAB';
export const network = isTestnet ? Network.MUMBAI : Network.POLYGON;

export const face = new Face({ apiKey, network } as never);
