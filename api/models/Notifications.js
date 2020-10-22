module.exports = {
  attributes: {
    title: {
      type: 'string',
      required: true
    },
    body: {
      type: 'string',
      required: true
    },
    read: {
      type: 'boolean',
      defaultsTo: false
    },
  }
};
