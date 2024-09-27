import { DataTypes } from "sequelize";
import { sequelize } from "../db-config/config";


export const CLUB_RECORDS = sequelize.define( 'XX_1620_CLUB', {
    CLUB_ID : {
        type : DataTypes.INTEGER,
        autoIncrement : true ,
        primaryKey : true ,
        field:'CLUB_ID'
    },
    PLAYER_NAME :{
        type : DataTypes.STRING ,
        allowNull : false ,
        field:'PLAYER_NAME'
    } ,
    PLAYER_CLUB : {
        type: DataTypes.STRING ,
        field:'PLAYER_CLUB',
        allowNull: false
    },
    JERSEY_NO :{
        type : DataTypes.INTEGER,
        field : 'JERSEY_NO' ,
        allowNull : false 
    },
    GOALS : {
        type :DataTypes.INTEGER,
        field : 'GOALS' ,
        allowNull :false
    }
    }
    ,
    {
        timestamps : true ,
        tableName :'CLUB_1_1',
        freezeTableName : true ,
    }
)

export const NATIONAL_RECORDS = sequelize.define('XX_1620_NATIONAL', 
    {
        NATIONAL_ID : {
            type : DataTypes.INTEGER ,
            field : 'NATIONAL_ID',
            primaryKey : true ,
            references : {
                model : CLUB_RECORDS ,
                key: 'CLUB_ID'
            }
        },
        NATIONALITY : {
            type : DataTypes.STRING ,
            field : 'NATIONALITY' ,
            validate : {
                isAlpha : true ,
                len : [2 ,3]
            }
        },
        POSITION : {
            type : DataTypes.STRING ,
            field : 'POSITION'
        }
    },{
        timestamps : true,
        tableName : 'NATIONAL_1_1',
        freezeTableName : true
    }
    
)

CLUB_RECORDS.hasOne(NATIONAL_RECORDS , {
    foreignKey : 'NATIONAL_ID' 
});

NATIONAL_RECORDS.belongsTo(CLUB_RECORDS , {
    foreignKey :'NATIONAL_ID'
});

export const CLUB_RECORDS_1_M = sequelize.define('CLUB_1_M',
    {
        CLUB_ID : {
            type : DataTypes.INTEGER ,
            primaryKey : true ,
            autoIncrement : true ,
            field : 'CLUB_ID'
        },
        CLUB_NAME : {
            type : DataTypes.STRING,
            allowNull : false  ,
            field : 'CLUB_NAME'
        }
    },
    {
        timestamps : true ,
        tableName : 'CLUB_1_M' ,
        // freezeTableName : true
    }
);

export const PLAYER_RECORDS_1_M  = sequelize.define('PLAYERS_1_M',
    {
        PLAYER_ID : {
            type : DataTypes.INTEGER,
            primaryKey : true ,
            autoIncrement : true ,
            field : 'PLAYER_ID'
        } ,
        PLAYER_NAME : {
            type : DataTypes.STRING ,
            allowNull : false ,
            field :'PLAYER_NAME'
        },
        JERSEY_NO : {
            type :DataTypes.INTEGER ,
            allowNull : false,
            field : 'JERSEY_NO'
        },
        CLUB_ID: {
            type :DataTypes.INTEGER,
            field : 'CLUB_ID',
            references  : {
                model : CLUB_RECORDS_1_M ,
                key :  'CLUB_ID'
            }
        }
    },
    {
        tableName : 'PLAYERS_1_M',
        // freezeTableName : true ,
        // timestamps : true
    }
)
export const NATIONAL_1_M  = sequelize.define('NATIIONAL_1_M',
    {
        NATIONAL_ID : {
            type : DataTypes.INTEGER,
            primaryKey : true ,
            autoIncrement : true ,
            field : 'NATIONAL_ID'
        } ,
        PLAYER_NAME : {
            type : DataTypes.STRING ,
            allowNull : false ,
            field :'PLAYER_NAME'
        },
        NATIONALITY : {
            type : DataTypes.STRING ,
            allowNull : false ,
            field : 'NATIONALITY'
        },
        CLUB_ID: {
            type :DataTypes.INTEGER,
            field : 'CLUB_ID',
            references  : {
                model : CLUB_RECORDS_1_M ,
                key :  'CLUB_ID'
            }
        }
    },
    {
        tableName : 'NATIONAL_1_M',
        // freezeTableName : true ,
        // timestamps : true
    }
)
CLUB_RECORDS_1_M.hasMany(PLAYER_RECORDS_1_M, {
    foreignKey  : 'CLUB_ID',
     as : 'Players'
})
PLAYER_RECORDS_1_M.belongsTo(CLUB_RECORDS_1_M, {
    foreignKey : 'CLUB_ID',
    as : 'Club'
})
CLUB_RECORDS_1_M.hasMany(NATIONAL_1_M, {
    foreignKey  : 'CLUB_ID',
     as : 'Nationality'
})
NATIONAL_1_M.belongsTo(CLUB_RECORDS_1_M, {
    foreignKey : 'CLUB_ID',
    as : 'Club'
})