const express = require('express');
const router = express.Router();
const User = require('../models/User');
const upload = require('../middleware/upload');

router.post('/:uid/documents', upload.array('documents', 5), async (req, res) => {
  try {
    const user = await User.findById(req.params.uid);
    const newDocuments = req.files.map(file => ({
      name: file.originalname,
      reference: `/uploads/documents/${file.filename}`
    }));
    user.documents.push(...newDocuments);
    user.save();
    res.status(201).send("Documentos cargados correctamente.");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.put('/premium/:uid', async (req, res) => {
  const user = await User.findById(req.params.uid);
  const requiredDocs = ['Identificación', 'Comprobante de domicilio', 'Comprobante de estado de cuenta'];
  const hasAllDocs = requiredDocs.every(docType => 
    user.documents.some(doc => doc.name === docType)
  );
  
  if (hasAllDocs) {
    user.premium = true;
    await user.save();
    res.send('Usuario actualizado a premium.');
  } else {
    res.status(400).send('No se puede actualizar a premium, documentación incompleta.');
  }
});

module.exports = router;
