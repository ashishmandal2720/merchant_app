module.exports = (sequelize, DataTypes,) =>{

    const merchandise = sequelize.define('merchandise', {
      // Model attributes are defined here
      partnerId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
         primaryKey: true
      },
      partnerName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      partnerType: {
        type: DataTypes.ENUM,
        values: ['customer', 'supplier'],
        allowNull: false
      },
      city:{
        type:DataTypes.STRING,
        allowNull: false
      },
      state:{
        type:DataTypes.STRING,
        allowNull: false
      },
    }, {
      // Other model options go here
      timestamps: true,
      underscored: true
    });
    return  merchandise 
    };