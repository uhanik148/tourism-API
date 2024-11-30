import styles from "./Select.module.scss";
type OptionsTypes = {
  label: string;
  value: string;
};
type Propstypes = {
  label?: string;
  name: string;
  defaultValue?: string;
  disabled?: boolean;
  options: OptionsTypes[];
};
const Select = (props: Propstypes) => {
  const { label, name, defaultValue, disabled, options } = props;
  return (
    <div className={styles.container}>
      <label htmlFor={name}>{label}</label>
      <select
        name={name}
        id={name}
        defaultValue={defaultValue}
        disabled={disabled}
        className={styles.container__select}
      >
        {options.map((option) => (
          <option key={option.label} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
export default Select;
