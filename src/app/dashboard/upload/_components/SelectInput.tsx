interface Field {
	value: string;
	onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

interface Option {
	value: string;
	label: string;
}

interface SelectInputProps {
	field: Field;
	options: Option[];
	disabled?: boolean;
	otherDivision?: string;
}

const SelectInput: React.FC<SelectInputProps> = ({
	field,
	options,
	disabled,
	otherDivision,
}) => {
	return (
		<>
			<div className="w-full">
				<div className="relative w-full">
					<select
						className="w-full p-2 px-3 pr-8 border border-gray-200 text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-blue_3 focus:border-transparent appearance-none bg-white"
						value={field.value}
						onChange={field.onChange}
						disabled={disabled}
					>
						<option value="" disabled>
							Select option
						</option>
						{options.map((option: Option) => {
							const isSoftwareOrHardware =
								option.value === "software" ||
								option.value === "hardware";

							// Disable conflicting options (software/hardware cannot be selected together)
							const isDisabled =
								(isSoftwareOrHardware &&
									otherDivision === "software" &&
									option.value === "hardware") ||
								(isSoftwareOrHardware &&
									otherDivision === "hardware" &&
									option.value === "software") ||
								(otherDivision &&
									otherDivision === option.value);

							return (
								<option
									key={option.value}
									value={option.value}
									disabled={isDisabled || false}
								>
									{option.label}
								</option>
							);
						})}
					</select>
					<div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
						<svg
							className="w-4 h-4 text-gray-500"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 20 20"
							fill="currentColor"
						>
							<path
								fillRule="evenodd"
								d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
								clipRule="evenodd"
							/>
						</svg>
					</div>
				</div>
			</div>
		</>
	);
};

export default SelectInput;
