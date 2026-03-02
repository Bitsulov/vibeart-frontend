import c from "./modal.module.scss";

interface ModalProps {
    isShowChangeLanguage: boolean;
}

export const Modal = ({ isShowChangeLanguage, ...props }: ModalProps) => {
	return (
		<div className={c.modal} hidden={true} {...props}>

		</div>
	)
}
