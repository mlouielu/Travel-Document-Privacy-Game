import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      "app_name": "Travel Document Privacy Quiz",
      "landing_title": "Travel Smart, Share Safe",
      "landing_subtitle": "Can you spot the privacy risks in these travel photos? Test your skills and protect your data!",
      "start_game": "Start Training",
      "share_title": "Share your score!",
      "share_threads": "Share on Threads",
      "share_generic": "Share Result",
      "share_text": "I scored {{score}}/{{total}} in the Travel Document Privacy Quiz! Can you spot the risks?",
      "horror_title": "Why it matters",
      "horror_1": "Someone can use your PNR to cancel your entire trip while you are at the airport.",
      "horror_2": "Hackers can change your frequent flyer contact info and steal all your miles.",
      "horror_3": "Identity thieves use passport photos to open fake bank accounts in your name.",
      "is_safe": "Is this post safe?",
      "analyze_desc": "Analyze the image below.",
      "tap_instruction": "Tap the sensitive data in the image.",
      "decode_instruction": "Match the labels to the correct data segments.",
      "consequence_instruction": "Explore the hacker's portal to see the risks.",
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
      "takeaway_4": "Sharing trip details beforehand can lead to doxxing. Share later or mask the dates!",
      "review_mistakes": "Review Mistakes",
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
          "title": "Safe Travels?",
          "desc": "Heading home for the holidays. Covered the important bits just in case! 🏠❤️",
          "reason": "Even with your name and PNR covered, sharing your flight number, date, and seat in real-time is a major OSINT risk. It allows anyone to track your exact location and know when your home is empty."
        },
        "4": {
          "title": "Trip Booked!",
          "desc": "Just booked my flights! So easy with the app! 📱✈️",
          "reason": "Screenshots of booking apps often show the PNR clearly. This is the 'password' to your booking management!"
        },
        "5": {
          "title": "Mobile Check-in?",
          "desc": "Checking in on the go! Love how the app hides my details automatically. 📱🔒",
          "reason": "Even if the PNR is masked, sharing your flight number, route, and date in real-time is an OSINT risk. It reveals your exact travel schedule and location to anyone online."
        },
        "6": {
          "title": "New Passport Arrived!",
          "desc": "Got my new passport today! Ready for the next 10 years of travel! 🌍🛂",
          "reason": "The bottom two lines (MRZ) contain all the info on the page: Name, Passport Number, DOB, and Expiry. It's readable by bots and scammers instantly."
        },
        "7": {
          "title": "Privacy First",
          "desc": "Found a better way to share my travel wins! 🛡️✈️",
          "reason": "Even if you cover the MRZ and your name, your passport number is still visible at the top! This is unique PII that can be used for identity theft."
        },
        "8": {
          "title": "Ready to Roll",
          "desc": "Tags on, bags packed! 🧳✨",
          "safe_msg": "Perfect! Keeping your address private prevents home security risks."
        },
        "9": {
          "title": "Careful Cover?",
          "desc": "I used a sticker to cover my name and passport number. Safe to post? 🇹🇼",
          "reason": "The sticker covers the start of the MRZ, but the end (where your National ID is) is still visible! 🇹🇼 passports put the ID in the second line."
        },
        "10": {
          "title": "Luggage Tag",
          "desc": "My bags are packed and ready to go! 🧳✈️ #TravelReady",
          "reason": "Never post your home address on a public luggage tag photo! It tells everyone where you live and that your house is currently empty."
        },
        "11": {
          "title": "Trip Confirmation",
          "desc": "Got the email! It's official! 📧✨ #TravelPlans",
          "reason": "Your Booking Reference (PNR) is the key to your entire trip. Don't share it!"
        },
        "12": {
          "title": "At the Gate",
          "desc": "Waiting to board! See you on the other side! 🛫",
          "reason": "Your PNR, Ticket Number, and QR code are all sensitive. Anyone can use them to access or modify your booking!"
        },
        "13": {
          "title": "Ready to Fly",
          "desc": "Passports ready! Let's go! 🛂✈️",
          "reason": "Taiwan's MRZ specifically includes your National ID number! Even without a machine, it's easy to decode and steal your permanent identity info."
        },
        "14": {
          "title": "Passport Cover",
          "desc": "Using my passport to cover my boarding pass for extra privacy! Smart move, right? 🛂✈️",
          "reason": "Even though the boarding pass is mostly covered, the barcode sticking out at the top can still be scanned! Barcodes contain your full PNR and personal details."
        },
        "15": {
          "title": "Decode MRZ",
          "desc": "Can you identify which part of the passport MRZ corresponds to which personal detail?",
          "reason": "The MRZ (Machine Readable Zone) encodes your name, passport number, date of birth, and expiry date in a standard format that bots and scanners can read instantly."
        },
        "16": {
          "title": "Decode Boarding Pass",
          "desc": "Can you find the hidden details in the raw boarding pass data?",
          "reason": "Raw BCBP (Bar Coded Boarding Pass) data contains your full name, booking reference (PNR), flight number, and even your seat. This is exactly what hackers scan from your photos!"
        },
        "17": {
          "title": "The Consequence",
          "desc": "Ever wondered what a hacker can actually do with just your PNR and last name? Welcome to the Hacker's View.",
          "reason": "With a PNR, a total stranger can cancel your flights, change your travel dates, steal your passport number from the API data, and even access your partial payment info. Never share your PNR!"
        }
      },
      "card": {
        "airline_label": "AIRLINE",
        "economy": "ECONOMY",
        "departure": "Departure",
        "arrival": "Arrival",
        "flight": "Flight",
        "date": "Date",
        "seat": "Seat",
        "passenger": "Passenger",
        "pnr_label": "PNR",
        "etkt_label": "ETKT",
        "sensitive_data_leak": "SENSITIVE DATA!",
        "booking_confirmed": "Booking Confirmed!",
        "booking_confirmed_header": "Booking Confirmed",
        "pnr_full_label": "Booking Reference (PNR)",
        "manage_booking": "Manage Booking",
        "secret_alert": "SECRET!",
        "to_label": "To:",
        "trip_confirmed_msg": "Your trip is confirmed!",
        "booking_reference": "Booking Reference",
        "total_paid": "Total Paid",
        "pnr_exposed_alert": "PNR EXPOSED!",
        "priority_baggage": "Priority Baggage",
        "personal_info_leak": "PERSONAL INFO!",
        "home_address_leak": "HOME ADDRESS!"
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
      },
      "decoder": {
        "country_code": "Country Code",
        "name": "Name",
        "passport_no": "Passport No.",
        "nationality": "Nationality",
        "dob": "Date of Birth",
        "sex": "Sex",
        "expiry": "Date of Expiry",
        "personal_id": "Personal ID",
        "passenger_name": "Passenger Name",
        "pnr": "Booking Ref (PNR)",
        "origin": "Origin (GVA)",
        "destination": "Destination (LHR)",
        "flight_no": "Flight Number",
        "date": "Julian Date",
        "seat": "Seat Number",
        "sequence": "Check-in Seq"
      },
      "consequences": {
        "cancel_label": "Cancel Entire Flight",
        "cancel_text": "One click and your vacation is gone. Scammers do this for fun or ransom.",
        "data_label": "Steal Passport & DOB",
        "data_text": "Full access to your API (Advanced Passenger Information) for identity theft.",
        "modify_label": "Change Flight Date",
        "modify_text": "Move your flight to next month, leaving you stranded at the airport.",
        "baggage_label": "Add/Charge Baggage",
        "baggage_text": "Add 10 extra suitcases to your booking and charge your saved credit card.",
        "payment_label": "Access Payment Info",
        "payment_text": "View partial credit card details and billing addresses for phishing.",
        "field_passport": "Passport No.",
        "field_dob": "Date of Birth",
        "field_status": "Flight Status",
        "field_action": "Action",
        "field_depart": "Depart Date",
        "field_new_date": "New Date",
        "field_allowance": "Allowance",
        "field_charges": "Total Charges",
        "field_cardholder": "Cardholder",
        "field_card": "Card Number",
        "status_confirmed": "CONFIRMED",
        "action_cancel": "CANCEL BOOKING",
        "portal_title": "Manage Booking",
        "portal_instruction": "A stranger logged in with your details. Click all options to see the exposed data and consequences:"
      }
    }
  },
  "zh-TW": {
    translation: {
      "app_name": "旅行文件隱私測驗",
      "landing_title": "聰明旅行，安心分享",
      "landing_subtitle": "你能找出這些旅遊照片中的隱私風險嗎？測試你的觀察力，保護個人資料！",
      "start_game": "開始訓練",
      "share_title": "分享你的成績！",
      "share_threads": "分享到 Threads",
      "share_generic": "分享結果",
      "share_text": "我在旅遊隱私測驗中拿到了 {{score}}/{{total}} 分！你能找出隱私風險嗎？",
      "horror_title": "為什麼這很重要？",
      "horror_1": "陌生人可利用訂位代號，在你抵達機場前取消所有行程。",
      "horror_2": "駭客可更改常客計畫資訊，並盜走你所有的飛行里程。",
      "horror_3": "身分盜用者可利用護照照片，冒名開設虛假銀行帳戶。",
      "is_safe": "這則貼文安全嗎？",
      "analyze_desc": "請分析下方的圖片。",
      "tap_instruction": "請點擊圖片中的敏感資訊。",
      "decode_instruction": "請將標籤與正確的資料區塊配對。",
      "consequence_instruction": "進入駭客視角，看看洩露資訊的後果。",
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
      "takeaway_4": "提前分享行程可能導致被肉搜 (doxxing)。請在行程結束後分享，或遮蔽日期！",
      "review_mistakes": "檢討錯誤",
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
          "title": "平安旅途？",
          "desc": "準備回家過節。保險起見，先把重要資訊遮起來了！🏠❤️",
          "reason": "即使遮住了姓名與訂位代號，在網路上公開航班編號、日期與座位仍有巨大的 OSINT 風險。這讓任何人都能追蹤你的確切位置，並推算出你家目前空無一人。"
        },
        "4": {
          "title": "訂好機票了！",
          "desc": "剛訂好機票！用 App 訂位真的好方便！📱✈️",
          "reason": "訂位 App 的截圖通常會清楚顯示 PNR。這就是你管理訂位資訊的「密碼」！"
        },
        "5": {
          "title": "手機報到？",
          "desc": "隨時隨地辦理報到！App 自動隱藏我的詳細資訊，太棒了！📱🔒",
          "reason": "即使 PNR 已被遮蔽，在網路上公開航班編號、航線與日期仍有 OSINT 風險。這會洩露你的確切旅遊行程與即時位置。"
        },
        "6": {
          "title": "新護照到手！",
          "desc": "今天拿到新護照了！準備好迎接下一個十年的旅程！🌍🛂",
          "reason": "底部的 MRZ 區塊以簡單格式包含了你的所有資訊。即使不用機器，任何人只要看一眼文字就能解讀出你的姓名、護照號碼與生日！"
        },
        "7": {
          "title": "隱私優先",
          "desc": "發現一個更棒的分享方式！🛡️✈️",
          "reason": "即使你遮住了 MRZ 和姓名，護照號碼（Passport No.）仍然清晰可見！這是獨特的個人辨識資訊，也可能導致身分盜用。"
        },
        "8": {
          "title": "準備出發",
          "desc": "吊牌掛好了，行李打包完成！🧳✨",
          "safe_msg": "完美！隱藏地址可避免住家安全風險。"
        },
        "9": {
          "title": "小心遮蔽？",
          "desc": "我用貼紙遮住了姓名和護照號碼。這樣發文安全嗎？🇹🇼",
          "reason": "貼紙只遮住了 MRZ 的前半部，但後半部（包含身分證字號）仍然清晰可見！台灣護照將身分證字號放在第二行後段。"
        },
        "10": {
          "title": "行李吊牌",
          "desc": "行李打包好了，準備出發！🧳✈️ #旅行",
          "reason": "千萬不要公開行李吊牌上的住家地址！這會告訴所有人你住在哪裡，而且你現在不在家。"
        },
        "11": {
          "title": "行程確認",
          "desc": "收到確認信了！正式定案！📧✨ #旅行計畫",
          "reason": "你的訂位代號 (PNR) 是你整趟旅程的關鍵鑰匙。千萬別分享出去！"
        },
        "12": {
          "title": "登機門前",
          "desc": "準備登機！我們目的地見！🛫",
          "reason": "您的訂位代號、機票號碼與 QR code 都很敏感。任何人都可以用它們來存取或修改您的行程！"
        },
        "13": {
          "title": "準備起飛",
          "desc": "護照準備好了！出發吧！🛂✈️",
          "reason": "台灣護照的 MRZ 區塊特別包含了你的身分證字號！即使不用機器，也很容易被解讀並盜用你的永久身分資訊。"
        },
        "14": {
          "title": "護照遮蔽",
          "desc": "用護照遮住登機證來保護隱私！這樣很聰明吧？🛂✈️",
          "reason": "雖然登機證大部分都被遮住了，但露出來的條碼仍然可以被掃描！條碼包含你的完整訂位代號 (PNR) 和個人資訊。"
        },
        "15": {
          "title": "解碼 MRZ",
          "desc": "你能辨識出護照 MRZ 區塊中的各項個人資料嗎？",
          "reason": "MRZ（機器可讀區塊）以標準格式編碼了你的姓名、護照號碼、出生日期和有效期限，掃描器和機器人可以立即讀取這些資訊。"
        },
        "16": {
          "title": "解碼登機證",
          "desc": "你能從原始的登機證資料中找出隱藏的細節嗎？",
          "reason": "原始的 BCBP（條碼登機證）資料包含你的全名、訂位代號 (PNR)、航班編號甚至座位。這正是駭客從你的照片中掃描獲取的資訊！"
        },
        "17": {
          "title": "嚴重的後果",
          "desc": "想過駭客只靠你的訂位代號和姓氏能做什麼嗎？歡迎來到「駭客視角」。",
          "reason": "有了訂位代號 (PNR)，陌生人就能取消你的航班、更改旅遊日期、從旅客資料 (API) 中盜取你的護照號碼，甚至存取部分付款資訊。絕對不要分享你的 PNR！"
        }
      },
      "card": {
        "airline_label": "航空公司",
        "economy": "經濟艙",
        "departure": "出發地",
        "arrival": "目的地",
        "flight": "航班",
        "date": "日期",
        "seat": "座位",
        "passenger": "乘客",
        "pnr_label": "訂位代號",
        "etkt_label": "電子機票",
        "sensitive_data_leak": "敏感資料外洩！",
        "booking_confirmed": "訂位已確認！",
        "booking_confirmed_header": "訂位確認",
        "pnr_full_label": "訂位代號 (PNR)",
        "manage_booking": "管理行程",
        "secret_alert": "機密！",
        "to_label": "收件人：",
        "trip_confirmed_msg": "您的行程已確認！",
        "booking_reference": "訂位代號",
        "total_paid": "付款總額",
        "pnr_exposed_alert": "PNR 外洩！",
        "priority_baggage": "優先行李",
        "personal_info_leak": "個資外洩！",
        "home_address_leak": "住家地址外洩！"
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
      },
      "decoder": {
        "country_code": "國家代碼",
        "name": "姓名",
        "passport_no": "護照號碼",
        "nationality": "國籍",
        "dob": "出生日期",
        "sex": "性別",
        "expiry": "護照有效日期",
        "personal_id": "身分證字號",
        "passenger_name": "乘客姓名",
        "pnr": "訂位代號 (PNR)",
        "origin": "出發地",
        "destination": "目的地",
        "flight_no": "航班編號",
        "date": "Julian 日期",
        "seat": "座位號碼",
        "sequence": "報到序號"
      },
      "consequences": {
        "cancel_label": "取消整個航班",
        "cancel_text": "只需點擊一下，你的假期就泡湯了。詐騙者常以此尋開心或勒索贖金。",
        "data_label": "盜取護照與生日",
        "data_text": "完整存取你的旅客預報資訊 (API)，用於身分盜用。",
        "modify_label": "更改航班日期",
        "modify_text": "將你的航班改到下個月，讓你受困在機場。",
        "baggage_label": "增加/扣款行李",
        "baggage_text": "在你的訂位中增加 10 件額外行李，並從你儲存的信用卡扣款。",
        "payment_label": "存取付款資訊",
        "payment_text": "查看部分信用卡資訊與帳單地址，用於網路釣魚。",
        "field_passport": "護照號碼",
        "field_dob": "出生日期",
        "field_status": "航班狀態",
        "field_action": "動作",
        "field_depart": "出發日期",
        "field_new_date": "新日期",
        "field_allowance": "行李額度",
        "field_charges": "總費用",
        "field_cardholder": "持卡人",
        "field_card": "卡號",
        "status_confirmed": "已確認",
        "action_cancel": "取消訂位",
        "portal_title": "管理訂位",
        "portal_instruction": "陌生人利用你的資料登入了系統。請點擊所有選項，查看洩露的資料及後果："
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
    detection: {
      order: ['querystring', 'navigator'],
      lookupQuerystring: 'lang',
    },
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
