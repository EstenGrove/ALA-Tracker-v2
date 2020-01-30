import React, { useEffect, useRef } from "react";
import { useOutsideClick } from "../../utils/useOutsideClick";
import styles from "../../css/shared/ModalXSM.module.scss";
import sprite from "../../assets/buttons.svg";

const ModalXSM = ({ title, closeModal, children }) => {
	const modalXSMRef = useRef();
	const { isOutside } = useOutsideClick(modalXSMRef);

	useEffect(() => {
		let isMounted = true;
		if (!isMounted) {
			return;
		}
		if (isOutside) {
			return closeModal();
		}
		return () => {
			isMounted = false;
		};
	}, [isOutside, closeModal]);

	return (
		<aside className={styles.ModalXSM} ref={modalXSMRef}>
			<header className={styles.ModalXSM_header}>
				<h2 className={styles.ModalXSM_header_title}>{title}</h2>
				<svg className={styles.ModalXSM_header_closeIcon} onClick={closeModal}>
					<use xlinkHref={`${sprite}#icon-clearclose`} />
				</svg>
			</header>
			<section className={styles.ModalXSM_main}>{children}</section>
		</aside>
	);
};

export default ModalXSM;
