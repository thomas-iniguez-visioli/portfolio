const crypto = require('crypto');

/**
 * AES-256 encryption system for subscriber email protection
 * Uses environment variable for secure key storage
 */
class EncryptionManager {
  constructor() {
    this.algorithm = 'aes-256-cbc';
    this.currentKey = null;
    this.keyVersion = 'env-v1'; // Fixed version for environment-based key
    
    this.loadKeyFromEnvironment();
  }

  /**
   * Load encryption key from environment variable
   */
  loadKeyFromEnvironment() {
    const envKey = process.env.ENCRYPTION_KEY;
    
    if (!envKey) {
      throw new Error('ENCRYPTION_KEY environment variable is required but not set');
    }

    try {
      // Try to parse as base64 first (recommended format)
      let keyBuffer;
      try {
        keyBuffer = Buffer.from(envKey, 'base64');
      } catch (e) {
        // Fallback to hex format
        try {
          keyBuffer = Buffer.from(envKey, 'hex');
        } catch (e2) {
          throw new Error('ENCRYPTION_KEY must be in base64 or hex format');
        }
      }

      // Validate key length (32 bytes for AES-256)
      if (keyBuffer.length !== 32) {
        throw new Error(`Invalid encryption key length: ${keyBuffer.length} bytes (expected 32 bytes for AES-256)`);
      }

      this.currentKey = keyBuffer;
      
    } catch (error) {
      throw new Error(`Failed to load encryption key from environment: ${error.message}`);
    }
  }

  /**
   * Generate a new encryption key (for setup purposes)
   */
  static generateKey() {
    return crypto.randomBytes(32); // 256 bits
  }

  /**
   * Generate a base64-encoded key for environment variable storage
   */
  static generateBase64Key() {
    const key = EncryptionManager.generateKey();
    return key.toString('base64');
  }

  /**
   * Generic encrypt method for any data
   */
  async encrypt(data) {
    if (!this.currentKey) {
      throw new Error('No encryption key available');
    }

    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(this.algorithm, this.currentKey, iv);

    let encrypted = cipher.update(data, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    return {
      data: encrypted,
      iv: iv.toString('hex'),
      keyVersion: this.keyVersion
    };
  }

  /**
   * Generic decrypt method for any data
   */
  async decrypt(encryptedData) {
    if (!this.currentKey) {
      throw new Error('No encryption key available');
    }

    const decipher = crypto.createDecipheriv(this.algorithm, this.currentKey, Buffer.from(encryptedData.iv, 'hex'));
    
    let decrypted = decipher.update(encryptedData.data, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted;
  }

  /**
   * Encrypt email address with current key
   */
  encryptEmail(email) {
    if (!this.currentKey) {
      throw new Error('No encryption key available');
    }

    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(this.algorithm, this.currentKey, iv);

    let encrypted = cipher.update(email, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    return {
      encrypted,
      iv: iv.toString('hex'),
      keyVersion: this.keyVersion
    };
  }

  /**
   * Decrypt email address
   * For environment-based keys, all data uses the same key version
   */
decryptEmail(encryptedData) {
  if (!this.currentKey) {
    throw new Error('No encryption key available');
  }

  let encrypted, iv, keyVersion;

  if (typeof encryptedData === 'string') {
    // Format hérité : assume que la chaîne est les données chiffrées et que l'IV est stocké ailleurs
    // ⚠️ Attention : ce format n'est pas sécurisé et ne peut pas être déchiffré sans l'IV original
    throw new Error('Legacy string format not supported without original IV');
  } else {
    // Format attendu : objet avec encrypted, iv, et keyVersion
    ({ encrypted, iv, keyVersion } = encryptedData);
  }

  // Valider l'IV
  if (!iv || Buffer.from(iv, 'hex').length !== 16) {
    throw new Error(`IV invalide : ${iv}`);
  }

  // Valider la version de la clé
  if (keyVersion && keyVersion !== this.keyVersion) {
    console.warn(`⚠️  Les données chiffrées utilisent la version de clé ${keyVersion}, mais la version actuelle est ${this.keyVersion}`);
  }

  // Déchiffrer
  try {
    const decipher = crypto.createDecipheriv(this.algorithm, this.currentKey, Buffer.from(iv, 'hex'));
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  } catch (error) {
    throw new Error(`Échec du déchiffrement : ${error.message}`);
  }
}


  /**
   * Get current key version
   */
  getCurrentKeyVersion() {
    return this.keyVersion;
  }

  /**
   * Validate that the encryption key is properly configured
   */
  validateKey() {
    try {
      if (!this.currentKey) {
        return { valid: false, error: 'No encryption key loaded' };
      }

      if (this.currentKey.length !== 32) {
        return { valid: false, error: `Invalid key length: ${this.currentKey.length} bytes (expected 32)` };
      }

      // Test encryption/decryption
      const testEmail = 'test@example.com';
      const encrypted = this.encryptEmail(testEmail);
      const decrypted = this.decryptEmail(encrypted);

      if (decrypted !== testEmail) {
        return { valid: false, error: 'Encryption test failed: data mismatch' };
      }

      return { 
        valid: true, 
        keyVersion: this.keyVersion,
        keyLength: this.currentKey.length 
      };

    } catch (error) {
      return { valid: false, error: error.message };
    }
  }

  /**
   * Get encryption statistics
   */
  getStats() {
    return {
      keyVersion: this.keyVersion,
      algorithm: this.algorithm,
      keyLength: this.currentKey ? this.currentKey.length : 0,
      isValid: this.currentKey !== null
    };
  }
}

module.exports= { EncryptionManager };
