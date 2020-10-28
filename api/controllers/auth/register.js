module.exports = async (req, res) => {
  try {
    const user = await Users.create(_.omit(req.allParams(), 'id')).fetch();
    return res.json(user);
  } catch (err) {
    res.serverError(err);
  }
};