import { Face, Network } from '@haechi-labs/face-sdk';

export const isTestnet = (window as any).location.search.includes('testnet=true');

const apiKey = isTestnet
  ? 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC4Eysh41nvfVAHFsoOWlSYJuEH92Cg-Rvv-Ipf-152OHxCx6PgvcSGV-IyAyk2QnfqXz4drjsKbsKy_3M6FGwJXToFet7oGMpw7RFJIfJ2GECSnVowJuttuzO-U8sbC_IIurQyOECyBift75t1f-TTeshJSdiNsS0CLViKF6FMAQIDAQAB'
  : 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCNhU-eBn1wmua-01Pd5mEW8VHI5FAFCPjWLAvo8R4gRjuAlUvjYAjFllDvHg_ldsYz749OB4zha3ckilpqw-WALrBNfSqTjrG71PuYD8DGIpWCsrtl7Okmh8Qauq8nS_UQirTSDIYhTXWbR7ZQ85XeVkOJkrhhEClcn4ykaeEgMQIDAQAB';
export const network = isTestnet ? Network.MUMBAI : Network.POLYGON;

export const face = new Face({ apiKey, network } as never);
