import Saved from "../models/Saved.js";
// add a produc to a saved list of a user
export const addToSaved = async (req, res, next) => {
  const { uid } = req.user;
  const { pid } = req.params;

  try {
    const productExist = await Saved.findOne({
      owner: uid,
      products: pid,
    }).populate("products");

    if (productExist) {
      return res.status(200).send(productExist);
    }

    const updatedSaved = await Saved.findOneAndUpdate(
      { owner: uid },
      { $push: { products: pid } },
      { new: true }
    ).populate("products");

    res.status(201).send(updatedSaved);
  } catch (e) {
    next(e);
  }
};

// remove a product from saved list of a user
export const removeFromSaved = async (req, res, next) => {
  const { uid } = req.user;
  const { pid } = req.params;

  try {
    const updatedSaved = await Saved.findOneAndUpdate(
      { owner: uid },
      { $pull: { products: pid } },
      { new: true }
    ).populate("products");
    res.status(201).send(updatedSaved);
  } catch (e) {
    next(e);
  }
};
