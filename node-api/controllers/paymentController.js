const Payment = require("../models/paymentModel");
const globalService = require("../core/globalService");
const stripe = require('stripe')('sk_test_51K1TCTSFdV4WOpwUdvC1Y6kCT5yyG541r2oBFUNAAhbiT4a8J59miUt2kw2rjJaXc4blZkbmhBikNXtTivTrLCkk00jnaQOoWT');

require("dotenv").config();
var Razorpay = require("razorpay");
var instance = new Razorpay({
  key_id: process.env.RAZOR_KEY_ID,
  key_secret: process.env.RAZOR_KEY_SECRET,
});

exports.razorPayCreateOrder = (req, res) => {
  var orderInfo = req.body;

  var options = {
    amount: orderInfo.amount.toString().search(/\./)
      ? (orderInfo.amount = (orderInfo.amount + "").replace(".", ""))
      : (orderInfo.amount = orderInfo.amount + "00"),
    currency: "INR",
    receipt: Date.now(),
    payment_capture: 0,
  };

  // return;
  instance.orders.create(options, (err, order) => {
    if (err) {
      return res.json({
        status: 500,
        message: "There are some error while creating order.",
        data: err,
      });
    } else {
      return res.json({
        status: 200,
        message: "Now Just order was created.",
        order: order,
        razor_key_id: process.env.RAZOR_KEY_ID,
      });
    }
  });
};

exports.razorPayOrdayPayment = (req, res) => {
  postData = req.body;
  let PaymentData = new Payment();
  Object.keys(postData).forEach((key) => {
    PaymentData[key] = postData[key];
  });

  // return;
  postData.amount = toString(postData.amount).search(/\./)
    ? (postData.amount = (postData.amount + "").replace(".", ""))
    : (postData.amount = postData.amount + "00");

  instance.payments.capture(
    postData.razorpayPaymentId,
    postData.amount,
    "INR",
    (razorErr, razorCaptureRes) => {
      if (razorErr) {
        return res.json({
          status: 500,
          message: "There are in some error while Capture the payment!.",
          data: razorErr,
        });
      } else {
        // PaymentData.paymentStatus = process.env.STATUS_CAPTURED;
        PaymentData.save((paymentErr, paymentData) => {
          if (paymentErr) {
            return res.json({
              status: 500,
              message: "There are in some error while save Payment!.",
              data: paymentErr,
            });
          } else {
            return res.json({
              status: 200,
              message: "Payment has been succesfully.",
              data: paymentData,
            });
          }
        });
      }
    }
  );
};

exports.stripePaymentCreateWithCard = async (req, res) => {
  
  let postData = req.body
  console.log("cpostData=====", postData)
  const paymentMethod = await stripe.paymentMethods.create({
    type: 'card',
    card: {
      number: '4242424242424242',
      exp_month: 12,
      exp_year: 2022,
      cvc: '314',
    },
  });
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 2000 * 100,
    currency: 'inr',
    payment_method_types: ['card'],
    // confirm: true,
    // 'customer': null',
    // confirmation_method: 'manual',
    // payment_method:postData.stripe.card.id,
    capture_method: 'automatic',
  });
  
  // console.log('paymentIntent: ', paymentIntent);
  console.log('paymentIntent.id: ', paymentIntent.id);
  console.log('paymentIntent.id: asadasdasdasdasdasdasdasdasdddddddddd');
  console.log('paymentIntent.id: ', paymentMethod);
  // return;
  // const paymentIntentCapture = await stripe.paymentIntents.confirm(paymentIntent.id)
  const paymentIntentCapture2 = await stripe.paymentIntents.capture(paymentIntent.id)
  // console.log('paymentIntentCapture: ', paymentIntentCapture);
  console.log('paymentIntentCapture2: ', paymentIntentCapture2);
  
  // return;
  // const session = await stripe.checkout.sessions.create({
  //   success_url: '/success',
  //   cancel_url: '/cancel',
  //   line_items: [
  //     {price: postData.amount, quantity: 2},
  //   ],
  //   mode: 'payment',
  // }).then(function(stripeRes, stripeErr) {
    
    
  // })

  
}

exports.stripePaymentCreate = async (req, res) => {
  let postData = req.body
  const paymentIntent = await stripe.paymentIntents.create({
    description: 'Software development services',
    shipping: {
      name: 'Jenny Rosen',
      address: {
        line1: '510 Townsend St',
        postal_code: '98140',
        city: 'San Francisco',
        state: 'CA',
        country: 'US',
      },
    },
    amount: 1099,
    currency: 'INR',
    payment_method_types: ['card'],
  })

  console.log(paymentIntent, '========paymentIntent');
}

  exports.stripePaymentWithSession = async (req, res) => {
  let postData = req.body
  stripe.checkout.sessions.create({
    customer_email:postData.email,
    billing_address_collection: 'auto',

      line_items: [
        {
          price_data: {
            currency: 'INR',
            product_data: {
              name: 'T-shirt',
            },
            unit_amount: postData.amount * 100,
            
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'http://localhost:3000/payment/success',
      cancel_url: 'http://localhost:4200/#/payment-gateway/stripe-pay',
    }, (err, response)=> {
      console.log("response-------", response)
      if(err) {
        return res.json({
          status : 400,
          message: "Session create Failed",
          data: err
        })
      }else {
        return res.json({
          status : 200,
          message:'Session created successfully',
          data:response
        })
      }
    });
    

}

exports.success = async (req, res) => {
  // const session = await stripe.checkout.sessions.retrieve(req.query.session_id);
//   const customer = await stripe.customers.retrieve(session.customer);
  // console.log("session======", session);
  console.log("req.query======", req.body);
  console.log("req.query======", req.query);
}

// app.post('/create-checkout-session', async (req, res) => {
//   const session = await stripe.checkout.sessions.create({
//     line_items: [
//       {
//         price_data: {
//           currency: 'usd',
//           product_data: {
//             name: 'T-shirt',
//           },
//           unit_amount: 2000,
//         },
//         quantity: 1,
//       },
//     ],
//     mode: 'payment',
//     success_url: 'https://example.com/success',
//     cancel_url: 'https://example.com/cancel',
//   });

//   res.redirect(303, session.url);
// });


// stripe.charges.create({
//   amount: postData.amount * 100,
//   currency:'USD',
//   description:'One time Payment',
//   source:postData.stripe.id,
  
// },(err, charges) =>{
//   if(err) {
//     console.log(err)
//   }else {
//     return res.json({
//       status:200,
//       message:'payment successfully done',
//       data:charges,
//     })
//   }
// })