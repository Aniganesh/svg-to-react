import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { FC, useState } from 'react';
import { TemplateOptions } from '~/script';
import { DeepPartial } from '~/util-types';
import { Input } from './ui/input';
import { Toggle } from './ui/toggle';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Button } from './ui/button';
import { ChevronDown, ChevronUp, Plus, X } from 'lucide-react';

interface TemplateCustomizerProps {
	conversionOptions: DeepPartial<TemplateOptions>;
	setConversionOptions: (value: DeepPartial<TemplateOptions>) => void;
}

export const TemplateCustomizer: FC<TemplateCustomizerProps> = ({
	conversionOptions,
	setConversionOptions,
}) => {
	const [isReplacersExpanded, setIsReplacersExpanded] = useState(false);

	const toggleReplacersSection = () => {
		setIsReplacersExpanded(!isReplacersExpanded);
	};

	const hasReplacers = !!conversionOptions.replaceValues?.length;

	return <div className="flex items-center justify-start gap-4 mb-4 flex-wrap">
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

		<Switch
			id="default-export"
			checked={conversionOptions.addDefaultExport}
			onCheckedChange={(checked: boolean) => {
				setConversionOptions(({ ...conversionOptions, addDefaultExport: checked }));
			}}
		/>
		<Label htmlFor="default-export" className="text-sm text-gray-300">Default Export</Label>
		<Switch
			id="rn-svg"
			checked={conversionOptions.reactNative}
			onCheckedChange={(checked: boolean) => {
				setConversionOptions(({ ...conversionOptions, reactNative: checked }));
			}}
		/>
		<Label htmlFor="rn-svg" className="text-sm text-gray-300">React native</Label>
		<Select
			value={conversionOptions.spreadProps}
			onValueChange={(value) => {
				setConversionOptions({ ...conversionOptions, spreadProps: value as TemplateOptions['spreadProps'] });
			}}
		>
			<SelectTrigger className="w-32">
				<SelectValue placeholder="Spread Props" />
			</SelectTrigger>
			<SelectContent className="flex-1">
				<SelectItem value="none">None</SelectItem>
				<SelectItem value="start">Start</SelectItem>
				<SelectItem value="end">End</SelectItem>
			</SelectContent>
		</Select>
		<Input
			type="text"
			placeholder="Extend interface"
			value={conversionOptions.interfaceExtend?.name || ''}
			className="flex-1"
			onChange={(e) => {
				const name = e.target.value;
				setConversionOptions(({
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
				setConversionOptions(({
					...conversionOptions,
					interfaceExtend: { ...conversionOptions.interfaceExtend, from }
				}));
			}}
		/>

		{isReplacersExpanded ? (
			<>
				{conversionOptions.replaceValues?.map((value, index) => {
					return <div key={index} className="flex items-center gap-2">
						<Button onClick={() => {
							setConversionOptions(({
								...conversionOptions, replaceValues: conversionOptions.replaceValues?.filter((v, i) => i !== index)
							}));
						}} >
							<X className="w-4 h-4" />
						</Button>
						<div className='flex items-center gap-2'>
							<Input
								type="text"
								placeholder="Old value"
								value={value?.oldValue}
								className="flex-1"
								onChange={(e) => {
									const oldValue = e.target.value;
									setConversionOptions(({
										...conversionOptions,
										replaceValues: conversionOptions.replaceValues?.map((v, i) => {
											if (i === index) {
												return {
													...v,
													oldValue,
												};
											}
											return v;
										})
									}));
								}}
							/>	<Input
								type="text"
								placeholder="New value"
								value={value?.newValue}
								className="flex-1"
								onChange={(e) => {
									const newValue = e.target.value;
									setConversionOptions(({
										...conversionOptions,
										replaceValues: conversionOptions.replaceValues?.map((v, i) => {
											if (i === index) {
												return {
													...v,
													newValue,
												};
											}
											return v;
										})
									}));
								}}
							/>
						</div>
						<div className='flex items-center gap-2'>
							<Switch
								id={`replace-values-add-to-interface-${index}`}
								checked={value?.addToInterface}
								onCheckedChange={(checked: boolean) => {
									setConversionOptions(({
										...conversionOptions,
										replaceValues: conversionOptions.replaceValues?.map((v, i) => {
											if (i === index) {
												return {
													...v,
													addToInterface: checked,
												};
											}
											return v;
										})
									}));
								}}
							/>
							<Label htmlFor={`replace-values-add-to-interface-${index}`} className="text-sm text-gray-300">Add to interface</Label>
							<Switch
								id={`replace-values-destructure-from-props-${index}`}
								checked={value?.destructureFromProps}
								onCheckedChange={(checked: boolean) => {
									setConversionOptions(({
										...conversionOptions,
										replaceValues: conversionOptions.replaceValues?.map((v, i) => {
											if (i === index) {
												return {
													...v,
													destructureFromProps: checked,
												};
											}
											return v;
										})
									}));
								}} />
							<Label htmlFor={`replace-values-destructure-from-props-${index}`} className="text-sm text-gray-300">Destructure from props</Label>
						</div>

					</div>;
				})}

				<Button onClick={() => {
					setConversionOptions(({
						...conversionOptions, replaceValues: !conversionOptions.replaceValues?.length ? [{
							oldValue: "",
							newValue: "",
							addToInterface: false,
							destructureFromProps: false,
						}]
							: [...conversionOptions.replaceValues ?? [], {
								oldValue: "",
								newValue: "",
								addToInterface: false,
								destructureFromProps: false,
							}]
					}));
				}}>
					<Plus className="w-4 h-4" />
				</Button>

				{hasReplacers && <Button onClick={toggleReplacersSection}>
					<ChevronUp className="w-4 h-4" />
				</Button>}
			</>
		) : (
			<>
				<Button onClick={() => {
					setConversionOptions(({
						...conversionOptions, replaceValues: [{
							oldValue: "",
							newValue: "",
							addToInterface: false,
							destructureFromProps: false,
						}]
					}));
					setIsReplacersExpanded(true);
				}}>
					<Plus className="w-4 h-4" />
				</Button>

				{hasReplacers && (
					<Button onClick={toggleReplacersSection}>
						<ChevronDown className="w-4 h-4" />
					</Button>
				)}
			</>
		)}

	</div>;
};

export default TemplateCustomizer;


const TsIcon = () => <div className="size-8 flex items-end justify-end pr-1 text-xl text-right text-white rounded-sm">Ts</div>;
const JsIcon = () => <div className="size-8 flex items-end justify-end pr-1 text-xl text-right text-white rounded-sm">Js</div>;
