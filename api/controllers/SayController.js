module.exports = {

  hello: function(req, res) {

    // Make sure this is a socket request (not traditional HTTP)
    if (!req.isSocket) {
      return res.badRequest();
    }

    sails.sockets.join(req, 'funSockets');

    sails.sockets.broadcast('funSockets', 'hello', { howdy: 'hi there!'}, req);

    return res.json({
      anyData: 'we want to send back'
    });

  }
}