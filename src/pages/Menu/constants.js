import { appRoutes } from "../../utils/variables";

export const menuItems = [
  {
    id: "recent-requests",
    title: "صفحه اصلی",
    icon: () => (
      // <span>
      <i className="fas fa-list"></i>
      // </span>
    ),
    // icon: () => <FontAwesomeIcon icon={"list"} size={"6x"} />,
    to: appRoutes.recentRequests,
  },
  // {
  //   id: "new-complaint",
  //   title: "ثبت شکایت",
  //   icon: () => (
  //     // <span>
  //     <i className="fas fa-folder-plus"></i>
  //     // </span>
  //   ),
  //   // icon: () => <FontAwesomeIcon icon={"plus"} size={"6x"} />,
  //   to: appRoutes.newComplaint,
  // },
  {
    id: "new-request",
    title: "ثبت درخواست",
    icon: () => (
      // <span>
      <i className="fas fa-plus"></i>
      // </span>
    ),
    // icon: () => <FontAwesomeIcon icon={"plus"} size={"6x"} />,
    to: appRoutes.newRequest,
  },
  // {
  //   id: "my-complaints",
  //   title: "شکایات من",
  //   icon: () => (
  //     // <span>
  //     <i className="fas fa-grip-horizontal"></i>
  //     // </span>
  //   ),
  //   // icon: () => <FontAwesomeIcon icon={"th-large"} size={"6x"} />,
  //   to: appRoutes.myComplaints,
  // },
  {
    id: "my-requests",
    title: "درخواست‌های من",
    icon: () => (
      // <span>
      <i className="fas fa-th-large"></i>
      // </span>
    ),
    // icon: () => <FontAwesomeIcon icon={"th-large"} size={"6x"} />,
    to: appRoutes.myRequests,
  },
  {
    id: "polls",
    title: "نظرسنجی‌ها",
    icon: () => (
      // <span>
      <i className="fas fa-chart-bar"></i>
      // </span>
    ),
    // icon: () => <FontAwesomeIcon icon={"chart-bar"} size={"6x"} />,
    to: appRoutes.polls,
  },
  {
    id: "news",
    title: "اخبار",
    icon: () => (
      // <span>
      <i className="fas fa-globe"></i>
      // </span>
    ),
    // icon: () => <FontAwesomeIcon icon={"globe"} size={"6x"} />,
    to: appRoutes.news,
  },
  {
    id: "settings",
    title: "تنظیمات",
    icon: () => (
      // <span>
      <i className="fas fa-cogs"></i>
      // </span>
    ),
    // icon: () => <FontAwesomeIcon icon={"cogs"} size={"6x"} />,
    to: appRoutes.settings,
  },
];
