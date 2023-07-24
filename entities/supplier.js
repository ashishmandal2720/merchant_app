module.exports = (sequelize, DataTypes,) =>{

    const supplier = sequelize.define('supplier', {
      // Model attributes are defined here
      creditBalance: {
        type: DataTypes.DECIMAL
        // allowNull defaults to true
      },
      drivingLicenseNumber:{
        type:DataTypes.STRING,
        allowNull: false
      },
      MerchandisePartnerId:{
        type:DataTypes.DECIMAL,
        allowNull: false
      }
    }, {
      // Other model options go here
      timestamps: true,
      underscored: true
    });
    return supplier
    };