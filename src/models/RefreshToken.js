const { DataTypes, UUIDV4 } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define(
        "RefreshToken",
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                allowNull: false,
                defaultValue: UUIDV4,
            },
            token: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            userId: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: 'Users', // Nombre de la tabla de Users
                    key: 'usuario_id',
                },
            },
            expiresAt: {
                type: DataTypes.DATE,
                allowNull: true, // Puedes hacer que sea obligatorio si lo deseas
            },
            revoked: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
        },
        {
            timestamps: true, // Para crear automáticamente `createdAt` y `updatedAt`
            tableName: 'RefreshTokens', // Nombre de la tabla en la base de datos
        }
    );
};
