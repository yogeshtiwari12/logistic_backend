import express from 'express';
const route = express.Router();
import { deleteuser, getallclientbrief, getallusers, getmyprofile, login, logout, ratedata, ratereq, saveclientbrief, signup } from '../methods/methods.js';
import { isAdmin, verifytoken } from '../auth/auth.js';

route.post('/signup',signup);
route.post('/login',login)
route.get('/getmyprofile',verifytoken,getmyprofile)
route.get('/getallusers',verifytoken,isAdmin("admin"),getallusers)
route.post('/logout',verifytoken,logout)
route.delete('/deleteuser/:id',verifytoken,isAdmin("admin"),deleteuser)
route.put('/ratereq',ratereq)
route.get('/reqdata',ratedata)
route.put('/saveclientbrief',saveclientbrief)
route.get('/allclientdata',getallclientbrief)



export default route;
