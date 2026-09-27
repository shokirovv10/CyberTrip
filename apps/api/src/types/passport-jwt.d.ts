declare module 'passport-jwt' {
  export class Strategy {
    constructor(options: any, verify: any);
  }
  export const ExtractJwt: {
    fromAuthHeaderAsBearerToken(): (req: any) => string | null;
    fromExtractors(extractors: Array<(req: any) => string | null>): (req: any) => string | null;
    fromHeader(header_name: string): (req: any) => string | null;
    fromBodyField(field_name: string): (req: any) => string | null;
    fromUrlQueryParameter(param_name: string): (req: any) => string | null;
  };
}
