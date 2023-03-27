// package: 
// file: financial.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";
import * as google_protobuf_empty_pb from "google-protobuf/google/protobuf/empty_pb";

export class Empty extends jspb.Message { 

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Empty.AsObject;
    static toObject(includeInstance: boolean, msg: Empty): Empty.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Empty, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Empty;
    static deserializeBinaryFromReader(message: Empty, reader: jspb.BinaryReader): Empty;
}

export namespace Empty {
    export type AsObject = {
    }
}

export class BalanceRequest extends jspb.Message { 
    getClientId(): number;
    setClientId(value: number): BalanceRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): BalanceRequest.AsObject;
    static toObject(includeInstance: boolean, msg: BalanceRequest): BalanceRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: BalanceRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): BalanceRequest;
    static deserializeBinaryFromReader(message: BalanceRequest, reader: jspb.BinaryReader): BalanceRequest;
}

export namespace BalanceRequest {
    export type AsObject = {
        clientId: number,
    }
}

export class BalanceResponse extends jspb.Message { 
    getBalance(): number;
    setBalance(value: number): BalanceResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): BalanceResponse.AsObject;
    static toObject(includeInstance: boolean, msg: BalanceResponse): BalanceResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: BalanceResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): BalanceResponse;
    static deserializeBinaryFromReader(message: BalanceResponse, reader: jspb.BinaryReader): BalanceResponse;
}

export namespace BalanceResponse {
    export type AsObject = {
        balance: number,
    }
}

export class TransactionRequest extends jspb.Message { 
    getClientId(): number;
    setClientId(value: number): TransactionRequest;
    getAmount(): number;
    setAmount(value: number): TransactionRequest;
    getType(): TransactionType;
    setType(value: TransactionType): TransactionRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): TransactionRequest.AsObject;
    static toObject(includeInstance: boolean, msg: TransactionRequest): TransactionRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: TransactionRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): TransactionRequest;
    static deserializeBinaryFromReader(message: TransactionRequest, reader: jspb.BinaryReader): TransactionRequest;
}

export namespace TransactionRequest {
    export type AsObject = {
        clientId: number,
        amount: number,
        type: TransactionType,
    }
}

export enum TransactionType {
    DEBIT = 0,
    CREDIT = 1,
}
