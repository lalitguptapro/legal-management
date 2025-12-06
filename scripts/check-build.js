// Quick build check script
const fs = require('fs');
const path = require('path');

console.log('Checking for common build issues...\n');

// Check for .env.local
const envPath = path.join(process.cwd(), '.env.local');
if (!fs.existsSync(envPath)) {
  console.warn('⚠️  .env.local file not found');
  console.log('   Create it with NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY\n');
} else {
  console.log('✅ .env.local exists');
}

// Check for required files
const requiredFiles = [
  'app/layout.tsx',
  'app/page.tsx',
  'app/globals.css',
  'lib/supabase.ts',
  'components/Sidebar.tsx',
  'components/Header.tsx',
];

requiredFiles.forEach(file => {
  const filePath = path.join(process.cwd(), file);
  if (fs.existsSync(filePath)) {
    console.log(`✅ ${file}`);
  } else {
    console.error(`❌ ${file} - MISSING`);
  }
});

console.log('\nRun: npm run build');

