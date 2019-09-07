/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/light");

var $root = ($protobuf.roots["default"] || ($protobuf.roots["default"] = new $protobuf.Root()))
.addJSON({
  goprotobuf: {
    nested: {
      HelloWorld: {
        fields: {
          id: {
            rule: "required",
            type: "int32",
            id: 1
          },
          str: {
            rule: "required",
            type: "string",
            id: 2
          },
          opt: {
            type: "int32",
            id: 3
          }
        }
      },
      PBMessageRequest: {
        fields: {
          type: {
            type: "uint32",
            id: 1
          },
          messageData: {
            type: "bytes",
            id: 2
          },
          timestamp: {
            type: "uint64",
            id: 3
          },
          version: {
            type: "string",
            id: 4
          },
          token: {
            type: "string",
            id: 14
          }
        }
      },
      PBMessageResponse: {
        fields: {
          type2: {
            type: "uint32",
            id: 3
          },
          messageData: {
            type: "bytes",
            id: 4
          },
          resultCode: {
            type: "uint32",
            id: 6
          },
          resultInfo: {
            type: "string",
            id: 7
          }
        }
      },
      PBMessageType: {
        values: {
          getStudentList: 0
        }
      },
      PBStudentListReq: {
        fields: {
          offset: {
            type: "uint32",
            id: 1
          },
          limit: {
            type: "uint32",
            id: 2
          }
        }
      },
      PBStudentListRsp: {
        fields: {
          list: {
            rule: "repeated",
            type: "uint32",
            id: 1,
            options: {
              packed: false
            }
          }
        }
      }
    }
  }
});

module.exports = $root;
