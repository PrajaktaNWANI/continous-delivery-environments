module.exports = function (migration) {
    migration.transformEntries({
      contentType: 'recipes',
      from: ['author'],
      to: ['author'],
      transformEntryForLocale: function (fromFields, currentLocale) {
        const author = 'Stan Lee';
        return { author: author };
      },
    });
  };
