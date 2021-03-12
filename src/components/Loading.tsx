import styles from "../styles/components/Loading.module.css";

export default function Loading() {
	return (
		<div className={styles.loading_container}>
			<img src="/Logo.svg" alt="logo" />
		</div>
	);
}