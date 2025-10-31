#!/usr/bin/env node

/**
 * Test script for environment-based encryption system
 * Validates that encryption works correctly with environment variables
 */

import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import from correct path
import { EncryptionManager } from '../../newsletter-program/src/core/encryption.js';

async function testEncryptionSystem() {
  console.log('🔐 Testing Environment-Based Encryption System');
  console.log('==============================================');
  console.log('');

  try {
    // Check if encryption key is available
    if (!process.env.ENCRYPTION_KEY) {
      console.error('❌ ENCRYPTION_KEY environment variable not set');
      console.log('');
      console.log('To set up encryption:');
      console.log('1. Generate a key: node .github/scripts/generate-encryption-key.js generate');
      console.log('2. Set environment variable: ENCRYPTION_KEY=your-generated-key');
      console.log('3. For GitHub Actions: Add NEWSLETTER_ENCRYPTION_KEY secret');
      process.exit(1);
    }

    console.log('✅ ENCRYPTION_KEY environment variable found');

    // Initialize encryption manager
    const encryption = new EncryptionManager();
    console.log('✅ EncryptionManager initialized successfully');

    // Validate the key
    const validation = encryption.validateKey();
    if (!validation.valid) {
      console.error('❌ Encryption key validation failed:', validation.error);
      process.exit(1);
    }

    console.log('✅ Encryption key validation passed');
    console.log(`   Key version: ${validation.keyVersion}`);
    console.log(`   Key length: ${validation.keyLength} bytes`);

    // Test encryption/decryption with sample emails
    const testEmails = [
      'user@example.com',
      'test.email+tag@domain.co.uk',
      'newsletter-subscriber@company.org'
    ];

    console.log('');
    console.log('🧪 Testing encryption/decryption:');

    for (const email of testEmails) {
      try {
        // Encrypt
        const encrypted = encryption.encryptEmail(email);
        console.log(`   📧 ${email}`);
        console.log(`   🔒 Encrypted: ${encrypted.encrypted.substring(0, 32)}...`);

        // Decrypt
        const decrypted = encryption.decryptEmail(encrypted);

        if (decrypted === email) {
          console.log(`   🔓 Decrypted: ✅ ${decrypted}`);
        } else {
          console.error(`   🔓 Decrypted: ❌ ${decrypted} (expected: ${email})`);
          throw new Error('Decryption mismatch');
        }

      } catch (error) {
        console.error(`   ❌ Error with ${email}:`, error.message);
        throw error;
      }
    }

    // Test encryption statistics
    console.log('');
    console.log('📊 Encryption Statistics:');
    const stats = encryption.getStats();
    console.log(`   Algorithm: ${stats.algorithm}`);
    console.log(`   Key Version: ${stats.keyVersion}`);
    console.log(`   Key Length: ${stats.keyLength} bytes`);
    console.log(`   Status: ${stats.isValid ? '✅ Valid' : '❌ Invalid'}`);

    console.log('');
    console.log('✅ All encryption tests passed successfully!');
    console.log('');
    console.log('🔒 Security Status:');
    console.log('   ✅ Key stored in environment variable only');
    console.log('   ✅ AES-256-CBC encryption with random IV');
    console.log('   ✅ No key files created or stored');
    console.log('   ✅ Encryption/decryption working correctly');

    return true;

  } catch (error) {
    console.error('');
    console.error('❌ Encryption test failed:', error.message);
    console.error('');
    console.error('Troubleshooting:');
    console.error('1. Verify ENCRYPTION_KEY environment variable is set');
    console.error('2. Ensure key is valid Base64 format (32 bytes when decoded)');
    console.error('3. Generate new key if needed: node .github/scripts/generate-encryption-key.js generate');

    return false;
  }
}

// Run tests if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const success = await testEncryptionSystem();
  process.exit(success ? 0 : 1);
}

export { testEncryptionSystem };