import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      "app_name": "PrivacyPro",
      "is_safe": "Is this post safe?",
      "analyze_desc": "Analyze the image below.",
      "tap_instruction": "Tap the sensitive data in the image.",
      "safe": "Safe",
      "risky": "Risky",
      "correct": "Correct!",
      "incorrect": "Incorrect",
      "next_level": "Next Level",
      "see_results": "See Results",
      "training_complete": "Training Complete!",
      "score_display": "You scored {{score}} / {{total}}",
      "play_again": "Play Again",
      "takeaways": "Key Takeaways:",
      "takeaway_1": "Barcodes & QR codes contain your full name and PNR.",
      "takeaway_2": "Passport MRZ lines are machine-readable and contain full PII.",
      "takeaway_3": "Always cover sensitive data physically or digitally before sharing.",
      "scenarios": {
        "1": {
          "title": "Airport Check-in",
          "desc": "So excited for this trip! Finally managed to get a window seat! ✈️ #AdventureTime",
          "reason": "This QR code contains your PNR (Booking Reference) and full name. Anyone can scan it to access your booking, change your seat, or even cancel your flight!"
        },
        "2": {
          "title": "Taiwan Adventure",
          "desc": "Finally off to Taiwan! Can't wait for the night markets! 🇹🇼🍜 #Taiwan #Travel",
          "reason": "The National ID number is unique and permanent. Leaking it exposes you to identity theft risks in Taiwan, unlike a passport number which changes with renewal."
        },
        "3": {
          "title": "Safe Travels",
          "desc": "Heading home for the holidays. Covered the important bits just in case! 🏠❤️",
          "safe_msg": "Great job! By covering the barcode and ticket number, you've protected your personal data."
        },
        "4": {
          "title": "Trip Booked!",
          "desc": "Just booked my flights! So easy with the app! 📱✈️",
          "reason": "Screenshots of booking apps often show the PNR clearly. This is the 'password' to your booking management!"
        },
        "5": {
          "title": "New Passport Arrived!",
          "desc": "Got my new passport today! Ready for the next 10 years of travel! 🌍🛂",
          "reason": "The bottom two lines (MRZ) contain all the info on the page: Name, Passport Number, DOB, and Expiry. It's readable by bots and scammers instantly."
        },
        "6": {
          "title": "Luggage Tag",
          "desc": "My bags are packed and ready to go! 🧳✈️ #TravelReady",
          "reason": "Never post your home address on a public luggage tag photo! It tells everyone where you live and that your house is currently empty."
        },
        "7": {
          "title": "Trip Confirmation",
          "desc": "Got the email! It's official! 📧✨ #TravelPlans",
          "reason": "Your Booking Reference (PNR) is the key to your entire trip. Don't share it!"
        },
        "8": {
          "title": "At the Gate",
          "desc": "Waiting to board! See you on the other side! 🛫",
          "reason": "Barcodes and QR codes are easily readable. They contain your name and PNR."
        },
        "9": {
          "title": "Ready to Fly",
          "desc": "Passports ready! Let's go! 🛂✈️",
          "reason": "The MRZ code at the bottom of your passport is meant for machines, but scammers have machines too!"
        }
      },
      "passport": {
        "type": "Type",
        "code": "Code",
        "passport_no": "Passport No.",
        "name": "Name",
        "nationality": "Nationality",
        "personal_id": "Personal Id. No.",
        "sex": "Sex",
        "dob": "Date of Birth",
        "place_birth": "Place of Birth",
        "expiry": "Date of Expiry",
        "authority": "Authority",
        "surname": "Surname",
        "given_names": "Given Names"
      }
    }
  },
  "zh-TW": {
    translation: {
      "app_name": "隱私守護者",
      "is_safe": "這則貼文安全嗎？",
      "analyze_desc": "請分析下方的圖片。",
      "tap_instruction": "請點擊圖片中的敏感資訊。",
      "safe": "安全",
      "risky": "有風險",
      "correct": "正確！",
      "incorrect": "錯誤",
      "next_level": "下一關",
      "see_results": "查看結果",
      "training_complete": "訓練完成！",
      "score_display": "你的得分是 {{score}} / {{total}}",
      "play_again": "再玩一次",
      "takeaways": "核心重點：",
      "takeaway_1": "條碼與 QR code 包含你的全名與訂位代號 (PNR)。",
      "takeaway_2": "護照底部的 MRZ 區塊可被機器讀取並包含所有個人資料。",
      "takeaway_3": "分享照片前，請務必遮蓋敏感資訊。",
      "scenarios": {
        "1": {
          "title": "機場報到",
          "desc": "超期待這次旅行！終於拿到靠窗座位了！✈️ #旅行 #出發",
          "reason": "這個 QR code 包含你的訂位代號 (PNR) 與全名。任何人只要掃描它，就能存取你的訂位資訊、更改座位，甚至取消你的航班！"
        },
        "2": {
          "title": "台灣冒險",
          "desc": "終於要回台灣了！好期待夜市美食！🇹🇼🍜 #台灣 #旅行",
          "reason": "身分證字號是唯一且永久的。洩露它會讓你面臨身分盜用的風險，這與更換護照後就會改變的護照號碼不同。"
        },
        "3": {
          "title": "平安旅途",
          "desc": "準備回家過節。保險起見，先把重要資訊遮起來了！🏠❤️",
          "safe_msg": "做得好！遮住條碼與票號可以有效保護你的個人隱私。"
        },
        "4": {
          "title": "訂好機票了！",
          "desc": "剛訂好機票！用 App 訂位真的好方便！📱✈️",
          "reason": "訂位 App 的截圖通常會清楚顯示 PNR。這就是你管理訂位資訊的「密碼」！"
        },
        "5": {
          "title": "新護照到手！",
          "desc": "今天拿到新護照了！準備好迎接下一個十年的旅程！🌍🛂",
          "reason": "底部的兩行 MRZ 區塊包含頁面上所有的資訊：姓名、護照號碼、生日與有效期。機器人與詐騙集團可以瞬間讀取這些資料。"
        },
        "6": {
          "title": "行李吊牌",
          "desc": "行李打包好了，準備出發！🧳✈️ #旅行",
          "reason": "千萬不要公開行李吊牌上的住家地址！這會告訴所有人你住在哪裡，而且你現在不在家。"
        },
        "7": {
          "title": "行程確認",
          "desc": "收到確認信了！正式定案！📧✨ #旅行計畫",
          "reason": "你的訂位代號 (PNR) 是你整趟旅程的關鍵鑰匙。千萬別分享出去！"
        },
        "8": {
          "title": "登機門前",
          "desc": "準備登機！我們目的地見！🛫",
          "reason": "條碼與 QR code 非常容易被讀取。它們包含了你的姓名與 PNR。"
        },
        "9": {
          "title": "準備起飛",
          "desc": "護照準備好了！出發吧！🛂✈️",
          "reason": "護照底部的 MRZ 代碼是給機器讀的，但詐騙集團也有機器！"
        }
      },
      "passport": {
        "type": "類別",
        "code": "國家代碼",
        "passport_no": "護照號碼",
        "name": "姓名",
        "nationality": "國籍",
        "personal_id": "身分證字號",
        "sex": "性別",
        "dob": "出生日期",
        "place_birth": "出生地",
        "expiry": "有效期至",
        "authority": "發照機關",
        "surname": "姓",
        "given_names": "名"
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
