// 訂單的 CRUD 操作
import dotenv from 'dotenv';
dotenv.config();

const token = process.env.SHOPIFY_ADMIN_ACCESS_TOKEN;
if (!token) {
  console.error('請檢查環境變數: SHOPIFY_ADMIN_ACCESS_TOKEN 未設定');
  process.exit(1);
}
const SHOPIFY_API_VERSION = process.env.SHOPIFY_API_VERSION || '2025-01';
const SHOPIFY_SHOP = process.env.SHOPIFY_SHOP || 'jeffistesting';
const BASE_URL = `https://${SHOPIFY_SHOP}.myshopify.com/admin/api/${SHOPIFY_API_VERSION}`;

// 取得所有訂單
export const fetchAllOrders = async () => {
  try {
    const url = `${BASE_URL}/orders.json?status=any`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'X-Shopify-Access-Token': token,
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    const dataCount = data.orders.length;
    console.log('All Orders: ', data);
    console.log(dataCount, 'orders');
  } catch (error) {
    console.error('Error fetching all orders:', error.message);
  }
};

// 取得單一訂單
export const fetchSingleOrder = async (id) => {
  try {
    const orderId = id; // 要 fetch 的 order id
    const url = `${BASE_URL}/orders/${orderId}.json`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'X-Shopify-Access-Token': token,
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log('Single Order:', data);
  } catch (error) {
    console.error('Error fetching all orders:', error.message);
  }
};

// 建立訂單
export const createOrder = async () => {
  try {
    const url = `${BASE_URL}/orders.json`;
    const order = {
      order: {
        line_items: [
          {
            title: 'Test Item',
            quantity: 1,
            price: '19.99',
          },
        ],
        customer: {
          first_name: 'John',
          last_name: 'Doe',
          email: 'john.doe@example.com',
        },
        use_customer_default_address: true,
        tags: 'API',
      },
    };
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'X-Shopify-Access-Token': token,
      },
      body: JSON.stringify(order),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log('Create Order:', data);
    console.log('Create Order Successfully');
  } catch (error) {
    console.error('Error creating order:', error.message);
  }
};

// 更新訂單
export const updateOrder = async (id) => {
  try {
    const orderId = id; // 要 update 的 order id
    const url = `${BASE_URL}/orders/${orderId}.json`;
    const order = {
      order: {
        note: 'Order updated via API',
        tags: 'updated',
      },
    };
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
        'X-Shopify-Access-Token': token,
      },
      body: JSON.stringify(order),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log('Update Order:', data);
    console.log('update order successfully');
  } catch (error) {
    console.error('Error updating order:', error.message);
  }
};

// 取消訂單
export const cancelOrder = async (id) => {
  try {
    const orderId = id; // 要 cancel 的 order id
    const url = `${BASE_URL}/orders/${orderId}/cancel.json`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'X-Shopify-Access-Token': token,
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log('Cancel Order:', data);
  } catch (error) {
    console.error('Error canceling order:', error.message);
  }
};

// 刪除訂單
export const deleteOrder = async (id) => {
  try {
    const orderId = id; // 要 delete 的 order id
    const url = `${BASE_URL}/orders/${orderId}.json`;
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        'X-Shopify-Access-Token': token,
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log('Delete Order Successfully: ', orderId);
  } catch (error) {
    console.error('Error deleting order:', error.message);
  }
};
