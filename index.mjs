import express from 'express';
import dotenv from 'dotenv';
import { sendSlackMessage } from './src/slackNotifier.mjs';
// product modules
import {
  fetchAllProducts,
  fetchSingleProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from './src/modules/product.mjs';
// order modules
import {
  fetchAllOrders,
  fetchSingleOrder,
  createOrder,
  updateOrder,
  cancelOrder,
  deleteOrder,
} from './src/modules/order.mjs';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// product CRUD demo
// fetchAllProducts();
// fetchSingleProduct(14677308080498);
// createProduct();
// updateProduct(14682477920626);
// deleteProduct(14682477920626);

// order CRUD demo
// fetchAllOrders();
// fetchSingleOrder(6888475918706);
// createOrder();
// updateOrder(6896128721266);
// cancelOrder(6896128721266);
// deleteOrder(6896128721266);

app.get('/webhook/order', (req, res) => {
  res.send('Hello, Shopify Webhook order!');
});

app.post('/webhook/order', async (req, res) => {
  try {
    const order = req.body;
    console.log('接收到 Webhook - Order created:', order);

    // 要傳送的訊息內容
    const message = `
      新訂單通知：
      訂單編號：${order.order_number}
      總金額：${order.currency || 'TWD'} ${order.total_price}
      客戶：${order.email || '未知'}
      `;

    // 傳送訊息到 Slack: slackNotifier.mjs
    await sendSlackMessage(message);

    res.status(200).send('Webhook received and Slack channel notified.');
  } catch (error) {
    console.error('Webhook 處理錯誤：', error.message);
    res.status(500).send('Server error');
  }
});

app.get('/', (req, res) => {
  res.send('Hello, Shopify Webhook!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}: http://localhost:${PORT}`);
});
