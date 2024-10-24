//SeguroMedico
const { DataTypes, UUIDV4 } = require("sequelize");

module.exports = (sequelize) => {
	sequelize.define(
		"SeguroMedico",
		{
			seguromedico_id: {
				type: DataTypes.UUID,
				primaryKey: true,
				allowNull: false,
				defaultValue: UUIDV4,
			},
			seguromedico_nombre: {
				type: DataTypes.STRING(50),
				allowNull: false,
			},
            descripcion : {
                type:DataTypes.TEXT,
                allowNull:true
            }, 
            activo:{
                type:DataTypes.BOOLEAN,
                allowNull:false,
                defaultValue:true,
            },
		},
		{
			timestamps: false,
		}
	);
};
