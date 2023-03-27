// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var financial_pb = require('./financial_pb.js');
var google_protobuf_empty_pb = require('google-protobuf/google/protobuf/empty_pb.js');

function serialize_BalanceRequest(arg) {
  if (!(arg instanceof financial_pb.BalanceRequest)) {
    throw new Error('Expected argument of type BalanceRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_BalanceRequest(buffer_arg) {
  return financial_pb.BalanceRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_BalanceResponse(arg) {
  if (!(arg instanceof financial_pb.BalanceResponse)) {
    throw new Error('Expected argument of type BalanceResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_BalanceResponse(buffer_arg) {
  return financial_pb.BalanceResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_TransactionRequest(arg) {
  if (!(arg instanceof financial_pb.TransactionRequest)) {
    throw new Error('Expected argument of type TransactionRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_TransactionRequest(buffer_arg) {
  return financial_pb.TransactionRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_google_protobuf_Empty(arg) {
  if (!(arg instanceof google_protobuf_empty_pb.Empty)) {
    throw new Error('Expected argument of type google.protobuf.Empty');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_google_protobuf_Empty(buffer_arg) {
  return google_protobuf_empty_pb.Empty.deserializeBinary(new Uint8Array(buffer_arg));
}


var FinancialService = exports.FinancialService = {
  balance: {
    path: '/Financial/balance',
    requestStream: false,
    responseStream: false,
    requestType: financial_pb.BalanceRequest,
    responseType: financial_pb.BalanceResponse,
    requestSerialize: serialize_BalanceRequest,
    requestDeserialize: deserialize_BalanceRequest,
    responseSerialize: serialize_BalanceResponse,
    responseDeserialize: deserialize_BalanceResponse,
  },
  transaction: {
    path: '/Financial/transaction',
    requestStream: false,
    responseStream: false,
    requestType: financial_pb.TransactionRequest,
    responseType: google_protobuf_empty_pb.Empty,
    requestSerialize: serialize_TransactionRequest,
    requestDeserialize: deserialize_TransactionRequest,
    responseSerialize: serialize_google_protobuf_Empty,
    responseDeserialize: deserialize_google_protobuf_Empty,
  },
};

exports.FinancialClient = grpc.makeGenericClientConstructor(FinancialService);
