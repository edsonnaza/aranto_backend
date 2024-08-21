const { DataTypes, UUIDV4 } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Users", {
    usuario_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: UUIDV4,
    },
    user_name: {
      type: DataTypes.STRING,
    },
    user_lastname: {
      type: DataTypes.STRING,
    },
    email:{
      type:DataTypes.STRING,
      allowNull:false,
      isEmail:true,
      unique: true
  },
  password:{
    type:DataTypes.STRING,
    allowNull:false
},
    roles: {
      type: DataTypes.ENUM("client", "admin"),
      defaultValue: "client",
    },
    inactivo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: "0",
    },
  });
};
