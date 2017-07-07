'use strict';
module.exports = function(sequelize, DataTypes) {
  var messages = sequelize.define('messages', {
    textbody: DataTypes.STRING(140)
  }, {});

  messages.associate = function(models) {
     messages.belongsTo(models.users, {as : 'login', foreignKey: 'userid'})
   }
  return messages;
};
