type Props = {
    checked: boolean;
    value: string;
    onSelect: () => void;

}
export default function SelectableCheckboxList({ checked, onSelect, value }: Props) {
    return (
        <label
            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition rounded-lg cursor-pointer text-grey hover:bg-active ${checked && "bg-active !text-white border border-primary"}`}
        >
            <input
                className="hidden w-full peer"
                type="checkbox"
                value={value}
                onChange={onSelect}
            />
            <span className={`flex items-center justify-center w-5 h-5 transition border-2 rounded-full cursor-pointer ${checked && "bg-primary border-primary"}`}>
            </span>
            {value}
        </label>
    )
}
