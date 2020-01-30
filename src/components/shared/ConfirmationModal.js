import React from "react";
import { PropTypes } from "prop-types";
import { themeColors } from "../../helpers/utils_styles";
import styles from "../../css/shared/ConfirmationModal.module.scss";
import sprite from "../../assets/buttons.svg";
import sprite2 from "../../assets/tasks.svg";
import ModalXSM from "./ModalXSM";
import ButtonSM from "./ButtonSM";

const confirmBtn = {
	backgroundColor: themeColors.main.red,
	cursor: "pointer"
};
const cancelBtn = {
	backgroundColor: themeColors.blueGreys.subheadings,
	cursor: "pointer"
};

// from tasks.svg
const ICONS = {
	save: "save11",
	delete: "delete",
	edit: "createmode_editedit",
	print: "print1",
	add: "plus21",
	subtract: "minus21",
	images: "images",
	image: "image11"
};

const ConfirmationModal = ({
	title = "Confirm Action",
	msg,
	confirmText = "Yes",
	cancelText = "No, cancel",
	handleConfirmation,
	closeModal,
	icon = "save",
	children
}) => {
	return (
		<ModalXSM title={title} closeModal={closeModal}>
			<section className={styles.ConfirmationModal_msg}>
				<div className={styles.ConfirmationModal_msg}>{msg}</div>
			</section>
			{children && (
				<section className={styles.ConfirmationModal_children}>
					{children}
				</section>
			)}
			<section className={styles.ConfirmationModal_actions}>
				<ButtonSM customStyles={confirmBtn} handleClick={handleConfirmation}>
					<svg className={styles.ConfirmationModal_actions_icon}>
						<use xlinkHref={`${sprite2}#icon-${ICONS[icon]}`} />
					</svg>
					<span>{confirmText}</span>
				</ButtonSM>
				<ButtonSM customStyles={cancelBtn} handleClick={closeModal}>
					<svg className={styles.ConfirmationModal_actions_icon}>
						<use xlinkHref={`${sprite}#icon-clearclose`} />
					</svg>
					<span>{cancelText}</span>
				</ButtonSM>
			</section>
		</ModalXSM>
	);
};

export default ConfirmationModal;

ConfirmationModal.defaultProps = {
	title: "Confirm Action",
	confirmText: "Yes",
	cancelText: "No, cancel",
	icon: "save"
};

ConfirmationModal.propTypes = {
	title: PropTypes.string, // modal title bar heading
	msg: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.object,
		PropTypes.array
	]), // modal main message (ie action message)
	confirmText: PropTypes.string, // confirm btn text
	cancelText: PropTypes.string, // cancel btn text
	icon: PropTypes.string, // confirm btn icon
	handleConfirmation: PropTypes.func.isRequired, // confirm btn onClick handler
	closeModal: PropTypes.func.isRequired, // close modal handler
	children: PropTypes.any
};
