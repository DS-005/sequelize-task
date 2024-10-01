import { DataTypes, STRING } from "sequelize";
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

// export const CLUB_RECORDS_M_M = sequelize.define('CLUB_RECORDS_M_M', {
//     CLUB_ID: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         autoIncrement: true,
//         field: 'CLUB_ID',
//     },
//     CLUB_NAME: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         field: 'CLUB_NAME',
//     },
// }, {
//     timestamps: true,
//     tableName: 'CLUB_RECORDS_M_M',
// });

// export const PLAYER_RECORDS_M_M = sequelize.define('PLAYER_RECORDS_M_M', {
//     PLAYER_ID: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         autoIncrement: true,
//         field: 'PLAYER_ID',
//     },
//     PLAYER_NAME: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         field: 'PLAYER_NAME',
//     },
//     JERSEY_NO: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         field: 'JERSEY_NO',
//     },
// }, {
//     tableName: 'PLAYER_RECORDS_M_M',
// });


export const Student  =  sequelize.define('STUDENTS', {
    ID : {
        type : DataTypes.INTEGER,
        primaryKey : true ,
        autoIncrement :true ,
        field : 'ID'
    },
    STUDENT_NAME :{
        type : DataTypes.STRING ,
        allowNull: false ,
        field : 'STUDENT_NAME'
    },
    CLASS : {
        type  : DataTypes.STRING ,
        allowNull : false ,
        field : 'CLASS'
    }
    },
    {
        tableName : 'STUDENTS'
    }
)

export const Course = sequelize.define('COURSES',
    {
     ID : {
        type : DataTypes.INTEGER ,
        primaryKey : true ,
        autoIncrement : true ,
        field : 'ID' 
     }   ,
     COURSE_NAME : {
        type : DataTypes.STRING ,
        field : 'COURSE_NAME', 
        allowNull: false
     }   ,
     PRICE : {
        type : DataTypes.INTEGER ,
        allowNull : false ,
        field : 'PRICE' 
     }   
    },
    {
        tableName : 'COURSES'
    }
)
export const Teacher = sequelize.define('TEACHERS',{
    ID : {
        type : DataTypes.INTEGER ,
        primaryKey : true ,
        autoIncrement : true ,
        field : 'ID' 
     }  ,
     TEACHER_NAME : {
        type : DataTypes.STRING ,
        field : 'TEACHER_NAME' 
     }   ,
    EXPERIENCE: {
        type : DataTypes.INTEGER ,
        field : 'EXPERIENCE' 
     }   
})
export const School = sequelize.define('SCHOOL',
    {
        ID : {
            type : DataTypes.INTEGER ,
            field : 'SCHOOL_ID',
            primaryKey : true ,
            autoIncrement : true
        },
        STUDENT_ID : {
            type : DataTypes.INTEGER ,
            field : 'STUDENT_ID',
            references : {
                model : Student,
                key : 'ID'
            }
        },
        COURSE_ID : {
            type : DataTypes.INTEGER ,
            field : 'COURSE_ID',
            references : {
                model : Course,
                key : 'ID'
            }
        },
        TEACHER_ID : {
            type : DataTypes.INTEGER ,
            field : 'TEACHER_ID' ,
            references : {
                model : Teacher,
                key : 'ID'
            }
        },
    },
    {
        tableName : 'SCHOOL',
        freezeTableName : true
    }
)

Student.belongsToMany(Course,
    {
        through : School ,
        foreignKey : 'STUDENT_ID',
        as : 'courses'
    }
)
Course.belongsToMany(Student,
    {
        through : School ,
        foreignKey : 'COURSE_ID',
        as : 'students'
    }
)
Course.belongsToMany(Teacher,
    {
        through : School ,  
        foreignKey : 'COURSE_ID',
        as : 'teachers'
    }
)
Teacher.belongsToMany(Course,
    {
        through : School ,
        foreignKey : 'TEACHER_ID',
        as : 'courses'
    }
)
Student.belongsToMany(Teacher,
    {
        through : School ,
        foreignKey : 'STUDENT_ID',
        as : 'teachers'
    }
)
Teacher.belongsToMany(Student,
    {
        through : School ,
        foreignKey : 'TEACHER_ID',
        as : 'students'
    }
)