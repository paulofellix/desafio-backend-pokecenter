import { Metadata, status as GrpcStatus } from '@grpc/grpc-js';

export class GprcError extends Error {
  public code: GrpcStatus;
  public details: string;
  public metadata: Metadata;

  constructor(
    code: GrpcStatus,
    message: string,
    details: string,
    metadata?: Metadata
  ) {
    super(message);
    this.code = code;
    this.details = details;
    if (metadata) {
      this.metadata = metadata;
    } else {
      this.metadata = new Metadata();
    }
  }
}
