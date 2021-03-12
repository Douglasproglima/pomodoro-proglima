import styles from "../styles/components/Input.module.css";

interface InputProps {
	onChange: () => void;
	onClick: () => void;
}

export default function Input({ onChange, onClick }: InputProps) {
	return (
		<div className={styles.input_container}>
			<input
				onChange={onChange}
				type="text"
				placeholder="Digite seu username"
			/>
			<button type="button" onClick={onClick}>
				<img src="/icons/arrow-right.svg" alt="signin" />
			</button>
		</div>
	);
}