#!/bin/bash

BASEDIR=$(dirname "$0")
BASEDIR=$(cd "$BASEDIR" && pwd)
cd ${BASEDIR}/proto

PROTO_DIR=$(pwd)
PROTO_DEST_TS=$BASEDIR/types/
PROTO_DEST_JS=$BASEDIR/

mkdir -p ${PROTO_DEST_TS}
mkdir -p ${PROTO_DEST_JS}

# JavaScript code generation
yarn run grpc_tools_node_protoc \
    --js_out=import_style=commonjs,binary:${PROTO_DEST_JS} \
    --grpc_out=grpc_js:${PROTO_DEST_JS} \
    --plugin=protoc-gen-grpc=./node_modules/.bin/grpc_tools_node_protoc_plugin \
    -I $PROTO_DIR \
    $PROTO_DIR/*.proto

# TypeScript code generation
yarn run grpc_tools_node_protoc \
    --plugin=protoc-gen-ts=./node_modules/.bin/protoc-gen-ts \
    --ts_out=grpc_js:${PROTO_DEST_TS} \
    -I $PROTO_DIR \
    $PROTO_DIR/*.proto