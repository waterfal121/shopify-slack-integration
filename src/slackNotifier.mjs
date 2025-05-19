import { WebClient } from '@slack/web-api';
import dotenv from 'dotenv';
dotenv.config();

const token = process.env.SLACK_BOT_TOKEN;
const channel = process.env.SLACK_CHANNEL_ID;

if (!token || !channel) {
  console.error(
    '請檢查 SLACK_BOT_TOKEN 與 SLACK_CHANNEL 是否在 .env 中正確設定'
  );
  process.exit(1);
}

const web = new WebClient(token);

/**
 * 發送訊息到 Slack
 * @param {string} message - 要發送的訊息內容
 */
export const sendSlackMessage = async (message) => {
  try {
    const res = await web.chat.postMessage({
      channel: channel,
      text: message,
    });
    console.log('Slack 訊息發送成功：', res);
  } catch (error) {
    console.error('發送 Slack 訊息失敗：', error.message);
  }
};
