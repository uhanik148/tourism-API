import AdminLayout from "@/components/layouts/AdminLayout";
import styles from "./Products.module.scss";

const ProductAdminView = () => {
  return (
    <AdminLayout>
      <div className={styles.products}>
        <h1>Products</h1>
      </div>
    </AdminLayout>
  );
};

export default ProductAdminView;
