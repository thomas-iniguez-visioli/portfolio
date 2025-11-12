const aes256 = require('aes256');

/**
 * AES-256 encryption system for subscriber email protection
 * Uses the 'aes256' module for simplified encryption/decryption
 */
class EncryptionManager {
  constructor() {
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

    // The aes256 module expects the key as a string (it will handle the conversion)
    this.currentKey = envKey;
  }

  /**
   * Generate a new encryption key (for setup purposes)
   */
  static generateKey() {
    // aes256 module will handle the key format internally
    return aes256.generateKey();
  }

  /**
   * Generic encrypt method for any data
   */
  encrypt(data) {
    if (!this.currentKey) {
      throw new Error('No encryption key available');
    }
    return aes256.encrypt(this.currentKey, data);
  }

  /**
   * Generic decrypt method for any data
   */
  decrypt(encryptedData) {
    if (!this.currentKey) {
      throw new Error('No encryption key available');
    }
    return aes256.decrypt(this.currentKey, encryptedData);
  }

  /**
   * Encrypt email address with current key
   */
  encryptEmail(email) {
    return this.encrypt(email);
  }

  /**
   * Decrypt email address
   */
  decryptEmail(encryptedData) {
    return this.decrypt(encryptedData);
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
      isValid: !!this.currentKey,
    };
  }
}

module.exports = { EncryptionManager };
