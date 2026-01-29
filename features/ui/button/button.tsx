import classNames from "classnames";
import { ButtonHTMLAttributes } from "react";
import styles from "./button.module.scss";

export function Button(props: ButtonHTMLAttributes<HTMLButtonElement>) {
	return (
		<button {...props} className={classNames(styles.button, props.className)} />
	);
}
