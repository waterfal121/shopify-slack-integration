// 產品的 CRUD 操作
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

// 取得所有產品
export const fetchAllProducts = async () => {
  try {
    const url = `${BASE_URL}/products.json`;
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
    const dataCount = data.products.length;
    console.log('All Products: ', data);
    console.log(dataCount, 'products');
  } catch (error) {
    console.error('Error fetching all products:', error.message);
  }
};

// 取得單一產品
export const fetchSingleProduct = async (id) => {
  try {
    const productId = id; // 要 fetch 的 product id
    const url = `${BASE_URL}/products/${productId}.json`;
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
    console.log('Single Product:', data);
  } catch (error) {
    console.error('Error fetching all products:', error.message);
  }
};

// 建立商品
export const createProduct = async () => {
  try {
    const url = `${BASE_URL}/products.json`;
    // 要建立的商品資料
    const product = {
      product: {
        title: 'Test Create Product',
        body_html: '<strong>Test product description.</strong>',
        vendor: 'Jeff',
        product_type: 'Snowboard',
        status: 'draft',
        images: [
          {
            src: 'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?q=80&w=3538&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          },
        ],
      },
    };
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'X-Shopify-Access-Token': token,
      },
      body: JSON.stringify(product),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log('Created Product:', data);
  } catch (error) {
    console.error('Error creating product:', error.message);
  }
};

// 更新商品
export const updateProduct = async (id) => {
  try {
    const productId = id; // 要 update 的 product id
    const url = `${BASE_URL}/products/${productId}.json`;
    // 要更新的商品資料
    const product = {
      product: {
        title: 'Test Product Updated',
        body_html: '<strong>Test product description updated.</strong>',
        status: 'active',
      },
    };
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
        'X-Shopify-Access-Token': token,
      },
      body: JSON.stringify(product),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log('Updated Product:', data);
  } catch (error) {
    console.error('Error updating product:', error.message);
  }
};

// 刪除商品
export const deleteProduct = async (id) => {
  try {
    const productId = id; // 要 delete 的 product id
    const url = `${BASE_URL}/products/${productId}.json`;
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
    console.log('Delete Product Successfully: ', productId);
  } catch (error) {
    console.error('Error deleting product:', error.message);
  }
};
