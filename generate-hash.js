const bcrypt = require('bcryptjs');

const password = process.argv[2];

if (!password) {
  console.log('Lütfen bir şifre girin. Örnek: node generate-hash.js "benimsifrem"');
  process.exit(1);
}

bcrypt.hash(password, 10, (err, hash) => {
  if (err) {
    console.error('Hata:', err);
    return;
  }
  console.log('\nŞifreniz için oluşturulan Hash:');
  console.log('----------------------------------------');
  console.log(hash);
  console.log('----------------------------------------');
  console.log('\nLütfen bu hash değerini kopyalayıp .env veya .env.local dosyanıza aşağıdaki gibi ekleyin:');
  console.log(`ADMIN_PASSWORD_HASH="${hash}"\n`);
});
