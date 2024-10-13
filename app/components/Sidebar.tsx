import { FC } from 'react';
import { Button } from "~/components/ui/button";
import { ArchiveIcon, CodeIcon } from "lucide-react";
import { cn } from '~/lib/utils';

export type Mode = 'code' | 'file';

interface SidebarProps {
	onModeChange: (mode: Mode) => void;
	mode: Mode;
}


export const Sidebar: FC<SidebarProps> = ({ onModeChange, mode }) => {
	return <aside className="w-16 bg-gray-900 text-white p-4">
		<nav>
			<ul>
				<li className="mb-4 flex flex-col gap-2">

					<Button variant="ghost" size="icon" className={cn("hover:bg-gray-700", { 'bg-gray-700': mode === 'file' })} onClick={() => onModeChange('file')}>
						<ArchiveIcon className="h-5 w-5" />
					</Button>
					<Button variant="ghost" size="icon" className={cn("hover:bg-gray-700", { 'bg-gray-700': mode === 'code' })} onClick={() => onModeChange('code')}>
						<CodeIcon className="h-5 w-5" />
					</Button>
				</li>
			</ul>
		</nav>
	</aside>;
};

export default Sidebar;