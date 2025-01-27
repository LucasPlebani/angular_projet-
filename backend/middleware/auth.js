// Route auth protection des routes via l'authentification des routes 
const { generateDeviceFingerprint } = require('../utils/securityUtils');
const { verifyToken, verifyNonce } = require('../utils/tokenUtils');

const authMiddleware = async (req, res, next) => {
  try {
    // Vérification de la présence du tokenen-tête "Authorization"
    const token = req.headers['authorization']?.split(' ')[1]; // Recup le token Bearer

    if (!token) {
      return res.status(401).json({ message: 'Token non fourni' });
    }

    //  Vérification du token et récupération des données du token
    const tokenVerificationResult = await verifyToken(token, req); // Utilisation de verifyToken avec token et req
    if (!tokenVerificationResult.isValid) {
      return res.status(401).json({ message: 'Token invalide ou expiré', error: tokenVerificationResult.error });
    }

    //  Vérification du nonce
    const tokenPayload = tokenVerificationResult.payload; // Récupérer les info du token
    const isValidNonce = verifyNonce(
      { userId: tokenPayload.userId, role: tokenPayload.role, issueAt: tokenPayload.issueAt, expiresIn: tokenPayload.expiresIn, scope: tokenPayload.scope, issuer: tokenPayload.issuer, deviceFingerprint: tokenPayload.deviceFingerprint },
      tokenPayload.nonce,
      tokenPayload.proofOfWork
    );

    if (!isValidNonce) {
      return res.status(403).json({ message: 'Nonce ou preuve de travail invalide' });
    }

    //  Vérification de l'empreinte de l'appareil device fingerprint
    const requestFingerprint = generateDeviceFingerprint(req); // Empreinte de l'appareil de la requête
    if (requestFingerprint !== tokenPayload.deviceFingerprint) {
      return res.status(403).json({ message: 'Empreinte de l\'appareil non reconnue' });
    }

    //  Si ok, add info de user à req
    req.user = tokenPayload; 
    next(); 

  } catch (error) {
    console.error('Erreur d\'authentification:', error);
    return res.status(500).json({ message: 'Erreur serveur' });
  }
};

module.exports = authMiddleware;

