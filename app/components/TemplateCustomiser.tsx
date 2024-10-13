import { Label } from './ui/label';
import { Switch } from './ui/switch';
import React, { FC } from 'react';
import { TemplateOptions } from '~/script';
import { DeepPartial } from '~/util-types';
import { Input } from './ui/input';
import { Toggle } from './ui/toggle';

interface TemplateCustomizerProps {
	conversionOptions: DeepPartial<TemplateOptions>;
	setConversionOptions: (value: DeepPartial<TemplateOptions>) => void;
	componentNameRef: React.MutableRefObject<string>;
	handleComponentNameChange: (value: string) => void;
}

export const TemplateCustomizer: FC<TemplateCustomizerProps> = ({
	conversionOptions,
	setConversionOptions,
	componentNameRef,
	handleComponentNameChange,
}) => {
	return <div className="flex items-center space-x-4 mb-4">
		<input
			type="text"
			defaultValue={componentNameRef.current}
			className="flex-grow p-2 text-white outline-none bg-transparent border-b border-transparent focus:border-white flex-1"
			onChange={(e) => {
				handleComponentNameChange(e.target.value);
			}}
			placeholder="Enter component name"
		/>
		<div className="flex items-center space-x-4 flex-1">
			<Toggle
				highlightStyles={(value) => ({
					backgroundColor: value === "ts" ? "#3178c6" :
						"#989821",
					borderRadius: 2,
				})}
				options={[
					{ icon: <TsIcon />, value: "ts" },
					{ icon: <JsIcon />, value: "js" },
				]}
				value={conversionOptions.language ?? ''}
				onChange={(value) => {
					setConversionOptions(({ ...conversionOptions, language: value as TemplateOptions["language"] }));
				}} />
			<div className="flex items-center space-x-2">
				<Switch
					id="default-export"
					checked={conversionOptions.addDefaultExport}
					onCheckedChange={(checked: boolean) => {
						setConversionOptions(({ ...conversionOptions, addDefaultExport: checked }));
					}}
				/>
				<Label htmlFor="default-export" className="text-sm text-gray-300">Default Export</Label>
			</div>
			<div className="flex items-center space-x-2">
				<Input
					type="text"
					placeholder="Extend interface"
					value={conversionOptions.interfaceExtend?.name || ''}
					className="flex-1"
					onChange={(e) => {
						const name = e.target.value;
						setConversionOptions( ({
							...conversionOptions,
							interfaceExtend: name ? { ...conversionOptions.interfaceExtend, name } : undefined
						}));
					}}
				/>
				<Input
					type="text"
					placeholder="Import extending interface from"
					className="flex-1"
					value={conversionOptions.interfaceExtend?.from || ''}
					onChange={(e) => {
						const from = e.target.value;
						setConversionOptions( ({
							...conversionOptions,
							interfaceExtend: { ...conversionOptions.interfaceExtend, from }
						}));
					}}
				/>
			</div>
		</div>
	</div>;
};

export default TemplateCustomizer;


const TsIcon = () => <div className="size-8 flex items-end justify-end pr-1 text-xl text-right text-white rounded-sm">Ts</div>;
const JsIcon = () => <div className="size-8 flex items-end justify-end pr-1 text-xl text-right text-white rounded-sm">Js</div>;
