import React, { FC, useEffect, useRef, useState } from 'react';

interface ToggleOptionWithLabel {
	label: string;
	value: string;
}
interface ToggleOptionWithIcon {
	icon: React.ReactNode;
	value: string;
}

type ToggleOption = ToggleOptionWithLabel | ToggleOptionWithIcon;

interface ToggleProps {
	options: ToggleOption[];
	value: string;
	onChange: (value: string) => void;
	highlightStyles?: React.CSSProperties | ((value: string) => React.CSSProperties);
}

export const Toggle: FC<ToggleProps> = ({
	options,
	value,
	onChange,
	highlightStyles
}) => {
	const activeOptionIndex = options.findIndex(option => option.value === value);
	const optionRefs = useRef<(HTMLDivElement | null)[]>(Array.from<null | HTMLDivElement>({ length: options.length }).fill(null));
	const [computedHighlightStyles, setComputedHighlightStyles] = useState<React.CSSProperties>({});

	useEffect(() => {
		setTimeout(() => {
			let resStyles: React.CSSProperties = {};
			if (typeof highlightStyles === 'function') {
				resStyles = highlightStyles(value);
			} else {
				resStyles = highlightStyles || {};
			}
			const actionOptionRef = optionRefs.current[activeOptionIndex];
			setComputedHighlightStyles({
				...resStyles,
				left: actionOptionRef?.offsetLeft,
				top: actionOptionRef?.offsetTop,
				width: actionOptionRef?.getBoundingClientRect().width,
				height: actionOptionRef?.getBoundingClientRect().height
			});
		});

	}, [highlightStyles, value, activeOptionIndex]);


	return <div className='flex gap-1 relative'>
		<div style={{ ...computedHighlightStyles, position: 'absolute', zIndex:0, transition: 'all 0.2s' }} />
		{options.map((option, index) => {
			return <div
				key={option.value}
				onKeyDown={(e) => {
					if (e.key === 'Enter' || e.key === ' ') {
						optionRefs.current[index]?.click();
					}
				}}
				role='radio'
				aria-checked={option.value === value}
				tabIndex={0}
				ref={(ref) => optionRefs.current[index] = ref}
				onClick={() => {
					onChange(option.value);
				}}
				className="cursor-pointer z-10"
			>
				{(option as ToggleOptionWithIcon).icon ? (option as ToggleOptionWithIcon).icon : (option as ToggleOptionWithLabel).label}
			</div>;
		})}
	</div>;
};

export default Toggle;