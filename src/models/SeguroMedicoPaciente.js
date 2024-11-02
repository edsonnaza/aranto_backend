//SeguroMedicoPaciente
const { DataTypes, UUIDV4 } = require("sequelize");
 

module.exports = (sequelize) => {
    sequelize.define(
        "SeguroMedicoPaciente",
        {
            seguromedpac_id: {
                type: DataTypes.UUID,
				primaryKey: true,
				allowNull: false,
				defaultValue: UUIDV4,
            },
            paciente_id: {
                type: DataTypes.UUID, // Debes asegurarte de que el tipo de datos sea el mismo que empleado_id en el modelo de empleados
                allowNull: false,
              },
            seguromedico_id: {
                type: DataTypes.UUID, // Debes asegurarte de que el tipo de datos sea el mismo que empleado_id en el modelo de empleados
                allowNull: false,
            },

            importe_cobertura:{
                type:DataTypes.DECIMAL(10,2),
                allowNull:false,
            },
            descripcion:{
                type:DataTypes.TEXT,
                allowNull:false,
            },
            activo: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: true, // Por defecto, activo es verdadero
            },
        },
        {
            timestamps: true,
        }
    );

    
    
};
