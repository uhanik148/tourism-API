import Sidebar from "@/components/fragments/Sidebar";
import styles from "./MemberLayout.module.scss";

type Propstypes = {
  children: React.ReactNode;
};

const listsSidebarItem = [
  {
    title: "Dashboard",
    url: "/member",
    icon: "bxs-dashboard",
  },
  {
    title: "Orders",
    url: "/member/order",
    icon: "bxs-cart-alt",
  },
  {
    title: "Profile",
    url: "/member/profile",
    icon: "bxs-user",
  },
];
const MemberLayout = (props: Propstypes) => {
  const { children } = props;
  return (
    <div className={styles.member}>
      <Sidebar lists={listsSidebarItem} />
      <div className={styles.member__main}>{children}</div>
    </div>
  );
};

export default MemberLayout;
