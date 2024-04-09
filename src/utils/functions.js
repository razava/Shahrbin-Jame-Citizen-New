import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faBell,
  far,
  faStar,
  faUser,
} from "@fortawesome/free-regular-svg-icons";
import { toast } from "react-toastify";
import {
  allowedExtensions,
  API_URL,
  appConstants,
  APP_URL,
  errorMessages,
  MAX_ATTACHMENTS_SIZE,
} from "./variables";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import jalaliday from "jalaliday";
import {
  faAngleDown,
  faAngleLeft,
  faChartSimple,
  faCheck,
  faClipboardCheck,
  faDiceD20,
  faEllipsis,
  faFileSignature,
  faGear,
  faGripVertical,
  faList,
  faLocationDot,
  faPlus,
  faSync,
  faFileLines,
  faCity,
  faArrowRight,
  faArrowLeft,
  faLongArrowLeft,
  faLongArrowRight,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import placeholder from "../assets/images/defaultPh.png";
import word from "../assets/images/word.png";
import excel from "../assets/images/excel.png";
import pdf from "../assets/images/pdf.png";
import powerpoint from "../assets/images/powerpoint.png";

dayjs.extend(jalaliday);
dayjs.extend(utc);

// utility class for classNames
export const cn = (...arg) => [...arg].join(" ");

export class CN {
  // joins given classNames into one string
  static join(...args) {
    return [...args].join(" ");
  }
}

// utility class for localstorage
export class LS {
  // reads data from localstorage based on the given key
  static read(key) {
    if (!window) return;
    return JSON.parse(localStorage.getItem(key)) || null;
  }

  // saves data into localstorage based on the given key and value
  static save(key, value) {
    if (!window) return;
    localStorage.setItem(key, JSON.stringify(value));
  }

  // removes data from localstorage based on the given key
  static remove(key, value) {
    if (!window) return;
    localStorage.removeItem(key);
  }
}

// utility class for authentcation
export class AUTHENTICATOR {
  // checks if the authentication token is expired
  static isTokenExpired() {
    const expirationDate = LS.read(appConstants.SH_CT_EXPIRATION);
    return new Date().getTime() > new Date(expirationDate).getTime();
  }
}

// utility class for uris
export class URI {
  // add given queries to the given uri
  static addQueryParam(url, queries = {}) {
    const myUrl = new URL(url);
    const {
      pageSize,
      pageNumber,
      token,
      rating,
      latitude,
      longitude,
      reportId,
      isLiked,
    } = queries;
    if (pageSize !== undefined) myUrl.searchParams.append("PageSize", pageSize);
    if (pageNumber !== undefined)
      myUrl.searchParams.append("PageNumber", pageNumber);
    if (rating !== undefined) myUrl.searchParams.append("Rating", rating);
    if (token !== undefined) myUrl.searchParams.append("Token", token);
    if (latitude !== undefined) myUrl.searchParams.append("latitude", latitude);
    if (longitude !== undefined)
      myUrl.searchParams.append("longitude", longitude);
    if (reportId !== undefined) myUrl.searchParams.append("reportId", reportId);
    if (isLiked !== undefined) myUrl.searchParams.append("isLiked", isLiked);

    return myUrl;
  }

  static create(path) {
    return new URL(`${APP_URL}/${path}`);
  }

  static createMediaUri(path) {
    return new URL(`${API_URL}/${path}`);
  }

  static download(path) {
    const url = this.createMediaUri(path);
    const link = document.createElement("a");
    link.href = url;
    link.download = path;
    link.setAttribute("target", "_blank");
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  static open(url) {
    const link = document.createElement("a");
    link.target = "blank";
    link.href = url;
    link.click();
  }

  static getExtension(path) {
    return String(path).split(".")[String(path).split(".").length - 1];
  }

  static isImage(path) {
    return [
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
      "webp",
    ].some((ext) => ext === this.getExtension(path).toLowerCase());
  }
}

// utility class for user
export class USER {
  // clears user related data from localstorage
  static clear() {
    LS.remove(appConstants.SH_CT_ACCESS_TOKEN);
    LS.remove(appConstants.SH_CT_REFRESH_TOKEN);
    LS.remove(appConstants.SH_CT_CURRENT_TIME);
    LS.remove(appConstants.SH_CT_EXPIRATION);
    LS.remove(appConstants.SH_CT_USER_ROLES);
    LS.remove(appConstants.SH_CT_LOGIN_URL);
  }
}

// utility class for errors
export class ERROR {
  // shows appropriate error message based on response status
  static show(response) {
    const snackOptions = {
      backgroundColor: "var(--red)",
      duration: 5000,
    };
    console.log(response);
    // Error 500
    if (!response || String(response.status).startsWith("5")) {
      toast(response?.data?.detail || errorMessages[500], {
        type: "error",
      });
      // SnackBar.show({
      //   text: response?.data?.message || errorMessages[500],
      //   ...snackOptions,
      // });
      return;
    }

    console.log("failed status: ", response.status);
    if (response && response.status === 480) {
      toast(errorMessages[480], { type: "error" });
      // SnackBar.show({
      //   text: errorMessages[480],
      //   ...snackOptions,
      // });
      return;
    }

    if (response && response.status === 428) {
      toast(response?.data?.detail, { type: "success" });
      // SnackBar.show({
      //   text: response?.data?.message,
      //   ...snackOptions,
      // });
      return;
    }

    // Bad Requests
    toast(response?.data?.detail ? response.data.message : errorMessages[400], {
      type: "error",
    });
    // SnackBar.show({
    //   text: response?.data?.message
    //     ? response.data.message
    //     : errorMessages[400],
    //   ...snackOptions,
    // });
    return;
  }

  static getValidationError(error = {}) {
    if (error["required"]) return "* فیلد اجباری *";
    else if (error["password"])
      return "رمز عبور باید شامل 6 کاراکتر و حداقل یک عدد باشد.";
    else if (error["passwordMatch"])
      return "رمز عبور و تکرار آن مطابقت ندارند.";
    else if (error["nationalId"]) return "کدملی معتبر نمی باشد.";
  }

  static extension() {
    toast("پسوند فایل انتخابی مجاز نمی‌باشد.", { type: "error" });
  }

  static size() {
    toast("حداکثر حجم مجاز پیوست‌ها 10 مگابایت می‌باشد.", { type: "error" });
  }
}

// utility class for icons
export class ICONS {
  // loads necessary font awesome icons
  static load() {
    library.add(
      far,
      faStar,
      faSync,
      faAngleLeft,
      faCheck,
      faEllipsis,
      faBell,
      faUser,
      faPlus,
      faGripVertical,
      faList,
      faChartSimple,
      faDiceD20,
      faGear,
      faAngleDown,
      faFileLines,
      faLocationDot,
      faFileSignature,
      faClipboardCheck,
      faCity,
      faLongArrowLeft,
      faLongArrowRight,
      faInfoCircle
    );
  }
}

// utility class for dates
export class DNT {
  constructor() {}
  static toJalaliString(dateString, format = "DD MMMM YYYY ساعت HH:mm") {
    if (!dateString) return "---";
    return dayjs
      .utc(dateString)
      .local()
      .calendar("jalali")
      .locale("fa")
      .format(format);
  }
  static toJalaliString2(dateString, format = "DD MMMM YYYY") {
    if (!dateString) return "---";
    return dayjs
      .utc(dateString)
      .local()
      .calendar("jalali")
      .locale("fa")
      .format(format);
  }

  static hoursToDays(hours) {
    return Math.floor(hours / 24);
  }

  static toGregorian(date) {
    if (!date) return "---";
    return dayjs(date, { jalali: true }).format("YYYY/MM/DD");
  }

  static toJson(date, calendar = "gregorian") {
    if (!date) return {};
    try {
      if (calendar === "gregorian") {
        const dateObj = new Date(date);
        return {
          year: dateObj.getFullYear(),
          month: dateObj.getMonth() + 1,
          day: dateObj.getDay(),
        };
      } else if (calendar === "jalali") {
        const [year, month, day] = this.toJalaliString(
          date,
          "YYYY/MM/DD"
        ).split("/");
        return {
          year,
          month,
          day,
        };
      }
    } catch (err) {
      return {};
    }
  }

  static toDate(obj) {
    if (!obj) return "---";
    try {
      const date = new Date(obj.year, obj.month - 1, obj.day);
      return date;
    } catch (err) {
      return "---";
    }
  }
}

// utility class for validation
export class Validation {
  static run(validators = []) {
    let errors = {};
    validators.forEach((validator) => {
      if (validator.name === "required") {
        Object.entries(validator.payload).forEach(([key, value]) => {
          errors[key] = {
            ...errors[key],
            [validator.name]: this.isEmpty(value),
          };
        });
      }
      if (validator.name === "password") {
        Object.entries(validator.payload).forEach(([key, value]) => {
          errors[key] = {
            ...errors[key],
            [validator.name]: !this.isPasswordCorrect(value),
          };
        });
      }
      if (validator.name === "passwordMatch") {
        Object.entries(validator.payload).forEach(([key, value]) => {
          errors[key] = {
            ...errors[key],
            [validator.name]:
              String(validator.payload[validator.matchTo]).trim() !==
              String(value).trim(),
          };
        });
      }
      if (validator.name === "nationalId") {
        Object.entries(validator.payload).forEach(([key, value]) => {
          errors[key] = {
            ...errors[key],
            [validator.name]: !this.isNationalCode(value),
          };
        });
      }
    });
    console.log(errors);
    return { errors, isValid: this.isValid(errors) };
  }

  static isEmpty(value) {
    return value === "" || value === null || value === undefined;
  }

  static isPasswordCorrect(value) {
    console.log(value);
    return new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&^_-]{6,}$/).test(
      value
    );
  }

  static isNationalCode(value) {
    if (!/^\d{10}$/.test(value)) return false;
    const check = +value[9];
    const sum =
      value
        .split("")
        .slice(0, 9)
        .reduce((acc, x, i) => acc + +x * (10 - i), 0) % 11;
    return sum < 2 ? check === sum : check + sum === 11;
  }

  static isValid(errors = {}) {
    let isValid = true;
    Object.entries(errors).forEach(([, errorValue]) => {
      Object.entries(errorValue).forEach(([, validatorValue]) => {
        if (validatorValue === true) isValid = false;
      });
    });
    return isValid;
  }
}

// utility class for strings
export class STR {
  static removeTags(str = "") {
    return str.replace(/(<([^>])+>)/gi, "").replace(/&nbsp;/gi, "");
  }

  static parseHtml(str) {
    const div = document.createElement("div");
    div.innerHTML = str;
    const images = div.getElementsByTagName("img");
    if (images.length > 0) {
      Array.from(images).forEach((image) => {
        let imageSrc = image.getAttribute("src");
        image.src = URI.createMediaUri(imageSrc);
      });
    }
    return div.innerHTML;
  }
}

// utility class for data structures
export class DS {
  static toFormData(obj, fm) {
    const formData = fm || new FormData();
    Object.entries(obj).forEach(([k, v]) => {
      if (Array.isArray(v)) {
        if (v.length > 1) {
          v.forEach((sv, i) => formData.append(`${k}[${i}]`, sv));
        } else if (v.length === 1) formData.append(k, v[0]);
      } else if (typeof v === "object" && v !== null && !v instanceof File) {
        this.toFormData(v);
      } else formData.append(k, v);
    });
    return formData;
  }

  static tousandSeprate(num) {
    if (num < 1) return num;
    const formatted = ("" + num).split(".");
    const integer = formatted[0].replace(
      /(\d)(?=(?:\d{3})+(?:\.|$))|(\.\d\d?)\d*$/g,
      function (m, s1, s2) {
        return s2 || s1 + ",";
      }
    );
    const float = formatted[1] ? "." + formatted[1] : "";
    return integer + float;
  }
}

// utility class for file system
export class FS {
  static getPlaceHolder(path) {
    const ext = URI.getExtension(path);
    switch (ext) {
      case "doc":
        return word;
      case "docx":
        return word;
      case "xls":
        return excel;
      case "xlsx":
        return excel;
      case "xlsm":
        return excel;
      case "ppt":
        return powerpoint;
      case "pptx":
        return powerpoint;
      case "pdf":
        return pdf;
      default:
        return placeholder;
    }
  }

  static checkExtension(path) {
    const extension = URI.getExtension(path);
    return allowedExtensions.indexOf(extension.toLowerCase()) !== -1;
  }

  static checkOverlAllSize(attachments) {
    const overallSize = attachments.reduce((t, a) => t + a.size, 0);
    if (overallSize > MAX_ATTACHMENTS_SIZE) {
      return false;
    } else return true;
  }
}

export const isImage = (path) =>
  [
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
  ].some((ext) => ext === getExtension(path).toLowerCase());

export const checkOverlAllSize = (attachments, MAX_SIZE) => {
  const overallSize = attachments.reduce((t, a) => t + a.size, 0);
  console.log(overallSize, MAX_SIZE);
  if (overallSize > MAX_SIZE) {
    return false;
  } else return true;
};

export const showSizeError = (maxSize) => {
  toast(`حجم پیوست‌ها نمی‌تواند از ${maxSize} مگابایت بیشت باشد.`, {
    type: "error",
  });
};

export const getExtension = (path) =>
  String(path).split(".")[String(path).split(".").length - 1];

export const checkExtension = (path, allowedExtensions = []) => {
  const extension = getExtension(path);
  return allowedExtensions.indexOf(extension.toLowerCase()) !== -1;
};

export const showExtensionError = () => {
  toast("فرمت فایل انتخابی مجاز نیست.", { type: "error" });
};

export function findNodeAndParents(tree, target, path = []) {
  for (const node of tree) {
    // Check if the current node matches the target
    if (node.id === target) {
      // Return both the node and its parents
      return [...path, node];
    }

    // If the current node has children, recursively search them
    if (node.categories && node.categories.length > 0) {
      const result = findNodeAndParents(node.categories, target, [
        ...path,
        node,
      ]);
      // If the target is found in the subtree, return the result
      if (result) {
        return result;
      }
    }
  }
  // If target is not found, return null
  return null;
}

export const convertserverTimeToDateString = (
  dateString,
  format = "DD MMMM YYYY ساعت HH:mm"
) => {
  if (!dateString) return "---";
  return dayjs
    .utc(dateString)
    .local()
    .calendar("jalali")
    .locale("fa")
    .format(format);
};
