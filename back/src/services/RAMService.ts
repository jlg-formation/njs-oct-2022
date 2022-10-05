export class RAMService {
  private static instance: RAMService | undefined;
  resources: unknown[] = [];

  constructor(private resourceName: string) {}

  static getInstance(resourceName: string): RAMService {
    if (RAMService.instance === undefined) {
      RAMService.instance = new RAMService(resourceName);
    }
    return RAMService.instance;
  }

  async retrieveAll() {
    return this.resources;
  }
}
