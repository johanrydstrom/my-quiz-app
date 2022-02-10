import styles from "./Input.module.css";
interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const Input = (props: Props) => {
  return (
    <label className="form-label">
      {props.label}
      <input {...props} className={styles.input} />
    </label>
  );
};
