var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Any = mongoose.Schema.Types.Mixed;

var Payment = new Schema(
  {
    fullName: {
      type: String,
      required: true
    },
    email: { 
      type: String, 
      required: true
    },
    razorpayOrderId: {
      type: String,
      required: true,
    },
    razorpayPaymentId: {
      type: String,
      required: true,
    },
    amount: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: "booking",
  }
);

module.exports = mongoose.model('payment', Payment);