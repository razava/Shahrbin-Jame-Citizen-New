export const appActions = {
  SET_FILTERS: "SET_FILTERS",
  SET_QUICK_ACCESSES: "SET_QUICK_ACCESSES",
  SET_APPS: "SET_APPS",
  SET_ACCESSES: "SET_ACCESSES",
  SET_NEWS: "SET_NEWS",
  SET_CATEGORIES: "SET_CATEGORIES",
  SET_NEW_MESSAGE_COUNT: "SET_NEW_MESSAGE_COUNT",
  SET_USER: "SET_USER",
  SET_REFRESH: "SET_REFRESH",
  SET_INITIALDATA: "SET_INITIALDATA",
  SET_CREATE_REQUEST: "SET_CREATE_REQUEST",
  SET_BOTTOM_SHEET: "SET_BOTTOM_SHEET",
  SET_INSTANCES: "SET_INSTANCES",
  SET_INSTANCE: "SET_INSTANCE",
  SET_SIDEMENU: "SET_SIDEMENU",
};

export const appRoutes = {
  auth: "/auth",
  intro: "/auth/intro",
  signin: "/auth/signin",
  signup: "/auth/signup",
  forgotpass: "/auth/forgotpass",
  resetpass: "/auth/resetpass",
  verify: "/auth/verify",
  signinGov: "/auth/signin-gov",

  pnpUser: "/user/pnp",
  pnpAuth: "/auth/pnpAuth",
  pnp: "/pnp",

  user: "/user",

  menu: "/user/menu",
  newRequest: "/user/new-request",
  newComplaint: "/user/new-complaint",
  recentRequests: "/user/recent-requests",
  myRequests: "/user/my-requests",
  myComplaints: "/user/my-complaints",
  request: "/user/request/:id",
  complaint: "/user/complaint/:id",
  polls: "/user/polls",
  news: "/user/news",
  settings: "/user/settings",

  notifications: "/user/notifications",
  profile: "/user/profile",
  profile: "/user/profile",
  reportDetails: "/user/my-report/:id",
  poll: "/user/poll/:id",
  password: "/user/password",
  FAQ: "/user/FAQ",
  feedback: "/user/feedback/:id",
  yazd: "/signin-yazd",
};

export const appConstants = {
  SH_CT_ACCESS_TOKEN: "SH_CT_ACCESS_TOKEN",
  SH_CT_REFRESH_TOKEN: "SH_CT_REFRESH_TOKEN",
  SH_CT_USER_ROLES: "SH_CT_USER_ROLES",
  SH_CT_CURRENT_TIME: "SH_CT_CURRENT_TIME",
  SH_CT_EXPIRATION: "SH_CT_EXPIRATION",
  SH_CT_INSTANCE: "SH_CT_INSTANCE",
  SH_CT_CHANGE_INSTANCE: "SH_CHANGE_INSTANCE",
  SH_CT_OTP_TOKEN: "SH_CT_OTP_TOKEN",
  SH_CT_NOTIFICATION_STATE: "SH_CT_NOTIFICATION_STATE",
  SH_CT_LOGIN_URL: "SH_CT_LOGIN_URL",
};

export const API_URL =
  process.env.NODE_ENV === "development"
    ? process.env.REACT_APP_API_URL_DEV
    : process.env.REACT_APP_API_URL_PROD;

export const errorMessages = {
  500: "خطایی رخ داد. لطفا از اتصال اینترنت خود اطمینان حاصل نمایید.",
  400: "مشکلی در ارسال درخواست به وجود آمد.",
  480: "لطفا تمام اطلاعات خواسته شده را وارد نمایید.",
  428: "کد فعالسازی را وارد نمایید.",
};

export const httpMethods = {
  post: "post",
  get: "get",
  put: "put",
  patch: "patch",
  delete: "delete",
};

export const statusCodes = {
  success: 200,
  created: 201,
  updated: 204,
  noContent: 204,
  requireVerification: 428,
  badRequest: 400,
  unAuthorized: 401,
};

export const statusColors = {
  "در انتظار تأیید اپراتور": "var(--yellow-scale-4)",
  "ارجاع به واحد اجرایی": "var(--gray-scale-5)",
  "ارجاع به پیمانکار": "var(--purple-scale-4)",
  "پایان یافته": "var(--green-scale-4)",
  "ارجاع به واحد بازرسی": "var(--red-scale-4)",
  "بررسی توسط واحد بازرسی": "var(--red-scale-4)",
  "ثبت درخواست در سامانه": "var(--blue-2)",
  "در انتظار تأیید در سامانه": "var(--blue-3)",
  "تأیید درخواست در سامانه": "#79B473",
  "ارجاع به شهروند": "var(--purple)",
  "ارجاع به اپراتور": "var(--blue)",
  "پاسخ به شهروند": "var(--purple)",
  "ایجاد شده": "var(--yellow-scale-4)",
  "در حال بررسی": "var(--gray-scale-5)",
};

export const statusIcons = {
  "در انتظار تأیید اپراتور": "fas fa-pause",
  "ارجاع به واحد اجرایی": "fas fa-user-cog",
  "ارجاع به پیمانکار": "fas fa-people-carry",
  "پایان یافته": "fas fa-handshake",
  "ارجاع به واحد بازرسی": "fas fa-user-shield",
  "ثبت درخواست در سامانه": "fas fa-pen",
  "تأیید درخواست در سامانه": "fas fa-check",
  "ارجاع به شهروند": "fas fa-user",
  "ارجاع به اپراتور": "fas fa-headset",
  "پاسخ به شهروند": "fas fa-envelope-open-text",
};

export const contentTypes = {
  json: "application/json",
  formData: "multipart/form-data",
};

export const APP_URL =
  process.env.NODE_ENV === "development" ? "http://localhost:3000" : API_URL;

export const validationTypes = {
  required: "required",
  password: "password",
  passwordMatch: "passwordMatch",
  nationalId: "nationalId",
};

export const authModes = {
  intro: "intro",
  signin: "signin",
  signup: "signup",
  verify: "verify",
  forgotpass: "forgotpass",
  resetpass: "resetpass",
  pnpAuth: "pnpAuth",
};

export const pageTitles = {
  "/auth": "احراز هویت",
  "/auth/intro": "معرفی",
  "/auth/signin": "ورود",
  "/auth/signup": "ثبت نام",
  "/auth/pnp": "قوانین و مقررات",
  "/auth/forgotpass": "فراموشی رمز عبور",
  "/auth/resetpass": "تغییر رمز عبور",
  "/auth/verify": "تایید هویت",
  "/auth/signin-gov": "ورود با دولت من",

  "/user": "ناحیه کاربری",

  "/user/menu": "منوی کاربری",
  "/user/new-request": "درخواست جدید",
  "/user/recent-requests": "درخواست‌های اخیر",
  "/user/my-requests": "درخواست‌های من",
  "/user/request/:id": "درخواست",
  "/user/polls": "نظرسنجی‌ها",
  "/user/news": "اخبار",
  "/user/settings": "تنظیمات",

  "/user/notifications": "اعلان‌ها",
  "/user/profile": "نمایه",
  "/user/edit-profile": "ویرایش نمایه",
  "/user/my-report/:id": "جزئیات درخواست",
  "/user/poll/:id": "نظرسنجی",
  "/user/password": "تغییر رمز عبور",
  "/user/FAQ": "سوالات متداول",
  "/user/new-complaint": "ثبت شکایت",
  "/user/my-complaints": "شکایات من",
  "/report/finish": "/report/finish",
  "/report/rate": "امتیاز به درخواست",
  "/ratereport/:feedbackId/:token": "/ratereport/:feedbackId/:token",
};

export const allowedExtensions = [
  "jpg",
  "jpeg",
  "jpe",
  "jif",
  "jfif",
  "jfi",
  "png",
  "gif",
  "tiff",
  "tif",
  "svg",
  "svgz",
  "pdf",
  "mkv",
  "mp4",
  "mov",
  "3gp",
  "ogg",
  "docx",
  "doc",
  "pptx",
  "ppt",
  "xlsx",
  "xls",
];

export const MAX_ATTACHMENTS_SIZE = 10000000;

export const responsiveBreakPoint = 680;
