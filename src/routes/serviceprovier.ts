import express, {  Router } from "express";
import JWT from "../middlewares/JWT";
import ServiceProviderController from "../controllers/serviceProvider"

const router = Router();

router.get('/all', [ ServiceProviderController.getAll]);
router.get('/populate', [JWT.authenticateJWT, ServiceProviderController.create]);
router.post('/search', [ ServiceProviderController.search]);
router.post('/find', [ ServiceProviderController.getOne]);

router.get('/getallPopulated', [ ServiceProviderController.getallPopulated]);
router.post('/createSlot', [ ServiceProviderController.createTimeslots]);


router.post('/book', [ JWT.authenticateJWT, ServiceProviderController.bookTimeslot]);

router.get('/userappointments', [ JWT.authenticateJWT, ServiceProviderController.getByBooker]);


// only accessable to admin
router.get('/getallPopulatedAdmin', [ JWT.authorizeAdmin , ServiceProviderController.getallPopulatedAdmin]);

router.post('/findPopulatedAdmin', [ JWT.authorizeAdmin , ServiceProviderController.getOnePopulatedAdmin]);

router.post('/updateBookingStatus', [ JWT.authorizeAdmin , ServiceProviderController.updateBookingStatus]);



//   const provider = req.body.provider;
// const startHours = req.body.startHours;
// const startMinutes = req.body.startMinutes;
// const duration = req.body.duration;
// const dayOfWeek = req.body.dayOfWeek;







export default router;

