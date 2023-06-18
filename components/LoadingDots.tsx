import styles from '../styles/loading-dots.module.css';

interface IProps {
	color: string;
	style: string;
}

const LoadingDots = ({ color = '#000', style = 'small' }: IProps) => {
	return (
		<span className={style == 'small' ? styles.loading2 : styles.loading}>
			<span style={{ backgroundColor: color }} />
			<span style={{ backgroundColor: color }} />
			<span style={{ backgroundColor: color }} />
		</span>
	);
};

export default LoadingDots;

LoadingDots.defaultProps = {
	style: 'small',
};
