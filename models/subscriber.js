module.exports = function(sequelize, dataTypes) {
  var Subscriber = sequelize.define('Subscriber', {
    id: {
      type: dataTypes.UUID,
      primaryKey: true,
      defaultValue: dataTypes.UUIDV4
    },
    sent_at: dataTypes.DATE,
    deleted_at: dataTypes.DATE,
    endpoint: dataTypes.STRING,
    product: dataTypes.STRING
  }, {
    underscored: true,
    tableName: 'subscribers',
    deletedAt: 'deleted_at',
    paranoid: true
  });

  return Subscriber;
};
