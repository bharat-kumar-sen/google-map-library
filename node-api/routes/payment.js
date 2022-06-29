const express = require("express");
const router = express.Router();
const Payment = require("../controllers/paymentController");


router.post("/razorPayCreateOrder", Payment.razorPayCreateOrder);
router.post('/razorPayOrdayPayment', Payment.razorPayOrdayPayment);


router.post("/stripePaymentCreate", Payment.stripePaymentCreate)
router.post("/stripePaymentWithSession", Payment.stripePaymentWithSession)
router.get("/success", Payment.success)

// router.get('/success', async (req, res) => {
//   const session = await stripe.checkout.sessions.retrieve(req.query.session_id);
//   const customer = await stripe.customers.retrieve(session.customer);
//   console.log("req.query======", req.query);

//   // res.send(`<html><body><h1>Thanks for your order, ${customer.name}!</h1></body></html>`);
// });

module.exports = router;