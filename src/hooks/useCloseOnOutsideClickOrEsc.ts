import { RefObject, useEffect } from "react";

export const useCloseOnOutsideClickOrEsc = (
    ref: RefObject<HTMLElement>,
    isOpen: boolean,
    onClose: () => void
) => {
    useEffect(() => {
        if (!isOpen) return;

        const handleOutsideClick = (event:MouseEvent) => {
			if (ref.current && !ref.current.contains(event.target as Node)) {
				onClose();
			}
		};

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				onClose();
			}
		};

		document.addEventListener('mousedown', handleOutsideClick)
		document.addEventListener('keydown', handleKeyDown)

		return () => {
			document.removeEventListener('mousedown', handleOutsideClick)
			document.removeEventListener('keydown', handleKeyDown)
		};
    }, [isOpen, onClose, ref])
};