const { execSync } = require('child_process');

try {
  console.log('Starting npm installation of zustand, framer-motion, lucide-react, clsx, tailwind-merge...');
  execSync('npm install zustand framer-motion lucide-react clsx tailwind-merge --legacy-peer-deps', {
    stdio: 'inherit',
    env: {
      ...process.env,
      TMPDIR: './.npm-tmp'
    }
  });
  console.log('Installation completed successfully!');
} catch (error) {
  console.error('Installation failed:', error.message);
  process.exit(1);
}
