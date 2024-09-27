
import { sequelize } from "./db-config/config";
import { closeServer, initServer } from "./services/web-services";


const startup = async() => {
    console.log(`Starting application ...`);
    try {
        console.log('Initializing web server module')
        await  initServer()
    } catch (error) {
        console.log("DataBase connection is failed",error);
        process.exit(1)
    }
}

sequelize.authenticate()
.then( ()=>{
    console.log("Database connected successfully ")
})
.catch((error)=>{
    console.log(error)
})

sequelize.sync({ force : true})
.then( 
    ()=>{console.log("DataBase sync completed")}
)
.catch(
    (error)=>{console.log("Error in creating table "),error}
)

const shutdown  = async( e ?: Error) => {
    let err = e ;
    console.log("Shutting down the application ");
    try {
        console.log("Closing web server module ");
        await closeServer();
    } catch (error  : any) {
        console.log("Error occured in shutting down ", error);
        err = err || error;
    }
    if(err) {
        process.exit(1);
    }
    else {
        process.exit(0);
    }
}
process.on('SIGTERM' ,(signal ) => {     
    console.log(`Received ${signal}`);
    shutdown()
})
process.on('SIGINT' , async( signal) => { 
    console.log(`Received ${signal}`);
    shutdown()
})
process.on('uncaughtException' ,( err) => { 
    console.log(`uncaught exception ${err}`);
    shutdown()
})


startup()