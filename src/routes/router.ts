import Router from "express";
import { createUser, createUser_1_M, deleteUser, getUser, getUser_1_M, getUserById, getUserById_1_M, updateUser } from "../controller/controller";

const router =  Router();

router.get('/getuser', getUser)
router.get('/getuser/:id', getUserById)
router.post('/postuser', createUser)
router.put('/updateuser/:id',updateUser)
router.delete('/deleteuser/:id',deleteUser)

router.get('/getuser2', getUser_1_M)
router.get('/getuser2/:id', getUserById_1_M)
router.post('/postuser2', createUser_1_M)
// router.put('/updateuser2/:id',updateUser_1_M)
// router.delete('/deleteuser2/:id',deleteUser_1_M)

export default router;