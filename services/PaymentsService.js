const axios = require("axios");

class PaymentsService {
  async createPayment(req, res) {

    const quantity = req.body.items.map(e => e.quantity)
    const productsQuantity = quantity.reduce(
      (previousValue, currentValue) => previousValue + currentValue,
      0
    )
    const Operation = (req.body.total * (req.body.amount) / 100) / productsQuantity

    const itemsArray = item => ({
      title: item.brand,
      description: item.description,
      picture_url: item.photo[0],
      quantity: item.quantity,
      unit_price: (item.price - Operation),
    })

    const url = "https://api.mercadopago.com/checkout/preferences";

    const body = {
      items: req.body.items.map(itemsArray),
      back_urls: {
        "success": "https://www.success.com",
        "failure": "http://www.failure.com",
        "pending": "http://www.pending.com"
      },
    };

    const payment = await axios.post(url, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer TEST-993360413155927-101021-7ad14e4acbbec9ffe419db9b31a47663-379222509`,
      }
    });

    return payment.data;
  }
}

module.exports = PaymentsService;
