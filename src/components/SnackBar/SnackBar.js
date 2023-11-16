import "./styles.css";

class SnackBar {
  constructor() {
    this.isShowing = false;
  }

  static show({
    text = "",
    action,
    duration = 3000,
    backgroundColor = "var(--red)",
  }) {
    const node = document.getElementById("snackbar");
    this.node = node;
    this.initilize();
    this.setSnackBarStyles(backgroundColor);
    node.appendChild(this.createSnackContent(text));
    if (action) node.appendChild(this.createActionButton(action));
    this.handleDuration(duration);
  }

  static initilize() {
    Array.from(this.node.childNodes).forEach((c) => {
      this.node.removeChild(c);
    });
    if (this.interval) {
      clearTimeout(this.interval);
      this.node.classList.remove("show");
    }
  }

  static createSnackContent(text = "") {
    if (typeof text !== "string") throw new Error("text must be a string");
    const elem = document.createElement("span");
    elem.innerText = text;
    elem.className = "snackText";
    return elem;
  }

  static setSnackBarStyles(backgroundColor) {
    this.node.style.backgroundColor = backgroundColor;
    this.node.classList.add("show");
  }

  static handleDuration(duration) {
    if (typeof duration !== "number")
      throw new Error("duration must be a number");
    this.interval = setTimeout(() => {
      this.node.classList.remove("show");
    }, duration);
  }

  static createActionButton(action) {
    if (action === undefined || action === null) return;
    if (typeof action !== "object") throw new Error("action must be an object");
    const btn = document.createElement("button");
    btn.classList.add("snackbar-action");
    btn.onclick = action.onClick;
    btn.innerText = action.text;
    return btn;
  }

  static hide() {
    if (this.node) {
      this.node.classList.remove("show");
    }
  }
}

export default SnackBar;
