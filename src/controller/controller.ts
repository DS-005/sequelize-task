import { NextFunction, Request, Response } from "express";
import { CLUB_RECORDS , CLUB_RECORDS_1_M, Course, NATIONAL_1_M, NATIONAL_RECORDS, PLAYER_RECORDS_1_M, School, Student, Teacher} from "../models/user_model";
// CLUB_RECORDS_1_M,PLAYER_RECORDS_1_M
export const getUser = async(req : Request, res : Response, next : NextFunction) => {
    try {
        const Data = await CLUB_RECORDS.findAll( {
            include : {
                model : NATIONAL_RECORDS ,
                foreignKey : 'CLUB_ID'
            }
        });
    
        res.status(201).json({Data});
    } catch (error) {
        res.status(404).json({message : 'Failed to get user'});
        console.log("Error in Getuser function" , error)
    }

}

export const getUserById = async(req : Request, res : Response, next : NextFunction) => {
    try {

        const Data = await CLUB_RECORDS.findByPk(req.params.id 
            ,{
                include : {
                    model :  NATIONAL_RECORDS ,
                    foreignKey : 'NATIONAL_ID'
                }
            }
        )  ;
        res.status(201).json(Data)
    } catch (error) {
        res.status(404).json({message : 'Failed to get user by id'})
        console.log("Error in GetuserBy//id function")
    }

}

export const createUser = async (req : Request , res : Response ) => {
    try {
        const { PLAYER_NAME , PLAYER_CLUB , JERSEY_NO, GOALS } = req.body
        const { NATIONALITY  , POSITION } = req.body 

        const parentUser:any = await CLUB_RECORDS.create(
            { PLAYER_NAME , PLAYER_CLUB , JERSEY_NO, GOALS } 
        );
        console.log("PARENTUSER ",parentUser.CLUB_ID);
        const childUser:any = await NATIONAL_RECORDS.create(
            { NATIONAL_ID : parentUser.CLUB_ID , 
              NATIONALITY  , 
              POSITION}
        );
        console.log("CHILDUSERR",childUser);
        res.status(201).json({parentUser,childUser })

    } catch (error) {
        res.status(404).json({message : 'Failed to post user'})
        console.log("Error in create User")
    }
}

export const updateUser = async (req :  Request , res :Response) => {
    try {
        const userId  = req.params.id
        const {PLAYER_NAME , PLAYER_CLUB , JERSEY_NO, GOALS , NATIONALITY ,POSITION} = req.body

        const check = await CLUB_RECORDS.findByPk(userId)

        if( check) 
            {
            console.log("UPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPDAAAAAAAAAAAAAAAAAAAAAAAATTTTTTTTTTEDDDDDDD")
            const [updatedParent] = await CLUB_RECORDS.update( 
                {PLAYER_NAME , PLAYER_CLUB , JERSEY_NO, GOALS} ,{where : { CLUB_ID  : userId}}
            )
            const  [updatedChild ] = await NATIONAL_RECORDS.update(
                {NATIONALITY , POSITION } , {where : { NATIONAL_ID : userId}}
            )
            res.status(201).json({message:"UPDATED SUCCESSFULLY", updatedParent , updatedChild })
        }
        else 
        {
            res.status(404).json({message : "Id not found"})
        }
    } catch (error) {
        res.status(404).json({message : "Failed to update user"})

    }
}

export const deleteUser  = async (req :Request , res :Response)=>  {
    try {
        const deleteId = req.params.id
        const child = await NATIONAL_RECORDS.destroy({where : {NATIONAL_ID : deleteId}})
        const item = await CLUB_RECORDS.destroy({where : {CLUB_ID  : deleteId}})
        res.status(201).json({message : `${item} ${child} item deleted successfully`})
    }catch(error){
        res.status(404).json({message : "Deletting error"})
    }
}

export const getUser_1_M = async(req: Request ,res : Response)=>{
    try {
        const Data  = await CLUB_RECORDS_1_M.findAll({
            include : [{
                model : PLAYER_RECORDS_1_M  ,
                as : 'Players'
            },
            {
                model: NATIONAL_1_M ,
                as  : 'Nationality'
            }
        ]
        } )
        console.log("")
        res.status(201).json(Data)
    } catch (error) {
        res.status(404).json({message : "ERROR IN GET USER OF 1 TO MANY"})
    }
}

export const getUserById_1_M = async(req: Request ,res : Response)=>{
    try {
    
        const userId = req.params.id
        console.log("userIDD " , userId)
        if (userId) {
            const Data  = await CLUB_RECORDS_1_M.findByPk(userId , {
                    include : [{
                    model : PLAYER_RECORDS_1_M ,
                    as : 'Players'
                },
                {
                    model : NATIONAL_1_M ,
                    as : 'Nationality'
                }    
            ]
            } )
            
            res.status(201).json(Data)
        } else {
            res.status(201).json({message : "CLUB ID NOT FOUND"})
        }
    } catch (error) {
        res.status(404).json({message : "ERROR IN GET USER  BY ID OF 1 TO MANY"})
    }
}
export const createUser_1_M = async(req: Request ,res : Response)=>{
    try {
        const { CLUB_NAME , PLAYERS , NATIONALITY} = req.body
        const ParentUser = await CLUB_RECORDS_1_M.create({
            CLUB_NAME , Players:PLAYERS ,Nationality : NATIONALITY
        }, 
        { include : [{ model : PLAYER_RECORDS_1_M, as : 'Players'},
                     { model : NATIONAL_1_M, as : 'Nationality'}]}
    )
    console.log("asdfghjkl,",ParentUser)
    res.status(201).json(ParentUser)
    } catch (error) {
        res.status(404).json("ERROR IN CREATE USER IN !_ MANY")
    }
    
}
export const updateUser_1_M = async(req: Request ,res : Response)=>{
    try {
        // const { CLUB_NAME , PLAYERS } = req.body
        // const ParentUser = await CLUB_RECORDS_1_M.update({
        //     CLUB_NAME , Players:PLAYERS 
        // }, 
        // // { include : [{ model : PLAYER_RECORDS_1_M, as : 'Players'}]}
        // )
        // console.log("asdfghjkl,",ParentUser)
        // res.status(201).json(ParentUser)
        
    } catch (error) {
        
    }
}
export const deleteUser_1_M = async (req: Request, res: Response) => {
    try {
        const userId = req.params.id;
        
        const clubRecord = await CLUB_RECORDS_1_M.findByPk(userId);
        
        if (!clubRecord) {
            return res.status(404).json({ message: "Club not found" });
        }

        await CLUB_RECORDS_1_M.destroy({ where: { CLUB_ID: userId } });
        res.status(200).json({ message: "Item successfully deleted" });
        
    } catch (error) {
        res.status(500).json({ message: "Error in item deletion", error });
    }
};

export const createUser_M_M = async(req:Request , res  : Response) => {
    try {
        
        const { STUDENT_NAME, CLASS, COURSE , TEACHER } = req.body
        const data = await Student.create(
            {   STUDENT_NAME, CLASS , 
                courses : COURSE , 
                teachers :TEACHER},
                
                {include : [{ model : Course , as :'courses'},{model : Teacher , as : 'teachers'}],
            });

                res.status(201).json({data})
    
        //  const { STUDENT, COURSE , TEACHER } = req.body
        // const student = await Student.bulkCreate(STUDENT, { returning: true })
        // const course = await Course.bulkCreate(COURSE, { returning: true })
        // const teacher = await Teacher.bulkCreate(TEACHER, { returning: true })
        // console.log("DATA---------------------------" , student , course , teacher );
        // res.status(201).json({student , course ,  teacher })
    } catch (error) {
        console.log("Error in many-many create",error);
        res.status(401).json({message : "ERROR IN CREATE MANY TO MANY"})
    }
}

export const getUser_M_M = async(req : Request , res : Response )=> {
    try {
        const data = await Student.findAll({
            include :  [
                {model : Course , as : 'courses'},
                {model : Teacher , as : 'teachers'},
            ]
        }
        )
        console.log("DATA---------------------------",data);
        res.status(201).json(data)
    } catch (error) {
        console.log("ERROR in getuser of  Many to Many ");
        res.status(401).jsonp({message  : "Error in getuser of many to many "})
    }
}

export const createJunction = async(req: Request , res : Response )=> {
    try {
        const { STUDENT_ID , TEACHER_ID , COURSE_ID } = req.body
        const data = await School.create({  STUDENT_ID , TEACHER_ID , COURSE_ID })
        res.status(201).json(data)
    } catch   (error) {
        console.log("ERROR IN createe junction of many to many ", error);
        res.status(404).json(error)        
    }
}
// export const createProduct = async(req : Request , res  : Response) => {
//     try {
//         const {TITLE , DESCRIPTION  } = req.body
//         const data = await Product.create(
//         {
//               TITLE , DESCRIPTION
//         })
//         console.log("DATA  COMME",data)
//         res.status(201).json(data)
//     } catch (error) {
//         console.log("Error in many to many create",error)
//         res.status(401).json({message :  "error in many to many create user"})
//     }
// }
// export const createOrder = async(req : Request , res  : Response) => {
//     try {
//         const {   ADDRESS , } = req.body
//         const value = await Order.create({
//              ADDRESS
//         })
//         const value1 = await Purchase.create({NAME :'PURCHASE_1'})
//         const value2 = await Purchase.create({NAME :'PURCHASE_2'})
//         const value3 = await Purchase.create({NAME :'PURCHASE_3'})
//         console.log("DATA  COMME",value)
//         console.log("valuess         " ,value1)
//         res.status(201).json(value)
//     } catch (error) {
//         console.log("Error in many to many create",error)
//         res.status(401).json({message :  "error in many to many create user"})
//     }
// }

// export const createJunctionTable = async(req:  Request , res : Response )=> {
//     try {
//         const {productId ,orderId , purchaseId} = req.body 
//         const data = await ProductOrder.create(
//             {productId , orderId , purchaseId}
//         )
//         res.status(201).json(data)
//     } catch (error) {
//         console.log("Error in PRODUCT_ORDER Table creation",error);
//         res.status(401).json({message : "Error in PRODUCT_ORDER Table creation"})
//     }
// }


// export const getOrdersForProduct = async (req  : Request , res : Response) => {
//     try {
//         const  productId  = req.params.id; 
//         const product : any= await Product.findByPk( productId, {
//             include: [{ model: Order, as: 'orders' },                  
//             ] ,
//             attributes : ['ID','TITLE','DESCRIPTION']
//         });
//         //, include : [{model :  Purchase , as :'purchases'}]
//         if (!product) {
//             return res.status(404).json({ message: "Product not found" });
//         }
        
//         res.status(200).json(product); 
//     } catch (error) {
//         console.log("Error in fetching orders for product", error);
//         res.status(500).json({ message: "Error in fetching orders for product" });
//     }
// };

// export const getProductsForOrder = async(req :Request , res : Response)=> {
//     try {
//         const orderId = req.params.id;
//         const order = await Order.findByPk( orderId ,{
//             include : [{
//                 model : Product ,
//                 as : 'products'
//             },
//             // {
//             //     model : Purchase ,
//             //     as :'purchases'
//             // }
//         ],
//             attributes : ['id','ADDRESS']
//         })
//         if(!order)return  res.status(404).json({message: "Order not found"})
        
//         res.status(200).json(order)
//     } catch (error) {
//         console.log("Error in get products for order ");
//         res.status(401).json({message : "Error in fetching records for order"})
//     }
// }
// import { NextFunction, Request, Response } from "express";
// import { CLUB_RECORDS } from "../models/user_model";
// import { Op } from "sequelize";
// import { sequelize } from
//  "../db-config/config";


// export const getUser = async(req : Request, res : Response, next : NextFunction) => {
//     try {
//         const Data = await CLUB_RECORDS.findAll( {
//             // where : 
//             //     sequelize.where( sequelize.col('name'),Op.substring ,"23")
//         });
//         res.status(201).json(Data)
//     } catch (error) {
//         res.status(404).json({message : 'Failed to get user'})
//         console.log("Error in Getuser function" , error)
//     }

// }

// export const getUserById = async(req : Request, res : Response, next : NextFunction) => {
//     try {

//         const Data = await CLUB_RECORDS.findByPk(req.params.id)  ;
//         res.status(201).json(Data)
//     } catch (error) {
//         res.status(404).json({message : 'Failed to get user by id'})
//         console.log("Error in GetuserBy//id function")
//     }

// }

// export const createUser = async (req : Request , res : Response ) => {
//     try {
//         const {PLAYER_NAME , PLAYER_CLUB , JERSEY_NO, GOALS } = req.body
//         const user = await CLUB_RECORDS.create({ PLAYER_NAME , PLAYER_CLUB , JERSEY_NO, GOALS } )
//         res.status(201).json(user)

//     } catch (error) {
//         res.status(404).json({message : 'Failed to post user'})
//         console.log("Error in create User")
//     }
// }

// export const updateUser = async (req :  Request , res :Response) => {
//     try {
//         const userId  = req.params.id
//         const {PLAYER_NAME , PLAYER_CLUB , JERSEY_NO, GOALS } = req.body

//         const check = await CLUB_RECORDS.findByPk(userId)
//         if( check) 
//         {
//             const [updated] = await CLUB_RECORDS.update( 
//                 {PLAYER_NAME , PLAYER_CLUB , JERSEY_NO, GOALS} ,{where : { id  : userId}}
//             )
//             res.status(201).json(updated)
//         }
//         else 
//         {
//             res.status(404).json({message : "Id not found"})
//         }
//     } catch (error) {
//         res.status(404).json({message : "Failed to update user"})

//     }
// }

// export const deleteUser  = async (req :Request , res :Response)=>  {
//     try {
//         const deleteId = req.params.id
//         const item = await CLUB_RECORDS.destroy({where : {id  : deleteId}})
//         res.status(201).json({message : `${item} item deleted successfully`})
//     }catch(error){
//         res.status(404).json({message : "Deletting error"})
//     }
// }