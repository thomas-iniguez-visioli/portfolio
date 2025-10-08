#!/usr/bin/env node

/**
 * Utility Validation Script
 * Validates that all CSS utilities are properly implemented
 */

const fs = require('fs');
const path = require('path');

// Utility files to validate
const utilityFiles = [
    'source/css/utilities/colors.css',
    'source/css/utilities/spacing.css',
    'source/css/utilities/responsive.css',
    'source/css/utilities/state.css',
    'source/css/utilities/debug.css',
    'source/css/utilities/responsive-helpers.css'
];

// Expected utility classes to check for
const expectedUtilities = {
    colors: [
        '.bg-primary',
        '.text-primary',
        '.border-primary',
        '.badge-javascript',
        '.badge-typescript',
        '.text-success',
        '.text-error',
        '.text-warning',
        '.text-info'
    ],
    spacing: [
        '.m-0',
        '.m-1',
        '.m-4',
        '.p-0',
        '.p-1',
        '.p-4',
        '.mx-auto',
        '.my-4',
        '.px-6',
        '.py-3'
    ],
    responsive: [
        '.sm\\:block',
        '.md\\:flex',
        '.lg\\:grid',
        '.xl\\:hidden',
        '.mobile-only',
        '.desktop-only'
    ],
    state: [
        '.loading',
        '.success-message',
        '.error-message',
        '.warning-message',
        '.info-message',
        '.build-success',
        '.build-failed',
        '.dev-online',
        '.dev-busy'
    ],
    debug: [
        '.debug-all',
        '.debug-grid',
        '.debug-breakpoint',
        '.debug-slow',
        '.debug-empty'
    ],
    'responsive-helpers': [
        '.mobile-only',
        '.tablet-only',
        '.desktop-only',
        '.touch-only',
        '.mouse-only',
        '.sr-only',
        '.print-only'
    ]
};

console.log('🔍 Validating CSS Utilities...\n');

let allValid = true;
let totalUtilities = 0;
let foundUtilities = 0;

// Check if all utility files exist
utilityFiles.forEach(file => {
    const filePath = path.join(__dirname, file);
    if (!fs.existsSync(filePath)) {
        console.error(`❌ Missing utility file: ${file}`);
        allValid = false;
        return;
    }
    
    console.log(`✅ Found utility file: ${file}`);
    
    // Read file content
    const content = fs.readFileSync(filePath, 'utf8');
    const fileName = path.basename(file, '.css');
    
    if (expectedUtilities[fileName]) {
        const utilities = expectedUtilities[fileName];
        console.log(`   Checking ${utilities.length} utilities...`);
        
        utilities.forEach(utility => {
            totalUtilities++;
            // Escape special regex characters and check for the utility
            const escapedUtility = utility.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const regex = new RegExp(escapedUtility, 'g');
            
            if (regex.test(content)) {
                foundUtilities++;
                console.log(`   ✅ ${utility}`);
            } else {
                console.log(`   ❌ ${utility} - NOT FOUND`);
                allValid = false;
            }
        });
    }
    
    console.log('');
});

// Check if main CSS file imports utilities
const mainCssPath = path.join(__dirname, 'source/css/modern.css');
if (fs.existsSync(mainCssPath)) {
    const mainContent = fs.readFileSync(mainCssPath, 'utf8');
    const utilityImports = [
        './utilities/colors.css',
        './utilities/spacing.css',
        './utilities/responsive.css',
        './utilities/state.css',
        './utilities/debug.css',
        './utilities/responsive-helpers.css'
    ];
    
    console.log('🔗 Checking utility imports in modern.css...');
    utilityImports.forEach(importPath => {
        if (mainContent.includes(importPath)) {
            console.log(`   ✅ ${importPath}`);
        } else {
            console.log(`   ❌ ${importPath} - NOT IMPORTED`);
            allValid = false;
        }
    });
    console.log('');
} else {
    console.error('❌ Main CSS file not found: source/css/modern.css');
    allValid = false;
}

// Check test file
const testFilePath = path.join(__dirname, 'test-utilities.html');
if (fs.existsSync(testFilePath)) {
    console.log('✅ Test file exists: test-utilities.html');
} else {
    console.log('⚠️  Test file not found: test-utilities.html');
}

// Check documentation
const docsPath = path.join(__dirname, 'docs/utilities-guide.md');
if (fs.existsSync(docsPath)) {
    console.log('✅ Documentation exists: docs/utilities-guide.md');
} else {
    console.log('⚠️  Documentation not found: docs/utilities-guide.md');
}

console.log('\n📊 Summary:');
console.log(`   Total utilities checked: ${totalUtilities}`);
console.log(`   Found utilities: ${foundUtilities}`);
console.log(`   Missing utilities: ${totalUtilities - foundUtilities}`);
console.log(`   Success rate: ${Math.round((foundUtilities / totalUtilities) * 100)}%`);

if (allValid && foundUtilities === totalUtilities) {
    console.log('\n🎉 All utilities are properly implemented!');
    console.log('\n📝 Next steps:');
    console.log('   1. Open test-utilities.html in a browser to test visually');
    console.log('   2. Add debug-mode class to body to test debug utilities');
    console.log('   3. Resize browser window to test responsive utilities');
    console.log('   4. Check docs/utilities-guide.md for usage examples');
    process.exit(0);
} else {
    console.log('\n❌ Some utilities are missing or not properly implemented.');
    console.log('   Please check the errors above and fix them.');
    process.exit(1);
}