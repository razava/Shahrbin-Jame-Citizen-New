import React from "react";
import Button from "../Button/Button";
import styles from "./styles.module.css";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
    this.reset = this.reset.bind(this);
  }

  static getDerivedStateFromError(error) {
    console.log(error);
    return { hasError: true };
  }

  reset() {
    window.location.reload();
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className={styles.errorBoundaryWrapper}>
          <p className={styles.errorBoundaryMessage}>
            بارگذاری با مشکل رو به رو شد. لطفا دوباره امتحان کنید.
          </p>
          <Button className={styles.errorBoundaryButton} onClick={this.reset}>
            بارگذاری مجدد
          </Button>
        </div>
      );
    }

    return !this.state.hasError && this.props.children;
  }
}

export default ErrorBoundary;
