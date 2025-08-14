import uuid from "react-native-uuid";
//top doctor img
import topDoctorImg1 from "../assets/images/top-doctor-1.png";
import topDoctorImg2 from "../assets/images/top-doctor-2.png";
import topDoctorImg3 from "../assets/images/top-doctor-3.png";
import topDoctorImg4 from "../assets/images/top-doctor-4.png";

//friend image
import friendPic1 from "@/assets/images/friend-1.png";
import friendPic2 from "@/assets/images/friend-2.png";
import friendPic3 from "@/assets/images/friend-3.png";
import friendPic4 from "@/assets/images/friend-4.png";
import friendPic5 from "@/assets/images/friend-5.png";
import friendPic6 from "@/assets/images/friend-6.png";

//doctor speciality icon
import specialityIcon1 from "@/assets/images/docton-speciality-icon-1.png";
import specialityIcon2 from "@/assets/images/docton-speciality-icon-2.png";
import specialityIcon3 from "@/assets/images/docton-speciality-icon-3.png";
import specialityIcon4 from "@/assets/images/docton-speciality-icon-4.png";
import specialityIcon5 from "@/assets/images/docton-speciality-icon-5.png";
import specialityIcon6 from "@/assets/images/docton-speciality-icon-6.png";
import specialityIcon7 from "@/assets/images/docton-speciality-icon-7.png";
import specialityIcon8 from "@/assets/images/docton-speciality-icon-8.png";
import specialityIcon9 from "@/assets/images/docton-speciality-icon-9.png";
import specialityIcon10 from "@/assets/images/docton-speciality-icon-10.png";

//payment methods
import masterCard from "@/assets/images/master-card.png";
import paypal from "@/assets/images/paypal.png";
import payoneer from "@/assets/images/payoneer.png";
import creditCard from "@/assets/images/card.png";
import bank from "@/assets/images/bank.png";

//upcoming slider img
import sliderImg1 from "@/assets/images/upcoming-slider-img-1.png";
import sliderImg2 from "@/assets/images/upcoming-slider-img-2.png";
import sliderImg3 from "@/assets/images/upcoming-slider-img-3.png";
import sliderImg4 from "@/assets/images/upcoming-slider-img-4.png";

export const onbordingSliderData = [
  {
    id: 1,
    he: {
      title: "חווית פילאטיס",
      colorTitle: "מותאמת אישית",
      description: "גלה כיצד פילאטיס משפר את היציבה, מחזק את השרירים ומביא לאיזון גופני מושלם.",
    },
    en: {
      title: "Pilates Experience",
      colorTitle: "Personalized",
      description: "Discover how Pilates improves posture, strengthens muscles, and brings perfect body balance.",
    },
    ar: {
      title: "تجربة بيلاتيس",
      colorTitle: "مخصصة",
      description: "اكتشف كيف يعزز البيلاتيس وضعيتك، يقوي عضلاتك ويحقق التوازن المثالي لجسمك.",
    },
  },
  {
    id: 2,
    he: {
      title: "הכושר שלך,",
      colorTitle: "התמיכה שלנו",
      description: "המאמנים המנוסים שלנו ילוו אותך במסע לשיפור הבריאות והכושר שלך.",
    },
    en: {
      title: "Your fitness,",
      colorTitle: "Our support",
      description: "Our experienced coaches will accompany you on your journey to improve your health and fitness.",
    },
    ar: {
      title: "لياقتك،",
      colorTitle: "دعمنا",
      description: "مدربونا ذوو الخبرة سيرافقونك في رحلتك لتحسين صحتك ولياقتك.",
    },
  },
  {
    id: 3,
    he: {
      title: "גוף חזק,",
      colorTitle: "תודעה רגועה",
      description: "שפר את החוסן הפיזי והמנטלי שלך עם אימוני פילאטיס מותאמים אישית.",
    },
    en: {
      title: "Strong body,",
      colorTitle: "Calm mind",
      description: "Improve your physical and mental resilience with personalized Pilates workouts.",
    },
    ar: {
      title: "جسم قوي،",
      colorTitle: "عقل هادئ",
      description: "عزز مرونتك الجسدية والذهنية من خلال تمارين بيلاتيس المخصصة.",
    },
  },
];

export const doctorSpecialityData = [
  {
    id: uuid.v4(),
    icon: "eye",
    title: "Ophthalmologist",
    totalDoctors: "361",
  },
  {
    id: uuid.v4(),
    icon: "medical",
    title: "Neurologist",
    totalDoctors: "381",
  },
  {
    id: uuid.v4(),
    icon: "eye",
    title: "Cardiologists",
    totalDoctors: "241",
  },
  {
    id: uuid.v4(),
    icon: "medical",
    title: "Dermatologists",
    totalDoctors: "91",
  },
];
export const topDoctorData = [
  // Doctors - Multiple per Day
  ...Array.from({ length: 15 }).map((_, i) => ({
    id: uuid.v4(),
    name: `ד"ר ${["מרווין מק'קיני", "דיאן ראסל", "סוואנה ניוגן", "ג'ון סמית", "אמיליה ווטסון"][i % 5]}`,
    img: [topDoctorImg1, topDoctorImg2, topDoctorImg3, topDoctorImg4, topDoctorImg1][i % 5],
    department: ["קרדיולוג", "נוירולוג", "אימונולוג", "אורולוג", "רופא משפחה"][i % 5],
    medicalName: ["JFK Medical", "Dhaka Medical", "PG Hospital", "Birdem Medical", "Tel Aviv Medical"][i % 5],
    rating: (4 + Math.random() * 1).toFixed(1),
    availableTime: "12:00 - 17:00",
    fee: (40 + Math.floor(Math.random() * 20)).toString(),
    date: `2025-06-10`, // **Same date for multiple doctors**
  })),

  ...Array.from({ length: 15 }).map((_, i) => ({
    id: uuid.v4(),
    name: `ד"ר ${["מרווין מק'קיני", "דיאן ראסל", "סוואנה ניוגן", "ג'ון סמית", "אמיליה ווטסון"][i % 5]}`,
    img: [topDoctorImg1, topDoctorImg2, topDoctorImg3, topDoctorImg4, topDoctorImg1][i % 5],
    department: ["קרדיולוג", "נוירולוג", "אימונולוג", "אורולוג", "רופא משפחה"][i % 5],
    medicalName: ["JFK Medical", "Dhaka Medical", "PG Hospital", "Birdem Medical", "Tel Aviv Medical"][i % 5],
    rating: (4 + Math.random() * 1).toFixed(1),
    availableTime: "10:00 - 15:00",
    fee: (40 + Math.floor(Math.random() * 20)).toString(),
    date: `2025-06-22`,
  })),

  // Gym Trainers (Same date for multiple trainers)
  ...Array.from({ length: 5 }).map((_, i) => ({
    id: uuid.v4(),
    name: `מאמן ${["אפיף", "שורוק", "מג'ד"][i % 3]}`,
    img: topDoctorImg1,
    department: "אימון כוח",
    medicalName: "מרכז כושר תל אביב",
    rating: (4 + Math.random() * 1).toFixed(1),
    availableTime: "17:00 - 20:00",
    fee: (40 + Math.floor(Math.random() * 20)).toString(),
    date: `2025-06-24`, // **Multiple trainers on the same date**
  })),
  // Gym Trainers (Same date for multiple trainers)
  ...Array.from({ length: 5 }).map((_, i) => ({
    id: uuid.v4(),
    name: `מאמן ${["אפיף", "שורוק", "מג'ד"][i % 3]}`,
    img: topDoctorImg1,
    department: "אימון כוח",
    medicalName: "מרכז כושר תל אביב",
    rating: (4 + Math.random() * 1).toFixed(1),
    availableTime: "17:00 - 20:00",
    fee: (40 + Math.floor(Math.random() * 20)).toString(),
    date: `2025-06-26`, // **Multiple trainers on the same date**
  })),
  // Pilates Trainers
  ...Array.from({ length: 5 }).map((_, i) => ({
    id: uuid.v4(),
    name: `מאמן ${["אפיף", "שורוק", "מג'ד"][i % 3]}`,
    img: topDoctorImg2,
    department: "פילאטיס",
    medicalName: "סטודיו פילאטיס חיפה",
    rating: (4 + Math.random() * 1).toFixed(1),
    availableTime: "08:00 - 11:00",
    fee: (40 + Math.floor(Math.random() * 20)).toString(),
    date: `2025-06-25`,
  })),
];


export const friendChatList = [
  {
    id: uuid.v4(),
    img: friendPic1,
    name: "Jane Cooper",
    message: "Hi Cooper how are you...",
  },
  {
    id: uuid.v4(),
    img: friendPic2,
    name: "Gerald Hernandez",
    message: "Hi Gerald how are you...",
  },
  {
    id: uuid.v4(),
    img: friendPic3,
    name: "Martin Santos",
    message: "Hi Martin how are you...",
  },
  {
    id: uuid.v4(),
    img: friendPic4,
    name: "Ethan Greer",
    message: "Hi Ethan how are you...",
  },
  {
    id: uuid.v4(),
    img: friendPic5,
    name: "Birdie Perry",
    message: "Hi Birdie how are you...",
  },
  {
    id: uuid.v4(),
    img: friendPic6,
    name: "Lela Lindsey",
    message: "Hi Lela how are you...",
  },
];

export const myAppoinmentData = [
  {
    id: uuid.v4(),
    name: "Dr. Adam Williams",
    img: topDoctorImg1,
    sessionStatus: "Upcoming",
    sessionTyps: "Video Call",
    rating: "4.3",
    availableTime: "12pm-5pm",
  },
  {
    id: uuid.v4(),
    name: "Dr. Erik Hudson",
    img: topDoctorImg2,
    sessionStatus: "Completed",
    sessionTyps: "Audio Call",
    rating: "4.7",
    availableTime: "12pm-5pm",
  },
  {
    id: uuid.v4(),
    name: "Dr. Jim Neal",
    img: topDoctorImg3,
    sessionStatus: "Upcoming",
    sessionTyps: "Video Call",
    rating: "4.5",
    availableTime: "12pm-5pm",
  },
  {
    id: uuid.v4(),
    name: "Dr. Derrick Ferguson",
    img: topDoctorImg4,
    sessionStatus: "Cancelled",
    sessionTyps: "Chat Session",
    rating: "4.3",
    availableTime: "12pm-5pm",
  },
  {
    id: uuid.v4(),
    name: "Dr. Eula Byrd",
    img: topDoctorImg1,
    sessionStatus: "Upcoming",
    sessionTyps: "Video Call",
    rating: "4.4",
    availableTime: "12pm-5pm",
  },
  {
    id: uuid.v4(),
    name: "Dr. Katharine Hansen",
    img: topDoctorImg2,
    sessionStatus: "Completed",
    sessionTyps: "Audio Call",
    rating: "4.3",
    availableTime: "12pm-5pm",
  },
  {
    id: uuid.v4(),
    name: "Dr. Alfred Lyons",
    img: topDoctorImg3,
    sessionStatus: "Cancelled",
    sessionTyps: "Video Call",
    rating: "4.2",
    availableTime: "12pm-5pm",
  },
  {
    id: uuid.v4(),
    name: "Dr. Lula Lyons",
    img: topDoctorImg4,
    sessionStatus: "Cancelled",
    sessionTyps: "Chat Session",
    rating: "4.3",
    availableTime: "12pm-5pm",
  },

  {
    id: uuid.v4(),
    name: "Dr. Georgia Lewis",
    img: topDoctorImg1,
    sessionStatus: "Completed",
    sessionTyps: "Video Call",
    rating: "4.9",
    availableTime: "12pm-5pm",
  },
  {
    id: uuid.v4(),
    name: "Dr. Maggie Robertson",
    img: topDoctorImg2,
    sessionStatus: "Cancelled",
    sessionTyps: "Chat Session",
    rating: "4.3",
    availableTime: "12pm-5pm",
  },
  {
    id: uuid.v4(),
    name: "Dr. Carl King",
    img: topDoctorImg3,
    sessionStatus: "Upcoming",
    sessionTyps: "Video Call",
    rating: "4.5",
    availableTime: "12pm-5pm",
  },
  {
    id: uuid.v4(),
    name: "Dr. Sue Copeland",
    img: topDoctorImg4,
    sessionStatus: "Completed",
    sessionTyps: "Audio Call",
    rating: "4.3",
    availableTime: "12pm-5pm",
  },
];

export const profileSettings = [
  {
    id: 1,
    icon: "notifications-outline",
    name: "Notification",
    link: "/NotificationSettings",
  },
  // {
  //   id: 2,
  //   icon: "card-outline",
  //   name: "Payment",
  //   link: "/AddCardPage",
  // },
  // {
  //   id: 3,
  //   icon: "lock-closed-outline",
  //   name: "Security",
  //   link: "/ChangePassword",
  // },
  {
    id: 2,
    icon: "language-outline",
    name: "Language",
    link: "/LanguageSettings",
  },
  {
    id: 3,
    icon: "sunny-outline",
    name: "Dark Mode",
    link: "/NotificationSettings",
  },
  {
    id: 4,
    icon: "help",
    name: "Help Center",
    link: "/HelpSupport",
  },
];

export const scheduleDates = [
  {
    date: "7",
    day: "Sat",
  },
  {
    date: "8",
    day: "Sun",
  },
  {
    date: "9",
    day: "Mon",
  },
  {
    date: "10",
    day: "Tue",
  },
  {
    date: "11",
    day: "Wed",
  },
  {
    date: "12",
    day: "Thu",
  },
  {
    date: "13",
    day: "Fri",
  },
  {
    date: "14",
    day: "Sat",
  },
  {
    date: "15",
    day: "Sun",
  },
];

export const doctorSpecialityData2 = [
  {
    name: "Surgeon",
    img: specialityIcon1,
    totalDoctor: "934",
  },
  {
    name: "Physician",
    img: specialityIcon2,
    totalDoctor: "527",
  },
  {
    name: "Pediatrician",
    img: specialityIcon3,
    totalDoctor: "382",
  },
  {
    name: "Gynecologist",
    img: specialityIcon4,
    totalDoctor: "247",
  },
  {
    name: "Cardiologist",
    img: specialityIcon5,
    totalDoctor: "727",
  },
  {
    name: "Dermatologist",
    img: specialityIcon6,
    totalDoctor: "717",
  },
  {
    name: "Neurologist",
    img: specialityIcon7,
    totalDoctor: "659",
  },
  {
    name: "Psychiatrist",
    img: specialityIcon8,
    totalDoctor: "123",
  },
  {
    name: "Oncologist",
    img: specialityIcon9,
    totalDoctor: "680",
  },
  {
    name: "Radiologist",
    img: specialityIcon10,
    totalDoctor: "097",
  },
];

export const feesInformation = [
  {
    nameKey: "voiceCall",
    descKey: "voiceCallDesc",
    price: "35",
  },
  {
    nameKey: "audioCall",
    descKey: "audioCallDesc",
    price: "25",
  },
  {
    nameKey: "chatSession",
    descKey: "chatSessionDesc",
    price: "12",
  },
];


export const paymentMethods = [
  {
    name: "Paypal",
    img: paypal,
  },
  {
    name: "Payoneer",
    img: payoneer,
  },
  {
    name: "Bank Transfer",
    img: bank,
  },
  {
    name: "Mastercard",
    img: masterCard,
  },
  {
    name: "Credit Card",
    img: creditCard,
  },
];

export const faqData = [
  {
    id: 1,
    question: "What is Appoinx?",
    answer:
      "Appoinx is greatest medical online consultation app platform in this century",
  },
  {
    id: 2,
    question: "How to use Appoinx?",
    answer:
      "Appoinx is greatest medical online consultation app platform in this century",
  },
  {
    id: 3,
    question: "How to schedule consultation on Appoinx?",
    answer:
      "Appoinx is greatest medical online consultation app platform in this century",
  },
  {
    id: 4,
    question: "How to logout from Appoinx?",
    answer:
      "Appoinx is greatest medical online consultation app platform in this century",
  },
  {
    id: 5,
    question: "Is there a free tips to get health in this app?",
    answer:
      "Appoinx is greatest medical online consultation app platform in this century",
  },

  {
    id: 6,
    question: "Is Appoinx free to use?",
    answer:
      "Appoinx is greatest medical online consultation app platform in this century",
  },
];

export const upcomingSliderData = [
  {
    id: 1,
    title: "תאם לחוג הזומבה הבא אצלנו ב-פלו",
    desc: "Get special 10% discount this December",
    img: sliderImg1,
  },
  {
    id: 2,
    title: "Consult with specialists, Prevent you",
    desc: "Get special 10% discount this December",
    img: sliderImg2,
  },
  {
    id: 3,
    title: "Consult with specialists, Prevent you",
    desc: "Get special 10% discount this December",
    img: sliderImg3,
  },
  {
    id: 4,
    title: "Consult with specialists, Prevent you",
    desc: "Get special 10% discount this December",
    img: sliderImg4,
  },
];
