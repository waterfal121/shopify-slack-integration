import dotenv from 'dotenv';
dotenv.config;

const token = process.env.SHOPIFY_ADMIN_ACCESS_TOKEN;
if (!token) {
  console.error('請檢查環境變數: SHOPIFY_ADMIN_ACCESS_TOKEN 未設定');
  process.exit(1);
}
const SHOPIFY_SHOP = process.env.SHOPIFY_SHOP;
const SHOPIFY_API_VERSION = process.env.SHOPIFY_API_VERSION || '2025-01s';
const BASE_URL = `https://${SHOPIFY_SHOP}.myshopify.com/admin/api/${SHOPIFY_API_VERSION}`;

// Shopify API 訂閱 Webhook 的 URL
const webhookUrl = `${BASE_URL}/webhooks.json`;

// 定義要訂閱的 webhook 資料
const webhookData = {
  webhook: {
    topic: 'orders/create', // 訂閱新訂單產生事件
    address: 'https://your-server.com/webhook/orders', // 請替換為你用來接收 webhook 的公開 URL
    format: 'json',
  },
};

// 建立基本認證字串
const auth = Buffer.from(`${SHOPIFY_API_KEY}:${SHOPIFY_API_PASSWORD}`).toString(
  'base64'
);

const subscribeWebhook = async () => {
  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${auth}`,
      },
      body: JSON.stringify(webhookData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Webhook 訂閱失敗：${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log('Webhook 訂閱成功：', data);
  } catch (error) {
    console.error('訂閱 Webhook 時發生錯誤：', error.message);
  }
};

subscribeWebhook();
