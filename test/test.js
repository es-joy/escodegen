/*
  Copyright (C) 2012-2013 Yusuke Suzuki <utatane.tea@gmail.com>
  Copyright (C) 2012 Ariya Hidayat <ariya.hidayat@gmail.com>
  Copyright (C) 2012 Joost-Wim Boekesteijn <joost-wim@boekesteijn.nl>
  Copyright (C) 2012 Arpad Borsos <arpad.borsos@googlemail.com>
  Copyright (C) 2011 Ariya Hidayat <ariya.hidayat@gmail.com>
  Copyright (C) 2011 Yusuke Suzuki <utatane.tea@gmail.com>
  Copyright (C) 2011 Arpad Borsos <arpad.borsos@googlemail.com>

  Redistribution and use in source and binary forms, with or without
  modification, are permitted provided that the following conditions are met:

    * Redistributions of source code must retain the above copyright
      notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright
      notice, this list of conditions and the following disclaimer in the
      documentation and/or other materials provided with the distribution.

  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
  AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
  IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
  ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
  DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
  (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
  LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
  ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
  (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
  THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

import esprima from './3rdparty/esprima-1.0.0-dev.js';
import { getRunTest } from './utils.js';

const data = {

    'Primary Expression': {

        'this\n': {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'ThisExpression',
                    range: [0, 4],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 4 }
                    }
                },
                range: [0, 5],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 2, column: 0 }
                }
            }],
            range: [0, 5],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 2, column: 0 }
            },
            tokens: [{
                type: 'Keyword',
                value: 'this',
                range: [0, 4]
            }]
        },

        'null\n': {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'Literal',
                    value: null,
                    raw: 'null',
                    range: [0, 4],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 4 }
                    }
                },
                range: [0, 5],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 2, column: 0 }
                }
            }],
            range: [0, 5],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 2, column: 0 }
            },
            tokens: [{
                type: 'Null',
                value: 'null',
                range: [0, 4]
            }]
        },

        '\n    42\n\n': {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'Literal',
                    value: 42,
                    raw: '42',
                    range: [5, 7],
                    loc: {
                        start: { line: 2, column: 4 },
                        end: { line: 2, column: 6 }
                    }
                },
                range: [5, 9],
                loc: {
                    start: { line: 2, column: 4 },
                    end: { line: 4, column: 0 }
                }
            }],
            range: [5, 9],
            loc: {
                start: { line: 2, column: 4 },
                end: { line: 4, column: 0 }
            },
            tokens: [{
                type: 'Numeric',
                value: '42',
                range: [5, 7]
            }]
        },

        '(1 + 2 ) * 3': {
            type: 'ExpressionStatement',
            expression: {
                type: 'BinaryExpression',
                operator: '*',
                left: {
                    type: 'BinaryExpression',
                    operator: '+',
                    left: {
                        type: 'Literal',
                        value: 1,
                        raw: '1',
                        range: [1, 2],
                        loc: {
                            start: { line: 1, column: 1 },
                            end: { line: 1, column: 2 }
                        }
                    },
                    right: {
                        type: 'Literal',
                        value: 2,
                        raw: '2',
                        range: [5, 6],
                        loc: {
                            start: { line: 1, column: 5 },
                            end: { line: 1, column: 6 }
                        }
                    },
                    range: [0, 8],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 8 }
                    }
                },
                right: {
                    type: 'Literal',
                    value: 3,
                    raw: '3',
                    range: [11, 12],
                    loc: {
                        start: { line: 1, column: 11 },
                        end: { line: 1, column: 12 }
                    }
                },
                range: [0, 12],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 12 }
                }
            },
            range: [0, 12],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 12 }
            }
        }

    },

    'Array Initializer': {

        'x = []': {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'x',
                        range: [0, 1],
                        loc: {
                            start: { line: 1, column: 0 },
                            end: { line: 1, column: 1 }
                        }
                    },
                    right: {
                        type: 'ArrayExpression',
                        elements: [],
                        range: [4, 6],
                        loc: {
                            start: { line: 1, column: 4 },
                            end: { line: 1, column: 6 }
                        }
                    },
                    range: [0, 6],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 6 }
                    }
                },
                range: [0, 6],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 6 }
                }
            }],
            range: [0, 6],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 6 }
            },
            tokens: [{
                type: 'Identifier',
                value: 'x',
                range: [0, 1]
            }, {
                type: 'Punctuator',
                value: '=',
                range: [2, 3]
            }, {
                type: 'Punctuator',
                value: '[',
                range: [4, 5]
            }, {
                type: 'Punctuator',
                value: ']',
                range: [5, 6]
            }]
        },

        'x = [ ]': {
            type: 'ExpressionStatement',
            expression: {
                type: 'AssignmentExpression',
                operator: '=',
                left: {
                    type: 'Identifier',
                    name: 'x',
                    range: [0, 1],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 1 }
                    }
                },
                right: {
                    type: 'ArrayExpression',
                    elements: [],
                    range: [4, 7],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 7 }
                    }
                },
                range: [0, 7],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 7 }
                }
            },
            range: [0, 7],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 7 }
            }
        },

        'x = [ 42 ]': {
            type: 'ExpressionStatement',
            expression: {
                type: 'AssignmentExpression',
                operator: '=',
                left: {
                    type: 'Identifier',
                    name: 'x',
                    range: [0, 1],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 1 }
                    }
                },
                right: {
                    type: 'ArrayExpression',
                    elements: [{
                        type: 'Literal',
                        value: 42,
                        raw: '42',
                        range: [6, 8],
                        loc: {
                            start: { line: 1, column: 6 },
                            end: { line: 1, column: 8 }
                        }
                    }],
                    range: [4, 10],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 10 }
                    }
                },
                range: [0, 10],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 10 }
                }
            },
            range: [0, 10],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 10 }
            }
        },

        'x = [ 42, ]': {
            type: 'ExpressionStatement',
            expression: {
                type: 'AssignmentExpression',
                operator: '=',
                left: {
                    type: 'Identifier',
                    name: 'x',
                    range: [0, 1],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 1 }
                    }
                },
                right: {
                    type: 'ArrayExpression',
                    elements: [{
                        type: 'Literal',
                        value: 42,
                        raw: '42',
                        range: [6, 8],
                        loc: {
                            start: { line: 1, column: 6 },
                            end: { line: 1, column: 8 }
                        }
                    }],
                    range: [4, 11],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 11 }
                    }
                },
                range: [0, 11],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 11 }
                }
            },
            range: [0, 11],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 11 }
            }
        },

        'x = [\n    43,\n    ,\n];': {
            generateFrom: {
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'x',
                        range: [0, 1],
                        loc: {
                            start: { line: 1, column: 0 },
                            end: { line: 1, column: 1 }
                        }
                    },
                    right: {
                        type: 'ArrayExpression',
                        elements: [{
                            type: 'Literal',
                            value: 43,
                            raw: '43',
                            range: [6, 8],
                            loc: {
                                start: { line: 1, column: 6 },
                                end: { line: 1, column: 8 }
                            }
                        }, null],
                        range: [4, 11],
                        loc: {
                            start: { line: 1, column: 4 },
                            end: { line: 1, column: 11 }
                        }
                    },
                    range: [0, 11],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 11 }
                    }
                },
                range: [0, 11],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 11 }
                }
            }
        },

        'x = [ ,, 42 ]': {
            type: 'ExpressionStatement',
            expression: {
                type: 'AssignmentExpression',
                operator: '=',
                left: {
                    type: 'Identifier',
                    name: 'x',
                    range: [0, 1],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 1 }
                    }
                },
                right: {
                    type: 'ArrayExpression',
                    elements: [
                        null,
                        null,
                        {
                            type: 'Literal',
                            value: 42,
                            raw: '42',
                            range: [9, 11],
                            loc: {
                                start: { line: 1, column: 9 },
                                end: { line: 1, column: 11 }
                            }
                        }],
                    range: [4, 13],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 13 }
                    }
                },
                range: [0, 13],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 13 }
                }
            },
            range: [0, 13],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 13 }
            }
        },

        'x = [ 1, 2, 3, ]': {
            type: 'ExpressionStatement',
            expression: {
                type: 'AssignmentExpression',
                operator: '=',
                left: {
                    type: 'Identifier',
                    name: 'x',
                    range: [0, 1],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 1 }
                    }
                },
                right: {
                    type: 'ArrayExpression',
                    elements: [{
                        type: 'Literal',
                        value: 1,
                        raw: '1',
                        range: [6, 7],
                        loc: {
                            start: { line: 1, column: 6 },
                            end: { line: 1, column: 7 }
                        }
                    }, {
                        type: 'Literal',
                        value: 2,
                        raw: '2',
                        range: [9, 10],
                        loc: {
                            start: { line: 1, column: 9 },
                            end: { line: 1, column: 10 }
                        }
                    }, {
                        type: 'Literal',
                        value: 3,
                        raw: '3',
                        range: [12, 13],
                        loc: {
                            start: { line: 1, column: 12 },
                            end: { line: 1, column: 13 }
                        }
                    }],
                    range: [4, 16],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 16 }
                    }
                },
                range: [0, 16],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 16 }
                }
            },
            range: [0, 16],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 16 }
            }
        },

        'x = [ 1, 2,, 3, ]': {
            type: 'ExpressionStatement',
            expression: {
                type: 'AssignmentExpression',
                operator: '=',
                left: {
                    type: 'Identifier',
                    name: 'x',
                    range: [0, 1],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 1 }
                    }
                },
                right: {
                    type: 'ArrayExpression',
                    elements: [{
                        type: 'Literal',
                        value: 1,
                        raw: '1',
                        range: [6, 7],
                        loc: {
                            start: { line: 1, column: 6 },
                            end: { line: 1, column: 7 }
                        }
                    }, {
                        type: 'Literal',
                        value: 2,
                        raw: '2',
                        range: [9, 10],
                        loc: {
                            start: { line: 1, column: 9 },
                            end: { line: 1, column: 10 }
                        }
                    }, null, {
                        type: 'Literal',
                        value: 3,
                        raw: '3',
                        range: [13, 14],
                        loc: {
                            start: { line: 1, column: 13 },
                            end: { line: 1, column: 14 }
                        }
                    }],
                    range: [4, 17],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 17 }
                    }
                },
                range: [0, 17],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 17 }
                }
            },
            range: [0, 17],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 17 }
            }
        },

        '日本語 = []': {
            type: 'ExpressionStatement',
            expression: {
                type: 'AssignmentExpression',
                operator: '=',
                left: {
                    type: 'Identifier',
                    name: '日本語',
                    range: [0, 3],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 3 }
                    }
                },
                right: {
                    type: 'ArrayExpression',
                    elements: [],
                    range: [6, 8],
                    loc: {
                        start: { line: 1, column: 6 },
                        end: { line: 1, column: 8 }
                    }
                },
                range: [0, 8],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 8 }
                }
            },
            range: [0, 8],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 8 }
            }
        },

        'T\u203F = []': {
            type: 'ExpressionStatement',
            expression: {
                type: 'AssignmentExpression',
                operator: '=',
                left: {
                    type: 'Identifier',
                    name: 'T\u203F',
                    range: [0, 2],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 2 }
                    }
                },
                right: {
                    type: 'ArrayExpression',
                    elements: [],
                    range: [5, 7],
                    loc: {
                        start: { line: 1, column: 5 },
                        end: { line: 1, column: 7 }
                    }
                },
                range: [0, 7],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 7 }
                }
            },
            range: [0, 7],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 7 }
            }
        },

        'T\u200C = []': {
            type: 'ExpressionStatement',
            expression: {
                type: 'AssignmentExpression',
                operator: '=',
                left: {
                    type: 'Identifier',
                    name: 'T\u200C',
                    range: [0, 2],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 2 }
                    }
                },
                right: {
                    type: 'ArrayExpression',
                    elements: [],
                    range: [5, 7],
                    loc: {
                        start: { line: 1, column: 5 },
                        end: { line: 1, column: 7 }
                    }
                },
                range: [0, 7],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 7 }
                }
            },
            range: [0, 7],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 7 }
            }
        },

        'T\u200D = []': {
            type: 'ExpressionStatement',
            expression: {
                type: 'AssignmentExpression',
                operator: '=',
                left: {
                    type: 'Identifier',
                    name: 'T\u200D',
                    range: [0, 2],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 2 }
                    }
                },
                right: {
                    type: 'ArrayExpression',
                    elements: [],
                    range: [5, 7],
                    loc: {
                        start: { line: 1, column: 5 },
                        end: { line: 1, column: 7 }
                    }
                },
                range: [0, 7],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 7 }
                }
            },
            range: [0, 7],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 7 }
            }
        },

        '\u2163\u2161 = []': {
            type: 'ExpressionStatement',
            expression: {
                type: 'AssignmentExpression',
                operator: '=',
                left: {
                    type: 'Identifier',
                    name: '\u2163\u2161',
                    range: [0, 2],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 2 }
                    }
                },
                right: {
                    type: 'ArrayExpression',
                    elements: [],
                    range: [5, 7],
                    loc: {
                        start: { line: 1, column: 5 },
                        end: { line: 1, column: 7 }
                    }
                },
                range: [0, 7],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 7 }
                }
            },
            range: [0, 7],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 7 }
            }
        },

        '\u2163\u2161\u200A=\u2009[]': {
            type: 'ExpressionStatement',
            expression: {
                type: 'AssignmentExpression',
                operator: '=',
                left: {
                    type: 'Identifier',
                    name: '\u2163\u2161',
                    range: [0, 2],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 2 }
                    }
                },
                right: {
                    type: 'ArrayExpression',
                    elements: [],
                    range: [5, 7],
                    loc: {
                        start: { line: 1, column: 5 },
                        end: { line: 1, column: 7 }
                    }
                },
                range: [0, 7],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 7 }
                }
            },
            range: [0, 7],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 7 }
            }
        }

    },

    'Object Initializer': {

        'x = {}': {
            type: 'ExpressionStatement',
            expression: {
                type: 'AssignmentExpression',
                operator: '=',
                left: {
                    type: 'Identifier',
                    name: 'x',
                    range: [0, 1],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 1 }
                    }
                },
                right: {
                    type: 'ObjectExpression',
                    properties: [],
                    range: [4, 6],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 6 }
                    }
                },
                range: [0, 6],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 6 }
                }
            },
            range: [0, 6],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 6 }
            }
        },

        'x = { }': {
            type: 'ExpressionStatement',
            expression: {
                type: 'AssignmentExpression',
                operator: '=',
                left: {
                    type: 'Identifier',
                    name: 'x',
                    range: [0, 1],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 1 }
                    }
                },
                right: {
                    type: 'ObjectExpression',
                    properties: [],
                    range: [4, 7],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 7 }
                    }
                },
                range: [0, 7],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 7 }
                }
            },
            range: [0, 7],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 7 }
            }
        },

        'x = { answer: 4 }': {
            type: 'ExpressionStatement',
            expression: {
                type: 'AssignmentExpression',
                operator: '=',
                left: {
                    type: 'Identifier',
                    name: 'x'
                },
                right: {
                    type: 'ObjectExpression',
                    properties: [{
                        key: {
                            type: 'Identifier',
                            name: 'answer'
                        },
                        value: {
                            type: 'Literal',
                            value: 4
                        },
                        kind: 'init'
                    }]
                }
            }
        },

        'x = { answer: 42 }': {
            type: 'ExpressionStatement',
            expression: {
                type: 'AssignmentExpression',
                operator: '=',
                left: {
                    type: 'Identifier',
                    name: 'x',
                    range: [0, 1],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 1 }
                    }
                },
                right: {
                    type: 'ObjectExpression',
                    properties: [{
                        type: 'Property',
                        key: {
                            type: 'Identifier',
                            name: 'answer',
                            range: [6, 12],
                            loc: {
                                start: { line: 1, column: 6 },
                                end: { line: 1, column: 12 }
                            }
                        },
                        value: {
                            type: 'Literal',
                            value: 42,
                            raw: '42',
                            range: [14, 16],
                            loc: {
                                start: { line: 1, column: 14 },
                                end: { line: 1, column: 16 }
                            }
                        },
                        kind: 'init',
                        range: [6, 16],
                        loc: {
                            start: { line: 1, column: 6 },
                            end: { line: 1, column: 16 }
                        }
                    }],
                    range: [4, 18],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 18 }
                    }
                },
                range: [0, 18],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 18 }
                }
            },
            range: [0, 18],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 18 }
            }
        },

        'x = { if: 42 }': {
            type: 'ExpressionStatement',
            expression: {
                type: 'AssignmentExpression',
                operator: '=',
                left: {
                    type: 'Identifier',
                    name: 'x',
                    range: [0, 1],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 1 }
                    }
                },
                right: {
                    type: 'ObjectExpression',
                    properties: [{
                        type: 'Property',
                        key: {
                            type: 'Identifier',
                            name: 'if',
                            range: [6, 8],
                            loc: {
                                start: { line: 1, column: 6 },
                                end: { line: 1, column: 8 }
                            }
                        },
                        value: {
                            type: 'Literal',
                            value: 42,
                            raw: '42',
                            range: [10, 12],
                            loc: {
                                start: { line: 1, column: 10 },
                                end: { line: 1, column: 12 }
                            }
                        },
                        kind: 'init',
                        range: [6, 12],
                        loc: {
                            start: { line: 1, column: 6 },
                            end: { line: 1, column: 12 }
                        }
                    }],
                    range: [4, 14],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 14 }
                    }
                },
                range: [0, 14],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 14 }
                }
            },
            range: [0, 14],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 14 }
            }
        },

        'x = { true: 42 }': {
            type: 'ExpressionStatement',
            expression: {
                type: 'AssignmentExpression',
                operator: '=',
                left: {
                    type: 'Identifier',
                    name: 'x',
                    range: [0, 1],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 1 }
                    }
                },
                right: {
                    type: 'ObjectExpression',
                    properties: [{
                        type: 'Property',
                        key: {
                            type: 'Identifier',
                            name: 'true',
                            range: [6, 10],
                            loc: {
                                start: { line: 1, column: 6 },
                                end: { line: 1, column: 10 }
                            }
                        },
                        value: {
                            type: 'Literal',
                            value: 42,
                            raw: '42',
                            range: [12, 14],
                            loc: {
                                start: { line: 1, column: 12 },
                                end: { line: 1, column: 14 }
                            }
                        },
                        kind: 'init',
                        range: [6, 14],
                        loc: {
                            start: { line: 1, column: 6 },
                            end: { line: 1, column: 14 }
                        }
                    }],
                    range: [4, 16],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 16 }
                    }
                },
                range: [0, 16],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 16 }
                }
            },
            range: [0, 16],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 16 }
            }
        },

        'x = { false: 42 }': {
            type: 'ExpressionStatement',
            expression: {
                type: 'AssignmentExpression',
                operator: '=',
                left: {
                    type: 'Identifier',
                    name: 'x',
                    range: [0, 1],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 1 }
                    }
                },
                right: {
                    type: 'ObjectExpression',
                    properties: [{
                        type: 'Property',
                        key: {
                            type: 'Identifier',
                            name: 'false',
                            range: [6, 11],
                            loc: {
                                start: { line: 1, column: 6 },
                                end: { line: 1, column: 11 }
                            }
                        },
                        value: {
                            type: 'Literal',
                            value: 42,
                            raw: '42',
                            range: [13, 15],
                            loc: {
                                start: { line: 1, column: 13 },
                                end: { line: 1, column: 15 }
                            }
                        },
                        kind: 'init',
                        range: [6, 15],
                        loc: {
                            start: { line: 1, column: 6 },
                            end: { line: 1, column: 15 }
                        }
                    }],
                    range: [4, 17],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 17 }
                    }
                },
                range: [0, 17],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 17 }
                }
            },
            range: [0, 17],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 17 }
            }
        },

        'x = { null: 42 }': {
            type: 'ExpressionStatement',
            expression: {
                type: 'AssignmentExpression',
                operator: '=',
                left: {
                    type: 'Identifier',
                    name: 'x',
                    range: [0, 1],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 1 }
                    }
                },
                right: {
                    type: 'ObjectExpression',
                    properties: [{
                        type: 'Property',
                        key: {
                            type: 'Identifier',
                            name: 'null',
                            range: [6, 10],
                            loc: {
                                start: { line: 1, column: 6 },
                                end: { line: 1, column: 10 }
                            }
                        },
                        value: {
                            type: 'Literal',
                            value: 42,
                            raw: '42',
                            range: [12, 14],
                            loc: {
                                start: { line: 1, column: 12 },
                                end: { line: 1, column: 14 }
                            }
                        },
                        kind: 'init',
                        range: [6, 14],
                        loc: {
                            start: { line: 1, column: 6 },
                            end: { line: 1, column: 14 }
                        }
                    }],
                    range: [4, 16],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 16 }
                    }
                },
                range: [0, 16],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 16 }
                }
            },
            range: [0, 16],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 16 }
            }
        },

        'x = { "answer": 42 }': {
            type: 'ExpressionStatement',
            expression: {
                type: 'AssignmentExpression',
                operator: '=',
                left: {
                    type: 'Identifier',
                    name: 'x',
                    range: [0, 1],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 1 }
                    }
                },
                right: {
                    type: 'ObjectExpression',
                    properties: [{
                        type: 'Property',
                        key: {
                            type: 'Literal',
                            value: 'answer',
                            raw: '"answer"',
                            range: [6, 14],
                            loc: {
                                start: { line: 1, column: 6 },
                                end: { line: 1, column: 14 }
                            }
                        },
                        value: {
                            type: 'Literal',
                            value: 42,
                            raw: '42',
                            range: [16, 18],
                            loc: {
                                start: { line: 1, column: 16 },
                                end: { line: 1, column: 18 }
                            }
                        },
                        kind: 'init',
                        range: [6, 18],
                        loc: {
                            start: { line: 1, column: 6 },
                            end: { line: 1, column: 18 }
                        }
                    }],
                    range: [4, 20],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 20 }
                    }
                },
                range: [0, 20],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 20 }
                }
            },
            range: [0, 20],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 20 }
            }
        },

        'x = { x: 1, x: 2 }': {
            type: 'ExpressionStatement',
            expression: {
                type: 'AssignmentExpression',
                operator: '=',
                left: {
                    type: 'Identifier',
                    name: 'x',
                    range: [0, 1],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 1 }
                    }
                },
                right: {
                    type: 'ObjectExpression',
                    properties: [
                        {
                            type: 'Property',
                            key: {
                                type: 'Identifier',
                                name: 'x',
                                range: [6, 7],
                                loc: {
                                    start: { line: 1, column: 6 },
                                    end: { line: 1, column: 7 }
                                }
                            },
                            value: {
                                type: 'Literal',
                                value: 1,
                                raw: '1',
                                range: [9, 10],
                                loc: {
                                    start: { line: 1, column: 9 },
                                    end: { line: 1, column: 10 }
                                }
                            },
                            kind: 'init',
                            range: [6, 10],
                            loc: {
                                start: { line: 1, column: 6 },
                                end: { line: 1, column: 10 }
                            }
                        },
                        {
                            type: 'Property',
                            key: {
                                type: 'Identifier',
                                name: 'x',
                                range: [12, 13],
                                loc: {
                                    start: { line: 1, column: 12 },
                                    end: { line: 1, column: 13 }
                                }
                            },
                            value: {
                                type: 'Literal',
                                value: 2,
                                raw: '2',
                                range: [15, 16],
                                loc: {
                                    start: { line: 1, column: 15 },
                                    end: { line: 1, column: 16 }
                                }
                            },
                            kind: 'init',
                            range: [12, 16],
                            loc: {
                                start: { line: 1, column: 12 },
                                end: { line: 1, column: 16 }
                            }
                        }
                    ],
                    range: [4, 18],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 18 }
                    }
                },
                range: [0, 18],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 18 }
                }
            },
            range: [0, 18],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 18 }
            }
        },

        'x = { get width() { return m_width } }': {
            type: 'ExpressionStatement',
            expression: {
                type: 'AssignmentExpression',
                operator: '=',
                left: {
                    type: 'Identifier',
                    name: 'x',
                    range: [0, 1],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 1 }
                    }
                },
                right: {
                    type: 'ObjectExpression',
                    properties: [{
                        type: 'Property',
                        key: {
                            type: 'Identifier',
                            name: 'width',
                            range: [10, 15],
                            loc: {
                                start: { line: 1, column: 10 },
                                end: { line: 1, column: 15 }
                            }
                        },
                        value: {
                            type: 'FunctionExpression',
                            id: null,
                            params: [],
                            body: {
                                type: 'BlockStatement',
                                body: [{
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'Identifier',
                                        name: 'm_width',
                                        range: [27, 34],
                                        loc: {
                                            start: { line: 1, column: 27 },
                                            end: { line: 1, column: 34 }
                                        }
                                    },
                                    range: [20, 35],
                                    loc: {
                                        start: { line: 1, column: 20 },
                                        end: { line: 1, column: 35 }
                                    }
                                }],
                                range: [18, 36],
                                loc: {
                                    start: { line: 1, column: 18 },
                                    end: { line: 1, column: 36 }
                                }
                            },
                            range: [18, 36],
                            loc: {
                                start: { line: 1, column: 18 },
                                end: { line: 1, column: 36 }
                            }
                        },
                        kind: 'get',
                        range: [6, 36],
                        loc: {
                            start: { line: 1, column: 6 },
                            end: { line: 1, column: 36 }
                        }
                    }],
                    range: [4, 38],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 38 }
                    }
                },
                range: [0, 38],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 38 }
                }
            },
            range: [0, 38],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 38 }
            }
        },

        'x = { get undef() {} }': {
            type: 'ExpressionStatement',
            expression: {
                type: 'AssignmentExpression',
                operator: '=',
                left: {
                    type: 'Identifier',
                    name: 'x',
                    range: [0, 1],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 1 }
                    }
                },
                right: {
                    type: 'ObjectExpression',
                    properties: [{
                        type: 'Property',
                        key: {
                            type: 'Identifier',
                            name: 'undef',
                            range: [10, 15],
                            loc: {
                                start: { line: 1, column: 10 },
                                end: { line: 1, column: 15 }
                            }
                        },
                        value: {
                            type: 'FunctionExpression',
                            id: null,
                            params: [],
                            body: {
                                type: 'BlockStatement',
                                body: [],
                                range: [18, 20],
                                loc: {
                                    start: { line: 1, column: 18 },
                                    end: { line: 1, column: 20 }
                                }
                            },
                            range: [18, 20],
                            loc: {
                                start: { line: 1, column: 18 },
                                end: { line: 1, column: 20 }
                            }
                        },
                        kind: 'get',
                        range: [6, 20],
                        loc: {
                            start: { line: 1, column: 6 },
                            end: { line: 1, column: 20 }
                        }
                    }],
                    range: [4, 22],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 22 }
                    }
                },
                range: [0, 22],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 22 }
                }
            },
            range: [0, 22],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 22 }
            }
        },

        'x = { get if() {} }': {
            type: 'ExpressionStatement',
            expression: {
                type: 'AssignmentExpression',
                operator: '=',
                left: {
                    type: 'Identifier',
                    name: 'x',
                    range: [0, 1],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 1 }
                    }
                },
                right: {
                    type: 'ObjectExpression',
                    properties: [{
                        type: 'Property',
                        key: {
                            type: 'Identifier',
                            name: 'if',
                            range: [10, 12],
                            loc: {
                                start: { line: 1, column: 10 },
                                end: { line: 1, column: 12 }
                            }
                        },
                        value: {
                            type: 'FunctionExpression',
                            id: null,
                            params: [],
                            body: {
                                type: 'BlockStatement',
                                body: [],
                                range: [15, 17],
                                loc: {
                                    start: { line: 1, column: 15 },
                                    end: { line: 1, column: 17 }
                                }
                            },
                            range: [15, 17],
                            loc: {
                                start: { line: 1, column: 15 },
                                end: { line: 1, column: 17 }
                            }
                        },
                        kind: 'get',
                        range: [6, 17],
                        loc: {
                            start: { line: 1, column: 6 },
                            end: { line: 1, column: 17 }
                        }
                    }],
                    range: [4, 19],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 19 }
                    }
                },
                range: [0, 19],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 19 }
                }
            },
            range: [0, 19],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 19 }
            }
        },

        'x = { get true() {} }': {
            type: 'ExpressionStatement',
            expression: {
                type: 'AssignmentExpression',
                operator: '=',
                left: {
                    type: 'Identifier',
                    name: 'x',
                    range: [0, 1],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 1 }
                    }
                },
                right: {
                    type: 'ObjectExpression',
                    properties: [{
                        type: 'Property',
                        key: {
                            type: 'Identifier',
                            name: 'true',
                            range: [10, 14],
                            loc: {
                                start: { line: 1, column: 10 },
                                end: { line: 1, column: 14 }
                            }
                        },
                        value: {
                            type: 'FunctionExpression',
                            id: null,
                            params: [],
                            body: {
                                type: 'BlockStatement',
                                body: [],
                                range: [17, 19],
                                loc: {
                                    start: { line: 1, column: 17 },
                                    end: { line: 1, column: 19 }
                                }
                            },
                            range: [17, 19],
                            loc: {
                                start: { line: 1, column: 17 },
                                end: { line: 1, column: 19 }
                            }
                        },
                        kind: 'get',
                        range: [6, 19],
                        loc: {
                            start: { line: 1, column: 6 },
                            end: { line: 1, column: 19 }
                        }
                    }],
                    range: [4, 21],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 21 }
                    }
                },
                range: [0, 21],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 21 }
                }
            },
            range: [0, 21],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 21 }
            }
        },

        'x = { get false() {} }': {
            type: 'ExpressionStatement',
            expression: {
                type: 'AssignmentExpression',
                operator: '=',
                left: {
                    type: 'Identifier',
                    name: 'x',
                    range: [0, 1],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 1 }
                    }
                },
                right: {
                    type: 'ObjectExpression',
                    properties: [{
                        type: 'Property',
                        key: {
                            type: 'Identifier',
                            name: 'false',
                            range: [10, 15],
                            loc: {
                                start: { line: 1, column: 10 },
                                end: { line: 1, column: 15 }
                            }
                        },
                        value: {
                            type: 'FunctionExpression',
                            id: null,
                            params: [],
                            body: {
                                type: 'BlockStatement',
                                body: [],
                                range: [18, 20],
                                loc: {
                                    start: { line: 1, column: 18 },
                                    end: { line: 1, column: 20 }
                                }
                            },
                            range: [18, 20],
                            loc: {
                                start: { line: 1, column: 18 },
                                end: { line: 1, column: 20 }
                            }
                        },
                        kind: 'get',
                        range: [6, 20],
                        loc: {
                            start: { line: 1, column: 6 },
                            end: { line: 1, column: 20 }
                        }
                    }],
                    range: [4, 22],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 22 }
                    }
                },
                range: [0, 22],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 22 }
                }
            },
            range: [0, 22],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 22 }
            }
        },

        'x = { get null() {} }': {
            type: 'ExpressionStatement',
            expression: {
                type: 'AssignmentExpression',
                operator: '=',
                left: {
                    type: 'Identifier',
                    name: 'x',
                    range: [0, 1],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 1 }
                    }
                },
                right: {
                    type: 'ObjectExpression',
                    properties: [{
                        type: 'Property',
                        key: {
                            type: 'Identifier',
                            name: 'null',
                            range: [10, 14],
                            loc: {
                                start: { line: 1, column: 10 },
                                end: { line: 1, column: 14 }
                            }
                        },
                        value: {
                            type: 'FunctionExpression',
                            id: null,
                            params: [],
                            body: {
                                type: 'BlockStatement',
                                body: [],
                                range: [17, 19],
                                loc: {
                                    start: { line: 1, column: 17 },
                                    end: { line: 1, column: 19 }
                                }
                            },
                            range: [17, 19],
                            loc: {
                                start: { line: 1, column: 17 },
                                end: { line: 1, column: 19 }
                            }
                        },
                        kind: 'get',
                        range: [6, 19],
                        loc: {
                            start: { line: 1, column: 6 },
                            end: { line: 1, column: 19 }
                        }
                    }],
                    range: [4, 21],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 21 }
                    }
                },
                range: [0, 21],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 21 }
                }
            },
            range: [0, 21],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 21 }
            }
        },

        'x = { get "undef"() {} }': {
            type: 'ExpressionStatement',
            expression: {
                type: 'AssignmentExpression',
                operator: '=',
                left: {
                    type: 'Identifier',
                    name: 'x',
                    range: [0, 1],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 1 }
                    }
                },
                right: {
                    type: 'ObjectExpression',
                    properties: [{
                        type: 'Property',
                        key: {
                            type: 'Literal',
                            value: 'undef',
                            raw: '"undef"',
                            range: [10, 17],
                            loc: {
                                start: { line: 1, column: 10 },
                                end: { line: 1, column: 17 }
                            }
                        },
                        value: {
                            type: 'FunctionExpression',
                            id: null,
                            params: [],
                            body: {
                                type: 'BlockStatement',
                                body: [],
                                range: [20, 22],
                                loc: {
                                    start: { line: 1, column: 20 },
                                    end: { line: 1, column: 22 }
                                }
                            },
                            range: [20, 22],
                            loc: {
                                start: { line: 1, column: 20 },
                                end: { line: 1, column: 22 }
                            }
                        },
                        kind: 'get',
                        range: [6, 22],
                        loc: {
                            start: { line: 1, column: 6 },
                            end: { line: 1, column: 22 }
                        }
                    }],
                    range: [4, 24],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 24 }
                    }
                },
                range: [0, 24],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 24 }
                }
            },
            range: [0, 24],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 24 }
            }
        },

        'x = { get 10() {} }': {
            type: 'ExpressionStatement',
            expression: {
                type: 'AssignmentExpression',
                operator: '=',
                left: {
                    type: 'Identifier',
                    name: 'x',
                    range: [0, 1],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 1 }
                    }
                },
                right: {
                    type: 'ObjectExpression',
                    properties: [{
                        type: 'Property',
                        key: {
                            type: 'Literal',
                            value: 10,
                            raw: '10',
                            range: [10, 12],
                            loc: {
                                start: { line: 1, column: 10 },
                                end: { line: 1, column: 12 }
                            }
                        },
                        value: {
                            type: 'FunctionExpression',
                            id: null,
                            params: [],
                            body: {
                                type: 'BlockStatement',
                                body: [],
                                range: [15, 17],
                                loc: {
                                    start: { line: 1, column: 15 },
                                    end: { line: 1, column: 17 }
                                }
                            },
                            range: [15, 17],
                            loc: {
                                start: { line: 1, column: 15 },
                                end: { line: 1, column: 17 }
                            }
                        },
                        kind: 'get',
                        range: [6, 17],
                        loc: {
                            start: { line: 1, column: 6 },
                            end: { line: 1, column: 17 }
                        }
                    }],
                    range: [4, 19],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 19 }
                    }
                },
                range: [0, 19],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 19 }
                }
            },
            range: [0, 19],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 19 }
            }
        },

        'x = { set width(w) { m_width = w } }': {
            type: 'ExpressionStatement',
            expression: {
                type: 'AssignmentExpression',
                operator: '=',
                left: {
                    type: 'Identifier',
                    name: 'x',
                    range: [0, 1],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 1 }
                    }
                },
                right: {
                    type: 'ObjectExpression',
                    properties: [{
                        type: 'Property',
                        key: {
                            type: 'Identifier',
                            name: 'width',
                            range: [10, 15],
                            loc: {
                                start: { line: 1, column: 10 },
                                end: { line: 1, column: 15 }
                            }
                        },
                        value: {
                            type: 'FunctionExpression',
                            id: null,
                            params: [{
                                type: 'Identifier',
                                name: 'w',
                                range: [16, 17],
                                loc: {
                                    start: { line: 1, column: 16 },
                                    end: { line: 1, column: 17 }
                                }
                            }],
                            body: {
                                type: 'BlockStatement',
                                body: [{
                                    type: 'ExpressionStatement',
                                    expression: {
                                        type: 'AssignmentExpression',
                                        operator: '=',
                                        left: {
                                            type: 'Identifier',
                                            name: 'm_width',
                                            range: [21, 28],
                                            loc: {
                                                start: { line: 1, column: 21 },
                                                end: { line: 1, column: 28 }
                                            }
                                        },
                                        right: {
                                            type: 'Identifier',
                                            name: 'w',
                                            range: [31, 32],
                                            loc: {
                                                start: { line: 1, column: 31 },
                                                end: { line: 1, column: 32 }
                                            }
                                        },
                                        range: [21, 32],
                                        loc: {
                                            start: { line: 1, column: 21 },
                                            end: { line: 1, column: 32 }
                                        }
                                    },
                                    range: [21, 33],
                                    loc: {
                                        start: { line: 1, column: 21 },
                                        end: { line: 1, column: 33 }
                                    }
                                }],
                                range: [19, 34],
                                loc: {
                                    start: { line: 1, column: 19 },
                                    end: { line: 1, column: 34 }
                                }
                            },
                            range: [19, 34],
                            loc: {
                                start: { line: 1, column: 19 },
                                end: { line: 1, column: 34 }
                            }
                        },
                        kind: 'set',
                        range: [6, 34],
                        loc: {
                            start: { line: 1, column: 6 },
                            end: { line: 1, column: 34 }
                        }
                    }],
                    range: [4, 36],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 36 }
                    }
                },
                range: [0, 36],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 36 }
                }
            },
            range: [0, 36],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 36 }
            }
        },

        'x = { set if(w) { m_if = w } }': {
            type: 'ExpressionStatement',
            expression: {
                type: 'AssignmentExpression',
                operator: '=',
                left: {
                    type: 'Identifier',
                    name: 'x',
                    range: [0, 1],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 1 }
                    }
                },
                right: {
                    type: 'ObjectExpression',
                    properties: [{
                        type: 'Property',
                        key: {
                            type: 'Identifier',
                            name: 'if',
                            range: [10, 12],
                            loc: {
                                start: { line: 1, column: 10 },
                                end: { line: 1, column: 12 }
                            }
                        },
                        value: {
                            type: 'FunctionExpression',
                            id: null,
                            params: [{
                                type: 'Identifier',
                                name: 'w',
                                range: [13, 14],
                                loc: {
                                    start: { line: 1, column: 13 },
                                    end: { line: 1, column: 14 }
                                }
                            }],
                            body: {
                                type: 'BlockStatement',
                                body: [{
                                    type: 'ExpressionStatement',
                                    expression: {
                                        type: 'AssignmentExpression',
                                        operator: '=',
                                        left: {
                                            type: 'Identifier',
                                            name: 'm_if',
                                            range: [18, 22],
                                            loc: {
                                                start: { line: 1, column: 18 },
                                                end: { line: 1, column: 22 }
                                            }
                                        },
                                        right: {
                                            type: 'Identifier',
                                            name: 'w',
                                            range: [25, 26],
                                            loc: {
                                                start: { line: 1, column: 25 },
                                                end: { line: 1, column: 26 }
                                            }
                                        },
                                        range: [18, 26],
                                        loc: {
                                            start: { line: 1, column: 18 },
                                            end: { line: 1, column: 26 }
                                        }
                                    },
                                    range: [18, 27],
                                    loc: {
                                        start: { line: 1, column: 18 },
                                        end: { line: 1, column: 27 }
                                    }
                                }],
                                range: [16, 28],
                                loc: {
                                    start: { line: 1, column: 16 },
                                    end: { line: 1, column: 28 }
                                }
                            },
                            range: [16, 28],
                            loc: {
                                start: { line: 1, column: 16 },
                                end: { line: 1, column: 28 }
                            }
                        },
                        kind: 'set',
                        range: [6, 28],
                        loc: {
                            start: { line: 1, column: 6 },
                            end: { line: 1, column: 28 }
                        }
                    }],
                    range: [4, 30],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 30 }
                    }
                },
                range: [0, 30],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 30 }
                }
            },
            range: [0, 30],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 30 }
            }
        },

        'x = { set true(w) { m_true = w } }': {
            type: 'ExpressionStatement',
            expression: {
                type: 'AssignmentExpression',
                operator: '=',
                left: {
                    type: 'Identifier',
                    name: 'x',
                    range: [0, 1],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 1 }
                    }
                },
                right: {
                    type: 'ObjectExpression',
                    properties: [{
                        type: 'Property',
                        key: {
                            type: 'Identifier',
                            name: 'true',
                            range: [10, 14],
                            loc: {
                                start: { line: 1, column: 10 },
                                end: { line: 1, column: 14 }
                            }
                        },
                        value: {
                            type: 'FunctionExpression',
                            id: null,
                            params: [{
                                type: 'Identifier',
                                name: 'w',
                                range: [15, 16],
                                loc: {
                                    start: { line: 1, column: 15 },
                                    end: { line: 1, column: 16 }
                                }
                            }],
                            body: {
                                type: 'BlockStatement',
                                body: [{
                                    type: 'ExpressionStatement',
                                    expression: {
                                        type: 'AssignmentExpression',
                                        operator: '=',
                                        left: {
                                            type: 'Identifier',
                                            name: 'm_true',
                                            range: [20, 26],
                                            loc: {
                                                start: { line: 1, column: 20 },
                                                end: { line: 1, column: 26 }
                                            }
                                        },
                                        right: {
                                            type: 'Identifier',
                                            name: 'w',
                                            range: [29, 30],
                                            loc: {
                                                start: { line: 1, column: 29 },
                                                end: { line: 1, column: 30 }
                                            }
                                        },
                                        range: [20, 30],
                                        loc: {
                                            start: { line: 1, column: 20 },
                                            end: { line: 1, column: 30 }
                                        }
                                    },
                                    range: [20, 31],
                                    loc: {
                                        start: { line: 1, column: 20 },
                                        end: { line: 1, column: 31 }
                                    }
                                }],
                                range: [18, 32],
                                loc: {
                                    start: { line: 1, column: 18 },
                                    end: { line: 1, column: 32 }
                                }
                            },
                            range: [18, 32],
                            loc: {
                                start: { line: 1, column: 18 },
                                end: { line: 1, column: 32 }
                            }
                        },
                        kind: 'set',
                        range: [6, 32],
                        loc: {
                            start: { line: 1, column: 6 },
                            end: { line: 1, column: 32 }
                        }
                    }],
                    range: [4, 34],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 34 }
                    }
                },
                range: [0, 34],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 34 }
                }
            },
            range: [0, 34],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 34 }
            }
        },

        'x = { set false(w) { m_false = w } }': {
            type: 'ExpressionStatement',
            expression: {
                type: 'AssignmentExpression',
                operator: '=',
                left: {
                    type: 'Identifier',
                    name: 'x',
                    range: [0, 1],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 1 }
                    }
                },
                right: {
                    type: 'ObjectExpression',
                    properties: [{
                        type: 'Property',
                        key: {
                            type: 'Identifier',
                            name: 'false',
                            range: [10, 15],
                            loc: {
                                start: { line: 1, column: 10 },
                                end: { line: 1, column: 15 }
                            }
                        },
                        value: {
                            type: 'FunctionExpression',
                            id: null,
                            params: [{
                                type: 'Identifier',
                                name: 'w',
                                range: [16, 17],
                                loc: {
                                    start: { line: 1, column: 16 },
                                    end: { line: 1, column: 17 }
                                }
                            }],
                            body: {
                                type: 'BlockStatement',
                                body: [{
                                    type: 'ExpressionStatement',
                                    expression: {
                                        type: 'AssignmentExpression',
                                        operator: '=',
                                        left: {
                                            type: 'Identifier',
                                            name: 'm_false',
                                            range: [21, 28],
                                            loc: {
                                                start: { line: 1, column: 21 },
                                                end: { line: 1, column: 28 }
                                            }
                                        },
                                        right: {
                                            type: 'Identifier',
                                            name: 'w',
                                            range: [31, 32],
                                            loc: {
                                                start: { line: 1, column: 31 },
                                                end: { line: 1, column: 32 }
                                            }
                                        },
                                        range: [21, 32],
                                        loc: {
                                            start: { line: 1, column: 21 },
                                            end: { line: 1, column: 32 }
                                        }
                                    },
                                    range: [21, 33],
                                    loc: {
                                        start: { line: 1, column: 21 },
                                        end: { line: 1, column: 33 }
                                    }
                                }],
                                range: [19, 34],
                                loc: {
                                    start: { line: 1, column: 19 },
                                    end: { line: 1, column: 34 }
                                }
                            },
                            range: [19, 34],
                            loc: {
                                start: { line: 1, column: 19 },
                                end: { line: 1, column: 34 }
                            }
                        },
                        kind: 'set',
                        range: [6, 34],
                        loc: {
                            start: { line: 1, column: 6 },
                            end: { line: 1, column: 34 }
                        }
                    }],
                    range: [4, 36],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 36 }
                    }
                },
                range: [0, 36],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 36 }
                }
            },
            range: [0, 36],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 36 }
            }
        },

        'x = { set null(w) { m_null = w } }': {
            type: 'ExpressionStatement',
            expression: {
                type: 'AssignmentExpression',
                operator: '=',
                left: {
                    type: 'Identifier',
                    name: 'x',
                    range: [0, 1],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 1 }
                    }
                },
                right: {
                    type: 'ObjectExpression',
                    properties: [{
                        type: 'Property',
                        key: {
                            type: 'Identifier',
                            name: 'null',
                            range: [10, 14],
                            loc: {
                                start: { line: 1, column: 10 },
                                end: { line: 1, column: 14 }
                            }
                        },
                        value: {
                            type: 'FunctionExpression',
                            id: null,
                            params: [{
                                type: 'Identifier',
                                name: 'w',
                                range: [15, 16],
                                loc: {
                                    start: { line: 1, column: 15 },
                                    end: { line: 1, column: 16 }
                                }
                            }],
                            body: {
                                type: 'BlockStatement',
                                body: [{
                                    type: 'ExpressionStatement',
                                    expression: {
                                        type: 'AssignmentExpression',
                                        operator: '=',
                                        left: {
                                            type: 'Identifier',
                                            name: 'm_null',
                                            range: [20, 26],
                                            loc: {
                                                start: { line: 1, column: 20 },
                                                end: { line: 1, column: 26 }
                                            }
                                        },
                                        right: {
                                            type: 'Identifier',
                                            name: 'w',
                                            range: [29, 30],
                                            loc: {
                                                start: { line: 1, column: 29 },
                                                end: { line: 1, column: 30 }
                                            }
                                        },
                                        range: [20, 30],
                                        loc: {
                                            start: { line: 1, column: 20 },
                                            end: { line: 1, column: 30 }
                                        }
                                    },
                                    range: [20, 31],
                                    loc: {
                                        start: { line: 1, column: 20 },
                                        end: { line: 1, column: 31 }
                                    }
                                }],
                                range: [18, 32],
                                loc: {
                                    start: { line: 1, column: 18 },
                                    end: { line: 1, column: 32 }
                                }
                            },
                            range: [18, 32],
                            loc: {
                                start: { line: 1, column: 18 },
                                end: { line: 1, column: 32 }
                            }
                        },
                        kind: 'set',
                        range: [6, 32],
                        loc: {
                            start: { line: 1, column: 6 },
                            end: { line: 1, column: 32 }
                        }
                    }],
                    range: [4, 34],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 34 }
                    }
                },
                range: [0, 34],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 34 }
                }
            },
            range: [0, 34],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 34 }
            }
        },

        'x = { set "null"(w) { m_null = w } }': {
            type: 'ExpressionStatement',
            expression: {
                type: 'AssignmentExpression',
                operator: '=',
                left: {
                    type: 'Identifier',
                    name: 'x',
                    range: [0, 1],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 1 }
                    }
                },
                right: {
                    type: 'ObjectExpression',
                    properties: [{
                        type: 'Property',
                        key: {
                            type: 'Literal',
                            value: 'null',
                            raw: '"null"',
                            range: [10, 16],
                            loc: {
                                start: { line: 1, column: 10 },
                                end: { line: 1, column: 16 }
                            }
                        },
                        value: {
                            type: 'FunctionExpression',
                            id: null,
                            params: [{
                                type: 'Identifier',
                                name: 'w',
                                range: [17, 18],
                                loc: {
                                    start: { line: 1, column: 17 },
                                    end: { line: 1, column: 18 }
                                }
                            }],
                            body: {
                                type: 'BlockStatement',
                                body: [{
                                    type: 'ExpressionStatement',
                                    expression: {
                                        type: 'AssignmentExpression',
                                        operator: '=',
                                        left: {
                                            type: 'Identifier',
                                            name: 'm_null',
                                            range: [22, 28],
                                            loc: {
                                                start: { line: 1, column: 22 },
                                                end: { line: 1, column: 28 }
                                            }
                                        },
                                        right: {
                                            type: 'Identifier',
                                            name: 'w',
                                            range: [31, 32],
                                            loc: {
                                                start: { line: 1, column: 31 },
                                                end: { line: 1, column: 32 }
                                            }
                                        },
                                        range: [22, 32],
                                        loc: {
                                            start: { line: 1, column: 22 },
                                            end: { line: 1, column: 32 }
                                        }
                                    },
                                    range: [22, 33],
                                    loc: {
                                        start: { line: 1, column: 22 },
                                        end: { line: 1, column: 33 }
                                    }
                                }],
                                range: [20, 34],
                                loc: {
                                    start: { line: 1, column: 20 },
                                    end: { line: 1, column: 34 }
                                }
                            },
                            range: [20, 34],
                            loc: {
                                start: { line: 1, column: 20 },
                                end: { line: 1, column: 34 }
                            }
                        },
                        kind: 'set',
                        range: [6, 34],
                        loc: {
                            start: { line: 1, column: 6 },
                            end: { line: 1, column: 34 }
                        }
                    }],
                    range: [4, 36],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 36 }
                    }
                },
                range: [0, 36],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 36 }
                }
            },
            range: [0, 36],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 36 }
            }
        },

        'x = { set 10(w) { m_null = w } }': {
            type: 'ExpressionStatement',
            expression: {
                type: 'AssignmentExpression',
                operator: '=',
                left: {
                    type: 'Identifier',
                    name: 'x',
                    range: [0, 1],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 1 }
                    }
                },
                right: {
                    type: 'ObjectExpression',
                    properties: [{
                        type: 'Property',
                        key: {
                            type: 'Literal',
                            value: 10,
                            raw: '10',
                            range: [10, 12],
                            loc: {
                                start: { line: 1, column: 10 },
                                end: { line: 1, column: 12 }
                            }
                        },
                        value: {
                            type: 'FunctionExpression',
                            id: null,
                            params: [{
                                type: 'Identifier',
                                name: 'w',
                                range: [13, 14],
                                loc: {
                                    start: { line: 1, column: 13 },
                                    end: { line: 1, column: 14 }
                                }
                            }],
                            body: {
                                type: 'BlockStatement',
                                body: [{
                                    type: 'ExpressionStatement',
                                    expression: {
                                        type: 'AssignmentExpression',
                                        operator: '=',
                                        left: {
                                            type: 'Identifier',
                                            name: 'm_null',
                                            range: [18, 24],
                                            loc: {
                                                start: { line: 1, column: 18 },
                                                end: { line: 1, column: 24 }
                                            }
                                        },
                                        right: {
                                            type: 'Identifier',
                                            name: 'w',
                                            range: [27, 28],
                                            loc: {
                                                start: { line: 1, column: 27 },
                                                end: { line: 1, column: 28 }
                                            }
                                        },
                                        range: [18, 28],
                                        loc: {
                                            start: { line: 1, column: 18 },
                                            end: { line: 1, column: 28 }
                                        }
                                    },
                                    range: [18, 29],
                                    loc: {
                                        start: { line: 1, column: 18 },
                                        end: { line: 1, column: 29 }
                                    }
                                }],
                                range: [16, 30],
                                loc: {
                                    start: { line: 1, column: 16 },
                                    end: { line: 1, column: 30 }
                                }
                            },
                            range: [16, 30],
                            loc: {
                                start: { line: 1, column: 16 },
                                end: { line: 1, column: 30 }
                            }
                        },
                        kind: 'set',
                        range: [6, 30],
                        loc: {
                            start: { line: 1, column: 6 },
                            end: { line: 1, column: 30 }
                        }
                    }],
                    range: [4, 32],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 32 }
                    }
                },
                range: [0, 32],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 32 }
                }
            },
            range: [0, 32],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 32 }
            }
        },

        'x = { get: 42 }': {
            type: 'ExpressionStatement',
            expression: {
                type: 'AssignmentExpression',
                operator: '=',
                left: {
                    type: 'Identifier',
                    name: 'x',
                    range: [0, 1],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 1 }
                    }
                },
                right: {
                    type: 'ObjectExpression',
                    properties: [{
                        type: 'Property',
                        key: {
                            type: 'Identifier',
                            name: 'get',
                            range: [6, 9],
                            loc: {
                                start: { line: 1, column: 6 },
                                end: { line: 1, column: 9 }
                            }
                        },
                        value: {
                            type: 'Literal',
                            value: 42,
                            raw: '42',
                            range: [11, 13],
                            loc: {
                                start: { line: 1, column: 11 },
                                end: { line: 1, column: 13 }
                            }
                        },
                        kind: 'init',
                        range: [6, 13],
                        loc: {
                            start: { line: 1, column: 6 },
                            end: { line: 1, column: 13 }
                        }
                    }],
                    range: [4, 15],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 15 }
                    }
                },
                range: [0, 15],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 15 }
                }
            },
            range: [0, 15],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 15 }
            }
        },

        'x = { set: 43 }': {
            type: 'ExpressionStatement',
            expression: {
                type: 'AssignmentExpression',
                operator: '=',
                left: {
                    type: 'Identifier',
                    name: 'x',
                    range: [0, 1],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 1 }
                    }
                },
                right: {
                    type: 'ObjectExpression',
                    properties: [{
                        type: 'Property',
                        key: {
                            type: 'Identifier',
                            name: 'set',
                            range: [6, 9],
                            loc: {
                                start: { line: 1, column: 6 },
                                end: { line: 1, column: 9 }
                            }
                        },
                        value: {
                            type: 'Literal',
                            value: 43,
                            raw: '43',
                            range: [11, 13],
                            loc: {
                                start: { line: 1, column: 11 },
                                end: { line: 1, column: 13 }
                            }
                        },
                        kind: 'init',
                        range: [6, 13],
                        loc: {
                            start: { line: 1, column: 6 },
                            end: { line: 1, column: 13 }
                        }
                    }],
                    range: [4, 15],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 15 }
                    }
                },
                range: [0, 15],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 15 }
                }
            },
            range: [0, 15],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 15 }
            }
        }

    },

    Comments: {

        '/* block comment */ 42': {
            type: 'ExpressionStatement',
            expression: {
                type: 'Literal',
                value: 42,
                raw: '42',
                range: [20, 22],
                loc: {
                    start: { line: 1, column: 20 },
                    end: { line: 1, column: 22 }
                }
            },
            range: [20, 22],
            loc: {
                start: { line: 1, column: 20 },
                end: { line: 1, column: 22 }
            }
        },

        '42 /*The*/ /*Answer*/': {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'Literal',
                    value: 42,
                    raw: '42',
                    range: [0, 2],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 2 }
                    }
                },
                range: [0, 21],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 21 }
                }
            }],
            range: [0, 21],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 21 }
            },
            comments: [{
                range: [3, 10],
                type: 'Block',
                value: 'The'
            }, {
                range: [11, 21],
                type: 'Block',
                value: 'Answer'
            }]
        },

        '/* multiline\ncomment\nshould\nbe\nignored */ 42': {
            type: 'ExpressionStatement',
            expression: {
                type: 'Literal',
                value: 42,
                raw: '42',
                range: [42, 44],
                loc: {
                    start: { line: 5, column: 11 },
                    end: { line: 5, column: 13 }
                }
            },
            range: [42, 44],
            loc: {
                start: { line: 5, column: 11 },
                end: { line: 5, column: 13 }
            }
        },

        '/*a\r\nb*/ 42': {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'Literal',
                    value: 42,
                    raw: '42',
                    range: [9, 11],
                    loc: {
                        start: { line: 2, column: 4 },
                        end: { line: 2, column: 6 }
                    }
                },
                range: [9, 11],
                loc: {
                    start: { line: 2, column: 4 },
                    end: { line: 2, column: 6 }
                }
            }],
            range: [9, 11],
            loc: {
                start: { line: 2, column: 4 },
                end: { line: 2, column: 6 }
            },
            comments: [{
                range: [0, 8],
                type: 'Block',
                value: 'a\r\nb'
            }]
        },

        '/*a\rb*/ 42': {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'Literal',
                    value: 42,
                    raw: '42',
                    range: [8, 10],
                    loc: {
                        start: { line: 2, column: 4 },
                        end: { line: 2, column: 6 }
                    }
                },
                range: [8, 10],
                loc: {
                    start: { line: 2, column: 4 },
                    end: { line: 2, column: 6 }
                }
            }],
            range: [8, 10],
            loc: {
                start: { line: 2, column: 4 },
                end: { line: 2, column: 6 }
            },
            comments: [{
                range: [0, 7],
                type: 'Block',
                value: 'a\rb'
            }]
        },

        '/*a\nb*/ 42': {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'Literal',
                    value: 42,
                    raw: '42',
                    range: [8, 10],
                    loc: {
                        start: { line: 2, column: 4 },
                        end: { line: 2, column: 6 }
                    }
                },
                range: [8, 10],
                loc: {
                    start: { line: 2, column: 4 },
                    end: { line: 2, column: 6 }
                }
            }],
            range: [8, 10],
            loc: {
                start: { line: 2, column: 4 },
                end: { line: 2, column: 6 }
            },
            comments: [{
                range: [0, 7],
                type: 'Block',
                value: 'a\nb'
            }]
        },

        '// line comment\n42': {
            type: 'ExpressionStatement',
            expression: {
                type: 'Literal',
                value: 42,
                raw: '42',
                range: [16, 18],
                loc: {
                    start: { line: 2, column: 0 },
                    end: { line: 2, column: 2 }
                }
            },
            range: [16, 18],
            loc: {
                start: { line: 2, column: 0 },
                end: { line: 2, column: 2 }
            }
        },

        '42 // line comment': {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'Literal',
                    value: 42,
                    raw: '42',
                    range: [0, 2],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 2 }
                    }
                },
                range: [0, 18],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 18 }
                }
            }],
            range: [0, 18],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 18 }
            },
            comments: [{
                range: [3, 18],
                type: 'Line',
                value: ' line comment'
            }]
        },

        '// Hello, world!\n42': {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'Literal',
                    value: 42,
                    raw: '42',
                    range: [17, 19],
                    loc: {
                        start: { line: 2, column: 0 },
                        end: { line: 2, column: 2 }
                    }
                },
                range: [17, 19],
                loc: {
                    start: { line: 2, column: 0 },
                    end: { line: 2, column: 2 }
                }
            }],
            range: [17, 19],
            loc: {
                start: { line: 2, column: 0 },
                end: { line: 2, column: 2 }
            },
            comments: [{
                range: [0, 17],
                type: 'Line',
                value: ' Hello, world!'
            }]
        },

        '//\n42': {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'Literal',
                    value: 42,
                    raw: '42',
                    range: [3, 5],
                    loc: {
                        start: { line: 2, column: 0 },
                        end: { line: 2, column: 2 }
                    }
                },
                range: [3, 5],
                loc: {
                    start: { line: 2, column: 0 },
                    end: { line: 2, column: 2 }
                }
            }],
            range: [3, 5],
            loc: {
                start: { line: 2, column: 0 },
                end: { line: 2, column: 2 }
            },
            comments: [{
                range: [0, 3],
                type: 'Line',
                value: ''
            }]
        },

        '/**/42': {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'Literal',
                    value: 42,
                    raw: '42',
                    range: [4, 6],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 6 }
                    }
                },
                range: [4, 6],
                loc: {
                    start: { line: 1, column: 4 },
                    end: { line: 1, column: 6 }
                }
            }],
            range: [4, 6],
            loc: {
                start: { line: 1, column: 4 },
                end: { line: 1, column: 6 }
            },
            comments: [{
                range: [0, 4],
                type: 'Block',
                value: ''
            }]
        },

        '// Hello, world!\n\n//   Another hello\n42': {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'Literal',
                    value: 42,
                    raw: '42',
                    range: [37, 39],
                    loc: {
                        start: { line: 4, column: 0 },
                        end: { line: 4, column: 2 }
                    }
                },
                range: [37, 39],
                loc: {
                    start: { line: 4, column: 0 },
                    end: { line: 4, column: 2 }
                }
            }],
            range: [37, 39],
            loc: {
                start: { line: 4, column: 0 },
                end: { line: 4, column: 2 }
            },
            comments: [{
                range: [0, 17],
                type: 'Line',
                value: ' Hello, world!'
            }, {
                range: [18, 37],
                type: 'Line',
                value: '   Another hello'
            }]
        },

        'if (x) { // Some comment\ndoThat(); }': {
            type: 'Program',
            body: [{
                type: 'IfStatement',
                test: {
                    type: 'Identifier',
                    name: 'x',
                    range: [4, 5],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 5 }
                    }
                },
                consequent: {
                    type: 'BlockStatement',
                    body: [{
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'CallExpression',
                            callee: {
                                type: 'Identifier',
                                name: 'doThat',
                                range: [25, 31],
                                loc: {
                                    start: { line: 2, column: 0 },
                                    end: { line: 2, column: 6 }
                                }
                            },
                            arguments: [],
                            range: [25, 33],
                            loc: {
                                start: { line: 2, column: 0 },
                                end: { line: 2, column: 8 }
                            }
                        },
                        range: [25, 34],
                        loc: {
                            start: { line: 2, column: 0 },
                            end: { line: 2, column: 9 }
                        }
                    }],
                    range: [7, 36],
                    loc: {
                        start: { line: 1, column: 7 },
                        end: { line: 2, column: 11 }
                    }
                },
                alternate: null,
                range: [0, 36],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 2, column: 11 }
                }
            }],
            range: [0, 36],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 2, column: 11 }
            },
            comments: [{
                range: [9, 25],
                type: 'Line',
                value: ' Some comment'
            }]
        },

        'switch (answer) { case 42: /* perfect */ bingo() }': {
            type: 'Program',
            body: [{
                type: 'SwitchStatement',
                discriminant: {
                    type: 'Identifier',
                    name: 'answer',
                    range: [8, 14],
                    loc: {
                        start: { line: 1, column: 8 },
                        end: { line: 1, column: 14 }
                    }
                },
                cases: [{
                    type: 'SwitchCase',
                    test: {
                        type: 'Literal',
                        value: 42,
                        raw: '42',
                        range: [23, 25],
                        loc: {
                            start: { line: 1, column: 23 },
                            end: { line: 1, column: 25 }
                        }
                    },
                    consequent: [{
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'CallExpression',
                            callee: {
                                type: 'Identifier',
                                name: 'bingo',
                                range: [41, 46],
                                loc: {
                                    start: { line: 1, column: 41 },
                                    end: { line: 1, column: 46 }
                                }
                            },
                            arguments: [],
                            range: [41, 48],
                            loc: {
                                start: { line: 1, column: 41 },
                                end: { line: 1, column: 48 }
                            }
                        },
                        range: [41, 49],
                        loc: {
                            start: { line: 1, column: 41 },
                            end: { line: 1, column: 49 }
                        }
                    }],
                    range: [18, 49],
                    loc: {
                        start: { line: 1, column: 18 },
                        end: { line: 1, column: 49 }
                    }
                }],
                range: [0, 50],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 50 }
                }
            }],
            range: [0, 50],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 50 }
            },
            comments: [{
                range: [27, 40],
                type: 'Block',
                value: ' perfect '
            }]
        }

    },

    'Numeric Literals': {

        0: {
            type: 'ExpressionStatement',
            expression: {
                type: 'Literal',
                value: 0,
                raw: '0',
                range: [0, 1],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 1 }
                }
            },
            range: [0, 1],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 1 }
            }
        },

        42: {
            type: 'ExpressionStatement',
            expression: {
                type: 'Literal',
                value: 42,
                raw: '42',
                range: [0, 2],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 2 }
                }
            },
            range: [0, 2],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 2 }
            }
        },

        '.14': {
            type: 'ExpressionStatement',
            expression: {
                type: 'Literal',
                value: 0.14,
                raw: '.14',
                range: [0, 3],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 3 }
                }
            },
            range: [0, 3],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 3 }
            }
        },

        3.14159: {
            type: 'ExpressionStatement',
            expression: {
                type: 'Literal',
                value: 3.14159,
                raw: '3.14159',
                range: [0, 7],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 7 }
                }
            },
            range: [0, 7],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 7 }
            }
        },

        6.02214179e+23: {
            type: 'ExpressionStatement',
            expression: {
                type: 'Literal',
                value: 6.02214179e+23,
                raw: '6.02214179e+23',
                range: [0, 14],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 14 }
                }
            },
            range: [0, 14],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 14 }
            }
        },

        '1.492417830e-10': {
            type: 'ExpressionStatement',
            expression: {
                type: 'Literal',
                value: 1.49241783e-10,
                raw: '1.492417830e-10',
                range: [0, 15],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 15 }
                }
            },
            range: [0, 15],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 15 }
            }
        },

        '0x0': {
            type: 'ExpressionStatement',
            expression: {
                type: 'Literal',
                value: 0,
                raw: '0x0',
                range: [0, 3],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 3 }
                }
            },
            range: [0, 3],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 3 }
            }
        },

        '0e+100': {
            type: 'ExpressionStatement',
            expression: {
                type: 'Literal',
                value: 0,
                raw: '0e+100',
                range: [0, 6],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 6 }
                }
            },
            range: [0, 6],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 6 }
            }
        },

        '0xabc': {
            type: 'ExpressionStatement',
            expression: {
                type: 'Literal',
                value: 0xabc,
                raw: '0xabc',
                range: [0, 5],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 5 }
                }
            },
            range: [0, 5],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 5 }
            }
        },

        '0xdef': {
            type: 'ExpressionStatement',
            expression: {
                type: 'Literal',
                value: 0xdef,
                raw: '0xdef',
                range: [0, 5],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 5 }
                }
            },
            range: [0, 5],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 5 }
            }
        },

        '0X1A': {
            type: 'ExpressionStatement',
            expression: {
                type: 'Literal',
                value: 0x1A,
                raw: '0X1A',
                range: [0, 4],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 4 }
                }
            },
            range: [0, 4],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 4 }
            }
        },

        '0x10': {
            type: 'ExpressionStatement',
            expression: {
                type: 'Literal',
                value: 0x10,
                raw: '0x10',
                range: [0, 4],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 4 }
                }
            },
            range: [0, 4],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 4 }
            }
        },

        '0x100': {
            type: 'ExpressionStatement',
            expression: {
                type: 'Literal',
                value: 0x100,
                raw: '0x100',
                range: [0, 5],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 5 }
                }
            },
            range: [0, 5],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 5 }
            }
        },

        '0X04': {
            type: 'ExpressionStatement',
            expression: {
                type: 'Literal',
                value: 0X04,
                raw: '0X04',
                range: [0, 4],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 4 }
                }
            },
            range: [0, 4],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 4 }
            }
        },

        '02': {
            type: 'ExpressionStatement',
            expression: {
                type: 'Literal',
                value: 2,
                raw: '02',
                range: [0, 2],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 2 }
                }
            },
            range: [0, 2],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 2 }
            }
        },

        '012': {
            type: 'ExpressionStatement',
            expression: {
                type: 'Literal',
                value: 10,
                raw: '012',
                range: [0, 3],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 3 }
                }
            },
            range: [0, 3],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 3 }
            }
        },

        '0012': {
            type: 'ExpressionStatement',
            expression: {
                type: 'Literal',
                value: 10,
                raw: '0012',
                range: [0, 4],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 4 }
                }
            },
            range: [0, 4],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 4 }
            }
        }

    },

    'String Literals': {

        '"Hello"': {
            type: 'ExpressionStatement',
            expression: {
                type: 'Literal',
                value: 'Hello',
                raw: '"Hello"',
                range: [0, 7],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 7 }
                }
            },
            range: [0, 7],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 7 }
            }
        },

        '"\\n\\r\\t\\v\\b\\f\\\\\\\'\\"\\0"': {
            type: 'ExpressionStatement',
            expression: {
                type: 'Literal',
                value: '\n\r\t\v\b\f\\\'"\x00',
                raw: '"\\n\\r\\t\\v\\b\\f\\\\\\\'\\"\\0"',
                range: [0, 22],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 22 }
                }
            },
            range: [0, 22],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 22 }
            }
        },

        '"\\u0061"': {
            type: 'ExpressionStatement',
            expression: {
                type: 'Literal',
                value: 'a',
                raw: '"\\u0061"',
                range: [0, 8],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 8 }
                }
            },
            range: [0, 8],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 8 }
            }
        },

        '"\\x61"': {
            type: 'ExpressionStatement',
            expression: {
                type: 'Literal',
                value: 'a',
                raw: '"\\x61"',
                range: [0, 6],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 6 }
                }
            },
            range: [0, 6],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 6 }
            }
        },

        '"\\u00"': {
            type: 'ExpressionStatement',
            expression: {
                type: 'Literal',
                value: 'u00',
                raw: '"\\u00"',
                range: [0, 6],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 6 }
                }
            },
            range: [0, 6],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 6 }
            }
        },

        '"\\xt"': {
            type: 'ExpressionStatement',
            expression: {
                type: 'Literal',
                value: 'xt',
                raw: '"\\xt"',
                range: [0, 5],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 5 }
                }
            },
            range: [0, 5],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 5 }
            }
        },

        '"Hello\\nworld"': {
            type: 'ExpressionStatement',
            expression: {
                type: 'Literal',
                value: 'Hello\nworld',
                raw: '"Hello\\nworld"',
                range: [0, 14],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 14 }
                }
            },
            range: [0, 14],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 14 }
            }
        },

        '"Hello\\\nworld"': {
            type: 'ExpressionStatement',
            expression: {
                type: 'Literal',
                value: 'Helloworld',
                raw: '"Hello\\\nworld"',
                range: [0, 14],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 2, column: 14 }
                }
            },
            range: [0, 14],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 2, column: 14 }
            }
        },

        '"Hello\\02World"': {
            type: 'ExpressionStatement',
            expression: {
                type: 'Literal',
                value: 'Hello\u0002World',
                raw: '"Hello\\02World"',
                range: [0, 15],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 15 }
                }
            },
            range: [0, 15],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 15 }
            }
        },

        '"Hello\\012World"': {
            type: 'ExpressionStatement',
            expression: {
                type: 'Literal',
                value: 'Hello\u000AWorld',
                raw: '"Hello\\012World"',
                range: [0, 16],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 16 }
                }
            },
            range: [0, 16],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 16 }
            }
        },

        '"Hello\\122World"': {
            type: 'ExpressionStatement',
            expression: {
                type: 'Literal',
                value: 'HelloRWorld',
                raw: '"Hello\\122World"',
                range: [0, 16],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 16 }
                }
            },
            range: [0, 16],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 16 }
            }
        },

        '"Hello\\0122World"': {
            type: 'ExpressionStatement',
            expression: {
                type: 'Literal',
                value: 'Hello\u000A2World',
                raw: '"Hello\\0122World"',
                range: [0, 17],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 17 }
                }
            },
            range: [0, 17],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 17 }
            }
        },

        '"Hello\\312World"': {
            type: 'ExpressionStatement',
            expression: {
                type: 'Literal',
                value: 'Hello\u00CAWorld',
                raw: '"Hello\\312World"',
                range: [0, 16],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 16 }
                }
            },
            range: [0, 16],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 16 }
            }
        },

        '"Hello\\412World"': {
            type: 'ExpressionStatement',
            expression: {
                type: 'Literal',
                value: 'Hello!2World',
                raw: '"Hello\\412World"',
                range: [0, 16],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 16 }
                }
            },
            range: [0, 16],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 16 }
            }
        },

        '"Hello\\812World"': {
            type: 'ExpressionStatement',
            expression: {
                type: 'Literal',
                value: 'Hello812World',
                raw: '"Hello\\812World"',
                range: [0, 16],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 16 }
                }
            },
            range: [0, 16],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 16 }
            }
        },

        '"Hello\\712World"': {
            type: 'ExpressionStatement',
            expression: {
                type: 'Literal',
                value: 'Hello92World',
                raw: '"Hello\\712World"',
                range: [0, 16],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 16 }
                }
            },
            range: [0, 16],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 16 }
            }
        },

        '"Hello\\0World"': {
            type: 'ExpressionStatement',
            expression: {
                type: 'Literal',
                value: 'Hello\u0000World',
                raw: '"Hello\\0World"',
                range: [0, 14],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 14 }
                }
            },
            range: [0, 14],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 14 }
            }
        },

        '"Hello\\\r\nworld"': {
            type: 'ExpressionStatement',
            expression: {
                type: 'Literal',
                value: 'Helloworld',
                raw: '"Hello\\\r\nworld"',
                range: [0, 15],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 2, column: 15 }
                }
            },
            range: [0, 15],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 2, column: 15 }
            }
        },

        '"Hello\\1World"': {
            type: 'ExpressionStatement',
            expression: {
                type: 'Literal',
                value: 'Hello\u0001World',
                raw: '"Hello\\1World"',
                range: [0, 14],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 14 }
                }
            },
            range: [0, 14],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 14 }
            }
        }
    },

    'Regular Expression Literals': {

        'var x = /[a-z]/i': {
            type: 'Program',
            body: [{
                type: 'VariableDeclaration',
                declarations: [{
                    type: 'VariableDeclarator',
                    id: {
                        type: 'Identifier',
                        name: 'x',
                        range: [4, 5],
                        loc: {
                            start: { line: 1, column: 4 },
                            end: { line: 1, column: 5 }
                        }
                    },
                    init: {
                        type: 'Literal',
                        value: '/[a-z]/i',
                        raw: '/[a-z]/i',
                        range: [8, 16],
                        loc: {
                            start: { line: 1, column: 8 },
                            end: { line: 1, column: 16 }
                        }
                    },
                    range: [4, 16],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 16 }
                    }
                }],
                kind: 'var',
                range: [0, 16],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 16 }
                }
            }],
            range: [0, 16],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 16 }
            },
            tokens: [{
                type: 'Keyword',
                value: 'var',
                range: [0, 3]
            }, {
                type: 'Identifier',
                value: 'x',
                range: [4, 5]
            }, {
                type: 'Punctuator',
                value: '=',
                range: [6, 7]
            }, {
                type: 'RegularExpression',
                value: '/[a-z]/i',
                range: [8, 16]
            }]
        },

        'var x = /[P QR]/i': {
            type: 'Program',
            body: [{
                type: 'VariableDeclaration',
                declarations: [{
                    type: 'VariableDeclarator',
                    id: {
                        type: 'Identifier',
                        name: 'x',
                        range: [4, 5],
                        loc: {
                            start: { line: 1, column: 4 },
                            end: { line: 1, column: 5 }
                        }
                    },
                    init: {
                        type: 'Literal',
                        value: '/[P QR]/i',
                        raw: '/[P QR]/i',
                        range: [8, 17],
                        loc: {
                            start: { line: 1, column: 8 },
                            end: { line: 1, column: 17 }
                        }
                    },
                    range: [4, 17],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 17 }
                    }
                }],
                kind: 'var',
                range: [0, 17],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 17 }
                }
            }],
            range: [0, 17],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 17 }
            },
            tokens: [{
                type: 'Keyword',
                value: 'var',
                range: [0, 3]
            }, {
                type: 'Identifier',
                value: 'x',
                range: [4, 5]
            }, {
                type: 'Punctuator',
                value: '=',
                range: [6, 7]
            }, {
                type: 'RegularExpression',
                value: '/[P QR]/i',
                range: [8, 17]
            }]
        },

        'var x = /foo\\/bar/': {
            type: 'Program',
            body: [{
                type: 'VariableDeclaration',
                declarations: [{
                    type: 'VariableDeclarator',
                    id: {
                        type: 'Identifier',
                        name: 'x',
                        range: [4, 5],
                        loc: {
                            start: { line: 1, column: 4 },
                            end: { line: 1, column: 5 }
                        }
                    },
                    init: {
                        type: 'Literal',
                        value: '/foo\\/bar/',
                        raw: '/foo\\/bar/',
                        range: [8, 18],
                        loc: {
                            start: { line: 1, column: 8 },
                            end: { line: 1, column: 18 }
                        }
                    },
                    range: [4, 18],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 18 }
                    }
                }],
                kind: 'var',
                range: [0, 18],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 18 }
                }
            }],
            range: [0, 18],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 18 }
            },
            tokens: [{
                type: 'Keyword',
                value: 'var',
                range: [0, 3]
            }, {
                type: 'Identifier',
                value: 'x',
                range: [4, 5]
            }, {
                type: 'Punctuator',
                value: '=',
                range: [6, 7]
            }, {
                type: 'RegularExpression',
                value: '/foo\\/bar/',
                range: [8, 18]
            }]
        },

        'var x = /=([^=\\s])+/g': {
            type: 'Program',
            body: [{
                type: 'VariableDeclaration',
                declarations: [{
                    type: 'VariableDeclarator',
                    id: {
                        type: 'Identifier',
                        name: 'x',
                        range: [4, 5],
                        loc: {
                            start: { line: 1, column: 4 },
                            end: { line: 1, column: 5 }
                        }
                    },
                    init: {
                        type: 'Literal',
                        value: '/=([^=\\s])+/g',
                        raw: '/=([^=\\s])+/g',
                        range: [8, 21],
                        loc: {
                            start: { line: 1, column: 8 },
                            end: { line: 1, column: 21 }
                        }
                    },
                    range: [4, 21],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 21 }
                    }
                }],
                kind: 'var',
                range: [0, 21],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 21 }
                }
            }],
            range: [0, 21],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 21 }
            },
            tokens: [{
                type: 'Keyword',
                value: 'var',
                range: [0, 3]
            }, {
                type: 'Identifier',
                value: 'x',
                range: [4, 5]
            }, {
                type: 'Punctuator',
                value: '=',
                range: [6, 7]
            }, {
                type: 'RegularExpression',
                value: '/=([^=\\s])+/g',
                range: [8, 21]
            }]
        },

        'var x = /[P QR]/\\u0067': {
            type: 'Program',
            body: [{
                type: 'VariableDeclaration',
                declarations: [{
                    type: 'VariableDeclarator',
                    id: {
                        type: 'Identifier',
                        name: 'x',
                        range: [4, 5],
                        loc: {
                            start: { line: 1, column: 4 },
                            end: { line: 1, column: 5 }
                        }
                    },
                    init: {
                        type: 'Literal',
                        value: '/[P QR]/g',
                        raw: '/[P QR]/\\u0067',
                        range: [8, 22],
                        loc: {
                            start: { line: 1, column: 8 },
                            end: { line: 1, column: 22 }
                        }
                    },
                    range: [4, 22],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 22 }
                    }
                }],
                kind: 'var',
                range: [0, 22],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 22 }
                }
            }],
            range: [0, 22],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 22 }
            },
            tokens: [{
                type: 'Keyword',
                value: 'var',
                range: [0, 3]
            }, {
                type: 'Identifier',
                value: 'x',
                range: [4, 5]
            }, {
                type: 'Punctuator',
                value: '=',
                range: [6, 7]
            }, {
                type: 'RegularExpression',
                value: '/[P QR]/\\u0067',
                range: [8, 22]
            }]
        },

        'var x = /[P QR]/\\g': {
            type: 'Program',
            body: [{
                type: 'VariableDeclaration',
                declarations: [{
                    type: 'VariableDeclarator',
                    id: {
                        type: 'Identifier',
                        name: 'x',
                        range: [4, 5],
                        loc: {
                            start: { line: 1, column: 4 },
                            end: { line: 1, column: 5 }
                        }
                    },
                    init: {
                        type: 'Literal',
                        value: '/[P QR]/g',
                        raw: '/[P QR]/\\g',
                        range: [8, 18],
                        loc: {
                            start: { line: 1, column: 8 },
                            end: { line: 1, column: 18 }
                        }
                    },
                    range: [4, 18],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 18 }
                    }
                }],
                kind: 'var',
                range: [0, 18],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 18 }
                }
            }],
            range: [0, 18],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 18 }
            },
            tokens: [{
                type: 'Keyword',
                value: 'var',
                range: [0, 3]
            }, {
                type: 'Identifier',
                value: 'x',
                range: [4, 5]
            }, {
                type: 'Punctuator',
                value: '=',
                range: [6, 7]
            }, {
                type: 'RegularExpression',
                value: '/[P QR]/\\g',
                range: [8, 18]
            }]
        },

        'var x = /foo/i;': {
            generateFrom: {
                type: 'Program',
                body: [{
                    type: 'VariableDeclaration',
                    kind: 'var',
                    declarations: [{
                        type: 'VariableDeclarator',
                        id: {
                            type: 'Identifier',
                            name: 'x',
                        },
                        init: {
                            type: 'Literal',
                            value: null,
                            raw: '/foo/i',
                            regex: {
                                pattern: 'foo',
                                flags: 'i'
                            }
                        },
                    }]
                }],
            }
        },

        'var x = /Here\u2028are\u2029some\nspecial\rcharacters/;': {
            generateFrom: {
                type: 'Program',
                body: [
                    {
                        type: 'VariableDeclaration',
                        declarations: [
                            {
                                type: 'VariableDeclarator',
                                id: {
                                    type: 'Identifier',
                                    name: 'x'
                                },
                                init: {
                                    type: 'Literal',
                                    value: {},
                                    raw: '/Here\u2028are\u2029some\nspecial\rcharacters/',
                                    regex: {
                                        pattern: 'Here\u2028are\u2029some\nspecial\rcharacters',
                                        flags: ''
                                    }
                                }
                            }
                        ],
                        kind: 'var'
                    }
                ],
                sourceType: 'module'
            }
        },
        'var x = /Here\\u2028are\\u2029some\\/very\\nspecial\\rcharacters\\u2028for\\nyou/;': {
            generateFrom: {
                type: 'Program',
                body: [
                    {
                        type: 'VariableDeclaration',
                        declarations: [
                            {
                                type: 'VariableDeclarator',
                                id: {
                                    type: 'Identifier',
                                    name: 'x'
                                },
                                init: {
                                    type: 'Literal',
                                    value: {
                                        source: 'Here\u2028are\u2029some/very\nspecial\rcharacters\\\u2028for\\\nyou',
                                        toString () {
                                            return '/Here\u2028are\u2029some/very\nspecial\rcharacters\\\u2028for\\\nyou/';
                                        }
                                    }
                                }
                            }
                        ],
                        kind: 'var'
                    }
                ],
                sourceType: 'module'
            }
        },
        'var x = something;': {
            generateFrom: {
                type: 'Program',
                body: [
                    {
                        type: 'VariableDeclaration',
                        declarations: [
                            {
                                type: 'VariableDeclarator',
                                id: {
                                    type: 'Identifier',
                                    name: 'x'
                                },
                                init: {
                                    type: 'Literal',
                                    value: {
                                        source: 'something',
                                        toString () {
                                            return 'something';
                                        }
                                    }
                                }
                            }
                        ],
                        kind: 'var'
                    }
                ],
                sourceType: 'module'
            }
        }

    },

    'Left-Hand-Side Expression': {

        'new Button': {
            type: 'ExpressionStatement',
            expression: {
                type: 'NewExpression',
                callee: {
                    type: 'Identifier',
                    name: 'Button',
                    range: [4, 10],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 10 }
                    }
                },
                arguments: [],
                range: [0, 10],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 10 }
                }
            },
            range: [0, 10],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 10 }
            }
        },

        'new Button()': {
            type: 'ExpressionStatement',
            expression: {
                type: 'NewExpression',
                callee: {
                    type: 'Identifier',
                    name: 'Button',
                    range: [4, 10],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 10 }
                    }
                },
                arguments: [],
                range: [0, 12],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 12 }
                }
            },
            range: [0, 12],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 12 }
            }
        },

        'new new foo': {
            type: 'ExpressionStatement',
            expression: {
                type: 'NewExpression',
                callee: {
                    type: 'NewExpression',
                    callee: {
                        type: 'Identifier',
                        name: 'foo',
                        range: [8, 11],
                        loc: {
                            start: { line: 1, column: 8 },
                            end: { line: 1, column: 11 }
                        }
                    },
                    arguments: [],
                    range: [4, 11],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 11 }
                    }
                },
                arguments: [],
                range: [0, 11],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 11 }
                }
            },
            range: [0, 11],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 11 }
            }
        },

        'new new foo()': {
            type: 'ExpressionStatement',
            expression: {
                type: 'NewExpression',
                callee: {
                    type: 'NewExpression',
                    callee: {
                        type: 'Identifier',
                        name: 'foo',
                        range: [8, 11],
                        loc: {
                            start: { line: 1, column: 8 },
                            end: { line: 1, column: 11 }
                        }
                    },
                    arguments: [],
                    range: [4, 13],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 13 }
                    }
                },
                arguments: [],
                range: [0, 13],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 13 }
                }
            },
            range: [0, 13],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 13 }
            }
        },

        'new foo().bar()': {
            type: 'ExpressionStatement',
            expression: {
                type: 'CallExpression',
                callee: {
                    type: 'MemberExpression',
                    computed: false,
                    object: {
                        type: 'NewExpression',
                        callee: {
                            type: 'Identifier',
                            name: 'foo',
                            range: [4, 7],
                            loc: {
                                start: { line: 1, column: 4 },
                                end: { line: 1, column: 7 }
                            }
                        },
                        arguments: [],
                        range: [0, 9],
                        loc: {
                            start: { line: 1, column: 0 },
                            end: { line: 1, column: 9 }
                        }
                    },
                    property: {
                        type: 'Identifier',
                        name: 'bar',
                        range: [10, 13],
                        loc: {
                            start: { line: 1, column: 10 },
                            end: { line: 1, column: 13 }
                        }
                    },
                    range: [0, 13],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 13 }
                    }
                },
                arguments: [],
                range: [0, 15],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 15 }
                }
            },
            range: [0, 15],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 15 }
            }
        },

        'new foo[bar]': {
            type: 'ExpressionStatement',
            expression: {
                type: 'NewExpression',
                callee: {
                    type: 'MemberExpression',
                    computed: true,
                    object: {
                        type: 'Identifier',
                        name: 'foo',
                        range: [4, 7],
                        loc: {
                            start: { line: 1, column: 4 },
                            end: { line: 1, column: 7 }
                        }
                    },
                    property: {
                        type: 'Identifier',
                        name: 'bar',
                        range: [8, 11],
                        loc: {
                            start: { line: 1, column: 8 },
                            end: { line: 1, column: 11 }
                        }
                    },
                    range: [4, 12],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 12 }
                    }
                },
                arguments: [],
                range: [0, 12],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 12 }
                }
            },
            range: [0, 12],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 12 }
            }
        },


        'new foo.bar()': {
            type: 'ExpressionStatement',
            expression: {
                type: 'NewExpression',
                callee: {
                    type: 'MemberExpression',
                    computed: false,
                    object: {
                        type: 'Identifier',
                        name: 'foo',
                        range: [4, 7],
                        loc: {
                            start: { line: 1, column: 4 },
                            end: { line: 1, column: 7 }
                        }
                    },
                    property: {
                        type: 'Identifier',
                        name: 'bar',
                        range: [8, 11],
                        loc: {
                            start: { line: 1, column: 8 },
                            end: { line: 1, column: 11 }
                        }
                    },
                    range: [4, 11],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 11 }
                    }
                },
                arguments: [],
                range: [0, 13],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 13 }
                }
            },
            range: [0, 13],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 13 }
            }
        },

        'foo(bar, baz)': {
            type: 'ExpressionStatement',
            expression: {
                type: 'CallExpression',
                callee: {
                    type: 'Identifier',
                    name: 'foo',
                    range: [0, 3],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 3 }
                    }
                },
                arguments: [{
                    type: 'Identifier',
                    name: 'bar',
                    range: [4, 7],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 7 }
                    }
                }, {
                    type: 'Identifier',
                    name: 'baz',
                    range: [9, 12],
                    loc: {
                        start: { line: 1, column: 9 },
                        end: { line: 1, column: 12 }
                    }
                }],
                range: [0, 13],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 13 }
                }
            },
            range: [0, 13],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 13 }
            }
        },

        'universe.milkyway': {
            type: 'ExpressionStatement',
            expression: {
                type: 'MemberExpression',
                computed: false,
                object: {
                    type: 'Identifier',
                    name: 'universe',
                    range: [0, 8],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 8 }
                    }
                },
                property: {
                    type: 'Identifier',
                    name: 'milkyway',
                    range: [9, 17],
                    loc: {
                        start: { line: 1, column: 9 },
                        end: { line: 1, column: 17 }
                    }
                },
                range: [0, 17],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 17 }
                }
            },
            range: [0, 17],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 17 }
            }
        },

        'universe.milkyway.solarsystem': {
            type: 'ExpressionStatement',
            expression: {
                type: 'MemberExpression',
                computed: false,
                object: {
                    type: 'MemberExpression',
                    computed: false,
                    object: {
                        type: 'Identifier',
                        name: 'universe',
                        range: [0, 8],
                        loc: {
                            start: { line: 1, column: 0 },
                            end: { line: 1, column: 8 }
                        }
                    },
                    property: {
                        type: 'Identifier',
                        name: 'milkyway',
                        range: [9, 17],
                        loc: {
                            start: { line: 1, column: 9 },
                            end: { line: 1, column: 17 }
                        }
                    },
                    range: [0, 17],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 17 }
                    }
                },
                property: {
                    type: 'Identifier',
                    name: 'solarsystem',
                    range: [18, 29],
                    loc: {
                        start: { line: 1, column: 18 },
                        end: { line: 1, column: 29 }
                    }
                },
                range: [0, 29],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 29 }
                }
            },
            range: [0, 29],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 29 }
            }
        },

        'universe.milkyway.solarsystem.Earth': {
            type: 'ExpressionStatement',
            expression: {
                type: 'MemberExpression',
                computed: false,
                object: {
                    type: 'MemberExpression',
                    computed: false,
                    object: {
                        type: 'MemberExpression',
                        computed: false,
                        object: {
                            type: 'Identifier',
                            name: 'universe',
                            range: [0, 8],
                            loc: {
                                start: { line: 1, column: 0 },
                                end: { line: 1, column: 8 }
                            }
                        },
                        property: {
                            type: 'Identifier',
                            name: 'milkyway',
                            range: [9, 17],
                            loc: {
                                start: { line: 1, column: 9 },
                                end: { line: 1, column: 17 }
                            }
                        },
                        range: [0, 17],
                        loc: {
                            start: { line: 1, column: 0 },
                            end: { line: 1, column: 17 }
                        }
                    },
                    property: {
                        type: 'Identifier',
                        name: 'solarsystem',
                        range: [18, 29],
                        loc: {
                            start: { line: 1, column: 18 },
                            end: { line: 1, column: 29 }
                        }
                    },
                    range: [0, 29],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 29 }
                    }
                },
                property: {
                    type: 'Identifier',
                    name: 'Earth',
                    range: [30, 35],
                    loc: {
                        start: { line: 1, column: 30 },
                        end: { line: 1, column: 35 }
                    }
                },
                range: [0, 35],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 35 }
                }
            },
            range: [0, 35],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 35 }
            }
        },

        'universe[galaxyName, otherUselessName]': {
            type: 'ExpressionStatement',
            expression: {
                type: 'MemberExpression',
                computed: true,
                object: {
                    type: 'Identifier',
                    name: 'universe',
                    range: [0, 8],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 8 }
                    }
                },
                property: {
                    type: 'SequenceExpression',
                    expressions: [{
                        type: 'Identifier',
                        name: 'galaxyName',
                        range: [9, 19],
                        loc: {
                            start: { line: 1, column: 9 },
                            end: { line: 1, column: 19 }
                        }
                    }, {
                        type: 'Identifier',
                        name: 'otherUselessName',
                        range: [21, 37],
                        loc: {
                            start: { line: 1, column: 21 },
                            end: { line: 1, column: 37 }
                        }
                    }],
                    range: [9, 37],
                    loc: {
                        start: { line: 1, column: 9 },
                        end: { line: 1, column: 37 }
                    }
                },
                range: [0, 38],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 38 }
                }
            },
            range: [0, 38],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 38 }
            }
        },

        'universe[galaxyName]': {
            type: 'ExpressionStatement',
            expression: {
                type: 'MemberExpression',
                computed: true,
                object: {
                    type: 'Identifier',
                    name: 'universe',
                    range: [0, 8],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 8 }
                    }
                },
                property: {
                    type: 'Identifier',
                    name: 'galaxyName',
                    range: [9, 19],
                    loc: {
                        start: { line: 1, column: 9 },
                        end: { line: 1, column: 19 }
                    }
                },
                range: [0, 20],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 20 }
                }
            },
            range: [0, 20],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 20 }
            }
        },

        'universe[42].galaxies': {
            type: 'ExpressionStatement',
            expression: {
                type: 'MemberExpression',
                computed: false,
                object: {
                    type: 'MemberExpression',
                    computed: true,
                    object: {
                        type: 'Identifier',
                        name: 'universe',
                        range: [0, 8],
                        loc: {
                            start: { line: 1, column: 0 },
                            end: { line: 1, column: 8 }
                        }
                    },
                    property: {
                        type: 'Literal',
                        value: 42,
                        raw: '42',
                        range: [9, 11],
                        loc: {
                            start: { line: 1, column: 9 },
                            end: { line: 1, column: 11 }
                        }
                    },
                    range: [0, 12],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 12 }
                    }
                },
                property: {
                    type: 'Identifier',
                    name: 'galaxies',
                    range: [13, 21],
                    loc: {
                        start: { line: 1, column: 13 },
                        end: { line: 1, column: 21 }
                    }
                },
                range: [0, 21],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 21 }
                }
            },
            range: [0, 21],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 21 }
            }
        },

        'universe(42).galaxies': {
            type: 'ExpressionStatement',
            expression: {
                type: 'MemberExpression',
                computed: false,
                object: {
                    type: 'CallExpression',
                    callee: {
                        type: 'Identifier',
                        name: 'universe',
                        range: [0, 8],
                        loc: {
                            start: { line: 1, column: 0 },
                            end: { line: 1, column: 8 }
                        }
                    },
                    arguments: [{
                        type: 'Literal',
                        value: 42,
                        raw: '42',
                        range: [9, 11],
                        loc: {
                            start: { line: 1, column: 9 },
                            end: { line: 1, column: 11 }
                        }
                    }],
                    range: [8, 12],
                    loc: {
                        start: { line: 1, column: 8 },
                        end: { line: 1, column: 12 }
                    }
                },
                property: {
                    type: 'Identifier',
                    name: 'galaxies',
                    range: [13, 21],
                    loc: {
                        start: { line: 1, column: 13 },
                        end: { line: 1, column: 21 }
                    }
                },
                range: [8, 21],
                loc: {
                    start: { line: 1, column: 8 },
                    end: { line: 1, column: 21 }
                }
            },
            range: [0, 21],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 21 }
            }
        },

        'universe(42).galaxies(14, 3, 77).milkyway': {
            type: 'ExpressionStatement',
            expression: {
                type: 'MemberExpression',
                computed: false,
                object: {
                    type: 'CallExpression',
                    callee: {
                        type: 'MemberExpression',
                        computed: false,
                        object: {
                            type: 'CallExpression',
                            callee: {
                                type: 'Identifier',
                                name: 'universe',
                                range: [0, 8],
                                loc: {
                                    start: { line: 1, column: 0 },
                                    end: { line: 1, column: 8 }
                                }
                            },
                            arguments: [{
                                type: 'Literal',
                                value: 42,
                                raw: '42',
                                range: [9, 11],
                                loc: {
                                    start: { line: 1, column: 9 },
                                    end: { line: 1, column: 11 }
                                }
                            }],
                            range: [8, 12],
                            loc: {
                                start: { line: 1, column: 8 },
                                end: { line: 1, column: 12 }
                            }
                        },
                        property: {
                            type: 'Identifier',
                            name: 'galaxies',
                            range: [13, 21],
                            loc: {
                                start: { line: 1, column: 13 },
                                end: { line: 1, column: 21 }
                            }
                        },
                        range: [8, 21],
                        loc: {
                            start: { line: 1, column: 8 },
                            end: { line: 1, column: 21 }
                        }
                    },
                    arguments: [{
                        type: 'Literal',
                        value: 14,
                        raw: '14',
                        range: [22, 24],
                        loc: {
                            start: { line: 1, column: 22 },
                            end: { line: 1, column: 24 }
                        }
                    }, {
                        type: 'Literal',
                        value: 3,
                        raw: '3',
                        range: [26, 27],
                        loc: {
                            start: { line: 1, column: 26 },
                            end: { line: 1, column: 27 }
                        }
                    }, {
                        type: 'Literal',
                        value: 77,
                        raw: '77',
                        range: [29, 31],
                        loc: {
                            start: { line: 1, column: 29 },
                            end: { line: 1, column: 31 }
                        }
                    }],
                    range: [21, 32],
                    loc: {
                        start: { line: 1, column: 21 },
                        end: { line: 1, column: 32 }
                    }
                },
                property: {
                    type: 'Identifier',
                    name: 'milkyway',
                    range: [33, 41],
                    loc: {
                        start: { line: 1, column: 33 },
                        end: { line: 1, column: 41 }
                    }
                },
                range: [21, 41],
                loc: {
                    start: { line: 1, column: 21 },
                    end: { line: 1, column: 41 }
                }
            },
            range: [0, 41],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 41 }
            }
        },

        'earth.asia.Indonesia.prepareForElection(2014)': {
            type: 'ExpressionStatement',
            expression: {
                type: 'CallExpression',
                callee: {
                    type: 'MemberExpression',
                    computed: false,
                    object: {
                        type: 'MemberExpression',
                        computed: false,
                        object: {
                            type: 'MemberExpression',
                            computed: false,
                            object: {
                                type: 'Identifier',
                                name: 'earth',
                                range: [0, 5],
                                loc: {
                                    start: { line: 1, column: 0 },
                                    end: { line: 1, column: 5 }
                                }
                            },
                            property: {
                                type: 'Identifier',
                                name: 'asia',
                                range: [6, 10],
                                loc: {
                                    start: { line: 1, column: 6 },
                                    end: { line: 1, column: 10 }
                                }
                            },
                            range: [0, 10],
                            loc: {
                                start: { line: 1, column: 0 },
                                end: { line: 1, column: 10 }
                            }
                        },
                        property: {
                            type: 'Identifier',
                            name: 'Indonesia',
                            range: [11, 20],
                            loc: {
                                start: { line: 1, column: 11 },
                                end: { line: 1, column: 20 }
                            }
                        },
                        range: [0, 20],
                        loc: {
                            start: { line: 1, column: 0 },
                            end: { line: 1, column: 20 }
                        }
                    },
                    property: {
                        type: 'Identifier',
                        name: 'prepareForElection',
                        range: [21, 39],
                        loc: {
                            start: { line: 1, column: 21 },
                            end: { line: 1, column: 39 }
                        }
                    },
                    range: [0, 39],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 39 }
                    }
                },
                arguments: [{
                    type: 'Literal',
                    value: 2014,
                    raw: '2014',
                    range: [40, 44],
                    loc: {
                        start: { line: 1, column: 40 },
                        end: { line: 1, column: 44 }
                    }
                }],
                range: [0, 45],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 45 }
                }
            },
            range: [0, 45],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 45 }
            }
        },

        'universe.if': {
            type: 'ExpressionStatement',
            expression: {
                type: 'MemberExpression',
                computed: false,
                object: {
                    type: 'Identifier',
                    name: 'universe',
                    range: [0, 8],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 8 }
                    }
                },
                property: {
                    type: 'Identifier',
                    name: 'if',
                    range: [9, 11],
                    loc: {
                        start: { line: 1, column: 9 },
                        end: { line: 1, column: 11 }
                    }
                },
                range: [0, 11],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 11 }
                }
            },
            range: [0, 11],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 11 }
            }
        },

        'universe.true': {
            type: 'ExpressionStatement',
            expression: {
                type: 'MemberExpression',
                computed: false,
                object: {
                    type: 'Identifier',
                    name: 'universe',
                    range: [0, 8],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 8 }
                    }
                },
                property: {
                    type: 'Identifier',
                    name: 'true',
                    range: [9, 13],
                    loc: {
                        start: { line: 1, column: 9 },
                        end: { line: 1, column: 13 }
                    }
                },
                range: [0, 13],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 13 }
                }
            },
            range: [0, 13],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 13 }
            }
        },

        'universe.false': {
            type: 'ExpressionStatement',
            expression: {
                type: 'MemberExpression',
                computed: false,
                object: {
                    type: 'Identifier',
                    name: 'universe',
                    range: [0, 8],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 8 }
                    }
                },
                property: {
                    type: 'Identifier',
                    name: 'false',
                    range: [9, 14],
                    loc: {
                        start: { line: 1, column: 9 },
                        end: { line: 1, column: 14 }
                    }
                },
                range: [0, 14],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 14 }
                }
            },
            range: [0, 14],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 14 }
            }
        },

        'universe.null': {
            type: 'ExpressionStatement',
            expression: {
                type: 'MemberExpression',
                computed: false,
                object: {
                    type: 'Identifier',
                    name: 'universe',
                    range: [0, 8],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 8 }
                    }
                },
                property: {
                    type: 'Identifier',
                    name: 'null',
                    range: [9, 13],
                    loc: {
                        start: { line: 1, column: 9 },
                        end: { line: 1, column: 13 }
                    }
                },
                range: [0, 13],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 13 }
                }
            },
            range: [0, 13],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 13 }
            }
        }

    },

    'Postfix Expressions': {

        'x++': {
            type: 'ExpressionStatement',
            expression: {
                type: 'UpdateExpression',
                operator: '++',
                argument: {
                    type: 'Identifier',
                    name: 'x',
                    range: [0, 1],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 1 }
                    }
                },
                prefix: false,
                range: [0, 3],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 3 }
                }
            },
            range: [0, 3],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 3 }
            }
        },

        'x--': {
            type: 'ExpressionStatement',
            expression: {
                type: 'UpdateExpression',
                operator: '--',
                argument: {
                    type: 'Identifier',
                    name: 'x',
                    range: [0, 1],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 1 }
                    }
                },
                prefix: false,
                range: [0, 3],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 3 }
                }
            },
            range: [0, 3],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 3 }
            }
        },

        'eval++': {
            type: 'ExpressionStatement',
            expression: {
                type: 'UpdateExpression',
                operator: '++',
                argument: {
                    type: 'Identifier',
                    name: 'eval',
                    range: [0, 4],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 4 }
                    }
                },
                prefix: false,
                range: [0, 6],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 6 }
                }
            },
            range: [0, 6],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 6 }
            }
        },

        'eval--': {
            type: 'ExpressionStatement',
            expression: {
                type: 'UpdateExpression',
                operator: '--',
                argument: {
                    type: 'Identifier',
                    name: 'eval',
                    range: [0, 4],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 4 }
                    }
                },
                prefix: false,
                range: [0, 6],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 6 }
                }
            },
            range: [0, 6],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 6 }
            }
        },

        'arguments++': {
            type: 'ExpressionStatement',
            expression: {
                type: 'UpdateExpression',
                operator: '++',
                argument: {
                    type: 'Identifier',
                    name: 'arguments',
                    range: [0, 9],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 9 }
                    }
                },
                prefix: false,
                range: [0, 11],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 11 }
                }
            },
            range: [0, 11],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 11 }
            }
        },

        'arguments--': {
            type: 'ExpressionStatement',
            expression: {
                type: 'UpdateExpression',
                operator: '--',
                argument: {
                    type: 'Identifier',
                    name: 'arguments',
                    range: [0, 9],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 9 }
                    }
                },
                prefix: false,
                range: [0, 11],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 11 }
                }
            },
            range: [0, 11],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 11 }
            }
        }

    },

    'Unary Operators': {

        '++x': {
            type: 'ExpressionStatement',
            expression: {
                type: 'UpdateExpression',
                operator: '++',
                argument: {
                    type: 'Identifier',
                    name: 'x',
                    range: [2, 3],
                    loc: {
                        start: { line: 1, column: 2 },
                        end: { line: 1, column: 3 }
                    }
                },
                prefix: true,
                range: [0, 3],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 3 }
                }
            },
            range: [0, 3],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 3 }
            }
        },

        '+ ++x': {
            type: 'Program',
            body:
           [ { type: 'ExpressionStatement',
               expression:
                { type: 'UnaryExpression',
                    operator: '+',
                    argument:
                   { type: 'UpdateExpression',
                       operator: '++',
                       argument:
                      { type: 'Identifier',
                          name: 'x',
                          range: [ 4, 5 ],
                          loc:
                         { start: { line: 1, column: 4 },
                             end: { line: 1, column: 5 } } },
                       prefix: true,
                       range: [ 1, 6 ],
                       loc:
                      { start: { line: 1, column: 1 },
                          end: { line: 1, column: 6 } } },
                    range: [ 0, 6 ],
                    loc:
                   { start: { line: 1, column: 0 },
                       end: { line: 1, column: 6 } } },
               range: [ 0, 6 ],
               loc:
                { start: { line: 1, column: 0 },
                    end: { line: 1, column: 6 } } } ],
            range: [ 0, 6 ],
            loc:
           { start: { line: 1, column: 0 },
               end: { line: 1, column: 6 } } },

        '--x': {
            type: 'ExpressionStatement',
            expression: {
                type: 'UpdateExpression',
                operator: '--',
                argument: {
                    type: 'Identifier',
                    name: 'x',
                    range: [2, 3],
                    loc: {
                        start: { line: 1, column: 2 },
                        end: { line: 1, column: 3 }
                    }
                },
                prefix: true,
                range: [0, 3],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 3 }
                }
            },
            range: [0, 3],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 3 }
            }
        },

        '- --x': {
            type: 'Program',
            body:
           [ { type: 'ExpressionStatement',
               expression:
                { type: 'UnaryExpression',
                    operator: '-',
                    argument:
                   { type: 'UpdateExpression',
                       operator: '--',
                       argument:
                      { type: 'Identifier',
                          name: 'x',
                          range: [ 4, 5 ],
                          loc:
                         { start: { line: 1, column: 4 },
                             end: { line: 1, column: 5 } } },
                       prefix: true,
                       range: [ 1, 6 ],
                       loc:
                      { start: { line: 1, column: 1 },
                          end: { line: 1, column: 6 } } },
                    range: [ 0, 6 ],
                    loc:
                   { start: { line: 1, column: 0 },
                       end: { line: 1, column: 6 } } },
               range: [ 0, 6 ],
               loc:
                { start: { line: 1, column: 0 },
                    end: { line: 1, column: 6 } } } ],
            range: [ 0, 6 ],
            loc:
           { start: { line: 1, column: 0 },
               end: { line: 1, column: 6 } } },

        '++eval': {
            type: 'ExpressionStatement',
            expression: {
                type: 'UpdateExpression',
                operator: '++',
                argument: {
                    type: 'Identifier',
                    name: 'eval',
                    range: [2, 6],
                    loc: {
                        start: { line: 1, column: 2 },
                        end: { line: 1, column: 6 }
                    }
                },
                prefix: true,
                range: [0, 6],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 6 }
                }
            },
            range: [0, 6],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 6 }
            }
        },

        '--eval': {
            type: 'ExpressionStatement',
            expression: {
                type: 'UpdateExpression',
                operator: '--',
                argument: {
                    type: 'Identifier',
                    name: 'eval',
                    range: [2, 6],
                    loc: {
                        start: { line: 1, column: 2 },
                        end: { line: 1, column: 6 }
                    }
                },
                prefix: true,
                range: [0, 6],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 6 }
                }
            },
            range: [0, 6],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 6 }
            }
        },

        '++arguments': {
            type: 'ExpressionStatement',
            expression: {
                type: 'UpdateExpression',
                operator: '++',
                argument: {
                    type: 'Identifier',
                    name: 'arguments',
                    range: [2, 11],
                    loc: {
                        start: { line: 1, column: 2 },
                        end: { line: 1, column: 11 }
                    }
                },
                prefix: true,
                range: [0, 11],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 11 }
                }
            },
            range: [0, 11],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 11 }
            }
        },

        '--arguments': {
            type: 'ExpressionStatement',
            expression: {
                type: 'UpdateExpression',
                operator: '--',
                argument: {
                    type: 'Identifier',
                    name: 'arguments',
                    range: [2, 11],
                    loc: {
                        start: { line: 1, column: 2 },
                        end: { line: 1, column: 11 }
                    }
                },
                prefix: true,
                range: [0, 11],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 11 }
                }
            },
            range: [0, 11],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 11 }
            }
        },

        '+x': {
            type: 'ExpressionStatement',
            expression: {
                type: 'UnaryExpression',
                operator: '+',
                argument: {
                    type: 'Identifier',
                    name: 'x',
                    range: [1, 2],
                    loc: {
                        start: { line: 1, column: 1 },
                        end: { line: 1, column: 2 }
                    }
                },
                range: [0, 2],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 2 }
                }
            },
            range: [0, 2],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 2 }
            }
        },

        '-x': {
            type: 'ExpressionStatement',
            expression: {
                type: 'UnaryExpression',
                operator: '-',
                argument: {
                    type: 'Identifier',
                    name: 'x',
                    range: [1, 2],
                    loc: {
                        start: { line: 1, column: 1 },
                        end: { line: 1, column: 2 }
                    }
                },
                range: [0, 2],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 2 }
                }
            },
            range: [0, 2],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 2 }
            }
        },

        '~x': {
            type: 'ExpressionStatement',
            expression: {
                type: 'UnaryExpression',
                operator: '~',
                argument: {
                    type: 'Identifier',
                    name: 'x',
                    range: [1, 2],
                    loc: {
                        start: { line: 1, column: 1 },
                        end: { line: 1, column: 2 }
                    }
                },
                range: [0, 2],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 2 }
                }
            },
            range: [0, 2],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 2 }
            }
        },

        '!x': {
            type: 'ExpressionStatement',
            expression: {
                type: 'UnaryExpression',
                operator: '!',
                argument: {
                    type: 'Identifier',
                    name: 'x',
                    range: [1, 2],
                    loc: {
                        start: { line: 1, column: 1 },
                        end: { line: 1, column: 2 }
                    }
                },
                range: [0, 2],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 2 }
                }
            },
            range: [0, 2],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 2 }
            }
        },

        'void x': {
            type: 'ExpressionStatement',
            expression: {
                type: 'UnaryExpression',
                operator: 'void',
                argument: {
                    type: 'Identifier',
                    name: 'x',
                    range: [5, 6],
                    loc: {
                        start: { line: 1, column: 5 },
                        end: { line: 1, column: 6 }
                    }
                },
                range: [0, 6],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 6 }
                }
            },
            range: [0, 6],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 6 }
            }
        },

        'delete x': {
            type: 'ExpressionStatement',
            expression: {
                type: 'UnaryExpression',
                operator: 'delete',
                argument: {
                    type: 'Identifier',
                    name: 'x',
                    range: [7, 8],
                    loc: {
                        start: { line: 1, column: 7 },
                        end: { line: 1, column: 8 }
                    }
                },
                range: [0, 8],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 8 }
                }
            },
            range: [0, 8],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 8 }
            }
        },

        'typeof x': {
            type: 'ExpressionStatement',
            expression: {
                type: 'UnaryExpression',
                operator: 'typeof',
                argument: {
                    type: 'Identifier',
                    name: 'x',
                    range: [7, 8],
                    loc: {
                        start: { line: 1, column: 7 },
                        end: { line: 1, column: 8 }
                    }
                },
                range: [0, 8],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 8 }
                }
            },
            range: [0, 8],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 8 }
            }
        },

        // If a single-character identifier part could be a unary
        //  operator, add a space
        '_ x;': {
            generateFrom: {
                type: 'ExpressionStatement',
                expression: {
                    type: 'UnaryExpression',
                    operator: '_',
                    argument: {
                        type: 'Identifier',
                        name: 'x',
                        range: [5, 6],
                        loc: {
                            start: { line: 1, column: 5 },
                            end: { line: 1, column: 6 }
                        }
                    },
                    range: [0, 6],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 6 }
                    }
                },
                range: [0, 6],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 6 }
                }
            }
        }
    },

    'Multiplicative Operators': {

        'x * y': {
            type: 'ExpressionStatement',
            expression: {
                type: 'BinaryExpression',
                operator: '*',
                left: {
                    type: 'Identifier',
                    name: 'x',
                    range: [0, 1],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 1 }
                    }
                },
                right: {
                    type: 'Identifier',
                    name: 'y',
                    range: [4, 5],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 5 }
                    }
                },
                range: [0, 5],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 5 }
                }
            },
            range: [0, 5],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 5 }
            }
        },

        'x / y': {
            type: 'ExpressionStatement',
            expression: {
                type: 'BinaryExpression',
                operator: '/',
                left: {
                    type: 'Identifier',
                    name: 'x',
                    range: [0, 1],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 1 }
                    }
                },
                right: {
                    type: 'Identifier',
                    name: 'y',
                    range: [4, 5],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 5 }
                    }
                },
                range: [0, 5],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 5 }
                }
            },
            range: [0, 5],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 5 }
            }
        },

        'x % y': {
            type: 'ExpressionStatement',
            expression: {
                type: 'BinaryExpression',
                operator: '%',
                left: {
                    type: 'Identifier',
                    name: 'x',
                    range: [0, 1],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 1 }
                    }
                },
                right: {
                    type: 'Identifier',
                    name: 'y',
                    range: [4, 5],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 5 }
                    }
                },
                range: [0, 5],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 5 }
                }
            },
            range: [0, 5],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 5 }
            }
        }

    },

    'Additive Operators': {

        'x + y': {
            type: 'ExpressionStatement',
            expression: {
                type: 'BinaryExpression',
                operator: '+',
                left: {
                    type: 'Identifier',
                    name: 'x',
                    range: [0, 1],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 1 }
                    }
                },
                right: {
                    type: 'Identifier',
                    name: 'y',
                    range: [4, 5],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 5 }
                    }
                },
                range: [0, 5],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 5 }
                }
            },
            range: [0, 5],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 5 }
            }
        },

        'x - y': {
            type: 'ExpressionStatement',
            expression: {
                type: 'BinaryExpression',
                operator: '-',
                left: {
                    type: 'Identifier',
                    name: 'x',
                    range: [0, 1],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 1 }
                    }
                },
                right: {
                    type: 'Identifier',
                    name: 'y',
                    range: [4, 5],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 5 }
                    }
                },
                range: [0, 5],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 5 }
                }
            },
            range: [0, 5],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 5 }
            }
        }

    },

    'Bitwise Shift Operator': {

        'x << y': {
            type: 'ExpressionStatement',
            expression: {
                type: 'BinaryExpression',
                operator: '<<',
                left: {
                    type: 'Identifier',
                    name: 'x',
                    range: [0, 1],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 1 }
                    }
                },
                right: {
                    type: 'Identifier',
                    name: 'y',
                    range: [5, 6],
                    loc: {
                        start: { line: 1, column: 5 },
                        end: { line: 1, column: 6 }
                    }
                },
                range: [0, 6],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 6 }
                }
            },
            range: [0, 6],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 6 }
            }
        },

        'x >> y': {
            type: 'ExpressionStatement',
            expression: {
                type: 'BinaryExpression',
                operator: '>>',
                left: {
                    type: 'Identifier',
                    name: 'x',
                    range: [0, 1],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 1 }
                    }
                },
                right: {
                    type: 'Identifier',
                    name: 'y',
                    range: [5, 6],
                    loc: {
                        start: { line: 1, column: 5 },
                        end: { line: 1, column: 6 }
                    }
                },
                range: [0, 6],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 6 }
                }
            },
            range: [0, 6],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 6 }
            }
        },

        'x >>> y': {
            type: 'ExpressionStatement',
            expression: {
                type: 'BinaryExpression',
                operator: '>>>',
                left: {
                    type: 'Identifier',
                    name: 'x',
                    range: [0, 1],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 1 }
                    }
                },
                right: {
                    type: 'Identifier',
                    name: 'y',
                    range: [6, 7],
                    loc: {
                        start: { line: 1, column: 6 },
                        end: { line: 1, column: 7 }
                    }
                },
                range: [0, 7],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 7 }
                }
            },
            range: [0, 7],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 7 }
            }
        }

    },

    'Relational Operators': {

        'x < y': {
            type: 'ExpressionStatement',
            expression: {
                type: 'BinaryExpression',
                operator: '<',
                left: {
                    type: 'Identifier',
                    name: 'x',
                    range: [0, 1],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 1 }
                    }
                },
                right: {
                    type: 'Identifier',
                    name: 'y',
                    range: [4, 5],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 5 }
                    }
                },
                range: [0, 5],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 5 }
                }
            },
            range: [0, 5],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 5 }
            }
        },

        'x > y': {
            type: 'ExpressionStatement',
            expression: {
                type: 'BinaryExpression',
                operator: '>',
                left: {
                    type: 'Identifier',
                    name: 'x',
                    range: [0, 1],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 1 }
                    }
                },
                right: {
                    type: 'Identifier',
                    name: 'y',
                    range: [4, 5],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 5 }
                    }
                },
                range: [0, 5],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 5 }
                }
            },
            range: [0, 5],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 5 }
            }
        },

        'x <= y': {
            type: 'ExpressionStatement',
            expression: {
                type: 'BinaryExpression',
                operator: '<=',
                left: {
                    type: 'Identifier',
                    name: 'x',
                    range: [0, 1],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 1 }
                    }
                },
                right: {
                    type: 'Identifier',
                    name: 'y',
                    range: [5, 6],
                    loc: {
                        start: { line: 1, column: 5 },
                        end: { line: 1, column: 6 }
                    }
                },
                range: [0, 6],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 6 }
                }
            },
            range: [0, 6],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 6 }
            }
        },

        'x >= y': {
            type: 'ExpressionStatement',
            expression: {
                type: 'BinaryExpression',
                operator: '>=',
                left: {
                    type: 'Identifier',
                    name: 'x',
                    range: [0, 1],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 1 }
                    }
                },
                right: {
                    type: 'Identifier',
                    name: 'y',
                    range: [5, 6],
                    loc: {
                        start: { line: 1, column: 5 },
                        end: { line: 1, column: 6 }
                    }
                },
                range: [0, 6],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 6 }
                }
            },
            range: [0, 6],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 6 }
            }
        },

        'x in y': {
            type: 'ExpressionStatement',
            expression: {
                type: 'BinaryExpression',
                operator: 'in',
                left: {
                    type: 'Identifier',
                    name: 'x',
                    range: [0, 1],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 1 }
                    }
                },
                right: {
                    type: 'Identifier',
                    name: 'y',
                    range: [5, 6],
                    loc: {
                        start: { line: 1, column: 5 },
                        end: { line: 1, column: 6 }
                    }
                },
                range: [0, 6],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 6 }
                }
            },
            range: [0, 6],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 6 }
            }
        },

        'x instanceof y': {
            type: 'ExpressionStatement',
            expression: {
                type: 'BinaryExpression',
                operator: 'instanceof',
                left: {
                    type: 'Identifier',
                    name: 'x',
                    range: [0, 1],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 1 }
                    }
                },
                right: {
                    type: 'Identifier',
                    name: 'y',
                    range: [13, 14],
                    loc: {
                        start: { line: 1, column: 13 },
                        end: { line: 1, column: 14 }
                    }
                },
                range: [0, 14],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 14 }
                }
            },
            range: [0, 14],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 14 }
            }
        }

    },

    'Equality Operators': {

        'x == y': {
            type: 'ExpressionStatement',
            expression: {
                type: 'BinaryExpression',
                operator: '==',
                left: {
                    type: 'Identifier',
                    name: 'x',
                    range: [0, 1],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 1 }
                    }
                },
                right: {
                    type: 'Identifier',
                    name: 'y',
                    range: [5, 6],
                    loc: {
                        start: { line: 1, column: 5 },
                        end: { line: 1, column: 6 }
                    }
                },
                range: [0, 6],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 6 }
                }
            },
            range: [0, 6],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 6 }
            }
        },

        'x != y': {
            type: 'ExpressionStatement',
            expression: {
                type: 'BinaryExpression',
                operator: '!=',
                left: {
                    type: 'Identifier',
                    name: 'x',
                    range: [0, 1],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 1 }
                    }
                },
                right: {
                    type: 'Identifier',
                    name: 'y',
                    range: [5, 6],
                    loc: {
                        start: { line: 1, column: 5 },
                        end: { line: 1, column: 6 }
                    }
                },
                range: [0, 6],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 6 }
                }
            },
            range: [0, 6],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 6 }
            }
        },

        'x === y': {
            type: 'ExpressionStatement',
            expression: {
                type: 'BinaryExpression',
                operator: '===',
                left: {
                    type: 'Identifier',
                    name: 'x',
                    range: [0, 1],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 1 }
                    }
                },
                right: {
                    type: 'Identifier',
                    name: 'y',
                    range: [6, 7],
                    loc: {
                        start: { line: 1, column: 6 },
                        end: { line: 1, column: 7 }
                    }
                },
                range: [0, 7],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 7 }
                }
            },
            range: [0, 7],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 7 }
            }
        },

        'x !== y': {
            type: 'ExpressionStatement',
            expression: {
                type: 'BinaryExpression',
                operator: '!==',
                left: {
                    type: 'Identifier',
                    name: 'x',
                    range: [0, 1],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 1 }
                    }
                },
                right: {
                    type: 'Identifier',
                    name: 'y',
                    range: [6, 7],
                    loc: {
                        start: { line: 1, column: 6 },
                        end: { line: 1, column: 7 }
                    }
                },
                range: [0, 7],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 7 }
                }
            },
            range: [0, 7],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 7 }
            }
        }

    },

    'Binary Bitwise Operators': {

        'x & y': {
            type: 'ExpressionStatement',
            expression: {
                type: 'BinaryExpression',
                operator: '&',
                left: {
                    type: 'Identifier',
                    name: 'x',
                    range: [0, 1],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 1 }
                    }
                },
                right: {
                    type: 'Identifier',
                    name: 'y',
                    range: [4, 5],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 5 }
                    }
                },
                range: [0, 5],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 5 }
                }
            },
            range: [0, 5],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 5 }
            }
        },

        'x ^ y': {
            type: 'ExpressionStatement',
            expression: {
                type: 'BinaryExpression',
                operator: '^',
                left: {
                    type: 'Identifier',
                    name: 'x',
                    range: [0, 1],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 1 }
                    }
                },
                right: {
                    type: 'Identifier',
                    name: 'y',
                    range: [4, 5],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 5 }
                    }
                },
                range: [0, 5],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 5 }
                }
            },
            range: [0, 5],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 5 }
            }
        },

        'x | y': {
            type: 'ExpressionStatement',
            expression: {
                type: 'BinaryExpression',
                operator: '|',
                left: {
                    type: 'Identifier',
                    name: 'x',
                    range: [0, 1],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 1 }
                    }
                },
                right: {
                    type: 'Identifier',
                    name: 'y',
                    range: [4, 5],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 5 }
                    }
                },
                range: [0, 5],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 5 }
                }
            },
            range: [0, 5],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 5 }
            }
        }

    },

    'Binary Expressions': {

        'x + y + z': {
            type: 'ExpressionStatement',
            expression: {
                type: 'BinaryExpression',
                operator: '+',
                left: {
                    type: 'BinaryExpression',
                    operator: '+',
                    left: {
                        type: 'Identifier',
                        name: 'x',
                        range: [0, 1],
                        loc: {
                            start: { line: 1, column: 0 },
                            end: { line: 1, column: 1 }
                        }
                    },
                    right: {
                        type: 'Identifier',
                        name: 'y',
                        range: [4, 5],
                        loc: {
                            start: { line: 1, column: 4 },
                            end: { line: 1, column: 5 }
                        }
                    },
                    range: [0, 5],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 5 }
                    }
                },
                right: {
                    type: 'Identifier',
                    name: 'z',
                    range: [8, 9],
                    loc: {
                        start: { line: 1, column: 8 },
                        end: { line: 1, column: 9 }
                    }
                },
                range: [0, 9],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 9 }
                }
            },
            range: [0, 9],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 9 }
            }
        },

        'x - y + z': {
            type: 'ExpressionStatement',
            expression: {
                type: 'BinaryExpression',
                operator: '+',
                left: {
                    type: 'BinaryExpression',
                    operator: '-',
                    left: {
                        type: 'Identifier',
                        name: 'x',
                        range: [0, 1],
                        loc: {
                            start: { line: 1, column: 0 },
                            end: { line: 1, column: 1 }
                        }
                    },
                    right: {
                        type: 'Identifier',
                        name: 'y',
                        range: [4, 5],
                        loc: {
                            start: { line: 1, column: 4 },
                            end: { line: 1, column: 5 }
                        }
                    },
                    range: [0, 5],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 5 }
                    }
                },
                right: {
                    type: 'Identifier',
                    name: 'z',
                    range: [8, 9],
                    loc: {
                        start: { line: 1, column: 8 },
                        end: { line: 1, column: 9 }
                    }
                },
                range: [0, 9],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 9 }
                }
            },
            range: [0, 9],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 9 }
            }
        },

        'x + y - z': {
            type: 'ExpressionStatement',
            expression: {
                type: 'BinaryExpression',
                operator: '-',
                left: {
                    type: 'BinaryExpression',
                    operator: '+',
                    left: {
                        type: 'Identifier',
                        name: 'x',
                        range: [0, 1],
                        loc: {
                            start: { line: 1, column: 0 },
                            end: { line: 1, column: 1 }
                        }
                    },
                    right: {
                        type: 'Identifier',
                        name: 'y',
                        range: [4, 5],
                        loc: {
                            start: { line: 1, column: 4 },
                            end: { line: 1, column: 5 }
                        }
                    },
                    range: [0, 5],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 5 }
                    }
                },
                right: {
                    type: 'Identifier',
                    name: 'z',
                    range: [8, 9],
                    loc: {
                        start: { line: 1, column: 8 },
                        end: { line: 1, column: 9 }
                    }
                },
                range: [0, 9],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 9 }
                }
            },
            range: [0, 9],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 9 }
            }
        },

        'x - y - z': {
            type: 'ExpressionStatement',
            expression: {
                type: 'BinaryExpression',
                operator: '-',
                left: {
                    type: 'BinaryExpression',
                    operator: '-',
                    left: {
                        type: 'Identifier',
                        name: 'x',
                        range: [0, 1],
                        loc: {
                            start: { line: 1, column: 0 },
                            end: { line: 1, column: 1 }
                        }
                    },
                    right: {
                        type: 'Identifier',
                        name: 'y',
                        range: [4, 5],
                        loc: {
                            start: { line: 1, column: 4 },
                            end: { line: 1, column: 5 }
                        }
                    },
                    range: [0, 5],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 5 }
                    }
                },
                right: {
                    type: 'Identifier',
                    name: 'z',
                    range: [8, 9],
                    loc: {
                        start: { line: 1, column: 8 },
                        end: { line: 1, column: 9 }
                    }
                },
                range: [0, 9],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 9 }
                }
            },
            range: [0, 9],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 9 }
            }
        },

        'x + y * z': {
            type: 'ExpressionStatement',
            expression: {
                type: 'BinaryExpression',
                operator: '+',
                left: {
                    type: 'Identifier',
                    name: 'x',
                    range: [0, 1],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 1 }
                    }
                },
                right: {
                    type: 'BinaryExpression',
                    operator: '*',
                    left: {
                        type: 'Identifier',
                        name: 'y',
                        range: [4, 5],
                        loc: {
                            start: { line: 1, column: 4 },
                            end: { line: 1, column: 5 }
                        }
                    },
                    right: {
                        type: 'Identifier',
                        name: 'z',
                        range: [8, 9],
                        loc: {
                            start: { line: 1, column: 8 },
                            end: { line: 1, column: 9 }
                        }
                    },
                    range: [4, 9],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 9 }
                    }
                },
                range: [0, 9],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 9 }
                }
            },
            range: [0, 9],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 9 }
            }
        },

        'x + y / z': {
            type: 'ExpressionStatement',
            expression: {
                type: 'BinaryExpression',
                operator: '+',
                left: {
                    type: 'Identifier',
                    name: 'x',
                    range: [0, 1],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 1 }
                    }
                },
                right: {
                    type: 'BinaryExpression',
                    operator: '/',
                    left: {
                        type: 'Identifier',
                        name: 'y',
                        range: [4, 5],
                        loc: {
                            start: { line: 1, column: 4 },
                            end: { line: 1, column: 5 }
                        }
                    },
                    right: {
                        type: 'Identifier',
                        name: 'z',
                        range: [8, 9],
                        loc: {
                            start: { line: 1, column: 8 },
                            end: { line: 1, column: 9 }
                        }
                    },
                    range: [4, 9],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 9 }
                    }
                },
                range: [0, 9],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 9 }
                }
            },
            range: [0, 9],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 9 }
            }
        },

        'x - y % z': {
            type: 'ExpressionStatement',
            expression: {
                type: 'BinaryExpression',
                operator: '-',
                left: {
                    type: 'Identifier',
                    name: 'x',
                    range: [0, 1],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 1 }
                    }
                },
                right: {
                    type: 'BinaryExpression',
                    operator: '%',
                    left: {
                        type: 'Identifier',
                        name: 'y',
                        range: [4, 5],
                        loc: {
                            start: { line: 1, column: 4 },
                            end: { line: 1, column: 5 }
                        }
                    },
                    right: {
                        type: 'Identifier',
                        name: 'z',
                        range: [8, 9],
                        loc: {
                            start: { line: 1, column: 8 },
                            end: { line: 1, column: 9 }
                        }
                    },
                    range: [4, 9],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 9 }
                    }
                },
                range: [0, 9],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 9 }
                }
            },
            range: [0, 9],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 9 }
            }
        },

        'x * y * z': {
            type: 'ExpressionStatement',
            expression: {
                type: 'BinaryExpression',
                operator: '*',
                left: {
                    type: 'BinaryExpression',
                    operator: '*',
                    left: {
                        type: 'Identifier',
                        name: 'x',
                        range: [0, 1],
                        loc: {
                            start: { line: 1, column: 0 },
                            end: { line: 1, column: 1 }
                        }
                    },
                    right: {
                        type: 'Identifier',
                        name: 'y',
                        range: [4, 5],
                        loc: {
                            start: { line: 1, column: 4 },
                            end: { line: 1, column: 5 }
                        }
                    },
                    range: [0, 5],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 5 }
                    }
                },
                right: {
                    type: 'Identifier',
                    name: 'z',
                    range: [8, 9],
                    loc: {
                        start: { line: 1, column: 8 },
                        end: { line: 1, column: 9 }
                    }
                },
                range: [0, 9],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 9 }
                }
            },
            range: [0, 9],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 9 }
            }
        },

        'x * y / z': {
            type: 'ExpressionStatement',
            expression: {
                type: 'BinaryExpression',
                operator: '/',
                left: {
                    type: 'BinaryExpression',
                    operator: '*',
                    left: {
                        type: 'Identifier',
                        name: 'x',
                        range: [0, 1],
                        loc: {
                            start: { line: 1, column: 0 },
                            end: { line: 1, column: 1 }
                        }
                    },
                    right: {
                        type: 'Identifier',
                        name: 'y',
                        range: [4, 5],
                        loc: {
                            start: { line: 1, column: 4 },
                            end: { line: 1, column: 5 }
                        }
                    },
                    range: [0, 5],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 5 }
                    }
                },
                right: {
                    type: 'Identifier',
                    name: 'z',
                    range: [8, 9],
                    loc: {
                        start: { line: 1, column: 8 },
                        end: { line: 1, column: 9 }
                    }
                },
                range: [0, 9],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 9 }
                }
            },
            range: [0, 9],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 9 }
            }
        },

        'x * y % z': {
            type: 'ExpressionStatement',
            expression: {
                type: 'BinaryExpression',
                operator: '%',
                left: {
                    type: 'BinaryExpression',
                    operator: '*',
                    left: {
                        type: 'Identifier',
                        name: 'x',
                        range: [0, 1],
                        loc: {
                            start: { line: 1, column: 0 },
                            end: { line: 1, column: 1 }
                        }
                    },
                    right: {
                        type: 'Identifier',
                        name: 'y',
                        range: [4, 5],
                        loc: {
                            start: { line: 1, column: 4 },
                            end: { line: 1, column: 5 }
                        }
                    },
                    range: [0, 5],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 5 }
                    }
                },
                right: {
                    type: 'Identifier',
                    name: 'z',
                    range: [8, 9],
                    loc: {
                        start: { line: 1, column: 8 },
                        end: { line: 1, column: 9 }
                    }
                },
                range: [0, 9],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 9 }
                }
            },
            range: [0, 9],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 9 }
            }
        },

        'x % y * z': {
            type: 'ExpressionStatement',
            expression: {
                type: 'BinaryExpression',
                operator: '*',
                left: {
                    type: 'BinaryExpression',
                    operator: '%',
                    left: {
                        type: 'Identifier',
                        name: 'x',
                        range: [0, 1],
                        loc: {
                            start: { line: 1, column: 0 },
                            end: { line: 1, column: 1 }
                        }
                    },
                    right: {
                        type: 'Identifier',
                        name: 'y',
                        range: [4, 5],
                        loc: {
                            start: { line: 1, column: 4 },
                            end: { line: 1, column: 5 }
                        }
                    },
                    range: [0, 5],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 5 }
                    }
                },
                right: {
                    type: 'Identifier',
                    name: 'z',
                    range: [8, 9],
                    loc: {
                        start: { line: 1, column: 8 },
                        end: { line: 1, column: 9 }
                    }
                },
                range: [0, 9],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 9 }
                }
            },
            range: [0, 9],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 9 }
            }
        },

        'x << y << z': {
            type: 'ExpressionStatement',
            expression: {
                type: 'BinaryExpression',
                operator: '<<',
                left: {
                    type: 'BinaryExpression',
                    operator: '<<',
                    left: {
                        type: 'Identifier',
                        name: 'x',
                        range: [0, 1],
                        loc: {
                            start: { line: 1, column: 0 },
                            end: { line: 1, column: 1 }
                        }
                    },
                    right: {
                        type: 'Identifier',
                        name: 'y',
                        range: [5, 6],
                        loc: {
                            start: { line: 1, column: 5 },
                            end: { line: 1, column: 6 }
                        }
                    },
                    range: [0, 6],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 6 }
                    }
                },
                right: {
                    type: 'Identifier',
                    name: 'z',
                    range: [10, 11],
                    loc: {
                        start: { line: 1, column: 10 },
                        end: { line: 1, column: 11 }
                    }
                },
                range: [0, 11],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 11 }
                }
            },
            range: [0, 11],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 11 }
            }
        },

        'x | y | z': {
            type: 'ExpressionStatement',
            expression: {
                type: 'BinaryExpression',
                operator: '|',
                left: {
                    type: 'BinaryExpression',
                    operator: '|',
                    left: {
                        type: 'Identifier',
                        name: 'x',
                        range: [0, 1],
                        loc: {
                            start: { line: 1, column: 0 },
                            end: { line: 1, column: 1 }
                        }
                    },
                    right: {
                        type: 'Identifier',
                        name: 'y',
                        range: [4, 5],
                        loc: {
                            start: { line: 1, column: 4 },
                            end: { line: 1, column: 5 }
                        }
                    },
                    range: [0, 5],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 5 }
                    }
                },
                right: {
                    type: 'Identifier',
                    name: 'z',
                    range: [8, 9],
                    loc: {
                        start: { line: 1, column: 8 },
                        end: { line: 1, column: 9 }
                    }
                },
                range: [0, 9],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 9 }
                }
            },
            range: [0, 9],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 9 }
            }
        },

        'x & y & z': {
            type: 'ExpressionStatement',
            expression: {
                type: 'BinaryExpression',
                operator: '&',
                left: {
                    type: 'BinaryExpression',
                    operator: '&',
                    left: {
                        type: 'Identifier',
                        name: 'x',
                        range: [0, 1],
                        loc: {
                            start: { line: 1, column: 0 },
                            end: { line: 1, column: 1 }
                        }
                    },
                    right: {
                        type: 'Identifier',
                        name: 'y',
                        range: [4, 5],
                        loc: {
                            start: { line: 1, column: 4 },
                            end: { line: 1, column: 5 }
                        }
                    },
                    range: [0, 5],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 5 }
                    }
                },
                right: {
                    type: 'Identifier',
                    name: 'z',
                    range: [8, 9],
                    loc: {
                        start: { line: 1, column: 8 },
                        end: { line: 1, column: 9 }
                    }
                },
                range: [0, 9],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 9 }
                }
            },
            range: [0, 9],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 9 }
            }
        },

        'x ^ y ^ z': {
            type: 'ExpressionStatement',
            expression: {
                type: 'BinaryExpression',
                operator: '^',
                left: {
                    type: 'BinaryExpression',
                    operator: '^',
                    left: {
                        type: 'Identifier',
                        name: 'x',
                        range: [0, 1],
                        loc: {
                            start: { line: 1, column: 0 },
                            end: { line: 1, column: 1 }
                        }
                    },
                    right: {
                        type: 'Identifier',
                        name: 'y',
                        range: [4, 5],
                        loc: {
                            start: { line: 1, column: 4 },
                            end: { line: 1, column: 5 }
                        }
                    },
                    range: [0, 5],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 5 }
                    }
                },
                right: {
                    type: 'Identifier',
                    name: 'z',
                    range: [8, 9],
                    loc: {
                        start: { line: 1, column: 8 },
                        end: { line: 1, column: 9 }
                    }
                },
                range: [0, 9],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 9 }
                }
            },
            range: [0, 9],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 9 }
            }
        },

        'x & y | z': {
            type: 'ExpressionStatement',
            expression: {
                type: 'BinaryExpression',
                operator: '|',
                left: {
                    type: 'BinaryExpression',
                    operator: '&',
                    left: {
                        type: 'Identifier',
                        name: 'x',
                        range: [0, 1],
                        loc: {
                            start: { line: 1, column: 0 },
                            end: { line: 1, column: 1 }
                        }
                    },
                    right: {
                        type: 'Identifier',
                        name: 'y',
                        range: [4, 5],
                        loc: {
                            start: { line: 1, column: 4 },
                            end: { line: 1, column: 5 }
                        }
                    },
                    range: [0, 5],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 5 }
                    }
                },
                right: {
                    type: 'Identifier',
                    name: 'z',
                    range: [8, 9],
                    loc: {
                        start: { line: 1, column: 8 },
                        end: { line: 1, column: 9 }
                    }
                },
                range: [0, 9],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 9 }
                }
            },
            range: [0, 9],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 9 }
            }
        },

        'x | y ^ z': {
            type: 'ExpressionStatement',
            expression: {
                type: 'BinaryExpression',
                operator: '|',
                left: {
                    type: 'Identifier',
                    name: 'x',
                    range: [0, 1],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 1 }
                    }
                },
                right: {
                    type: 'BinaryExpression',
                    operator: '^',
                    left: {
                        type: 'Identifier',
                        name: 'y',
                        range: [4, 5],
                        loc: {
                            start: { line: 1, column: 4 },
                            end: { line: 1, column: 5 }
                        }
                    },
                    right: {
                        type: 'Identifier',
                        name: 'z',
                        range: [8, 9],
                        loc: {
                            start: { line: 1, column: 8 },
                            end: { line: 1, column: 9 }
                        }
                    },
                    range: [4, 9],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 9 }
                    }
                },
                range: [0, 9],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 9 }
                }
            },
            range: [0, 9],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 9 }
            }
        },

        'x | y & z': {
            type: 'ExpressionStatement',
            expression: {
                type: 'BinaryExpression',
                operator: '|',
                left: {
                    type: 'Identifier',
                    name: 'x',
                    range: [0, 1],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 1 }
                    }
                },
                right: {
                    type: 'BinaryExpression',
                    operator: '&',
                    left: {
                        type: 'Identifier',
                        name: 'y',
                        range: [4, 5],
                        loc: {
                            start: { line: 1, column: 4 },
                            end: { line: 1, column: 5 }
                        }
                    },
                    right: {
                        type: 'Identifier',
                        name: 'z',
                        range: [8, 9],
                        loc: {
                            start: { line: 1, column: 8 },
                            end: { line: 1, column: 9 }
                        }
                    },
                    range: [4, 9],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 9 }
                    }
                },
                range: [0, 9],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 9 }
                }
            },
            range: [0, 9],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 9 }
            }
        }

    },

    'Binary Logical Operators': {

        'x || y': {
            type: 'ExpressionStatement',
            expression: {
                type: 'LogicalExpression',
                operator: '||',
                left: {
                    type: 'Identifier',
                    name: 'x',
                    range: [0, 1],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 1 }
                    }
                },
                right: {
                    type: 'Identifier',
                    name: 'y',
                    range: [5, 6],
                    loc: {
                        start: { line: 1, column: 5 },
                        end: { line: 1, column: 6 }
                    }
                },
                range: [0, 6],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 6 }
                }
            },
            range: [0, 6],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 6 }
            }
        },

        'x && y': {
            type: 'ExpressionStatement',
            expression: {
                type: 'LogicalExpression',
                operator: '&&',
                left: {
                    type: 'Identifier',
                    name: 'x',
                    range: [0, 1],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 1 }
                    }
                },
                right: {
                    type: 'Identifier',
                    name: 'y',
                    range: [5, 6],
                    loc: {
                        start: { line: 1, column: 5 },
                        end: { line: 1, column: 6 }
                    }
                },
                range: [0, 6],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 6 }
                }
            },
            range: [0, 6],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 6 }
            }
        },

        'x || y || z': {
            type: 'ExpressionStatement',
            expression: {
                type: 'LogicalExpression',
                operator: '||',
                left: {
                    type: 'LogicalExpression',
                    operator: '||',
                    left: {
                        type: 'Identifier',
                        name: 'x',
                        range: [0, 1],
                        loc: {
                            start: { line: 1, column: 0 },
                            end: { line: 1, column: 1 }
                        }
                    },
                    right: {
                        type: 'Identifier',
                        name: 'y',
                        range: [5, 6],
                        loc: {
                            start: { line: 1, column: 5 },
                            end: { line: 1, column: 6 }
                        }
                    },
                    range: [0, 6],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 6 }
                    }
                },
                right: {
                    type: 'Identifier',
                    name: 'z',
                    range: [10, 11],
                    loc: {
                        start: { line: 1, column: 10 },
                        end: { line: 1, column: 11 }
                    }
                },
                range: [0, 11],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 11 }
                }
            },
            range: [0, 11],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 11 }
            }
        },

        'x && y && z': {
            type: 'ExpressionStatement',
            expression: {
                type: 'LogicalExpression',
                operator: '&&',
                left: {
                    type: 'LogicalExpression',
                    operator: '&&',
                    left: {
                        type: 'Identifier',
                        name: 'x',
                        range: [0, 1],
                        loc: {
                            start: { line: 1, column: 0 },
                            end: { line: 1, column: 1 }
                        }
                    },
                    right: {
                        type: 'Identifier',
                        name: 'y',
                        range: [5, 6],
                        loc: {
                            start: { line: 1, column: 5 },
                            end: { line: 1, column: 6 }
                        }
                    },
                    range: [0, 6],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 6 }
                    }
                },
                right: {
                    type: 'Identifier',
                    name: 'z',
                    range: [10, 11],
                    loc: {
                        start: { line: 1, column: 10 },
                        end: { line: 1, column: 11 }
                    }
                },
                range: [0, 11],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 11 }
                }
            },
            range: [0, 11],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 11 }
            }
        },

        'x || y && z': {
            type: 'ExpressionStatement',
            expression: {
                type: 'LogicalExpression',
                operator: '||',
                left: {
                    type: 'Identifier',
                    name: 'x',
                    range: [0, 1],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 1 }
                    }
                },
                right: {
                    type: 'LogicalExpression',
                    operator: '&&',
                    left: {
                        type: 'Identifier',
                        name: 'y',
                        range: [5, 6],
                        loc: {
                            start: { line: 1, column: 5 },
                            end: { line: 1, column: 6 }
                        }
                    },
                    right: {
                        type: 'Identifier',
                        name: 'z',
                        range: [10, 11],
                        loc: {
                            start: { line: 1, column: 10 },
                            end: { line: 1, column: 11 }
                        }
                    },
                    range: [5, 11],
                    loc: {
                        start: { line: 1, column: 5 },
                        end: { line: 1, column: 11 }
                    }
                },
                range: [0, 11],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 11 }
                }
            },
            range: [0, 11],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 11 }
            }
        },

        'x || y ^ z': {
            type: 'ExpressionStatement',
            expression: {
                type: 'LogicalExpression',
                operator: '||',
                left: {
                    type: 'Identifier',
                    name: 'x',
                    range: [0, 1],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 1 }
                    }
                },
                right: {
                    type: 'BinaryExpression',
                    operator: '^',
                    left: {
                        type: 'Identifier',
                        name: 'y',
                        range: [5, 6],
                        loc: {
                            start: { line: 1, column: 5 },
                            end: { line: 1, column: 6 }
                        }
                    },
                    right: {
                        type: 'Identifier',
                        name: 'z',
                        range: [9, 10],
                        loc: {
                            start: { line: 1, column: 9 },
                            end: { line: 1, column: 10 }
                        }
                    },
                    range: [5, 10],
                    loc: {
                        start: { line: 1, column: 5 },
                        end: { line: 1, column: 10 }
                    }
                },
                range: [0, 10],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 10 }
                }
            },
            range: [0, 10],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 10 }
            }
        }

    },

    'Conditional Operator': {

        'y ? 1 : 2': {
            type: 'ExpressionStatement',
            expression: {
                type: 'ConditionalExpression',
                test: {
                    type: 'Identifier',
                    name: 'y',
                    range: [0, 1],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 1 }
                    }
                },
                consequent: {
                    type: 'Literal',
                    value: 1,
                    raw: '1',
                    range: [4, 5],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 5 }
                    }
                },
                alternate: {
                    type: 'Literal',
                    value: 2,
                    raw: '2',
                    range: [8, 9],
                    loc: {
                        start: { line: 1, column: 8 },
                        end: { line: 1, column: 9 }
                    }
                },
                range: [0, 9],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 9 }
                }
            },
            range: [0, 9],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 9 }
            }
        },

        'x && y ? 1 : 2': {
            type: 'ExpressionStatement',
            expression: {
                type: 'ConditionalExpression',
                test: {
                    type: 'LogicalExpression',
                    operator: '&&',
                    left: {
                        type: 'Identifier',
                        name: 'x',
                        range: [0, 1],
                        loc: {
                            start: { line: 1, column: 0 },
                            end: { line: 1, column: 1 }
                        }
                    },
                    right: {
                        type: 'Identifier',
                        name: 'y',
                        range: [5, 6],
                        loc: {
                            start: { line: 1, column: 5 },
                            end: { line: 1, column: 6 }
                        }
                    },
                    range: [0, 6],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 6 }
                    }
                },
                consequent: {
                    type: 'Literal',
                    value: 1,
                    raw: '1',
                    range: [9, 10],
                    loc: {
                        start: { line: 1, column: 9 },
                        end: { line: 1, column: 10 }
                    }
                },
                alternate: {
                    type: 'Literal',
                    value: 2,
                    raw: '2',
                    range: [13, 14],
                    loc: {
                        start: { line: 1, column: 13 },
                        end: { line: 1, column: 14 }
                    }
                },
                range: [0, 14],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 14 }
                }
            },
            range: [0, 14],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 14 }
            }
        }

    },

    'Assignment Operators': {

        'x = 42': {
            type: 'ExpressionStatement',
            expression: {
                type: 'AssignmentExpression',
                operator: '=',
                left: {
                    type: 'Identifier',
                    name: 'x',
                    range: [0, 1],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 1 }
                    }
                },
                right: {
                    type: 'Literal',
                    value: 42,
                    raw: '42',
                    range: [4, 6],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 6 }
                    }
                },
                range: [0, 6],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 6 }
                }
            },
            range: [0, 6],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 6 }
            }
        },

        'eval = 42': {
            type: 'ExpressionStatement',
            expression: {
                type: 'AssignmentExpression',
                operator: '=',
                left: {
                    type: 'Identifier',
                    name: 'eval',
                    range: [0, 4],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 4 }
                    }
                },
                right: {
                    type: 'Literal',
                    value: 42,
                    raw: '42',
                    range: [7, 9],
                    loc: {
                        start: { line: 1, column: 7 },
                        end: { line: 1, column: 9 }
                    }
                },
                range: [0, 9],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 9 }
                }
            },
            range: [0, 9],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 9 }
            }
        },

        'arguments = 42': {
            type: 'ExpressionStatement',
            expression: {
                type: 'AssignmentExpression',
                operator: '=',
                left: {
                    type: 'Identifier',
                    name: 'arguments',
                    range: [0, 9],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 9 }
                    }
                },
                right: {
                    type: 'Literal',
                    value: 42,
                    raw: '42',
                    range: [12, 14],
                    loc: {
                        start: { line: 1, column: 12 },
                        end: { line: 1, column: 14 }
                    }
                },
                range: [0, 14],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 14 }
                }
            },
            range: [0, 14],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 14 }
            }
        },

        'x *= 42': {
            type: 'ExpressionStatement',
            expression: {
                type: 'AssignmentExpression',
                operator: '*=',
                left: {
                    type: 'Identifier',
                    name: 'x',
                    range: [0, 1],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 1 }
                    }
                },
                right: {
                    type: 'Literal',
                    value: 42,
                    raw: '42',
                    range: [5, 7],
                    loc: {
                        start: { line: 1, column: 5 },
                        end: { line: 1, column: 7 }
                    }
                },
                range: [0, 7],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 7 }
                }
            },
            range: [0, 7],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 7 }
            }
        },

        'x /= 42': {
            type: 'ExpressionStatement',
            expression: {
                type: 'AssignmentExpression',
                operator: '/=',
                left: {
                    type: 'Identifier',
                    name: 'x',
                    range: [0, 1],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 1 }
                    }
                },
                right: {
                    type: 'Literal',
                    value: 42,
                    raw: '42',
                    range: [5, 7],
                    loc: {
                        start: { line: 1, column: 5 },
                        end: { line: 1, column: 7 }
                    }
                },
                range: [0, 7],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 7 }
                }
            },
            range: [0, 7],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 7 }
            }
        },

        'x %= 42': {
            type: 'ExpressionStatement',
            expression: {
                type: 'AssignmentExpression',
                operator: '%=',
                left: {
                    type: 'Identifier',
                    name: 'x',
                    range: [0, 1],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 1 }
                    }
                },
                right: {
                    type: 'Literal',
                    value: 42,
                    raw: '42',
                    range: [5, 7],
                    loc: {
                        start: { line: 1, column: 5 },
                        end: { line: 1, column: 7 }
                    }
                },
                range: [0, 7],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 7 }
                }
            },
            range: [0, 7],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 7 }
            }
        },

        'x += 42': {
            type: 'ExpressionStatement',
            expression: {
                type: 'AssignmentExpression',
                operator: '+=',
                left: {
                    type: 'Identifier',
                    name: 'x',
                    range: [0, 1],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 1 }
                    }
                },
                right: {
                    type: 'Literal',
                    value: 42,
                    raw: '42',
                    range: [5, 7],
                    loc: {
                        start: { line: 1, column: 5 },
                        end: { line: 1, column: 7 }
                    }
                },
                range: [0, 7],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 7 }
                }
            },
            range: [0, 7],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 7 }
            }
        },

        'x -= 42': {
            type: 'ExpressionStatement',
            expression: {
                type: 'AssignmentExpression',
                operator: '-=',
                left: {
                    type: 'Identifier',
                    name: 'x',
                    range: [0, 1],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 1 }
                    }
                },
                right: {
                    type: 'Literal',
                    value: 42,
                    raw: '42',
                    range: [5, 7],
                    loc: {
                        start: { line: 1, column: 5 },
                        end: { line: 1, column: 7 }
                    }
                },
                range: [0, 7],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 7 }
                }
            },
            range: [0, 7],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 7 }
            }
        },

        'x <<= 42': {
            type: 'ExpressionStatement',
            expression: {
                type: 'AssignmentExpression',
                operator: '<<=',
                left: {
                    type: 'Identifier',
                    name: 'x',
                    range: [0, 1],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 1 }
                    }
                },
                right: {
                    type: 'Literal',
                    value: 42,
                    raw: '42',
                    range: [6, 8],
                    loc: {
                        start: { line: 1, column: 6 },
                        end: { line: 1, column: 8 }
                    }
                },
                range: [0, 8],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 8 }
                }
            },
            range: [0, 8],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 8 }
            }
        },

        'x >>= 42': {
            type: 'ExpressionStatement',
            expression: {
                type: 'AssignmentExpression',
                operator: '>>=',
                left: {
                    type: 'Identifier',
                    name: 'x',
                    range: [0, 1],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 1 }
                    }
                },
                right: {
                    type: 'Literal',
                    value: 42,
                    raw: '42',
                    range: [6, 8],
                    loc: {
                        start: { line: 1, column: 6 },
                        end: { line: 1, column: 8 }
                    }
                },
                range: [0, 8],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 8 }
                }
            },
            range: [0, 8],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 8 }
            }
        },

        'x >>>= 42': {
            type: 'ExpressionStatement',
            expression: {
                type: 'AssignmentExpression',
                operator: '>>>=',
                left: {
                    type: 'Identifier',
                    name: 'x',
                    range: [0, 1],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 1 }
                    }
                },
                right: {
                    type: 'Literal',
                    value: 42,
                    raw: '42',
                    range: [7, 9],
                    loc: {
                        start: { line: 1, column: 7 },
                        end: { line: 1, column: 9 }
                    }
                },
                range: [0, 9],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 9 }
                }
            },
            range: [0, 9],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 9 }
            }
        },

        'x &= 42': {
            type: 'ExpressionStatement',
            expression: {
                type: 'AssignmentExpression',
                operator: '&=',
                left: {
                    type: 'Identifier',
                    name: 'x',
                    range: [0, 1],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 1 }
                    }
                },
                right: {
                    type: 'Literal',
                    value: 42,
                    raw: '42',
                    range: [5, 7],
                    loc: {
                        start: { line: 1, column: 5 },
                        end: { line: 1, column: 7 }
                    }
                },
                range: [0, 7],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 7 }
                }
            },
            range: [0, 7],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 7 }
            }
        },

        'x ^= 42': {
            type: 'ExpressionStatement',
            expression: {
                type: 'AssignmentExpression',
                operator: '^=',
                left: {
                    type: 'Identifier',
                    name: 'x',
                    range: [0, 1],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 1 }
                    }
                },
                right: {
                    type: 'Literal',
                    value: 42,
                    raw: '42',
                    range: [5, 7],
                    loc: {
                        start: { line: 1, column: 5 },
                        end: { line: 1, column: 7 }
                    }
                },
                range: [0, 7],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 7 }
                }
            },
            range: [0, 7],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 7 }
            }
        },

        'x |= 42': {
            type: 'ExpressionStatement',
            expression: {
                type: 'AssignmentExpression',
                operator: '|=',
                left: {
                    type: 'Identifier',
                    name: 'x',
                    range: [0, 1],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 1 }
                    }
                },
                right: {
                    type: 'Literal',
                    value: 42,
                    raw: '42',
                    range: [5, 7],
                    loc: {
                        start: { line: 1, column: 5 },
                        end: { line: 1, column: 7 }
                    }
                },
                range: [0, 7],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 7 }
                }
            },
            range: [0, 7],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 7 }
            }
        }

    },

    Block: {

        '{ foo }': {
            type: 'BlockStatement',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'Identifier',
                    name: 'foo',
                    range: [2, 5],
                    loc: {
                        start: { line: 1, column: 2 },
                        end: { line: 1, column: 5 }
                    }
                },
                range: [2, 6],
                loc: {
                    start: { line: 1, column: 2 },
                    end: { line: 1, column: 6 }
                }
            }],
            range: [0, 7],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 7 }
            }
        },

        '{ doThis(); doThat(); }': {
            type: 'BlockStatement',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'CallExpression',
                    callee: {
                        type: 'Identifier',
                        name: 'doThis',
                        range: [2, 8],
                        loc: {
                            start: { line: 1, column: 2 },
                            end: { line: 1, column: 8 }
                        }
                    },
                    arguments: [],
                    range: [2, 10],
                    loc: {
                        start: { line: 1, column: 2 },
                        end: { line: 1, column: 10 }
                    }
                },
                range: [2, 11],
                loc: {
                    start: { line: 1, column: 2 },
                    end: { line: 1, column: 11 }
                }
            }, {
                type: 'ExpressionStatement',
                expression: {
                    type: 'CallExpression',
                    callee: {
                        type: 'Identifier',
                        name: 'doThat',
                        range: [12, 18],
                        loc: {
                            start: { line: 1, column: 12 },
                            end: { line: 1, column: 18 }
                        }
                    },
                    arguments: [],
                    range: [12, 20],
                    loc: {
                        start: { line: 1, column: 12 },
                        end: { line: 1, column: 20 }
                    }
                },
                range: [12, 21],
                loc: {
                    start: { line: 1, column: 12 },
                    end: { line: 1, column: 21 }
                }
            }],
            range: [0, 23],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 23 }
            }
        },

        '{}': {
            type: 'BlockStatement',
            body: [],
            range: [0, 2],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 2 }
            }
        }

    },

    'Variable Statement': {

        'var x': {
            type: 'VariableDeclaration',
            declarations: [{
                type: 'VariableDeclarator',
                id: {
                    type: 'Identifier',
                    name: 'x',
                    range: [4, 5],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 5 }
                    }
                },
                init: null,
                range: [4, 5],
                loc: {
                    start: { line: 1, column: 4 },
                    end: { line: 1, column: 5 }
                }
            }],
            kind: 'var',
            range: [0, 5],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 5 }
            }
        },

        'var x, y;': {
            type: 'VariableDeclaration',
            declarations: [{
                type: 'VariableDeclarator',
                id: {
                    type: 'Identifier',
                    name: 'x',
                    range: [4, 5],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 5 }
                    }
                },
                init: null,
                range: [4, 5],
                loc: {
                    start: { line: 1, column: 4 },
                    end: { line: 1, column: 5 }
                }
            }, {
                type: 'VariableDeclarator',
                id: {
                    type: 'Identifier',
                    name: 'y',
                    range: [7, 8],
                    loc: {
                        start: { line: 1, column: 7 },
                        end: { line: 1, column: 8 }
                    }
                },
                init: null,
                range: [7, 8],
                loc: {
                    start: { line: 1, column: 7 },
                    end: { line: 1, column: 8 }
                }
            }],
            kind: 'var',
            range: [0, 9],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 9 }
            }
        },

        'var x = 42': {
            type: 'VariableDeclaration',
            declarations: [{
                type: 'VariableDeclarator',
                id: {
                    type: 'Identifier',
                    name: 'x',
                    range: [4, 5],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 5 }
                    }
                },
                init: {
                    type: 'Literal',
                    value: 42,
                    raw: '42',
                    range: [8, 10],
                    loc: {
                        start: { line: 1, column: 8 },
                        end: { line: 1, column: 10 }
                    }
                },
                range: [4, 10],
                loc: {
                    start: { line: 1, column: 4 },
                    end: { line: 1, column: 10 }
                }
            }],
            kind: 'var',
            range: [0, 10],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 10 }
            }
        },

        'var eval = 42, arguments = 42': {
            type: 'VariableDeclaration',
            declarations: [{
                type: 'VariableDeclarator',
                id: {
                    type: 'Identifier',
                    name: 'eval',
                    range: [4, 8],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 8 }
                    }
                },
                init: {
                    type: 'Literal',
                    value: 42,
                    raw: '42',
                    range: [11, 13],
                    loc: {
                        start: { line: 1, column: 11 },
                        end: { line: 1, column: 13 }
                    }
                },
                range: [4, 13],
                loc: {
                    start: { line: 1, column: 4 },
                    end: { line: 1, column: 13 }
                }
            }, {
                type: 'VariableDeclarator',
                id: {
                    type: 'Identifier',
                    name: 'arguments',
                    range: [15, 24],
                    loc: {
                        start: { line: 1, column: 15 },
                        end: { line: 1, column: 24 }
                    }
                },
                init: {
                    type: 'Literal',
                    value: 42,
                    raw: '42',
                    range: [27, 29],
                    loc: {
                        start: { line: 1, column: 27 },
                        end: { line: 1, column: 29 }
                    }
                },
                range: [15, 29],
                loc: {
                    start: { line: 1, column: 15 },
                    end: { line: 1, column: 29 }
                }
            }],
            kind: 'var',
            range: [0, 29],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 29 }
            }
        },

        'var x = 14, y = 3, z = 1977': {
            type: 'VariableDeclaration',
            declarations: [{
                type: 'VariableDeclarator',
                id: {
                    type: 'Identifier',
                    name: 'x',
                    range: [4, 5],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 5 }
                    }
                },
                init: {
                    type: 'Literal',
                    value: 14,
                    raw: '14',
                    range: [8, 10],
                    loc: {
                        start: { line: 1, column: 8 },
                        end: { line: 1, column: 10 }
                    }
                },
                range: [4, 10],
                loc: {
                    start: { line: 1, column: 4 },
                    end: { line: 1, column: 10 }
                }
            }, {
                type: 'VariableDeclarator',
                id: {
                    type: 'Identifier',
                    name: 'y',
                    range: [12, 13],
                    loc: {
                        start: { line: 1, column: 12 },
                        end: { line: 1, column: 13 }
                    }
                },
                init: {
                    type: 'Literal',
                    value: 3,
                    raw: '3',
                    range: [16, 17],
                    loc: {
                        start: { line: 1, column: 16 },
                        end: { line: 1, column: 17 }
                    }
                },
                range: [12, 17],
                loc: {
                    start: { line: 1, column: 12 },
                    end: { line: 1, column: 17 }
                }
            }, {
                type: 'VariableDeclarator',
                id: {
                    type: 'Identifier',
                    name: 'z',
                    range: [19, 20],
                    loc: {
                        start: { line: 1, column: 19 },
                        end: { line: 1, column: 20 }
                    }
                },
                init: {
                    type: 'Literal',
                    value: 1977,
                    raw: '1977',
                    range: [23, 27],
                    loc: {
                        start: { line: 1, column: 23 },
                        end: { line: 1, column: 27 }
                    }
                },
                range: [19, 27],
                loc: {
                    start: { line: 1, column: 19 },
                    end: { line: 1, column: 27 }
                }
            }],
            kind: 'var',
            range: [0, 27],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 27 }
            }
        },

        'var implements, interface, package': {
            type: 'VariableDeclaration',
            declarations: [{
                type: 'VariableDeclarator',
                id: {
                    type: 'Identifier',
                    name: 'implements',
                    range: [4, 14],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 14 }
                    }
                },
                init: null,
                range: [4, 14],
                loc: {
                    start: { line: 1, column: 4 },
                    end: { line: 1, column: 14 }
                }
            }, {
                type: 'VariableDeclarator',
                id: {
                    type: 'Identifier',
                    name: 'interface',
                    range: [16, 25],
                    loc: {
                        start: { line: 1, column: 16 },
                        end: { line: 1, column: 25 }
                    }
                },
                init: null,
                range: [16, 25],
                loc: {
                    start: { line: 1, column: 16 },
                    end: { line: 1, column: 25 }
                }
            }, {
                type: 'VariableDeclarator',
                id: {
                    type: 'Identifier',
                    name: 'package',
                    range: [27, 34],
                    loc: {
                        start: { line: 1, column: 27 },
                        end: { line: 1, column: 34 }
                    }
                },
                init: null,
                range: [27, 34],
                loc: {
                    start: { line: 1, column: 27 },
                    end: { line: 1, column: 34 }
                }
            }],
            kind: 'var',
            range: [0, 34],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 34 }
            }
        },

        'var private, protected, public, static': {
            type: 'VariableDeclaration',
            declarations: [{
                type: 'VariableDeclarator',
                id: {
                    type: 'Identifier',
                    name: 'private',
                    range: [4, 11],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 11 }
                    }
                },
                init: null,
                range: [4, 11],
                loc: {
                    start: { line: 1, column: 4 },
                    end: { line: 1, column: 11 }
                }
            }, {
                type: 'VariableDeclarator',
                id: {
                    type: 'Identifier',
                    name: 'protected',
                    range: [13, 22],
                    loc: {
                        start: { line: 1, column: 13 },
                        end: { line: 1, column: 22 }
                    }
                },
                init: null,
                range: [13, 22],
                loc: {
                    start: { line: 1, column: 13 },
                    end: { line: 1, column: 22 }
                }
            }, {
                type: 'VariableDeclarator',
                id: {
                    type: 'Identifier',
                    name: 'public',
                    range: [24, 30],
                    loc: {
                        start: { line: 1, column: 24 },
                        end: { line: 1, column: 30 }
                    }
                },
                init: null,
                range: [24, 30],
                loc: {
                    start: { line: 1, column: 24 },
                    end: { line: 1, column: 30 }
                }
            }, {
                type: 'VariableDeclarator',
                id: {
                    type: 'Identifier',
                    name: 'static',
                    range: [32, 38],
                    loc: {
                        start: { line: 1, column: 32 },
                        end: { line: 1, column: 38 }
                    }
                },
                init: null,
                range: [32, 38],
                loc: {
                    start: { line: 1, column: 32 },
                    end: { line: 1, column: 38 }
                }
            }],
            kind: 'var',
            range: [0, 38],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 38 }
            }
        }

    },

    'Let Statement': {

        'let x': {
            type: 'VariableDeclaration',
            declarations: [{
                type: 'VariableDeclarator',
                id: {
                    type: 'Identifier',
                    name: 'x',
                    range: [4, 5],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 5 }
                    }
                },
                init: null,
                range: [4, 5],
                loc: {
                    start: { line: 1, column: 4 },
                    end: { line: 1, column: 5 }
                }
            }],
            kind: 'let',
            range: [0, 5],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 5 }
            }
        },

        '{ let x }': {
            type: 'BlockStatement',
            body: [{
                type: 'VariableDeclaration',
                declarations: [{
                    type: 'VariableDeclarator',
                    id: {
                        type: 'Identifier',
                        name: 'x',
                        range: [6, 7],
                        loc: {
                            start: { line: 1, column: 6 },
                            end: { line: 1, column: 7 }
                        }
                    },
                    init: null,
                    range: [6, 7],
                    loc: {
                        start: { line: 1, column: 6 },
                        end: { line: 1, column: 7 }
                    }
                }],
                kind: 'let',
                range: [2, 8],
                loc: {
                    start: { line: 1, column: 2 },
                    end: { line: 1, column: 8 }
                }
            }],
            range: [0, 9],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 9 }
            }
        },

        '{ let x = 42 }': {
            type: 'BlockStatement',
            body: [{
                type: 'VariableDeclaration',
                declarations: [{
                    type: 'VariableDeclarator',
                    id: {
                        type: 'Identifier',
                        name: 'x',
                        range: [6, 7],
                        loc: {
                            start: { line: 1, column: 6 },
                            end: { line: 1, column: 7 }
                        }
                    },
                    init: {
                        type: 'Literal',
                        value: 42,
                        raw: '42',
                        range: [10, 12],
                        loc: {
                            start: { line: 1, column: 10 },
                            end: { line: 1, column: 12 }
                        }
                    },
                    range: [6, 12],
                    loc: {
                        start: { line: 1, column: 6 },
                        end: { line: 1, column: 12 }
                    }
                }],
                kind: 'let',
                range: [2, 13],
                loc: {
                    start: { line: 1, column: 2 },
                    end: { line: 1, column: 13 }
                }
            }],
            range: [0, 14],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 14 }
            }
        },

        '{ let x = 14, y = 3, z = 1977 }': {
            type: 'BlockStatement',
            body: [{
                type: 'VariableDeclaration',
                declarations: [{
                    type: 'VariableDeclarator',
                    id: {
                        type: 'Identifier',
                        name: 'x',
                        range: [6, 7],
                        loc: {
                            start: { line: 1, column: 6 },
                            end: { line: 1, column: 7 }
                        }
                    },
                    init: {
                        type: 'Literal',
                        value: 14,
                        raw: '14',
                        range: [10, 12],
                        loc: {
                            start: { line: 1, column: 10 },
                            end: { line: 1, column: 12 }
                        }
                    },
                    range: [6, 12],
                    loc: {
                        start: { line: 1, column: 6 },
                        end: { line: 1, column: 12 }
                    }
                }, {
                    type: 'VariableDeclarator',
                    id: {
                        type: 'Identifier',
                        name: 'y',
                        range: [14, 15],
                        loc: {
                            start: { line: 1, column: 14 },
                            end: { line: 1, column: 15 }
                        }
                    },
                    init: {
                        type: 'Literal',
                        value: 3,
                        raw: '3',
                        range: [18, 19],
                        loc: {
                            start: { line: 1, column: 18 },
                            end: { line: 1, column: 19 }
                        }
                    },
                    range: [14, 19],
                    loc: {
                        start: { line: 1, column: 14 },
                        end: { line: 1, column: 19 }
                    }
                }, {
                    type: 'VariableDeclarator',
                    id: {
                        type: 'Identifier',
                        name: 'z',
                        range: [21, 22],
                        loc: {
                            start: { line: 1, column: 21 },
                            end: { line: 1, column: 22 }
                        }
                    },
                    init: {
                        type: 'Literal',
                        value: 1977,
                        raw: '1977',
                        range: [25, 29],
                        loc: {
                            start: { line: 1, column: 25 },
                            end: { line: 1, column: 29 }
                        }
                    },
                    range: [21, 29],
                    loc: {
                        start: { line: 1, column: 21 },
                        end: { line: 1, column: 29 }
                    }
                }],
                kind: 'let',
                range: [2, 30],
                loc: {
                    start: { line: 1, column: 2 },
                    end: { line: 1, column: 30 }
                }
            }],
            range: [0, 31],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 31 }
            }
        }

    },

    'Const Statement': {

        'const x = 42': {
            type: 'VariableDeclaration',
            declarations: [{
                type: 'VariableDeclarator',
                id: {
                    type: 'Identifier',
                    name: 'x',
                    range: [6, 7],
                    loc: {
                        start: { line: 1, column: 6 },
                        end: { line: 1, column: 7 }
                    }
                },
                init: {
                    type: 'Literal',
                    value: 42,
                    raw: '42',
                    range: [10, 12],
                    loc: {
                        start: { line: 1, column: 10 },
                        end: { line: 1, column: 12 }
                    }
                },
                range: [6, 12],
                loc: {
                    start: { line: 1, column: 6 },
                    end: { line: 1, column: 12 }
                }
            }],
            kind: 'const',
            range: [0, 12],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 12 }
            }
        },

        '{ const x = 42 }': {
            type: 'BlockStatement',
            body: [{
                type: 'VariableDeclaration',
                declarations: [{
                    type: 'VariableDeclarator',
                    id: {
                        type: 'Identifier',
                        name: 'x',
                        range: [8, 9],
                        loc: {
                            start: { line: 1, column: 8 },
                            end: { line: 1, column: 9 }
                        }
                    },
                    init: {
                        type: 'Literal',
                        value: 42,
                        raw: '42',
                        range: [12, 14],
                        loc: {
                            start: { line: 1, column: 12 },
                            end: { line: 1, column: 14 }
                        }
                    },
                    range: [8, 14],
                    loc: {
                        start: { line: 1, column: 8 },
                        end: { line: 1, column: 14 }
                    }
                }],
                kind: 'const',
                range: [2, 15],
                loc: {
                    start: { line: 1, column: 2 },
                    end: { line: 1, column: 15 }
                }
            }],
            range: [0, 16],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 16 }
            }
        },

        '{ const x = 14, y = 3, z = 1977 }': {
            type: 'BlockStatement',
            body: [{
                type: 'VariableDeclaration',
                declarations: [{
                    type: 'VariableDeclarator',
                    id: {
                        type: 'Identifier',
                        name: 'x',
                        range: [8, 9],
                        loc: {
                            start: { line: 1, column: 8 },
                            end: { line: 1, column: 9 }
                        }
                    },
                    init: {
                        type: 'Literal',
                        value: 14,
                        raw: '14',
                        range: [12, 14],
                        loc: {
                            start: { line: 1, column: 12 },
                            end: { line: 1, column: 14 }
                        }
                    },
                    range: [8, 14],
                    loc: {
                        start: { line: 1, column: 8 },
                        end: { line: 1, column: 14 }
                    }
                }, {
                    type: 'VariableDeclarator',
                    id: {
                        type: 'Identifier',
                        name: 'y',
                        range: [16, 17],
                        loc: {
                            start: { line: 1, column: 16 },
                            end: { line: 1, column: 17 }
                        }
                    },
                    init: {
                        type: 'Literal',
                        value: 3,
                        raw: '3',
                        range: [20, 21],
                        loc: {
                            start: { line: 1, column: 20 },
                            end: { line: 1, column: 21 }
                        }
                    },
                    range: [16, 21],
                    loc: {
                        start: { line: 1, column: 16 },
                        end: { line: 1, column: 21 }
                    }
                }, {
                    type: 'VariableDeclarator',
                    id: {
                        type: 'Identifier',
                        name: 'z',
                        range: [23, 24],
                        loc: {
                            start: { line: 1, column: 23 },
                            end: { line: 1, column: 24 }
                        }
                    },
                    init: {
                        type: 'Literal',
                        value: 1977,
                        raw: '1977',
                        range: [27, 31],
                        loc: {
                            start: { line: 1, column: 27 },
                            end: { line: 1, column: 31 }
                        }
                    },
                    range: [23, 31],
                    loc: {
                        start: { line: 1, column: 23 },
                        end: { line: 1, column: 31 }
                    }
                }],
                kind: 'const',
                range: [2, 32],
                loc: {
                    start: { line: 1, column: 2 },
                    end: { line: 1, column: 32 }
                }
            }],
            range: [0, 33],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 33 }
            }
        }

    },

    'Empty Statement': {

        ';': {
            type: 'EmptyStatement',
            range: [0, 1],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 1 }
            }
        }

    },

    'Expression Statement': {

        x: {
            type: 'ExpressionStatement',
            expression: {
                type: 'Identifier',
                name: 'x',
                range: [0, 1],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 1 }
                }
            },
            range: [0, 1],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 1 }
            }
        },

        'x, y': {
            type: 'ExpressionStatement',
            expression: {
                type: 'SequenceExpression',
                expressions: [{
                    type: 'Identifier',
                    name: 'x',
                    range: [0, 1],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 1 }
                    }
                }, {
                    type: 'Identifier',
                    name: 'y',
                    range: [3, 4],
                    loc: {
                        start: { line: 1, column: 3 },
                        end: { line: 1, column: 4 }
                    }
                }],
                range: [0, 4],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 4 }
                }
            },
            range: [0, 4],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 4 }
            }
        },

        \u0061: {
            type: 'ExpressionStatement',
            expression: {
                type: 'Identifier',
                name: 'a',
                range: [0, 6],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 6 }
                }
            },
            range: [0, 6],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 6 }
            }
        },

        a\u0061: {
            type: 'ExpressionStatement',
            expression: {
                type: 'Identifier',
                name: 'aa',
                range: [0, 7],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 7 }
                }
            },
            range: [0, 7],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 7 }
            }
        },

        '\\ua': {
            type: 'ExpressionStatement',
            expression: {
                type: 'Identifier',
                name: 'ua',
                range: [0, 3],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 3 }
                }
            },
            range: [0, 3],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 3 }
            }
        },

        'a\\u': {
            type: 'ExpressionStatement',
            expression: {
                type: 'Identifier',
                name: 'au',
                range: [0, 3],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 3 }
                }
            },
            range: [0, 3],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 3 }
            }
        }

    },

    'If Statement': {

        'if (morning) goodMorning()': {
            type: 'IfStatement',
            test: {
                type: 'Identifier',
                name: 'morning',
                range: [4, 11],
                loc: {
                    start: { line: 1, column: 4 },
                    end: { line: 1, column: 11 }
                }
            },
            consequent: {
                type: 'ExpressionStatement',
                expression: {
                    type: 'CallExpression',
                    callee: {
                        type: 'Identifier',
                        name: 'goodMorning',
                        range: [13, 24],
                        loc: {
                            start: { line: 1, column: 13 },
                            end: { line: 1, column: 24 }
                        }
                    },
                    arguments: [],
                    range: [13, 26],
                    loc: {
                        start: { line: 1, column: 13 },
                        end: { line: 1, column: 26 }
                    }
                },
                range: [13, 26],
                loc: {
                    start: { line: 1, column: 13 },
                    end: { line: 1, column: 26 }
                }
            },
            alternate: null,
            range: [0, 26],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 26 }
            }
        },

        'if (morning) (function(){})': {
            type: 'IfStatement',
            test: {
                type: 'Identifier',
                name: 'morning',
                range: [4, 11],
                loc: {
                    start: { line: 1, column: 4 },
                    end: { line: 1, column: 11 }
                }
            },
            consequent: {
                type: 'ExpressionStatement',
                expression: {
                    type: 'FunctionExpression',
                    id: null,
                    params: [],
                    body: {
                        type: 'BlockStatement',
                        body: [],
                        range: [24, 26],
                        loc: {
                            start: { line: 1, column: 24 },
                            end: { line: 1, column: 26 }
                        }
                    },
                    range: [13, 27],
                    loc: {
                        start: { line: 1, column: 13 },
                        end: { line: 1, column: 27 }
                    }
                },
                range: [13, 27],
                loc: {
                    start: { line: 1, column: 13 },
                    end: { line: 1, column: 27 }
                }
            },
            alternate: null,
            range: [0, 27],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 27 }
            }
        },

        'if (morning) var x = 0;': {
            type: 'IfStatement',
            test: {
                type: 'Identifier',
                name: 'morning',
                range: [4, 11],
                loc: {
                    start: { line: 1, column: 4 },
                    end: { line: 1, column: 11 }
                }
            },
            consequent: {
                type: 'VariableDeclaration',
                declarations: [{
                    type: 'VariableDeclarator',
                    id: {
                        type: 'Identifier',
                        name: 'x',
                        range: [17, 18],
                        loc: {
                            start: { line: 1, column: 17 },
                            end: { line: 1, column: 18 }
                        }
                    },
                    init: {
                        type: 'Literal',
                        value: 0,
                        raw: '0',
                        range: [21, 22],
                        loc: {
                            start: { line: 1, column: 21 },
                            end: { line: 1, column: 22 }
                        }
                    },
                    range: [17, 22],
                    loc: {
                        start: { line: 1, column: 17 },
                        end: { line: 1, column: 22 }
                    }
                }],
                kind: 'var',
                range: [13, 23],
                loc: {
                    start: { line: 1, column: 13 },
                    end: { line: 1, column: 23 }
                }
            },
            alternate: null,
            range: [0, 23],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 23 }
            }
        },

        'if (morning) function a(){}': {
            type: 'IfStatement',
            test: {
                type: 'Identifier',
                name: 'morning',
                range: [4, 11],
                loc: {
                    start: { line: 1, column: 4 },
                    end: { line: 1, column: 11 }
                }
            },
            consequent: {
                type: 'FunctionDeclaration',
                id: {
                    type: 'Identifier',
                    name: 'a',
                    range: [22, 23],
                    loc: {
                        start: { line: 1, column: 22 },
                        end: { line: 1, column: 23 }
                    }
                },
                params: [],
                body: {
                    type: 'BlockStatement',
                    body: [],
                    range: [25, 27],
                    loc: {
                        start: { line: 1, column: 25 },
                        end: { line: 1, column: 27 }
                    }
                },
                range: [13, 27],
                loc: {
                    start: { line: 1, column: 13 },
                    end: { line: 1, column: 27 }
                }
            },
            alternate: null,
            range: [0, 27],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 27 }
            }
        },

        'if (morning) goodMorning(); else goodDay()': {
            type: 'IfStatement',
            test: {
                type: 'Identifier',
                name: 'morning',
                range: [4, 11],
                loc: {
                    start: { line: 1, column: 4 },
                    end: { line: 1, column: 11 }
                }
            },
            consequent: {
                type: 'ExpressionStatement',
                expression: {
                    type: 'CallExpression',
                    callee: {
                        type: 'Identifier',
                        name: 'goodMorning',
                        range: [13, 24],
                        loc: {
                            start: { line: 1, column: 13 },
                            end: { line: 1, column: 24 }
                        }
                    },
                    arguments: [],
                    range: [13, 26],
                    loc: {
                        start: { line: 1, column: 13 },
                        end: { line: 1, column: 26 }
                    }
                },
                range: [13, 27],
                loc: {
                    start: { line: 1, column: 13 },
                    end: { line: 1, column: 27 }
                }
            },
            alternate: {
                type: 'ExpressionStatement',
                expression: {
                    type: 'CallExpression',
                    callee: {
                        type: 'Identifier',
                        name: 'goodDay',
                        range: [33, 40],
                        loc: {
                            start: { line: 1, column: 33 },
                            end: { line: 1, column: 40 }
                        }
                    },
                    arguments: [],
                    range: [33, 42],
                    loc: {
                        start: { line: 1, column: 33 },
                        end: { line: 1, column: 42 }
                    }
                },
                range: [33, 42],
                loc: {
                    start: { line: 1, column: 33 },
                    end: { line: 1, column: 42 }
                }
            },
            range: [0, 42],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 42 }
            }
        }

    },

    'Iteration Statements': {

        'do keep(); while (true)': {
            type: 'DoWhileStatement',
            body: {
                type: 'ExpressionStatement',
                expression: {
                    type: 'CallExpression',
                    callee: {
                        type: 'Identifier',
                        name: 'keep',
                        range: [3, 7],
                        loc: {
                            start: { line: 1, column: 3 },
                            end: { line: 1, column: 7 }
                        }
                    },
                    arguments: [],
                    range: [3, 9],
                    loc: {
                        start: { line: 1, column: 3 },
                        end: { line: 1, column: 9 }
                    }
                },
                range: [3, 10],
                loc: {
                    start: { line: 1, column: 3 },
                    end: { line: 1, column: 10 }
                }
            },
            test: {
                type: 'Literal',
                value: true,
                raw: 'true',
                range: [18, 22],
                loc: {
                    start: { line: 1, column: 18 },
                    end: { line: 1, column: 22 }
                }
            },
            range: [0, 23],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 23 }
            }
        },

        'do keep(); while (true);': {
            type: 'DoWhileStatement',
            body: {
                type: 'ExpressionStatement',
                expression: {
                    type: 'CallExpression',
                    callee: {
                        type: 'Identifier',
                        name: 'keep',
                        range: [3, 7],
                        loc: {
                            start: { line: 1, column: 3 },
                            end: { line: 1, column: 7 }
                        }
                    },
                    arguments: [],
                    range: [3, 9],
                    loc: {
                        start: { line: 1, column: 3 },
                        end: { line: 1, column: 9 }
                    }
                },
                range: [3, 10],
                loc: {
                    start: { line: 1, column: 3 },
                    end: { line: 1, column: 10 }
                }
            },
            test: {
                type: 'Literal',
                value: true,
                raw: 'true',
                range: [18, 22],
                loc: {
                    start: { line: 1, column: 18 },
                    end: { line: 1, column: 22 }
                }
            },
            range: [0, 24],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 24 }
            }
        },

        'do { x++; y--; } while (x < 10)': {
            type: 'DoWhileStatement',
            body: {
                type: 'BlockStatement',
                body: [{
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'UpdateExpression',
                        operator: '++',
                        argument: {
                            type: 'Identifier',
                            name: 'x',
                            range: [5, 6],
                            loc: {
                                start: { line: 1, column: 5 },
                                end: { line: 1, column: 6 }
                            }
                        },
                        prefix: false,
                        range: [5, 8],
                        loc: {
                            start: { line: 1, column: 5 },
                            end: { line: 1, column: 8 }
                        }
                    },
                    range: [5, 9],
                    loc: {
                        start: { line: 1, column: 5 },
                        end: { line: 1, column: 9 }
                    }
                }, {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'UpdateExpression',
                        operator: '--',
                        argument: {
                            type: 'Identifier',
                            name: 'y',
                            range: [10, 11],
                            loc: {
                                start: { line: 1, column: 10 },
                                end: { line: 1, column: 11 }
                            }
                        },
                        prefix: false,
                        range: [10, 13],
                        loc: {
                            start: { line: 1, column: 10 },
                            end: { line: 1, column: 13 }
                        }
                    },
                    range: [10, 14],
                    loc: {
                        start: { line: 1, column: 10 },
                        end: { line: 1, column: 14 }
                    }
                }],
                range: [3, 16],
                loc: {
                    start: { line: 1, column: 3 },
                    end: { line: 1, column: 16 }
                }
            },
            test: {
                type: 'BinaryExpression',
                operator: '<',
                left: {
                    type: 'Identifier',
                    name: 'x',
                    range: [24, 25],
                    loc: {
                        start: { line: 1, column: 24 },
                        end: { line: 1, column: 25 }
                    }
                },
                right: {
                    type: 'Literal',
                    value: 10,
                    raw: '10',
                    range: [28, 30],
                    loc: {
                        start: { line: 1, column: 28 },
                        end: { line: 1, column: 30 }
                    }
                },
                range: [24, 30],
                loc: {
                    start: { line: 1, column: 24 },
                    end: { line: 1, column: 30 }
                }
            },
            range: [0, 31],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 31 }
            }
        },

        '{ do { } while (false) false }': {
            type: 'BlockStatement',
            body: [{
                type: 'DoWhileStatement',
                body: {
                    type: 'BlockStatement',
                    body: [],
                    range: [5, 8],
                    loc: {
                        start: { line: 1, column: 5 },
                        end: { line: 1, column: 8 }
                    }
                },
                test: {
                    type: 'Literal',
                    value: false,
                    raw: 'false',
                    range: [16, 21],
                    loc: {
                        start: { line: 1, column: 16 },
                        end: { line: 1, column: 21 }
                    }
                },
                range: [2, 22],
                loc: {
                    start: { line: 1, column: 2 },
                    end: { line: 1, column: 22 }
                }
            }, {
                type: 'ExpressionStatement',
                expression: {
                    type: 'Literal',
                    value: false,
                    raw: 'false',
                    range: [23, 28],
                    loc: {
                        start: { line: 1, column: 23 },
                        end: { line: 1, column: 28 }
                    }
                },
                range: [23, 29],
                loc: {
                    start: { line: 1, column: 23 },
                    end: { line: 1, column: 29 }
                }
            }],
            range: [0, 30],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 30 }
            }
        },

        'while (true) doSomething()': {
            type: 'WhileStatement',
            test: {
                type: 'Literal',
                value: true,
                raw: 'true',
                range: [7, 11],
                loc: {
                    start: { line: 1, column: 7 },
                    end: { line: 1, column: 11 }
                }
            },
            body: {
                type: 'ExpressionStatement',
                expression: {
                    type: 'CallExpression',
                    callee: {
                        type: 'Identifier',
                        name: 'doSomething',
                        range: [13, 24],
                        loc: {
                            start: { line: 1, column: 13 },
                            end: { line: 1, column: 24 }
                        }
                    },
                    arguments: [],
                    range: [13, 26],
                    loc: {
                        start: { line: 1, column: 13 },
                        end: { line: 1, column: 26 }
                    }
                },
                range: [13, 26],
                loc: {
                    start: { line: 1, column: 13 },
                    end: { line: 1, column: 26 }
                }
            },
            range: [0, 26],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 26 }
            }
        },

        'while (x < 10) { x++; y--; }': {
            type: 'WhileStatement',
            test: {
                type: 'BinaryExpression',
                operator: '<',
                left: {
                    type: 'Identifier',
                    name: 'x',
                    range: [7, 8],
                    loc: {
                        start: { line: 1, column: 7 },
                        end: { line: 1, column: 8 }
                    }
                },
                right: {
                    type: 'Literal',
                    value: 10,
                    raw: '10',
                    range: [11, 13],
                    loc: {
                        start: { line: 1, column: 11 },
                        end: { line: 1, column: 13 }
                    }
                },
                range: [7, 13],
                loc: {
                    start: { line: 1, column: 7 },
                    end: { line: 1, column: 13 }
                }
            },
            body: {
                type: 'BlockStatement',
                body: [{
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'UpdateExpression',
                        operator: '++',
                        argument: {
                            type: 'Identifier',
                            name: 'x',
                            range: [17, 18],
                            loc: {
                                start: { line: 1, column: 17 },
                                end: { line: 1, column: 18 }
                            }
                        },
                        prefix: false,
                        range: [17, 20],
                        loc: {
                            start: { line: 1, column: 17 },
                            end: { line: 1, column: 20 }
                        }
                    },
                    range: [17, 21],
                    loc: {
                        start: { line: 1, column: 17 },
                        end: { line: 1, column: 21 }
                    }
                }, {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'UpdateExpression',
                        operator: '--',
                        argument: {
                            type: 'Identifier',
                            name: 'y',
                            range: [22, 23],
                            loc: {
                                start: { line: 1, column: 22 },
                                end: { line: 1, column: 23 }
                            }
                        },
                        prefix: false,
                        range: [22, 25],
                        loc: {
                            start: { line: 1, column: 22 },
                            end: { line: 1, column: 25 }
                        }
                    },
                    range: [22, 26],
                    loc: {
                        start: { line: 1, column: 22 },
                        end: { line: 1, column: 26 }
                    }
                }],
                range: [15, 28],
                loc: {
                    start: { line: 1, column: 15 },
                    end: { line: 1, column: 28 }
                }
            },
            range: [0, 28],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 28 }
            }
        },

        'for(;;);': {
            type: 'ForStatement',
            init: null,
            test: null,
            update: null,
            body: {
                type: 'EmptyStatement',
                range: [7, 8],
                loc: {
                    start: { line: 1, column: 7 },
                    end: { line: 1, column: 8 }
                }
            },
            range: [0, 8],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 8 }
            }
        },

        'for(;;){}': {
            type: 'ForStatement',
            init: null,
            test: null,
            update: null,
            body: {
                type: 'BlockStatement',
                body: [],
                range: [7, 9],
                loc: {
                    start: { line: 1, column: 7 },
                    end: { line: 1, column: 9 }
                }
            },
            range: [0, 9],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 9 }
            }
        },

        'for(x = 0;;);': {
            type: 'ForStatement',
            init: {
                type: 'AssignmentExpression',
                operator: '=',
                left: {
                    type: 'Identifier',
                    name: 'x',
                    range: [4, 5],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 5 }
                    }
                },
                right: {
                    type: 'Literal',
                    value: 0,
                    raw: '0',
                    range: [8, 9],
                    loc: {
                        start: { line: 1, column: 8 },
                        end: { line: 1, column: 9 }
                    }
                },
                range: [4, 9],
                loc: {
                    start: { line: 1, column: 4 },
                    end: { line: 1, column: 9 }
                }
            },
            test: null,
            update: null,
            body: {
                type: 'EmptyStatement',
                range: [12, 13],
                loc: {
                    start: { line: 1, column: 12 },
                    end: { line: 1, column: 13 }
                }
            },
            range: [0, 13],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 13 }
            }
        },

        'for(var x = 0;;);': {
            type: 'ForStatement',
            init: {
                type: 'VariableDeclaration',
                declarations: [{
                    type: 'VariableDeclarator',
                    id: {
                        type: 'Identifier',
                        name: 'x',
                        range: [8, 9],
                        loc: {
                            start: { line: 1, column: 8 },
                            end: { line: 1, column: 9 }
                        }
                    },
                    init: {
                        type: 'Literal',
                        value: 0,
                        raw: '0',
                        range: [12, 13],
                        loc: {
                            start: { line: 1, column: 12 },
                            end: { line: 1, column: 13 }
                        }
                    },
                    range: [8, 13],
                    loc: {
                        start: { line: 1, column: 8 },
                        end: { line: 1, column: 13 }
                    }
                }],
                kind: 'var',
                range: [4, 13],
                loc: {
                    start: { line: 1, column: 4 },
                    end: { line: 1, column: 13 }
                }
            },
            test: null,
            update: null,
            body: {
                type: 'EmptyStatement',
                range: [16, 17],
                loc: {
                    start: { line: 1, column: 16 },
                    end: { line: 1, column: 17 }
                }
            },
            range: [0, 17],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 17 }
            }
        },

        'for(let x = 0;;);': {
            type: 'ForStatement',
            init: {
                type: 'VariableDeclaration',
                declarations: [{
                    type: 'VariableDeclarator',
                    id: {
                        type: 'Identifier',
                        name: 'x',
                        range: [8, 9],
                        loc: {
                            start: { line: 1, column: 8 },
                            end: { line: 1, column: 9 }
                        }
                    },
                    init: {
                        type: 'Literal',
                        value: 0,
                        raw: '0',
                        range: [12, 13],
                        loc: {
                            start: { line: 1, column: 12 },
                            end: { line: 1, column: 13 }
                        }
                    },
                    range: [8, 13],
                    loc: {
                        start: { line: 1, column: 8 },
                        end: { line: 1, column: 13 }
                    }
                }],
                kind: 'let',
                range: [4, 13],
                loc: {
                    start: { line: 1, column: 4 },
                    end: { line: 1, column: 13 }
                }
            },
            test: null,
            update: null,
            body: {
                type: 'EmptyStatement',
                range: [16, 17],
                loc: {
                    start: { line: 1, column: 16 },
                    end: { line: 1, column: 17 }
                }
            },
            range: [0, 17],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 17 }
            }
        },

        'for(var x = 0, y = 1;;);': {
            type: 'ForStatement',
            init: {
                type: 'VariableDeclaration',
                declarations: [{
                    type: 'VariableDeclarator',
                    id: {
                        type: 'Identifier',
                        name: 'x',
                        range: [8, 9],
                        loc: {
                            start: { line: 1, column: 8 },
                            end: { line: 1, column: 9 }
                        }
                    },
                    init: {
                        type: 'Literal',
                        value: 0,
                        raw: '0',
                        range: [12, 13],
                        loc: {
                            start: { line: 1, column: 12 },
                            end: { line: 1, column: 13 }
                        }
                    },
                    range: [8, 13],
                    loc: {
                        start: { line: 1, column: 8 },
                        end: { line: 1, column: 13 }
                    }
                }, {
                    type: 'VariableDeclarator',
                    id: {
                        type: 'Identifier',
                        name: 'y',
                        range: [15, 16],
                        loc: {
                            start: { line: 1, column: 15 },
                            end: { line: 1, column: 16 }
                        }
                    },
                    init: {
                        type: 'Literal',
                        value: 1,
                        raw: '1',
                        range: [19, 20],
                        loc: {
                            start: { line: 1, column: 19 },
                            end: { line: 1, column: 20 }
                        }
                    },
                    range: [15, 20],
                    loc: {
                        start: { line: 1, column: 15 },
                        end: { line: 1, column: 20 }
                    }
                }],
                kind: 'var',
                range: [4, 20],
                loc: {
                    start: { line: 1, column: 4 },
                    end: { line: 1, column: 20 }
                }
            },
            test: null,
            update: null,
            body: {
                type: 'EmptyStatement',
                range: [23, 24],
                loc: {
                    start: { line: 1, column: 23 },
                    end: { line: 1, column: 24 }
                }
            },
            range: [0, 24],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 24 }
            }
        },

        'for(x = 0; x < 42;);': {
            type: 'ForStatement',
            init: {
                type: 'AssignmentExpression',
                operator: '=',
                left: {
                    type: 'Identifier',
                    name: 'x',
                    range: [4, 5],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 5 }
                    }
                },
                right: {
                    type: 'Literal',
                    value: 0,
                    raw: '0',
                    range: [8, 9],
                    loc: {
                        start: { line: 1, column: 8 },
                        end: { line: 1, column: 9 }
                    }
                },
                range: [4, 9],
                loc: {
                    start: { line: 1, column: 4 },
                    end: { line: 1, column: 9 }
                }
            },
            test: {
                type: 'BinaryExpression',
                operator: '<',
                left: {
                    type: 'Identifier',
                    name: 'x',
                    range: [11, 12],
                    loc: {
                        start: { line: 1, column: 11 },
                        end: { line: 1, column: 12 }
                    }
                },
                right: {
                    type: 'Literal',
                    value: 42,
                    raw: '42',
                    range: [15, 17],
                    loc: {
                        start: { line: 1, column: 15 },
                        end: { line: 1, column: 17 }
                    }
                },
                range: [11, 17],
                loc: {
                    start: { line: 1, column: 11 },
                    end: { line: 1, column: 17 }
                }
            },
            update: null,
            body: {
                type: 'EmptyStatement',
                range: [19, 20],
                loc: {
                    start: { line: 1, column: 19 },
                    end: { line: 1, column: 20 }
                }
            },
            range: [0, 20],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 20 }
            }
        },

        'for(x = 0; x < 42; x++);': {
            type: 'ForStatement',
            init: {
                type: 'AssignmentExpression',
                operator: '=',
                left: {
                    type: 'Identifier',
                    name: 'x',
                    range: [4, 5],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 5 }
                    }
                },
                right: {
                    type: 'Literal',
                    value: 0,
                    raw: '0',
                    range: [8, 9],
                    loc: {
                        start: { line: 1, column: 8 },
                        end: { line: 1, column: 9 }
                    }
                },
                range: [4, 9],
                loc: {
                    start: { line: 1, column: 4 },
                    end: { line: 1, column: 9 }
                }
            },
            test: {
                type: 'BinaryExpression',
                operator: '<',
                left: {
                    type: 'Identifier',
                    name: 'x',
                    range: [11, 12],
                    loc: {
                        start: { line: 1, column: 11 },
                        end: { line: 1, column: 12 }
                    }
                },
                right: {
                    type: 'Literal',
                    value: 42,
                    raw: '42',
                    range: [15, 17],
                    loc: {
                        start: { line: 1, column: 15 },
                        end: { line: 1, column: 17 }
                    }
                },
                range: [11, 17],
                loc: {
                    start: { line: 1, column: 11 },
                    end: { line: 1, column: 17 }
                }
            },
            update: {
                type: 'UpdateExpression',
                operator: '++',
                argument: {
                    type: 'Identifier',
                    name: 'x',
                    range: [19, 20],
                    loc: {
                        start: { line: 1, column: 19 },
                        end: { line: 1, column: 20 }
                    }
                },
                prefix: false,
                range: [19, 22],
                loc: {
                    start: { line: 1, column: 19 },
                    end: { line: 1, column: 22 }
                }
            },
            body: {
                type: 'EmptyStatement',
                range: [23, 24],
                loc: {
                    start: { line: 1, column: 23 },
                    end: { line: 1, column: 24 }
                }
            },
            range: [0, 24],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 24 }
            }
        },

        'for(x = 0; x < 42; x++) process(x);': {
            type: 'ForStatement',
            init: {
                type: 'AssignmentExpression',
                operator: '=',
                left: {
                    type: 'Identifier',
                    name: 'x',
                    range: [4, 5],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 5 }
                    }
                },
                right: {
                    type: 'Literal',
                    value: 0,
                    raw: '0',
                    range: [8, 9],
                    loc: {
                        start: { line: 1, column: 8 },
                        end: { line: 1, column: 9 }
                    }
                },
                range: [4, 9],
                loc: {
                    start: { line: 1, column: 4 },
                    end: { line: 1, column: 9 }
                }
            },
            test: {
                type: 'BinaryExpression',
                operator: '<',
                left: {
                    type: 'Identifier',
                    name: 'x',
                    range: [11, 12],
                    loc: {
                        start: { line: 1, column: 11 },
                        end: { line: 1, column: 12 }
                    }
                },
                right: {
                    type: 'Literal',
                    value: 42,
                    raw: '42',
                    range: [15, 17],
                    loc: {
                        start: { line: 1, column: 15 },
                        end: { line: 1, column: 17 }
                    }
                },
                range: [11, 17],
                loc: {
                    start: { line: 1, column: 11 },
                    end: { line: 1, column: 17 }
                }
            },
            update: {
                type: 'UpdateExpression',
                operator: '++',
                argument: {
                    type: 'Identifier',
                    name: 'x',
                    range: [19, 20],
                    loc: {
                        start: { line: 1, column: 19 },
                        end: { line: 1, column: 20 }
                    }
                },
                prefix: false,
                range: [19, 22],
                loc: {
                    start: { line: 1, column: 19 },
                    end: { line: 1, column: 22 }
                }
            },
            body: {
                type: 'ExpressionStatement',
                expression: {
                    type: 'CallExpression',
                    callee: {
                        type: 'Identifier',
                        name: 'process',
                        range: [24, 31],
                        loc: {
                            start: { line: 1, column: 24 },
                            end: { line: 1, column: 31 }
                        }
                    },
                    arguments: [{
                        type: 'Identifier',
                        name: 'x',
                        range: [32, 33],
                        loc: {
                            start: { line: 1, column: 32 },
                            end: { line: 1, column: 33 }
                        }
                    }],
                    range: [24, 34],
                    loc: {
                        start: { line: 1, column: 24 },
                        end: { line: 1, column: 34 }
                    }
                },
                range: [24, 35],
                loc: {
                    start: { line: 1, column: 24 },
                    end: { line: 1, column: 35 }
                }
            },
            range: [0, 35],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 35 }
            }
        },

        'for(x in list) process(x);': {
            type: 'ForInStatement',
            left: {
                type: 'Identifier',
                name: 'x',
                range: [4, 5],
                loc: {
                    start: { line: 1, column: 4 },
                    end: { line: 1, column: 5 }
                }
            },
            right: {
                type: 'Identifier',
                name: 'list',
                range: [9, 13],
                loc: {
                    start: { line: 1, column: 9 },
                    end: { line: 1, column: 13 }
                }
            },
            body: {
                type: 'ExpressionStatement',
                expression: {
                    type: 'CallExpression',
                    callee: {
                        type: 'Identifier',
                        name: 'process',
                        range: [15, 22],
                        loc: {
                            start: { line: 1, column: 15 },
                            end: { line: 1, column: 22 }
                        }
                    },
                    arguments: [{
                        type: 'Identifier',
                        name: 'x',
                        range: [23, 24],
                        loc: {
                            start: { line: 1, column: 23 },
                            end: { line: 1, column: 24 }
                        }
                    }],
                    range: [15, 25],
                    loc: {
                        start: { line: 1, column: 15 },
                        end: { line: 1, column: 25 }
                    }
                },
                range: [15, 26],
                loc: {
                    start: { line: 1, column: 15 },
                    end: { line: 1, column: 26 }
                }
            },
            each: false,
            range: [0, 26],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 26 }
            }
        },

        'for (var x in list) process(x);': {
            type: 'ForInStatement',
            left: {
                type: 'VariableDeclaration',
                declarations: [{
                    type: 'VariableDeclarator',
                    id: {
                        type: 'Identifier',
                        name: 'x',
                        range: [9, 10],
                        loc: {
                            start: { line: 1, column: 9 },
                            end: { line: 1, column: 10 }
                        }
                    },
                    init: null,
                    range: [9, 10],
                    loc: {
                        start: { line: 1, column: 9 },
                        end: { line: 1, column: 10 }
                    }
                }],
                kind: 'var',
                range: [5, 10],
                loc: {
                    start: { line: 1, column: 5 },
                    end: { line: 1, column: 10 }
                }
            },
            right: {
                type: 'Identifier',
                name: 'list',
                range: [14, 18],
                loc: {
                    start: { line: 1, column: 14 },
                    end: { line: 1, column: 18 }
                }
            },
            body: {
                type: 'ExpressionStatement',
                expression: {
                    type: 'CallExpression',
                    callee: {
                        type: 'Identifier',
                        name: 'process',
                        range: [20, 27],
                        loc: {
                            start: { line: 1, column: 20 },
                            end: { line: 1, column: 27 }
                        }
                    },
                    arguments: [{
                        type: 'Identifier',
                        name: 'x',
                        range: [28, 29],
                        loc: {
                            start: { line: 1, column: 28 },
                            end: { line: 1, column: 29 }
                        }
                    }],
                    range: [20, 30],
                    loc: {
                        start: { line: 1, column: 20 },
                        end: { line: 1, column: 30 }
                    }
                },
                range: [20, 31],
                loc: {
                    start: { line: 1, column: 20 },
                    end: { line: 1, column: 31 }
                }
            },
            each: false,
            range: [0, 31],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 31 }
            }
        },

        'for (var x = 42 in list) process(x);': {
            type: 'ForInStatement',
            left: {
                type: 'VariableDeclaration',
                declarations: [{
                    type: 'VariableDeclarator',
                    id: {
                        type: 'Identifier',
                        name: 'x',
                        range: [9, 10],
                        loc: {
                            start: { line: 1, column: 9 },
                            end: { line: 1, column: 10 }
                        }
                    },
                    init: {
                        type: 'Literal',
                        value: 42,
                        raw: '42',
                        range: [13, 15],
                        loc: {
                            start: { line: 1, column: 13 },
                            end: { line: 1, column: 15 }
                        }
                    },
                    range: [9, 15],
                    loc: {
                        start: { line: 1, column: 9 },
                        end: { line: 1, column: 15 }
                    }
                }],
                kind: 'var',
                range: [5, 15],
                loc: {
                    start: { line: 1, column: 5 },
                    end: { line: 1, column: 15 }
                }
            },
            right: {
                type: 'Identifier',
                name: 'list',
                range: [19, 23],
                loc: {
                    start: { line: 1, column: 19 },
                    end: { line: 1, column: 23 }
                }
            },
            body: {
                type: 'ExpressionStatement',
                expression: {
                    type: 'CallExpression',
                    callee: {
                        type: 'Identifier',
                        name: 'process',
                        range: [25, 32],
                        loc: {
                            start: { line: 1, column: 25 },
                            end: { line: 1, column: 32 }
                        }
                    },
                    arguments: [{
                        type: 'Identifier',
                        name: 'x',
                        range: [33, 34],
                        loc: {
                            start: { line: 1, column: 33 },
                            end: { line: 1, column: 34 }
                        }
                    }],
                    range: [25, 35],
                    loc: {
                        start: { line: 1, column: 25 },
                        end: { line: 1, column: 35 }
                    }
                },
                range: [25, 36],
                loc: {
                    start: { line: 1, column: 25 },
                    end: { line: 1, column: 36 }
                }
            },
            each: false,
            range: [0, 36],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 36 }
            }
        },

        'for (let x in list) process(x);': {
            type: 'ForInStatement',
            left: {
                type: 'VariableDeclaration',
                declarations: [{
                    type: 'VariableDeclarator',
                    id: {
                        type: 'Identifier',
                        name: 'x',
                        range: [9, 10],
                        loc: {
                            start: { line: 1, column: 9 },
                            end: { line: 1, column: 10 }
                        }
                    },
                    init: null,
                    range: [9, 10],
                    loc: {
                        start: { line: 1, column: 9 },
                        end: { line: 1, column: 10 }
                    }
                }],
                kind: 'let',
                range: [5, 10],
                loc: {
                    start: { line: 1, column: 5 },
                    end: { line: 1, column: 10 }
                }
            },
            right: {
                type: 'Identifier',
                name: 'list',
                range: [14, 18],
                loc: {
                    start: { line: 1, column: 14 },
                    end: { line: 1, column: 18 }
                }
            },
            body: {
                type: 'ExpressionStatement',
                expression: {
                    type: 'CallExpression',
                    callee: {
                        type: 'Identifier',
                        name: 'process',
                        range: [20, 27],
                        loc: {
                            start: { line: 1, column: 20 },
                            end: { line: 1, column: 27 }
                        }
                    },
                    arguments: [{
                        type: 'Identifier',
                        name: 'x',
                        range: [28, 29],
                        loc: {
                            start: { line: 1, column: 28 },
                            end: { line: 1, column: 29 }
                        }
                    }],
                    range: [20, 30],
                    loc: {
                        start: { line: 1, column: 20 },
                        end: { line: 1, column: 30 }
                    }
                },
                range: [20, 31],
                loc: {
                    start: { line: 1, column: 20 },
                    end: { line: 1, column: 31 }
                }
            },
            each: false,
            range: [0, 31],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 31 }
            }
        },

        'for (let x = 42 in list) process(x);': {
            type: 'ForInStatement',
            left: {
                type: 'VariableDeclaration',
                declarations: [{
                    type: 'VariableDeclarator',
                    id: {
                        type: 'Identifier',
                        name: 'x',
                        range: [9, 10],
                        loc: {
                            start: { line: 1, column: 9 },
                            end: { line: 1, column: 10 }
                        }
                    },
                    init: {
                        type: 'Literal',
                        value: 42,
                        raw: '42',
                        range: [13, 15],
                        loc: {
                            start: { line: 1, column: 13 },
                            end: { line: 1, column: 15 }
                        }
                    },
                    range: [9, 15],
                    loc: {
                        start: { line: 1, column: 9 },
                        end: { line: 1, column: 15 }
                    }
                }],
                kind: 'let',
                range: [5, 15],
                loc: {
                    start: { line: 1, column: 5 },
                    end: { line: 1, column: 15 }
                }
            },
            right: {
                type: 'Identifier',
                name: 'list',
                range: [19, 23],
                loc: {
                    start: { line: 1, column: 19 },
                    end: { line: 1, column: 23 }
                }
            },
            body: {
                type: 'ExpressionStatement',
                expression: {
                    type: 'CallExpression',
                    callee: {
                        type: 'Identifier',
                        name: 'process',
                        range: [25, 32],
                        loc: {
                            start: { line: 1, column: 25 },
                            end: { line: 1, column: 32 }
                        }
                    },
                    arguments: [{
                        type: 'Identifier',
                        name: 'x',
                        range: [33, 34],
                        loc: {
                            start: { line: 1, column: 33 },
                            end: { line: 1, column: 34 }
                        }
                    }],
                    range: [25, 35],
                    loc: {
                        start: { line: 1, column: 25 },
                        end: { line: 1, column: 35 }
                    }
                },
                range: [25, 36],
                loc: {
                    start: { line: 1, column: 25 },
                    end: { line: 1, column: 36 }
                }
            },
            each: false,
            range: [0, 36],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 36 }
            }
        },

        'for (var i = function() { return 10 in [] } in list) process(x);': {
            type: 'ForInStatement',
            left: {
                type: 'VariableDeclaration',
                declarations: [{
                    type: 'VariableDeclarator',
                    id: {
                        type: 'Identifier',
                        name: 'i',
                        range: [9, 10],
                        loc: {
                            start: { line: 1, column: 9 },
                            end: { line: 1, column: 10 }
                        }
                    },
                    init: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [],
                        body: {
                            type: 'BlockStatement',
                            body: [{
                                type: 'ReturnStatement',
                                argument: {
                                    type: 'BinaryExpression',
                                    operator: 'in',
                                    left: {
                                        type: 'Literal',
                                        value: 10,
                                        raw: '10',
                                        range: [33, 35],
                                        loc: {
                                            start: { line: 1, column: 33 },
                                            end: { line: 1, column: 35 }
                                        }
                                    },
                                    right: {
                                        type: 'ArrayExpression',
                                        elements: [],
                                        range: [39, 41],
                                        loc: {
                                            start: { line: 1, column: 39 },
                                            end: { line: 1, column: 41 }
                                        }
                                    },
                                    range: [33, 41],
                                    loc: {
                                        start: { line: 1, column: 33 },
                                        end: { line: 1, column: 41 }
                                    }
                                },
                                range: [26, 42],
                                loc: {
                                    start: { line: 1, column: 26 },
                                    end: { line: 1, column: 42 }
                                }
                            }],
                            range: [24, 43],
                            loc: {
                                start: { line: 1, column: 24 },
                                end: { line: 1, column: 43 }
                            }
                        },
                        range: [13, 43],
                        loc: {
                            start: { line: 1, column: 13 },
                            end: { line: 1, column: 43 }
                        }
                    },
                    range: [9, 43],
                    loc: {
                        start: { line: 1, column: 9 },
                        end: { line: 1, column: 43 }
                    }
                }],
                kind: 'var',
                range: [5, 43],
                loc: {
                    start: { line: 1, column: 5 },
                    end: { line: 1, column: 43 }
                }
            },
            right: {
                type: 'Identifier',
                name: 'list',
                range: [47, 51],
                loc: {
                    start: { line: 1, column: 47 },
                    end: { line: 1, column: 51 }
                }
            },
            body: {
                type: 'ExpressionStatement',
                expression: {
                    type: 'CallExpression',
                    callee: {
                        type: 'Identifier',
                        name: 'process',
                        range: [53, 60],
                        loc: {
                            start: { line: 1, column: 53 },
                            end: { line: 1, column: 60 }
                        }
                    },
                    arguments: [{
                        type: 'Identifier',
                        name: 'x',
                        range: [61, 62],
                        loc: {
                            start: { line: 1, column: 61 },
                            end: { line: 1, column: 62 }
                        }
                    }],
                    range: [53, 63],
                    loc: {
                        start: { line: 1, column: 53 },
                        end: { line: 1, column: 63 }
                    }
                },
                range: [53, 64],
                loc: {
                    start: { line: 1, column: 53 },
                    end: { line: 1, column: 64 }
                }
            },
            each: false,
            range: [0, 64],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 64 }
            }
        }

    },

    'continue statement': {

        'while (true) { continue; }': {
            type: 'WhileStatement',
            test: {
                type: 'Literal',
                value: true,
                raw: 'true',
                range: [7, 11],
                loc: {
                    start: { line: 1, column: 7 },
                    end: { line: 1, column: 11 }
                }
            },
            body: {
                type: 'BlockStatement',
                body: [
                    {
                        type: 'ContinueStatement',
                        label: null,
                        range: [15, 24],
                        loc: {
                            start: { line: 1, column: 15 },
                            end: { line: 1, column: 24 }
                        }
                    }
                ],
                range: [13, 26],
                loc: {
                    start: { line: 1, column: 13 },
                    end: { line: 1, column: 26 }
                }
            },
            range: [0, 26],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 26 }
            }
        },

        'while (true) { continue }': {
            type: 'WhileStatement',
            test: {
                type: 'Literal',
                value: true,
                raw: 'true',
                range: [7, 11],
                loc: {
                    start: { line: 1, column: 7 },
                    end: { line: 1, column: 11 }
                }
            },
            body: {
                type: 'BlockStatement',
                body: [
                    {
                        type: 'ContinueStatement',
                        label: null,
                        range: [15, 24],
                        loc: {
                            start: { line: 1, column: 15 },
                            end: { line: 1, column: 24 }
                        }
                    }
                ],
                range: [13, 25],
                loc: {
                    start: { line: 1, column: 13 },
                    end: { line: 1, column: 25 }
                }
            },
            range: [0, 25],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 25 }
            }
        },

        'done: while (true) { continue done }': {
            type: 'LabeledStatement',
            label: {
                type: 'Identifier',
                name: 'done',
                range: [0, 4],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 4 }
                }
            },
            body: {
                type: 'WhileStatement',
                test: {
                    type: 'Literal',
                    value: true,
                    raw: 'true',
                    range: [13, 17],
                    loc: {
                        start: { line: 1, column: 13 },
                        end: { line: 1, column: 17 }
                    }
                },
                body: {
                    type: 'BlockStatement',
                    body: [
                        {
                            type: 'ContinueStatement',
                            label: {
                                type: 'Identifier',
                                name: 'done',
                                range: [30, 34],
                                loc: {
                                    start: { line: 1, column: 30 },
                                    end: { line: 1, column: 34 }
                                }
                            },
                            range: [21, 35],
                            loc: {
                                start: { line: 1, column: 21 },
                                end: { line: 1, column: 35 }
                            }
                        }
                    ],
                    range: [19, 36],
                    loc: {
                        start: { line: 1, column: 19 },
                        end: { line: 1, column: 36 }
                    }
                },
                range: [6, 36],
                loc: {
                    start: { line: 1, column: 6 },
                    end: { line: 1, column: 36 }
                }
            },
            range: [0, 36],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 36 }
            }
        },

        'done: while (true) { continue done; }': {
            type: 'LabeledStatement',
            label: {
                type: 'Identifier',
                name: 'done',
                range: [0, 4],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 4 }
                }
            },
            body: {
                type: 'WhileStatement',
                test: {
                    type: 'Literal',
                    value: true,
                    raw: 'true',
                    range: [13, 17],
                    loc: {
                        start: { line: 1, column: 13 },
                        end: { line: 1, column: 17 }
                    }
                },
                body: {
                    type: 'BlockStatement',
                    body: [
                        {
                            type: 'ContinueStatement',
                            label: {
                                type: 'Identifier',
                                name: 'done',
                                range: [30, 34],
                                loc: {
                                    start: { line: 1, column: 30 },
                                    end: { line: 1, column: 34 }
                                }
                            },
                            range: [21, 35],
                            loc: {
                                start: { line: 1, column: 21 },
                                end: { line: 1, column: 35 }
                            }
                        }
                    ],
                    range: [19, 37],
                    loc: {
                        start: { line: 1, column: 19 },
                        end: { line: 1, column: 37 }
                    }
                },
                range: [6, 37],
                loc: {
                    start: { line: 1, column: 6 },
                    end: { line: 1, column: 37 }
                }
            },
            range: [0, 37],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 37 }
            }
        }

    },

    'break statement': {

        'while (true) { break }': {
            type: 'WhileStatement',
            test: {
                type: 'Literal',
                value: true,
                raw: 'true',
                range: [7, 11],
                loc: {
                    start: { line: 1, column: 7 },
                    end: { line: 1, column: 11 }
                }
            },
            body: {
                type: 'BlockStatement',
                body: [
                    {
                        type: 'BreakStatement',
                        label: null,
                        range: [15, 21],
                        loc: {
                            start: { line: 1, column: 15 },
                            end: { line: 1, column: 21 }
                        }
                    }
                ],
                range: [13, 22],
                loc: {
                    start: { line: 1, column: 13 },
                    end: { line: 1, column: 22 }
                }
            },
            range: [0, 22],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 22 }
            }
        },

        'done: while (true) { break done }': {
            type: 'LabeledStatement',
            label: {
                type: 'Identifier',
                name: 'done',
                range: [0, 4],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 4 }
                }
            },
            body: {
                type: 'WhileStatement',
                test: {
                    type: 'Literal',
                    value: true,
                    raw: 'true',
                    range: [13, 17],
                    loc: {
                        start: { line: 1, column: 13 },
                        end: { line: 1, column: 17 }
                    }
                },
                body: {
                    type: 'BlockStatement',
                    body: [
                        {
                            type: 'BreakStatement',
                            label: {
                                type: 'Identifier',
                                name: 'done',
                                range: [27, 31],
                                loc: {
                                    start: { line: 1, column: 27 },
                                    end: { line: 1, column: 31 }
                                }
                            },
                            range: [21, 32],
                            loc: {
                                start: { line: 1, column: 21 },
                                end: { line: 1, column: 32 }
                            }
                        }
                    ],
                    range: [19, 33],
                    loc: {
                        start: { line: 1, column: 19 },
                        end: { line: 1, column: 33 }
                    }
                },
                range: [6, 33],
                loc: {
                    start: { line: 1, column: 6 },
                    end: { line: 1, column: 33 }
                }
            },
            range: [0, 33],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 33 }
            }
        },

        'done: while (true) { break done; }': {
            type: 'LabeledStatement',
            label: {
                type: 'Identifier',
                name: 'done',
                range: [0, 4],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 4 }
                }
            },
            body: {
                type: 'WhileStatement',
                test: {
                    type: 'Literal',
                    value: true,
                    raw: 'true',
                    range: [13, 17],
                    loc: {
                        start: { line: 1, column: 13 },
                        end: { line: 1, column: 17 }
                    }
                },
                body: {
                    type: 'BlockStatement',
                    body: [
                        {
                            type: 'BreakStatement',
                            label: {
                                type: 'Identifier',
                                name: 'done',
                                range: [27, 31],
                                loc: {
                                    start: { line: 1, column: 27 },
                                    end: { line: 1, column: 31 }
                                }
                            },
                            range: [21, 32],
                            loc: {
                                start: { line: 1, column: 21 },
                                end: { line: 1, column: 32 }
                            }
                        }
                    ],
                    range: [19, 34],
                    loc: {
                        start: { line: 1, column: 19 },
                        end: { line: 1, column: 34 }
                    }
                },
                range: [6, 34],
                loc: {
                    start: { line: 1, column: 6 },
                    end: { line: 1, column: 34 }
                }
            },
            range: [0, 34],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 34 }
            }
        }

    },

    'return statement': {

        '(function(){ return })': {
            type: 'ExpressionStatement',
            expression: {
                type: 'FunctionExpression',
                id: null,
                params: [],
                body: {
                    type: 'BlockStatement',
                    body: [
                        {
                            type: 'ReturnStatement',
                            argument: null,
                            range: [13, 20],
                            loc: {
                                start: { line: 1, column: 13 },
                                end: { line: 1, column: 20 }
                            }
                        }
                    ],
                    range: [11, 21],
                    loc: {
                        start: { line: 1, column: 11 },
                        end: { line: 1, column: 21 }
                    }
                },
                range: [0, 22],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 22 }
                }
            },
            range: [0, 22],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 22 }
            }
        },

        '(function(){ return; })': {
            type: 'ExpressionStatement',
            expression: {
                type: 'FunctionExpression',
                id: null,
                params: [],
                body: {
                    type: 'BlockStatement',
                    body: [
                        {
                            type: 'ReturnStatement',
                            argument: null,
                            range: [13, 20],
                            loc: {
                                start: { line: 1, column: 13 },
                                end: { line: 1, column: 20 }
                            }
                        }
                    ],
                    range: [11, 22],
                    loc: {
                        start: { line: 1, column: 11 },
                        end: { line: 1, column: 22 }
                    }
                },
                range: [0, 23],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 23 }
                }
            },
            range: [0, 23],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 23 }
            }
        },

        '(function(){ return x; })': {
            type: 'ExpressionStatement',
            expression: {
                type: 'FunctionExpression',
                id: null,
                params: [],
                body: {
                    type: 'BlockStatement',
                    body: [
                        {
                            type: 'ReturnStatement',
                            argument: {
                                type: 'Identifier',
                                name: 'x',
                                range: [20, 21],
                                loc: {
                                    start: { line: 1, column: 20 },
                                    end: { line: 1, column: 21 }
                                }
                            },
                            range: [13, 22],
                            loc: {
                                start: { line: 1, column: 13 },
                                end: { line: 1, column: 22 }
                            }
                        }
                    ],
                    range: [11, 24],
                    loc: {
                        start: { line: 1, column: 11 },
                        end: { line: 1, column: 24 }
                    }
                },
                range: [0, 25],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 25 }
                }
            },
            range: [0, 25],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 25 }
            }
        },

        '(function(){ return x * y })': {
            type: 'ExpressionStatement',
            expression: {
                type: 'FunctionExpression',
                id: null,
                params: [],
                body: {
                    type: 'BlockStatement',
                    body: [
                        {
                            type: 'ReturnStatement',
                            argument: {
                                type: 'BinaryExpression',
                                operator: '*',
                                left: {
                                    type: 'Identifier',
                                    name: 'x',
                                    range: [20, 21],
                                    loc: {
                                        start: { line: 1, column: 20 },
                                        end: { line: 1, column: 21 }
                                    }
                                },
                                right: {
                                    type: 'Identifier',
                                    name: 'y',
                                    range: [24, 25],
                                    loc: {
                                        start: { line: 1, column: 24 },
                                        end: { line: 1, column: 25 }
                                    }
                                },
                                range: [20, 25],
                                loc: {
                                    start: { line: 1, column: 20 },
                                    end: { line: 1, column: 25 }
                                }
                            },
                            range: [13, 26],
                            loc: {
                                start: { line: 1, column: 13 },
                                end: { line: 1, column: 26 }
                            }
                        }
                    ],
                    range: [11, 27],
                    loc: {
                        start: { line: 1, column: 11 },
                        end: { line: 1, column: 27 }
                    }
                },
                range: [0, 28],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 28 }
                }
            },
            range: [0, 28],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 28 }
            }
        }
    },

    'with statement': {

        'with (x) foo = bar': {
            type: 'WithStatement',
            object: {
                type: 'Identifier',
                name: 'x',
                range: [6, 7],
                loc: {
                    start: { line: 1, column: 6 },
                    end: { line: 1, column: 7 }
                }
            },
            body: {
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'foo',
                        range: [9, 12],
                        loc: {
                            start: { line: 1, column: 9 },
                            end: { line: 1, column: 12 }
                        }
                    },
                    right: {
                        type: 'Identifier',
                        name: 'bar',
                        range: [15, 18],
                        loc: {
                            start: { line: 1, column: 15 },
                            end: { line: 1, column: 18 }
                        }
                    },
                    range: [9, 18],
                    loc: {
                        start: { line: 1, column: 9 },
                        end: { line: 1, column: 18 }
                    }
                },
                range: [9, 18],
                loc: {
                    start: { line: 1, column: 9 },
                    end: { line: 1, column: 18 }
                }
            },
            range: [0, 18],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 18 }
            }
        },

        'with (x) foo = bar;': {
            type: 'WithStatement',
            object: {
                type: 'Identifier',
                name: 'x',
                range: [6, 7],
                loc: {
                    start: { line: 1, column: 6 },
                    end: { line: 1, column: 7 }
                }
            },
            body: {
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'foo',
                        range: [9, 12],
                        loc: {
                            start: { line: 1, column: 9 },
                            end: { line: 1, column: 12 }
                        }
                    },
                    right: {
                        type: 'Identifier',
                        name: 'bar',
                        range: [15, 18],
                        loc: {
                            start: { line: 1, column: 15 },
                            end: { line: 1, column: 18 }
                        }
                    },
                    range: [9, 18],
                    loc: {
                        start: { line: 1, column: 9 },
                        end: { line: 1, column: 18 }
                    }
                },
                range: [9, 19],
                loc: {
                    start: { line: 1, column: 9 },
                    end: { line: 1, column: 19 }
                }
            },
            range: [0, 19],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 19 }
            }
        },

        'with (x) { foo = bar }': {
            type: 'WithStatement',
            object: {
                type: 'Identifier',
                name: 'x',
                range: [6, 7],
                loc: {
                    start: { line: 1, column: 6 },
                    end: { line: 1, column: 7 }
                }
            },
            body: {
                type: 'BlockStatement',
                body: [{
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'AssignmentExpression',
                        operator: '=',
                        left: {
                            type: 'Identifier',
                            name: 'foo',
                            range: [11, 14],
                            loc: {
                                start: { line: 1, column: 11 },
                                end: { line: 1, column: 14 }
                            }
                        },
                        right: {
                            type: 'Identifier',
                            name: 'bar',
                            range: [17, 20],
                            loc: {
                                start: { line: 1, column: 17 },
                                end: { line: 1, column: 20 }
                            }
                        },
                        range: [11, 20],
                        loc: {
                            start: { line: 1, column: 11 },
                            end: { line: 1, column: 20 }
                        }
                    },
                    range: [11, 21],
                    loc: {
                        start: { line: 1, column: 11 },
                        end: { line: 1, column: 21 }
                    }
                }],
                range: [9, 22],
                loc: {
                    start: { line: 1, column: 9 },
                    end: { line: 1, column: 22 }
                }
            },
            range: [0, 22],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 22 }
            }
        }

    },

    'switch statement': {

        'switch (x) {}': {
            type: 'SwitchStatement',
            discriminant: {
                type: 'Identifier',
                name: 'x',
                range: [8, 9],
                loc: {
                    start: { line: 1, column: 8 },
                    end: { line: 1, column: 9 }
                }
            },
            range: [0, 13],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 13 }
            }
        },

        'switch (answer) { case 42: hi(); break; }': {
            type: 'SwitchStatement',
            discriminant: {
                type: 'Identifier',
                name: 'answer',
                range: [8, 14],
                loc: {
                    start: { line: 1, column: 8 },
                    end: { line: 1, column: 14 }
                }
            },
            cases: [{
                type: 'SwitchCase',
                test: {
                    type: 'Literal',
                    value: 42,
                    raw: '42',
                    range: [23, 25],
                    loc: {
                        start: { line: 1, column: 23 },
                        end: { line: 1, column: 25 }
                    }
                },
                consequent: [{
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'CallExpression',
                        callee: {
                            type: 'Identifier',
                            name: 'hi',
                            range: [27, 29],
                            loc: {
                                start: { line: 1, column: 27 },
                                end: { line: 1, column: 29 }
                            }
                        },
                        arguments: [],
                        range: [27, 31],
                        loc: {
                            start: { line: 1, column: 27 },
                            end: { line: 1, column: 31 }
                        }
                    },
                    range: [27, 32],
                    loc: {
                        start: { line: 1, column: 27 },
                        end: { line: 1, column: 32 }
                    }
                }, {
                    type: 'BreakStatement',
                    label: null,
                    range: [33, 39],
                    loc: {
                        start: { line: 1, column: 33 },
                        end: { line: 1, column: 39 }
                    }
                }],
                range: [18, 39],
                loc: {
                    start: { line: 1, column: 18 },
                    end: { line: 1, column: 39 }
                }
            }],
            range: [0, 41],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 41 }
            }
        },

        'switch (answer) { case 42: hi(); break; default: break }': {
            type: 'SwitchStatement',
            discriminant: {
                type: 'Identifier',
                name: 'answer',
                range: [8, 14],
                loc: {
                    start: { line: 1, column: 8 },
                    end: { line: 1, column: 14 }
                }
            },
            cases: [{
                type: 'SwitchCase',
                test: {
                    type: 'Literal',
                    value: 42,
                    raw: '42',
                    range: [23, 25],
                    loc: {
                        start: { line: 1, column: 23 },
                        end: { line: 1, column: 25 }
                    }
                },
                consequent: [{
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'CallExpression',
                        callee: {
                            type: 'Identifier',
                            name: 'hi',
                            range: [27, 29],
                            loc: {
                                start: { line: 1, column: 27 },
                                end: { line: 1, column: 29 }
                            }
                        },
                        arguments: [],
                        range: [27, 31],
                        loc: {
                            start: { line: 1, column: 27 },
                            end: { line: 1, column: 31 }
                        }
                    },
                    range: [27, 32],
                    loc: {
                        start: { line: 1, column: 27 },
                        end: { line: 1, column: 32 }
                    }
                }, {
                    type: 'BreakStatement',
                    label: null,
                    range: [33, 39],
                    loc: {
                        start: { line: 1, column: 33 },
                        end: { line: 1, column: 39 }
                    }
                }],
                range: [18, 39],
                loc: {
                    start: { line: 1, column: 18 },
                    end: { line: 1, column: 39 }
                }
            }, {
                type: 'SwitchCase',
                test: null,
                consequent: [{
                    type: 'BreakStatement',
                    label: null,
                    range: [49, 55],
                    loc: {
                        start: { line: 1, column: 49 },
                        end: { line: 1, column: 55 }
                    }
                }],
                range: [40, 55],
                loc: {
                    start: { line: 1, column: 40 },
                    end: { line: 1, column: 55 }
                }
            }],
            range: [0, 56],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 56 }
            }
        },
        'switch (answer) { case 42: {hi();} break; }': {
            type: 'SwitchStatement',
            discriminant: {
                type: 'Identifier',
                name: 'answer',
                range: [8, 14],
                loc: {
                    start: { line: 1, column: 8 },
                    end: { line: 1, column: 14 }
                }
            },
            cases: [{
                type: 'SwitchCase',
                test: {
                    type: 'Literal',
                    value: 42,
                    raw: '42',
                    range: [23, 25],
                    loc: {
                        start: { line: 1, column: 23 },
                        end: { line: 1, column: 25 }
                    }
                },
                consequent: [{
                    type: 'BlockStatement',
                    body: [
                        {
                            type: 'ExpressionStatement',
                            expression: {
                                type: 'CallExpression',
                                callee: {
                                    type: 'Identifier',
                                    name: 'hi',
                                    range: [27, 29],
                                    loc: {
                                        start: { line: 1, column: 27 },
                                        end: { line: 1, column: 29 }
                                    }
                                },
                                arguments: [],
                                range: [27, 31],
                                loc: {
                                    start: { line: 1, column: 27 },
                                    end: { line: 1, column: 31 }
                                }
                            },
                            range: [27, 32],
                            loc: {
                                start: { line: 1, column: 27 },
                                end: { line: 1, column: 32 }
                            }
                        }
                    ]
                }, {
                    type: 'BreakStatement',
                    label: null,
                    range: [33, 39],
                    loc: {
                        start: { line: 1, column: 33 },
                        end: { line: 1, column: 39 }
                    }
                }],
                range: [18, 39],
                loc: {
                    start: { line: 1, column: 18 },
                    end: { line: 1, column: 39 }
                }
            }],
            range: [0, 41],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 41 }
            }
        }
    },

    'Labelled Statements': {

        'start: for (;;) break start': {
            type: 'LabeledStatement',
            label: {
                type: 'Identifier',
                name: 'start',
                range: [0, 5],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 5 }
                }
            },
            body: {
                type: 'ForStatement',
                init: null,
                test: null,
                update: null,
                body: {
                    type: 'BreakStatement',
                    label: {
                        type: 'Identifier',
                        name: 'start',
                        range: [22, 27],
                        loc: {
                            start: { line: 1, column: 22 },
                            end: { line: 1, column: 27 }
                        }
                    },
                    range: [16, 27],
                    loc: {
                        start: { line: 1, column: 16 },
                        end: { line: 1, column: 27 }
                    }
                },
                range: [7, 27],
                loc: {
                    start: { line: 1, column: 7 },
                    end: { line: 1, column: 27 }
                }
            },
            range: [0, 27],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 27 }
            }
        },

        'start: while (true) break start': {
            type: 'LabeledStatement',
            label: {
                type: 'Identifier',
                name: 'start',
                range: [0, 5],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 5 }
                }
            },
            body: {
                type: 'WhileStatement',
                test: {
                    type: 'Literal',
                    value: true,
                    raw: 'true',
                    range: [14, 18],
                    loc: {
                        start: { line: 1, column: 14 },
                        end: { line: 1, column: 18 }
                    }
                },
                body: {
                    type: 'BreakStatement',
                    label: {
                        type: 'Identifier',
                        name: 'start',
                        range: [26, 31],
                        loc: {
                            start: { line: 1, column: 26 },
                            end: { line: 1, column: 31 }
                        }
                    },
                    range: [20, 31],
                    loc: {
                        start: { line: 1, column: 20 },
                        end: { line: 1, column: 31 }
                    }
                },
                range: [7, 31],
                loc: {
                    start: { line: 1, column: 7 },
                    end: { line: 1, column: 31 }
                }
            },
            range: [0, 31],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 31 }
            }
        }

    },

    'throw statement': {

        'throw x;': {
            type: 'ThrowStatement',
            argument: {
                type: 'Identifier',
                name: 'x',
                range: [6, 7],
                loc: {
                    start: { line: 1, column: 6 },
                    end: { line: 1, column: 7 }
                }
            },
            range: [0, 8],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 8 }
            }
        },

        'throw x * y': {
            type: 'ThrowStatement',
            argument: {
                type: 'BinaryExpression',
                operator: '*',
                left: {
                    type: 'Identifier',
                    name: 'x',
                    range: [6, 7],
                    loc: {
                        start: { line: 1, column: 6 },
                        end: { line: 1, column: 7 }
                    }
                },
                right: {
                    type: 'Identifier',
                    name: 'y',
                    range: [10, 11],
                    loc: {
                        start: { line: 1, column: 10 },
                        end: { line: 1, column: 11 }
                    }
                },
                range: [6, 11],
                loc: {
                    start: { line: 1, column: 6 },
                    end: { line: 1, column: 11 }
                }
            },
            range: [0, 11],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 11 }
            }
        },

        'throw { message: "Error" }': {
            type: 'ThrowStatement',
            argument: {
                type: 'ObjectExpression',
                properties: [{
                    type: 'Property',
                    key: {
                        type: 'Identifier',
                        name: 'message',
                        range: [8, 15],
                        loc: {
                            start: { line: 1, column: 8 },
                            end: { line: 1, column: 15 }
                        }
                    },
                    value: {
                        type: 'Literal',
                        value: 'Error',
                        raw: '"Error"',
                        range: [17, 24],
                        loc: {
                            start: { line: 1, column: 17 },
                            end: { line: 1, column: 24 }
                        }
                    },
                    kind: 'init',
                    range: [8, 24],
                    loc: {
                        start: { line: 1, column: 8 },
                        end: { line: 1, column: 24 }
                    }
                }],
                range: [6, 26],
                loc: {
                    start: { line: 1, column: 6 },
                    end: { line: 1, column: 26 }
                }
            },
            range: [0, 26],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 26 }
            }
        }

    },

    'try statement': {

        'try { } catch (e) { }': {
            type: 'TryStatement',
            block: {
                type: 'BlockStatement',
                body: [],
                range: [4, 7],
                loc: {
                    start: { line: 1, column: 4 },
                    end: { line: 1, column: 7 }
                }
            },
            handlers: [{
                type: 'CatchClause',
                param: {
                    type: 'Identifier',
                    name: 'e',
                    range: [15, 16],
                    loc: {
                        start: { line: 1, column: 15 },
                        end: { line: 1, column: 16 }
                    }
                },
                guard: null,
                body: {
                    type: 'BlockStatement',
                    body: [],
                    range: [18, 21],
                    loc: {
                        start: { line: 1, column: 18 },
                        end: { line: 1, column: 21 }
                    }
                },
                range: [8, 21],
                loc: {
                    start: { line: 1, column: 8 },
                    end: { line: 1, column: 21 }
                }
            }],
            finalizer: null,
            range: [0, 21],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 21 }
            }
        },

        'try { } catch (eval) { }': {
            type: 'TryStatement',
            block: {
                type: 'BlockStatement',
                body: [],
                range: [4, 7],
                loc: {
                    start: { line: 1, column: 4 },
                    end: { line: 1, column: 7 }
                }
            },
            handlers: [{
                type: 'CatchClause',
                param: {
                    type: 'Identifier',
                    name: 'eval',
                    range: [15, 19],
                    loc: {
                        start: { line: 1, column: 15 },
                        end: { line: 1, column: 19 }
                    }
                },
                guard: null,
                body: {
                    type: 'BlockStatement',
                    body: [],
                    range: [21, 24],
                    loc: {
                        start: { line: 1, column: 21 },
                        end: { line: 1, column: 24 }
                    }
                },
                range: [8, 24],
                loc: {
                    start: { line: 1, column: 8 },
                    end: { line: 1, column: 24 }
                }
            }],
            finalizer: null,
            range: [0, 24],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 24 }
            }
        },

        'try { } catch (arguments) { }': {
            type: 'TryStatement',
            block: {
                type: 'BlockStatement',
                body: [],
                range: [4, 7],
                loc: {
                    start: { line: 1, column: 4 },
                    end: { line: 1, column: 7 }
                }
            },
            handlers: [{
                type: 'CatchClause',
                param: {
                    type: 'Identifier',
                    name: 'arguments',
                    range: [15, 24],
                    loc: {
                        start: { line: 1, column: 15 },
                        end: { line: 1, column: 24 }
                    }
                },
                guard: null,
                body: {
                    type: 'BlockStatement',
                    body: [],
                    range: [26, 29],
                    loc: {
                        start: { line: 1, column: 26 },
                        end: { line: 1, column: 29 }
                    }
                },
                range: [8, 29],
                loc: {
                    start: { line: 1, column: 8 },
                    end: { line: 1, column: 29 }
                }
            }],
            finalizer: null,
            range: [0, 29],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 29 }
            }
        },

        'try { } catch (e) { say(e) }': {
            type: 'TryStatement',
            block: {
                type: 'BlockStatement',
                body: [],
                range: [4, 7],
                loc: {
                    start: { line: 1, column: 4 },
                    end: { line: 1, column: 7 }
                }
            },
            handlers: [{
                type: 'CatchClause',
                param: {
                    type: 'Identifier',
                    name: 'e',
                    range: [15, 16],
                    loc: {
                        start: { line: 1, column: 15 },
                        end: { line: 1, column: 16 }
                    }
                },
                guard: null,
                body: {
                    type: 'BlockStatement',
                    body: [{
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'CallExpression',
                            callee: {
                                type: 'Identifier',
                                name: 'say',
                                range: [20, 23],
                                loc: {
                                    start: { line: 1, column: 20 },
                                    end: { line: 1, column: 23 }
                                }
                            },
                            arguments: [{
                                type: 'Identifier',
                                name: 'e',
                                range: [24, 25],
                                loc: {
                                    start: { line: 1, column: 24 },
                                    end: { line: 1, column: 25 }
                                }
                            }],
                            range: [20, 26],
                            loc: {
                                start: { line: 1, column: 20 },
                                end: { line: 1, column: 26 }
                            }
                        },
                        range: [20, 27],
                        loc: {
                            start: { line: 1, column: 20 },
                            end: { line: 1, column: 27 }
                        }
                    }],
                    range: [18, 28],
                    loc: {
                        start: { line: 1, column: 18 },
                        end: { line: 1, column: 28 }
                    }
                },
                range: [8, 28],
                loc: {
                    start: { line: 1, column: 8 },
                    end: { line: 1, column: 28 }
                }
            }],
            finalizer: null,
            range: [0, 28],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 28 }
            }
        },

        'try {\n} catch (ex if ex instanceof A) {\n} catch (ex if ex instanceof B) {\n} catch (ex) {\n}': {
            generateFrom: {
                type: 'Program',
                body: [{
                    type: 'TryStatement',
                    block: {
                        type: 'BlockStatement',
                        body: []
                    },
                    guardedHandlers: [
                        {
                            type: 'CatchClause',
                            param: {
                                type: 'Identifier',
                                name: 'ex'
                            },
                            guard: {
                                type: 'BinaryExpression',
                                operator: 'instanceof',
                                left: {
                                    type: 'Identifier',
                                    name: 'ex'
                                },
                                right: {
                                    type: 'Identifier',
                                    name: 'A'
                                }
                            },
                            body: {
                                type: 'BlockStatement',
                                body: []
                            }
                        },
                        {
                            type: 'CatchClause',
                            param: {
                                type: 'Identifier',
                                name: 'ex'
                            },
                            guard: {
                                type: 'BinaryExpression',
                                operator: 'instanceof',
                                left: {
                                    type: 'Identifier',
                                    name: 'ex'
                                },
                                right: {
                                    type: 'Identifier',
                                    name: 'B'
                                }
                            },
                            body: {
                                type: 'BlockStatement',
                                body: []
                            }
                        }
                    ],
                    handler: {
                        type: 'CatchClause',
                        param: {
                            type: 'Identifier',
                            name: 'ex'
                        },
                        guard: null,
                        body: {
                            type: 'BlockStatement',
                            body: []
                        }
                    },
                    finalizer: null
                }]
            }
        },

        'try { } finally { cleanup(stuff) }': {
            type: 'TryStatement',
            block: {
                type: 'BlockStatement',
                body: [],
                range: [4, 7],
                loc: {
                    start: { line: 1, column: 4 },
                    end: { line: 1, column: 7 }
                }
            },
            handlers: [],
            finalizer: {
                type: 'BlockStatement',
                body: [{
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'CallExpression',
                        callee: {
                            type: 'Identifier',
                            name: 'cleanup',
                            range: [18, 25],
                            loc: {
                                start: { line: 1, column: 18 },
                                end: { line: 1, column: 25 }
                            }
                        },
                        arguments: [{
                            type: 'Identifier',
                            name: 'stuff',
                            range: [26, 31],
                            loc: {
                                start: { line: 1, column: 26 },
                                end: { line: 1, column: 31 }
                            }
                        }],
                        range: [18, 32],
                        loc: {
                            start: { line: 1, column: 18 },
                            end: { line: 1, column: 32 }
                        }
                    },
                    range: [18, 33],
                    loc: {
                        start: { line: 1, column: 18 },
                        end: { line: 1, column: 33 }
                    }
                }],
                range: [16, 34],
                loc: {
                    start: { line: 1, column: 16 },
                    end: { line: 1, column: 34 }
                }
            },
            range: [0, 34],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 34 }
            }
        },

        'try { doThat(); } catch (e) { say(e) }': {
            type: 'TryStatement',
            block: {
                type: 'BlockStatement',
                body: [{
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'CallExpression',
                        callee: {
                            type: 'Identifier',
                            name: 'doThat',
                            range: [6, 12],
                            loc: {
                                start: { line: 1, column: 6 },
                                end: { line: 1, column: 12 }
                            }
                        },
                        arguments: [],
                        range: [6, 14],
                        loc: {
                            start: { line: 1, column: 6 },
                            end: { line: 1, column: 14 }
                        }
                    },
                    range: [6, 15],
                    loc: {
                        start: { line: 1, column: 6 },
                        end: { line: 1, column: 15 }
                    }
                }],
                range: [4, 17],
                loc: {
                    start: { line: 1, column: 4 },
                    end: { line: 1, column: 17 }
                }
            },
            handlers: [{
                type: 'CatchClause',
                param: {
                    type: 'Identifier',
                    name: 'e',
                    range: [25, 26],
                    loc: {
                        start: { line: 1, column: 25 },
                        end: { line: 1, column: 26 }
                    }
                },
                guard: null,
                body: {
                    type: 'BlockStatement',
                    body: [{
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'CallExpression',
                            callee: {
                                type: 'Identifier',
                                name: 'say',
                                range: [30, 33],
                                loc: {
                                    start: { line: 1, column: 30 },
                                    end: { line: 1, column: 33 }
                                }
                            },
                            arguments: [{
                                type: 'Identifier',
                                name: 'e',
                                range: [34, 35],
                                loc: {
                                    start: { line: 1, column: 34 },
                                    end: { line: 1, column: 35 }
                                }
                            }],
                            range: [30, 36],
                            loc: {
                                start: { line: 1, column: 30 },
                                end: { line: 1, column: 36 }
                            }
                        },
                        range: [30, 37],
                        loc: {
                            start: { line: 1, column: 30 },
                            end: { line: 1, column: 37 }
                        }
                    }],
                    range: [28, 38],
                    loc: {
                        start: { line: 1, column: 28 },
                        end: { line: 1, column: 38 }
                    }
                },
                range: [18, 38],
                loc: {
                    start: { line: 1, column: 18 },
                    end: { line: 1, column: 38 }
                }
            }],
            finalizer: null,
            range: [0, 38],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 38 }
            }
        },

        'try { doThat(); } catch (e) { say(e) } finally { cleanup(stuff) }': {
            type: 'TryStatement',
            block: {
                type: 'BlockStatement',
                body: [{
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'CallExpression',
                        callee: {
                            type: 'Identifier',
                            name: 'doThat',
                            range: [6, 12],
                            loc: {
                                start: { line: 1, column: 6 },
                                end: { line: 1, column: 12 }
                            }
                        },
                        arguments: [],
                        range: [6, 14],
                        loc: {
                            start: { line: 1, column: 6 },
                            end: { line: 1, column: 14 }
                        }
                    },
                    range: [6, 15],
                    loc: {
                        start: { line: 1, column: 6 },
                        end: { line: 1, column: 15 }
                    }
                }],
                range: [4, 17],
                loc: {
                    start: { line: 1, column: 4 },
                    end: { line: 1, column: 17 }
                }
            },
            handlers: [{
                type: 'CatchClause',
                param: {
                    type: 'Identifier',
                    name: 'e',
                    range: [25, 26],
                    loc: {
                        start: { line: 1, column: 25 },
                        end: { line: 1, column: 26 }
                    }
                },
                guard: null,
                body: {
                    type: 'BlockStatement',
                    body: [{
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'CallExpression',
                            callee: {
                                type: 'Identifier',
                                name: 'say',
                                range: [30, 33],
                                loc: {
                                    start: { line: 1, column: 30 },
                                    end: { line: 1, column: 33 }
                                }
                            },
                            arguments: [{
                                type: 'Identifier',
                                name: 'e',
                                range: [34, 35],
                                loc: {
                                    start: { line: 1, column: 34 },
                                    end: { line: 1, column: 35 }
                                }
                            }],
                            range: [30, 36],
                            loc: {
                                start: { line: 1, column: 30 },
                                end: { line: 1, column: 36 }
                            }
                        },
                        range: [30, 37],
                        loc: {
                            start: { line: 1, column: 30 },
                            end: { line: 1, column: 37 }
                        }
                    }],
                    range: [28, 38],
                    loc: {
                        start: { line: 1, column: 28 },
                        end: { line: 1, column: 38 }
                    }
                },
                range: [18, 38],
                loc: {
                    start: { line: 1, column: 18 },
                    end: { line: 1, column: 38 }
                }
            }],
            finalizer: {
                type: 'BlockStatement',
                body: [{
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'CallExpression',
                        callee: {
                            type: 'Identifier',
                            name: 'cleanup',
                            range: [49, 56],
                            loc: {
                                start: { line: 1, column: 49 },
                                end: { line: 1, column: 56 }
                            }
                        },
                        arguments: [{
                            type: 'Identifier',
                            name: 'stuff',
                            range: [57, 62],
                            loc: {
                                start: { line: 1, column: 57 },
                                end: { line: 1, column: 62 }
                            }
                        }],
                        range: [49, 63],
                        loc: {
                            start: { line: 1, column: 49 },
                            end: { line: 1, column: 63 }
                        }
                    },
                    range: [49, 64],
                    loc: {
                        start: { line: 1, column: 49 },
                        end: { line: 1, column: 64 }
                    }
                }],
                range: [47, 65],
                loc: {
                    start: { line: 1, column: 47 },
                    end: { line: 1, column: 65 }
                }
            },
            range: [0, 65],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 65 }
            }
        },

        'try {\n} catch (e) {\n}': {
            generateFrom: {
                type: 'Program',
                body: [{
                    type: 'TryStatement',
                    block: {
                        type: 'BlockStatement',
                        body: []
                    },
                    guardedHandlers: [],
                    handler: {
                        type: 'CatchClause',
                        param: {
                            type: 'Identifier',
                            name: 'e'
                        },
                        body: {
                            type: 'BlockStatement',
                            body: []
                        }
                    },
                    finalizer: null,
                }]
            }
        },

        'try {\n} catch (e) {\n} catch (f) {\n}': {
            generateFrom: {
                type: 'Program',
                body: [{
                    type: 'TryStatement',
                    block: {
                        type: 'BlockStatement',
                        body: []
                    },
                    guardedHandlers: [],
                    handler: [{
                        type: 'CatchClause',
                        param: {
                            type: 'Identifier',
                            name: 'e'
                        },
                        body: {
                            type: 'BlockStatement',
                            body: []
                        }
                    }, {
                        type: 'CatchClause',
                        param: {
                            type: 'Identifier',
                            name: 'f'
                        },
                        body: {
                            type: 'BlockStatement',
                            body: []
                        }
                    }],
                    finalizer: null,
                }]
            }
        },

        'function t() {\n    try {\n    } catch (e) {\n    } finally {\n    }\n}': {
            generateFrom: {
                type: 'Program',
                body: [{
                    type: 'FunctionDeclaration',
                    id: {
                        type: 'Identifier',
                        name: 't'
                    },
                    params: [],
                    defaults: [],
                    body: {
                        type: 'BlockStatement',
                        body: [{
                            type: 'TryStatement',
                            block: {
                                type: 'BlockStatement',
                                body: []
                            },
                            guardedHandlers: [],
                            handler: {
                                type: 'CatchClause',
                                param: {
                                    type: 'Identifier',
                                    name: 'e'
                                },
                                body: {
                                    type: 'BlockStatement',
                                    body: []
                                }
                            },
                            finalizer: {
                                type: 'BlockStatement',
                                body: []
                            }
                        }]
                    },
                    rest: null,
                    generator: false,
                    expression: false
                }]
            }
        }

    },

    'debugger statement': {

        'debugger;': {
            type: 'DebuggerStatement',
            range: [0, 9],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 9 }
            }
        }

    },

    'Function Definition': {

        'function hello() { sayHi(); }': {
            type: 'FunctionDeclaration',
            id: {
                type: 'Identifier',
                name: 'hello',
                range: [9, 14],
                loc: {
                    start: { line: 1, column: 9 },
                    end: { line: 1, column: 14 }
                }
            },
            params: [],
            body: {
                type: 'BlockStatement',
                body: [{
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'CallExpression',
                        callee: {
                            type: 'Identifier',
                            name: 'sayHi',
                            range: [19, 24],
                            loc: {
                                start: { line: 1, column: 19 },
                                end: { line: 1, column: 24 }
                            }
                        },
                        arguments: [],
                        range: [19, 26],
                        loc: {
                            start: { line: 1, column: 19 },
                            end: { line: 1, column: 26 }
                        }
                    },
                    range: [19, 27],
                    loc: {
                        start: { line: 1, column: 19 },
                        end: { line: 1, column: 27 }
                    }
                }],
                range: [17, 29],
                loc: {
                    start: { line: 1, column: 17 },
                    end: { line: 1, column: 29 }
                }
            },
            range: [0, 29],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 29 }
            }
        },

        'function eval() { }': {
            type: 'FunctionDeclaration',
            id: {
                type: 'Identifier',
                name: 'eval',
                range: [9, 13],
                loc: {
                    start: { line: 1, column: 9 },
                    end: { line: 1, column: 13 }
                }
            },
            params: [],
            body: {
                type: 'BlockStatement',
                body: [],
                range: [16, 19],
                loc: {
                    start: { line: 1, column: 16 },
                    end: { line: 1, column: 19 }
                }
            },
            range: [0, 19],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 19 }
            }
        },

        'function arguments() { }': {
            type: 'FunctionDeclaration',
            id: {
                type: 'Identifier',
                name: 'arguments',
                range: [9, 18],
                loc: {
                    start: { line: 1, column: 9 },
                    end: { line: 1, column: 18 }
                }
            },
            params: [],
            body: {
                type: 'BlockStatement',
                body: [],
                range: [21, 24],
                loc: {
                    start: { line: 1, column: 21 },
                    end: { line: 1, column: 24 }
                }
            },
            range: [0, 24],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 24 }
            }
        },

        'function test(t, t) { }': {
            type: 'FunctionDeclaration',
            id: {
                type: 'Identifier',
                name: 'test',
                range: [9, 13],
                loc: {
                    start: { line: 1, column: 9 },
                    end: { line: 1, column: 13 }
                }
            },
            params: [{
                type: 'Identifier',
                name: 't',
                range: [14, 15],
                loc: {
                    start: { line: 1, column: 14 },
                    end: { line: 1, column: 15 }
                }
            }, {
                type: 'Identifier',
                name: 't',
                range: [17, 18],
                loc: {
                    start: { line: 1, column: 17 },
                    end: { line: 1, column: 18 }
                }
            }],
            body: {
                type: 'BlockStatement',
                body: [],
                range: [20, 23],
                loc: {
                    start: { line: 1, column: 20 },
                    end: { line: 1, column: 23 }
                }
            },
            range: [0, 23],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 23 }
            }
        },

        '(function test(t, t) { })': {
            type: 'ExpressionStatement',
            expression: {
                type: 'FunctionExpression',
                id: {
                    type: 'Identifier',
                    name: 'test',
                    range: [10, 14],
                    loc: {
                        start: { line: 1, column: 10 },
                        end: { line: 1, column: 14 }
                    }
                },
                params: [{
                    type: 'Identifier',
                    name: 't',
                    range: [15, 16],
                    loc: {
                        start: { line: 1, column: 15 },
                        end: { line: 1, column: 16 }
                    }
                }, {
                    type: 'Identifier',
                    name: 't',
                    range: [18, 19],
                    loc: {
                        start: { line: 1, column: 18 },
                        end: { line: 1, column: 19 }
                    }
                }],
                body: {
                    type: 'BlockStatement',
                    body: [],
                    range: [21, 24],
                    loc: {
                        start: { line: 1, column: 21 },
                        end: { line: 1, column: 24 }
                    }
                },
                range: [0, 25],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 25 }
                }
            },
            range: [0, 25],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 25 }
            }
        },

        'function eval() { function inner() { "use strict" } }': {
            type: 'FunctionDeclaration',
            id: {
                type: 'Identifier',
                name: 'eval',
                range: [9, 13],
                loc: {
                    start: { line: 1, column: 9 },
                    end: { line: 1, column: 13 }
                }
            },
            params: [],
            body: {
                type: 'BlockStatement',
                body: [{
                    type: 'FunctionDeclaration',
                    id: {
                        type: 'Identifier',
                        name: 'inner',
                        range: [27, 32],
                        loc: {
                            start: { line: 1, column: 27 },
                            end: { line: 1, column: 32 }
                        }
                    },
                    params: [],
                    body: {
                        type: 'BlockStatement',
                        body: [{
                            type: 'ExpressionStatement',
                            expression: {
                                type: 'Literal',
                                value: 'use strict',
                                raw: '"use strict"',
                                range: [37, 49],
                                loc: {
                                    start: { line: 1, column: 37 },
                                    end: { line: 1, column: 49 }
                                }
                            },
                            range: [37, 50],
                            loc: {
                                start: { line: 1, column: 37 },
                                end: { line: 1, column: 50 }
                            }
                        }],
                        range: [35, 51],
                        loc: {
                            start: { line: 1, column: 35 },
                            end: { line: 1, column: 51 }
                        }
                    },
                    range: [18, 51],
                    loc: {
                        start: { line: 1, column: 18 },
                        end: { line: 1, column: 51 }
                    }
                }],
                range: [16, 53],
                loc: {
                    start: { line: 1, column: 16 },
                    end: { line: 1, column: 53 }
                }
            },
            range: [0, 53],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 53 }
            }
        },

        'function hello(a) { sayHi(); }': {
            type: 'FunctionDeclaration',
            id: {
                type: 'Identifier',
                name: 'hello',
                range: [9, 14],
                loc: {
                    start: { line: 1, column: 9 },
                    end: { line: 1, column: 14 }
                }
            },
            params: [{
                type: 'Identifier',
                name: 'a',
                range: [15, 16],
                loc: {
                    start: { line: 1, column: 15 },
                    end: { line: 1, column: 16 }
                }
            }],
            body: {
                type: 'BlockStatement',
                body: [{
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'CallExpression',
                        callee: {
                            type: 'Identifier',
                            name: 'sayHi',
                            range: [20, 25],
                            loc: {
                                start: { line: 1, column: 20 },
                                end: { line: 1, column: 25 }
                            }
                        },
                        arguments: [],
                        range: [20, 27],
                        loc: {
                            start: { line: 1, column: 20 },
                            end: { line: 1, column: 27 }
                        }
                    },
                    range: [20, 28],
                    loc: {
                        start: { line: 1, column: 20 },
                        end: { line: 1, column: 28 }
                    }
                }],
                range: [18, 30],
                loc: {
                    start: { line: 1, column: 18 },
                    end: { line: 1, column: 30 }
                }
            },
            range: [0, 30],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 30 }
            }
        },

        'function hello(a, b) { sayHi(); }': {
            type: 'FunctionDeclaration',
            id: {
                type: 'Identifier',
                name: 'hello',
                range: [9, 14],
                loc: {
                    start: { line: 1, column: 9 },
                    end: { line: 1, column: 14 }
                }
            },
            params: [{
                type: 'Identifier',
                name: 'a',
                range: [15, 16],
                loc: {
                    start: { line: 1, column: 15 },
                    end: { line: 1, column: 16 }
                }
            }, {
                type: 'Identifier',
                name: 'b',
                range: [18, 19],
                loc: {
                    start: { line: 1, column: 18 },
                    end: { line: 1, column: 19 }
                }
            }],
            body: {
                type: 'BlockStatement',
                body: [{
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'CallExpression',
                        callee: {
                            type: 'Identifier',
                            name: 'sayHi',
                            range: [23, 28],
                            loc: {
                                start: { line: 1, column: 23 },
                                end: { line: 1, column: 28 }
                            }
                        },
                        arguments: [],
                        range: [23, 30],
                        loc: {
                            start: { line: 1, column: 23 },
                            end: { line: 1, column: 30 }
                        }
                    },
                    range: [23, 31],
                    loc: {
                        start: { line: 1, column: 23 },
                        end: { line: 1, column: 31 }
                    }
                }],
                range: [21, 33],
                loc: {
                    start: { line: 1, column: 21 },
                    end: { line: 1, column: 33 }
                }
            },
            range: [0, 33],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 33 }
            }
        },

        'var hi = function() { sayHi() };': {
            type: 'VariableDeclaration',
            declarations: [{
                type: 'VariableDeclarator',
                id: {
                    type: 'Identifier',
                    name: 'hi',
                    range: [4, 6],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 6 }
                    }
                },
                init: {
                    type: 'FunctionExpression',
                    id: null,
                    params: [],
                    body: {
                        type: 'BlockStatement',
                        body: [{
                            type: 'ExpressionStatement',
                            expression: {
                                type: 'CallExpression',
                                callee: {
                                    type: 'Identifier',
                                    name: 'sayHi',
                                    range: [22, 27],
                                    loc: {
                                        start: { line: 1, column: 22 },
                                        end: { line: 1, column: 27 }
                                    }
                                },
                                arguments: [],
                                range: [22, 29],
                                loc: {
                                    start: { line: 1, column: 22 },
                                    end: { line: 1, column: 29 }
                                }
                            },
                            range: [22, 30],
                            loc: {
                                start: { line: 1, column: 22 },
                                end: { line: 1, column: 30 }
                            }
                        }],
                        range: [20, 31],
                        loc: {
                            start: { line: 1, column: 20 },
                            end: { line: 1, column: 31 }
                        }
                    },
                    range: [9, 31],
                    loc: {
                        start: { line: 1, column: 9 },
                        end: { line: 1, column: 31 }
                    }
                },
                range: [4, 31],
                loc: {
                    start: { line: 1, column: 4 },
                    end: { line: 1, column: 31 }
                }
            }],
            kind: 'var',
            range: [0, 32],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 32 }
            }
        },

        'var hi = function eval() { };': {
            type: 'VariableDeclaration',
            declarations: [{
                type: 'VariableDeclarator',
                id: {
                    type: 'Identifier',
                    name: 'hi',
                    range: [4, 6],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 6 }
                    }
                },
                init: {
                    type: 'FunctionExpression',
                    id: {
                        type: 'Identifier',
                        name: 'eval',
                        range: [18, 22],
                        loc: {
                            start: { line: 1, column: 18 },
                            end: { line: 1, column: 22 }
                        }
                    },
                    params: [],
                    body: {
                        type: 'BlockStatement',
                        body: [],
                        range: [25, 28],
                        loc: {
                            start: { line: 1, column: 25 },
                            end: { line: 1, column: 28 }
                        }
                    },
                    range: [9, 28],
                    loc: {
                        start: { line: 1, column: 9 },
                        end: { line: 1, column: 28 }
                    }
                },
                range: [4, 28],
                loc: {
                    start: { line: 1, column: 4 },
                    end: { line: 1, column: 28 }
                }
            }],
            kind: 'var',
            range: [0, 29],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 29 }
            }
        },

        'var hi = function arguments() { };': {
            type: 'VariableDeclaration',
            declarations: [{
                type: 'VariableDeclarator',
                id: {
                    type: 'Identifier',
                    name: 'hi',
                    range: [4, 6],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 6 }
                    }
                },
                init: {
                    type: 'FunctionExpression',
                    id: {
                        type: 'Identifier',
                        name: 'arguments',
                        range: [18, 27],
                        loc: {
                            start: { line: 1, column: 18 },
                            end: { line: 1, column: 27 }
                        }
                    },
                    params: [],
                    body: {
                        type: 'BlockStatement',
                        body: [],
                        range: [30, 33],
                        loc: {
                            start: { line: 1, column: 30 },
                            end: { line: 1, column: 33 }
                        }
                    },
                    range: [9, 33],
                    loc: {
                        start: { line: 1, column: 9 },
                        end: { line: 1, column: 33 }
                    }
                },
                range: [4, 33],
                loc: {
                    start: { line: 1, column: 4 },
                    end: { line: 1, column: 33 }
                }
            }],
            kind: 'var',
            range: [0, 34],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 34 }
            }
        },

        'var hello = function hi() { sayHi() };': {
            type: 'VariableDeclaration',
            declarations: [{
                type: 'VariableDeclarator',
                id: {
                    type: 'Identifier',
                    name: 'hello',
                    range: [4, 9],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 9 }
                    }
                },
                init: {
                    type: 'FunctionExpression',
                    id: {
                        type: 'Identifier',
                        name: 'hi',
                        range: [21, 23],
                        loc: {
                            start: { line: 1, column: 21 },
                            end: { line: 1, column: 23 }
                        }
                    },
                    params: [],
                    body: {
                        type: 'BlockStatement',
                        body: [{
                            type: 'ExpressionStatement',
                            expression: {
                                type: 'CallExpression',
                                callee: {
                                    type: 'Identifier',
                                    name: 'sayHi',
                                    range: [28, 33],
                                    loc: {
                                        start: { line: 1, column: 28 },
                                        end: { line: 1, column: 33 }
                                    }
                                },
                                arguments: [],
                                range: [28, 35],
                                loc: {
                                    start: { line: 1, column: 28 },
                                    end: { line: 1, column: 35 }
                                }
                            },
                            range: [28, 36],
                            loc: {
                                start: { line: 1, column: 28 },
                                end: { line: 1, column: 36 }
                            }
                        }],
                        range: [26, 37],
                        loc: {
                            start: { line: 1, column: 26 },
                            end: { line: 1, column: 37 }
                        }
                    },
                    range: [12, 37],
                    loc: {
                        start: { line: 1, column: 12 },
                        end: { line: 1, column: 37 }
                    }
                },
                range: [4, 37],
                loc: {
                    start: { line: 1, column: 4 },
                    end: { line: 1, column: 37 }
                }
            }],
            kind: 'var',
            range: [0, 38],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 38 }
            }
        },

        '(function(){})': {
            type: 'ExpressionStatement',
            expression: {
                type: 'FunctionExpression',
                id: null,
                params: [],
                body: {
                    type: 'BlockStatement',
                    body: [],
                    range: [11, 13],
                    loc: {
                        start: { line: 1, column: 11 },
                        end: { line: 1, column: 13 }
                    }
                },
                range: [0, 14],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 14 }
                }
            },
            range: [0, 14],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 14 }
            }
        }

    },

    'Automatic semicolon insertion': {

        '{ x\n++y }': {
            type: 'BlockStatement',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'Identifier',
                    name: 'x',
                    range: [2, 3],
                    loc: {
                        start: { line: 1, column: 2 },
                        end: { line: 1, column: 3 }
                    }
                },
                range: [2, 4],
                loc: {
                    start: { line: 1, column: 2 },
                    end: { line: 2, column: 0 }
                }
            }, {
                type: 'ExpressionStatement',
                expression: {
                    type: 'UpdateExpression',
                    operator: '++',
                    argument: {
                        type: 'Identifier',
                        name: 'y',
                        range: [6, 7],
                        loc: {
                            start: { line: 2, column: 2 },
                            end: { line: 2, column: 3 }
                        }
                    },
                    prefix: true,
                    range: [4, 7],
                    loc: {
                        start: { line: 2, column: 0 },
                        end: { line: 2, column: 3 }
                    }
                },
                range: [4, 8],
                loc: {
                    start: { line: 2, column: 0 },
                    end: { line: 2, column: 4 }
                }
            }],
            range: [0, 9],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 2, column: 5 }
            }
        },

        '{ x\n--y }': {
            type: 'BlockStatement',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'Identifier',
                    name: 'x',
                    range: [2, 3],
                    loc: {
                        start: { line: 1, column: 2 },
                        end: { line: 1, column: 3 }
                    }
                },
                range: [2, 4],
                loc: {
                    start: { line: 1, column: 2 },
                    end: { line: 2, column: 0 }
                }
            }, {
                type: 'ExpressionStatement',
                expression: {
                    type: 'UpdateExpression',
                    operator: '--',
                    argument: {
                        type: 'Identifier',
                        name: 'y',
                        range: [6, 7],
                        loc: {
                            start: { line: 2, column: 2 },
                            end: { line: 2, column: 3 }
                        }
                    },
                    prefix: true,
                    range: [4, 7],
                    loc: {
                        start: { line: 2, column: 0 },
                        end: { line: 2, column: 3 }
                    }
                },
                range: [4, 8],
                loc: {
                    start: { line: 2, column: 0 },
                    end: { line: 2, column: 4 }
                }
            }],
            range: [0, 9],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 2, column: 5 }
            }
        },

        'var x /* comment */;': {
            type: 'VariableDeclaration',
            declarations: [{
                type: 'VariableDeclarator',
                id: {
                    type: 'Identifier',
                    name: 'x',
                    range: [4, 5],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 5 }
                    }
                },
                init: null,
                range: [4, 5],
                loc: {
                    start: { line: 1, column: 4 },
                    end: { line: 1, column: 5 }
                }
            }],
            kind: 'var',
            range: [0, 20],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 20 }
            }
        },

        '{ var x = 14, y = 3\nz; }': {
            type: 'BlockStatement',
            body: [{
                type: 'VariableDeclaration',
                declarations: [{
                    type: 'VariableDeclarator',
                    id: {
                        type: 'Identifier',
                        name: 'x',
                        range: [6, 7],
                        loc: {
                            start: { line: 1, column: 6 },
                            end: { line: 1, column: 7 }
                        }
                    },
                    init: {
                        type: 'Literal',
                        value: 14,
                        raw: '14',
                        range: [10, 12],
                        loc: {
                            start: { line: 1, column: 10 },
                            end: { line: 1, column: 12 }
                        }
                    },
                    range: [6, 12],
                    loc: {
                        start: { line: 1, column: 6 },
                        end: { line: 1, column: 12 }
                    }
                }, {
                    type: 'VariableDeclarator',
                    id: {
                        type: 'Identifier',
                        name: 'y',
                        range: [14, 15],
                        loc: {
                            start: { line: 1, column: 14 },
                            end: { line: 1, column: 15 }
                        }
                    },
                    init: {
                        type: 'Literal',
                        value: 3,
                        raw: '3',
                        range: [18, 19],
                        loc: {
                            start: { line: 1, column: 18 },
                            end: { line: 1, column: 19 }
                        }
                    },
                    range: [14, 19],
                    loc: {
                        start: { line: 1, column: 14 },
                        end: { line: 1, column: 19 }
                    }
                }],
                kind: 'var',
                range: [2, 20],
                loc: {
                    start: { line: 1, column: 2 },
                    end: { line: 2, column: 0 }
                }
            }, {
                type: 'ExpressionStatement',
                expression: {
                    type: 'Identifier',
                    name: 'z',
                    range: [20, 21],
                    loc: {
                        start: { line: 2, column: 0 },
                        end: { line: 2, column: 1 }
                    }
                },
                range: [20, 22],
                loc: {
                    start: { line: 2, column: 0 },
                    end: { line: 2, column: 2 }
                }
            }],
            range: [0, 24],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 2, column: 4 }
            }
        },

        'while (true) { continue\nthere; }': {
            type: 'WhileStatement',
            test: {
                type: 'Literal',
                value: true,
                raw: 'true',
                range: [7, 11],
                loc: {
                    start: { line: 1, column: 7 },
                    end: { line: 1, column: 11 }
                }
            },
            body: {
                type: 'BlockStatement',
                body: [{
                    type: 'ContinueStatement',
                    label: null,
                    range: [15, 23],
                    loc: {
                        start: { line: 1, column: 15 },
                        end: { line: 1, column: 23 }
                    }
                }, {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'Identifier',
                        name: 'there',
                        range: [24, 29],
                        loc: {
                            start: { line: 2, column: 0 },
                            end: { line: 2, column: 5 }
                        }
                    },
                    range: [24, 30],
                    loc: {
                        start: { line: 2, column: 0 },
                        end: { line: 2, column: 6 }
                    }
                }],
                range: [13, 32],
                loc: {
                    start: { line: 1, column: 13 },
                    end: { line: 2, column: 8 }
                }
            },
            range: [0, 32],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 2, column: 8 }
            }
        },

        'while (true) { continue // Comment\nthere; }': {
            type: 'WhileStatement',
            test: {
                type: 'Literal',
                value: true,
                raw: 'true',
                range: [7, 11],
                loc: {
                    start: { line: 1, column: 7 },
                    end: { line: 1, column: 11 }
                }
            },
            body: {
                type: 'BlockStatement',
                body: [{
                    type: 'ContinueStatement',
                    label: null,
                    range: [15, 23],
                    loc: {
                        start: { line: 1, column: 15 },
                        end: { line: 1, column: 23 }
                    }
                }, {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'Identifier',
                        name: 'there',
                        range: [35, 40],
                        loc: {
                            start: { line: 2, column: 0 },
                            end: { line: 2, column: 5 }
                        }
                    },
                    range: [35, 41],
                    loc: {
                        start: { line: 2, column: 0 },
                        end: { line: 2, column: 6 }
                    }
                }],
                range: [13, 43],
                loc: {
                    start: { line: 1, column: 13 },
                    end: { line: 2, column: 8 }
                }
            },
            range: [0, 43],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 2, column: 8 }
            }
        },

        'while (true) { continue /* Multiline\nComment */there; }': {
            type: 'WhileStatement',
            test: {
                type: 'Literal',
                value: true,
                raw: 'true',
                range: [7, 11],
                loc: {
                    start: { line: 1, column: 7 },
                    end: { line: 1, column: 11 }
                }
            },
            body: {
                type: 'BlockStatement',
                body: [{
                    type: 'ContinueStatement',
                    label: null,
                    range: [15, 23],
                    loc: {
                        start: { line: 1, column: 15 },
                        end: { line: 1, column: 23 }
                    }
                }, {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'Identifier',
                        name: 'there',
                        range: [47, 52],
                        loc: {
                            start: { line: 2, column: 10 },
                            end: { line: 2, column: 15 }
                        }
                    },
                    range: [47, 53],
                    loc: {
                        start: { line: 2, column: 10 },
                        end: { line: 2, column: 16 }
                    }
                }],
                range: [13, 55],
                loc: {
                    start: { line: 1, column: 13 },
                    end: { line: 2, column: 18 }
                }
            },
            range: [0, 55],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 2, column: 18 }
            }
        },

        'while (true) { break\nthere; }': {
            type: 'WhileStatement',
            test: {
                type: 'Literal',
                value: true,
                raw: 'true',
                range: [7, 11],
                loc: {
                    start: { line: 1, column: 7 },
                    end: { line: 1, column: 11 }
                }
            },
            body: {
                type: 'BlockStatement',
                body: [{
                    type: 'BreakStatement',
                    label: null,
                    range: [15, 20],
                    loc: {
                        start: { line: 1, column: 15 },
                        end: { line: 1, column: 20 }
                    }
                }, {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'Identifier',
                        name: 'there',
                        range: [21, 26],
                        loc: {
                            start: { line: 2, column: 0 },
                            end: { line: 2, column: 5 }
                        }
                    },
                    range: [21, 27],
                    loc: {
                        start: { line: 2, column: 0 },
                        end: { line: 2, column: 6 }
                    }
                }],
                range: [13, 29],
                loc: {
                    start: { line: 1, column: 13 },
                    end: { line: 2, column: 8 }
                }
            },
            range: [0, 29],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 2, column: 8 }
            }
        },

        'while (true) { break // Comment\nthere; }': {
            type: 'WhileStatement',
            test: {
                type: 'Literal',
                value: true,
                raw: 'true',
                range: [7, 11],
                loc: {
                    start: { line: 1, column: 7 },
                    end: { line: 1, column: 11 }
                }
            },
            body: {
                type: 'BlockStatement',
                body: [{
                    type: 'BreakStatement',
                    label: null,
                    range: [15, 20],
                    loc: {
                        start: { line: 1, column: 15 },
                        end: { line: 1, column: 20 }
                    }
                }, {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'Identifier',
                        name: 'there',
                        range: [32, 37],
                        loc: {
                            start: { line: 2, column: 0 },
                            end: { line: 2, column: 5 }
                        }
                    },
                    range: [32, 38],
                    loc: {
                        start: { line: 2, column: 0 },
                        end: { line: 2, column: 6 }
                    }
                }],
                range: [13, 40],
                loc: {
                    start: { line: 1, column: 13 },
                    end: { line: 2, column: 8 }
                }
            },
            range: [0, 40],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 2, column: 8 }
            }
        },

        'while (true) { break /* Multiline\nComment */there; }': {
            type: 'WhileStatement',
            test: {
                type: 'Literal',
                value: true,
                raw: 'true',
                range: [7, 11],
                loc: {
                    start: { line: 1, column: 7 },
                    end: { line: 1, column: 11 }
                }
            },
            body: {
                type: 'BlockStatement',
                body: [{
                    type: 'BreakStatement',
                    label: null,
                    range: [15, 20],
                    loc: {
                        start: { line: 1, column: 15 },
                        end: { line: 1, column: 20 }
                    }
                }, {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'Identifier',
                        name: 'there',
                        range: [44, 49],
                        loc: {
                            start: { line: 2, column: 10 },
                            end: { line: 2, column: 15 }
                        }
                    },
                    range: [44, 50],
                    loc: {
                        start: { line: 2, column: 10 },
                        end: { line: 2, column: 16 }
                    }
                }],
                range: [13, 52],
                loc: {
                    start: { line: 1, column: 13 },
                    end: { line: 2, column: 18 }
                }
            },
            range: [0, 52],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 2, column: 18 }
            }
        },

        '(function(){ return\nx; })': {
            type: 'ExpressionStatement',
            expression: {
                type: 'FunctionExpression',
                id: null,
                params: [],
                body: {
                    type: 'BlockStatement',
                    body: [
                        {
                            type: 'ReturnStatement',
                            argument: null,
                            range: [13, 19],
                            loc: {
                                start: { line: 1, column: 13 },
                                end: { line: 1, column: 19 }
                            }
                        },
                        {
                            type: 'ExpressionStatement',
                            expression: {
                                type: 'Identifier',
                                name: 'x',
                                range: [20, 21],
                                loc: {
                                    start: { line: 2, column: 0 },
                                    end: { line: 2, column: 1 }
                                }
                            },
                            range: [20, 22],
                            loc: {
                                start: { line: 2, column: 0 },
                                end: { line: 2, column: 2 }
                            }
                        }
                    ],
                    range: [11, 24],
                    loc: {
                        start: { line: 1, column: 11 },
                        end: { line: 2, column: 4 }
                    }
                },
                range: [0, 25],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 2, column: 5 }
                }
            },
            range: [0, 25],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 2, column: 5 }
            }
        },

        '(function(){ return // Comment\nx; })': {
            type: 'ExpressionStatement',
            expression: {
                type: 'FunctionExpression',
                id: null,
                params: [],
                body: {
                    type: 'BlockStatement',
                    body: [
                        {
                            type: 'ReturnStatement',
                            argument: null,
                            range: [13, 19],
                            loc: {
                                start: { line: 1, column: 13 },
                                end: { line: 1, column: 19 }
                            }
                        },
                        {
                            type: 'ExpressionStatement',
                            expression: {
                                type: 'Identifier',
                                name: 'x',
                                range: [31, 32],
                                loc: {
                                    start: { line: 2, column: 0 },
                                    end: { line: 2, column: 1 }
                                }
                            },
                            range: [31, 33],
                            loc: {
                                start: { line: 2, column: 0 },
                                end: { line: 2, column: 2 }
                            }
                        }
                    ],
                    range: [11, 35],
                    loc: {
                        start: { line: 1, column: 11 },
                        end: { line: 2, column: 4 }
                    }
                },
                range: [0, 36],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 2, column: 5 }
                }
            },
            range: [0, 36],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 2, column: 5 }
            }
        },

        '(function(){ return/* Multiline\nComment */x; })': {
            type: 'ExpressionStatement',
            expression: {
                type: 'FunctionExpression',
                id: null,
                params: [],
                body: {
                    type: 'BlockStatement',
                    body: [
                        {
                            type: 'ReturnStatement',
                            argument: null,
                            range: [13, 19],
                            loc: {
                                start: { line: 1, column: 13 },
                                end: { line: 1, column: 19 }
                            }
                        },
                        {
                            type: 'ExpressionStatement',
                            expression: {
                                type: 'Identifier',
                                name: 'x',
                                range: [42, 43],
                                loc: {
                                    start: { line: 2, column: 10 },
                                    end: { line: 2, column: 11 }
                                }
                            },
                            range: [42, 44],
                            loc: {
                                start: { line: 2, column: 10 },
                                end: { line: 2, column: 12 }
                            }
                        }
                    ],
                    range: [11, 46],
                    loc: {
                        start: { line: 1, column: 11 },
                        end: { line: 2, column: 14 }
                    }
                },
                range: [0, 47],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 2, column: 15 }
                }
            },
            range: [0, 47],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 2, column: 15 }
            }
        },

        '{ throw error\nerror; }': {
            type: 'BlockStatement',
            body: [{
                type: 'ThrowStatement',
                argument: {
                    type: 'Identifier',
                    name: 'error',
                    range: [8, 13],
                    loc: {
                        start: { line: 1, column: 8 },
                        end: { line: 1, column: 13 }
                    }
                },
                range: [2, 14],
                loc: {
                    start: { line: 1, column: 2 },
                    end: { line: 2, column: 0 }
                }
            }, {
                type: 'ExpressionStatement',
                expression: {
                    type: 'Identifier',
                    name: 'error',
                    range: [14, 19],
                    loc: {
                        start: { line: 2, column: 0 },
                        end: { line: 2, column: 5 }
                    }
                },
                range: [14, 20],
                loc: {
                    start: { line: 2, column: 0 },
                    end: { line: 2, column: 6 }
                }
            }],
            range: [0, 22],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 2, column: 8 }
            }
        },

        '{ throw error// Comment\nerror; }': {
            type: 'BlockStatement',
            body: [{
                type: 'ThrowStatement',
                argument: {
                    type: 'Identifier',
                    name: 'error',
                    range: [8, 13],
                    loc: {
                        start: { line: 1, column: 8 },
                        end: { line: 1, column: 13 }
                    }
                },
                range: [2, 24],
                loc: {
                    start: { line: 1, column: 2 },
                    end: { line: 2, column: 0 }
                }
            }, {
                type: 'ExpressionStatement',
                expression: {
                    type: 'Identifier',
                    name: 'error',
                    range: [24, 29],
                    loc: {
                        start: { line: 2, column: 0 },
                        end: { line: 2, column: 5 }
                    }
                },
                range: [24, 30],
                loc: {
                    start: { line: 2, column: 0 },
                    end: { line: 2, column: 6 }
                }
            }],
            range: [0, 32],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 2, column: 8 }
            }
        },

        '{ throw error/* Multiline\nComment */error; }': {
            type: 'BlockStatement',
            body: [{
                type: 'ThrowStatement',
                argument: {
                    type: 'Identifier',
                    name: 'error',
                    range: [8, 13],
                    loc: {
                        start: { line: 1, column: 8 },
                        end: { line: 1, column: 13 }
                    }
                },
                range: [2, 36],
                loc: {
                    start: { line: 1, column: 2 },
                    end: { line: 2, column: 10 }
                }
            }, {
                type: 'ExpressionStatement',
                expression: {
                    type: 'Identifier',
                    name: 'error',
                    range: [36, 41],
                    loc: {
                        start: { line: 2, column: 10 },
                        end: { line: 2, column: 15 }
                    }
                },
                range: [36, 42],
                loc: {
                    start: { line: 2, column: 10 },
                    end: { line: 2, column: 16 }
                }
            }],
            range: [0, 44],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 2, column: 18 }
            }
        }

    },

    'Source elements': {

        '': {
            type: 'Program',
            body: [],
            range: [0, 0],
            loc: {
                start: { line: 0, column: 0 },
                end: { line: 0, column: 0 }
            },
            tokens: []
        }
    }
};

const runTest = getRunTest(esprima, {
    comment: false,
    range: false,
    loc: false,
    tokens: false,
    raw: false
});

describe('general test', function () {
    Object.keys(data).forEach(function (category) {
        it(category, function () {
            Object.keys(data[category]).forEach(function (source) {
                const expected = data[category][source];
                runTest(source, expected);
            });
        });
    });
});
/* vim: set sw=4 ts=4 et tw=80 : */
