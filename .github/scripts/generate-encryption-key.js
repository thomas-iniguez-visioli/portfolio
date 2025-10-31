const crypto = require('crypto');

/**
 * Generate a secure encryption key for environment variable storage
 */
function generateEncryptionKey() {
    try {
        // Generate a 256-bit (32 bytes) random key
        const key = crypto.randomBytes(32);

        // Convert to base64 for GitHub Secrets storage
        const base64Key = key.toString('base64');

        console.log('🔐 Generated Secure Encryption Key');
        console.log('=====================================');
        console.log('');
        console.log('🔑 Encryption Key (Base64):');
        console.log(base64Key);
        console.log('');
        console.log('📋 GitHub Secrets Setup:');
        console.log('1. Copy the key above');
        console.log('2. Go to: Repository Settings > Secrets and variables > Actions');
        console.log('3. Click "New repository secret"');
        console.log('4. Name: NEWSLETTER_ENCRYPTION_KEY');
        console.log('5. Value: Paste the key above');
        console.log('6. Click "Add secret"');
        console.log('');
        console.log('🔧 Local Development Setup:');
        console.log('Add to your .env file:');
        console.log(`ENCRYPTION_KEY=${base64Key}`);
        console.log('');
        console.log('⚠️  SECURITY WARNINGS:');
        console.log('- Store this key securely - it cannot be recovered if lost');
        console.log('- Never commit this key to your repository');
        console.log('- Back up the key in a secure password manager');
        console.log('- Changing this key will make existing encrypted data unreadable');
        console.log('');
        console.log('✅ Key generation completed successfully');

        return {
            base64: base64Key,
            raw: key
        };

    } catch (error) {
        console.error('❌ Failed to generate encryption key:', error.message);
        throw error;
    }
}

/**
 * Validate an encryption key from environment variable format
 */
function validateEncryptionKey(key) {
    try {
        let keyBuffer;

        // Try to parse as base64 (recommended format)
        try {
            keyBuffer = Buffer.from(key, 'base64');
        } catch (e) {
            throw new Error('Key must be in base64 format for environment variable storage');
        }

        // Check key length (should be 32 bytes for AES-256)
        if (keyBuffer.length !== 32) {
            throw new Error(`Invalid key length: ${keyBuffer.length} bytes (expected 32 bytes for AES-256)`);
        }

        console.log('✅ Encryption key is valid');
        console.log(`Key length: ${keyBuffer.length} bytes`);
        console.log('Key format: Base64 (suitable for environment variables)');

        return true;

    } catch (error) {
        console.error('❌ Invalid encryption key:', error.message);
        return false;
    }
}

/**
 * Test encryption/decryption with a key using the same algorithm as EncryptionManager
 */
function testEncryption(key) {
    try {
        // Set up environment variable for testing
        const originalKey = process.env.ENCRYPTION_KEY;
        process.env.ENCRYPTION_KEY = key;

        // Test with the actual EncryptionManager (if available)
        const testEmail = 'test@example.com';
        
        // Manual test using the same algorithm as EncryptionManager
        const keyBuffer = Buffer.from(key, 'base64');
        const algorithm = 'aes-256-cbc';
        
        // Encrypt
        const iv = crypto.randomBytes(16);
        const cipher = crypto.createCipheriv(algorithm, keyBuffer, iv);
        let encrypted = cipher.update(testEmail, 'utf8', 'hex');
        encrypted += cipher.final('hex');

        // Decrypt
        const decipher = crypto.createDecipheriv(algorithm, keyBuffer, iv);
        let decrypted = decipher.update(encrypted, 'hex', 'utf8');
        decrypted += decipher.final('utf8');

        // Restore original environment
        if (originalKey) {
            process.env.ENCRYPTION_KEY = originalKey;
        } else {
            delete process.env.ENCRYPTION_KEY;
        }

        // Verify
        if (decrypted === testEmail) {
            console.log('✅ Encryption test passed');
            console.log(`Test data: "${testEmail}"`);
            console.log(`Encrypted: ${encrypted.substring(0, 32)}...`);
            console.log(`Decrypted: "${decrypted}"`);
            return true;
        } else {
            console.error('❌ Encryption test failed: data mismatch');
            console.error(`Expected: "${testEmail}"`);
            console.error(`Got: "${decrypted}"`);
            return false;
        }

    } catch (error) {
        console.error('❌ Encryption test failed:', error.message);
        return false;
    }
}

// Main execution
function main() {
    const args = process.argv.slice(2);
    const command = args[0] || 'generate';

    switch (command) {
        case 'generate':
            generateEncryptionKey();
            break;

        case 'validate':
            const keyToValidate = args[1];
            if (!keyToValidate) {
                console.error('❌ Please provide a key to validate');
                console.log('Usage: node generate-encryption-key.js validate <key>');
                process.exit(1);
            }
            validateEncryptionKey(keyToValidate);
            break;

        case 'test':
            const keyToTest = args[1];
            if (!keyToTest) {
                console.error('❌ Please provide a key to test');
                console.log('Usage: node generate-encryption-key.js test <key>');
                process.exit(1);
            }
            if (validateEncryptionKey(keyToTest)) {
                testEncryption(keyToTest);
            }
            break;

        default:
            console.log('🔐 Newsletter Encryption Key Generator');
            console.log('=====================================');
            console.log('');
            console.log('This tool generates encryption keys for environment variable storage.');
            console.log('Keys are stored in GitHub Secrets and local .env files only.');
            console.log('');
            console.log('Commands:');
            console.log('  generate          Generate a new encryption key');
            console.log('  validate <key>    Validate an existing key');
            console.log('  test <key>        Test encryption/decryption with a key');
            console.log('');
            console.log('Examples:');
            console.log('  node generate-encryption-key.js generate');
            console.log('  node generate-encryption-key.js validate "your-base64-key-here"');
            console.log('  node generate-encryption-key.js test "your-base64-key-here"');
            console.log('');
            console.log('Security Notes:');
            console.log('- Keys are never stored in files or committed to repository');
            console.log('- Use GitHub Secrets for production environments');
            console.log('- Use .env files for local development only');
            break;
    }
}

// Run if called directly
if (require.main === module) {
    main();
}

module.exports = {
    generateEncryptionKey,
    validateEncryptionKey,
    testEncryption
};