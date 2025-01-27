const PublicationModel = require("../models/publicationModels");

let publicationModel;

exports.init = (collection) => {
    publicationModel = new PublicationModel(collection);
};

exports.getAllPublications = async (req, res) => {
  try {
    const publications = await publicationModel.getAll();
    res.json(publications);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des publications" });
  }
};

exports.getPublication = async (req, res) => {
  try {
    const id = req.params.id;
    const publication = await publicationModel.getById(id);
    if (publication) {
      res.json(publication);
    } else {
      res.status(404).json({ message: "publication non trouvée" });
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération de la publication" });
  }
};

exports.createPublication = async (req, res) => {
  try {
    const newPublication = {
      titre: req.body.titre,
      description: req.body.description,
    };
    const createdPublication = await publicationModel.create(newPublication);
    res.status(201).json(createdPublication);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Erreur lors de la création de la publication" });
  }
};

exports.updatePublication = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedFields = {
        titre: req.body.titre,
        description: req.body.description,
    };
    const success = await publicationModel.updateById(id, updatedFields);
    if (!success) {
      res.status(404).json({ message: "publication non trouvée" });
    } else {
      res.json({ message: "publication mise à jour" });
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "Erreur lors de la mise à jour de la publication" });
  }
};

exports.deletePublication = async (req, res) => {
  try {
    const id = req.params.id;
    const success = await publicationModel.deleteById(id);
    if (!success) {
      res.status(404).json({ message: "publication non trouvée" });
    } else {
      res.status(200).json({ message: "publication supprimée" });
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "Erreur lors de la suppression de la publication" });
  }
};