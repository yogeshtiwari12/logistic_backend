import express from 'express';
const route = express.Router();
import { deleteuser, getallusers, getmyprofile, login, logout, signup } from '../methods/methods.js';
import { isAdmin, verifytoken } from '../auth/auth.js';

route.post('/signup',signup);
route.post('/login',login)
route.get('/getmyprofile',verifytoken,getmyprofile)
route.get('/getallusers',verifytoken,isAdmin("admin"),getallusers)
route.post('/logout',logout,verifytoken)
route.delete('/deleteuser/:id',verifytoken,isAdmin("admin"),deleteuser)




export default route;