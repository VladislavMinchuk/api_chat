module.exports = {
  attributes: {
    titile: {
      type: 'string',
      required: true
    },
    body: {
      type: 'string',
      required: true
    },
    read: {
      type: 'boolean',
      defaultsTo: true
    },
  }
};
