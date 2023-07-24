module.exports = (sequelize, DataTypes,) =>{

    const customer = sequelize.define('customer', {
      // Model attributes are defined here
      creditLimit: {
        type: DataTypes.DECIMAL
      },
      phoneNumber: {
        type: DataTypes.STRING
      },
      email:{
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
    return customer
    };