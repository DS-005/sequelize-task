import Router from "express";
import { createJunction, createUser, createUser_1_M, createUser_M_M, deleteUser, deleteUser_1_M,  getUser, getUser_1_M,  getUser_M_M,  getUserById, getUserById_1_M, updateUser } from "../controller/controller";

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
router.delete('/deleteuser2/:id',deleteUser_1_M)

router.get('/getuser3',getUser_M_M);
router.get('/getusingjunction/:id')
router.get('/getusingorder/:id')

router.post('/postuser3',createUser_M_M);
router.post('/postuser4',createJunction);
router.post('/postuser5',)
export default router;