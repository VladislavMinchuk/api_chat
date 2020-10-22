module.exports = {
  edit: async (req, res) => {
    const newNotif = await Notifications.updateOne({ id: req.params.id }, { ...req.body });
    if (!newNotif) res.notFound();

    // Notifications.publish([newNotif.id], newNotif, req);
    sails.sockets.broadcast('funSockets', 'hello', newNotif);
    res.json(newNotif);

  }
};