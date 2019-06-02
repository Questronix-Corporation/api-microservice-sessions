module.exports = {
    get: function (tag) {
      var errors = {
        MISSING_INVALID_PARAMS: { 
          status: 400, 
          error: { 
            code: -1, 
            message: 'Missing/invalid parameters.', 
            params: [] 
          } 
        },
        INTERNAL_SERVER_ERROR: {
          status: 500, 
          error: {
            code: -2, 
            message: 'Internal server error.'
          }
        },
        NOT_FOUND: {
          status: 404, 
          error: { 
            code: -3, 
            message: "Not found."
          }
        },
        SERVER_ERROR: {
          status: 500,
          error: {
            code: -4,
            message: 'Server unreachable.'
          }
        },
        SERVICE_ERROR: {
          status: 500,
          error: {
            code: -5,
            message: 'Service error/unavailable.'
          }
        },
        UNAUTHORIZED_ACCESS: {
          status: 401,
          error: {
            code: -6,
            message: 'Unauthorized Access.'
          }
        },
        ACCOUNT_NOT_EXISTING: {
          status: 404,
          error: {
            code: -7,
            message: 'Account Not Existing.'
          }
        }
      };
      return errors[tag];
    },
    raise: function (e) {
      var error = JSON.parse(JSON.stringify(this.get(e)));
      return error;
    }
  };