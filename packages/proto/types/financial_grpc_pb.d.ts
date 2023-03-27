// package: 
// file: financial.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "@grpc/grpc-js";
import * as financial_pb from "./financial_pb";
import * as google_protobuf_empty_pb from "google-protobuf/google/protobuf/empty_pb";

interface IFinancialService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    balance: IFinancialService_Ibalance;
    transaction: IFinancialService_Itransaction;
}

interface IFinancialService_Ibalance extends grpc.MethodDefinition<financial_pb.BalanceRequest, financial_pb.BalanceResponse> {
    path: "/Financial/balance";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<financial_pb.BalanceRequest>;
    requestDeserialize: grpc.deserialize<financial_pb.BalanceRequest>;
    responseSerialize: grpc.serialize<financial_pb.BalanceResponse>;
    responseDeserialize: grpc.deserialize<financial_pb.BalanceResponse>;
}
interface IFinancialService_Itransaction extends grpc.MethodDefinition<financial_pb.TransactionRequest, google_protobuf_empty_pb.Empty> {
    path: "/Financial/transaction";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<financial_pb.TransactionRequest>;
    requestDeserialize: grpc.deserialize<financial_pb.TransactionRequest>;
    responseSerialize: grpc.serialize<google_protobuf_empty_pb.Empty>;
    responseDeserialize: grpc.deserialize<google_protobuf_empty_pb.Empty>;
}

export const FinancialService: IFinancialService;

export interface IFinancialServer extends grpc.UntypedServiceImplementation {
    balance: grpc.handleUnaryCall<financial_pb.BalanceRequest, financial_pb.BalanceResponse>;
    transaction: grpc.handleUnaryCall<financial_pb.TransactionRequest, google_protobuf_empty_pb.Empty>;
}

export interface IFinancialClient {
    balance(request: financial_pb.BalanceRequest, callback: (error: grpc.ServiceError | null, response: financial_pb.BalanceResponse) => void): grpc.ClientUnaryCall;
    balance(request: financial_pb.BalanceRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: financial_pb.BalanceResponse) => void): grpc.ClientUnaryCall;
    balance(request: financial_pb.BalanceRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: financial_pb.BalanceResponse) => void): grpc.ClientUnaryCall;
    transaction(request: financial_pb.TransactionRequest, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    transaction(request: financial_pb.TransactionRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    transaction(request: financial_pb.TransactionRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
}

export class FinancialClient extends grpc.Client implements IFinancialClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
    public balance(request: financial_pb.BalanceRequest, callback: (error: grpc.ServiceError | null, response: financial_pb.BalanceResponse) => void): grpc.ClientUnaryCall;
    public balance(request: financial_pb.BalanceRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: financial_pb.BalanceResponse) => void): grpc.ClientUnaryCall;
    public balance(request: financial_pb.BalanceRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: financial_pb.BalanceResponse) => void): grpc.ClientUnaryCall;
    public transaction(request: financial_pb.TransactionRequest, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    public transaction(request: financial_pb.TransactionRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    public transaction(request: financial_pb.TransactionRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
}
