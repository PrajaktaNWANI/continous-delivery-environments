module.exports = function runMigration(migration) {
  const post = migration.editContentType('recipes');
  post.createField('author').name('author').type('Symbol').required(false);
};
