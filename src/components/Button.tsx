
type Props = {
    children: React.ReactNode;
    disabled?: boolean;
    onClick?: () => void
    className?: string;
}
export default function Button({ children, onClick, className, disabled }: Props) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`w-full p-3 mx-auto text-white transition-colors rounded-sm bg-primary hover:bg-primary/70 disabled:bg-gray-500 disabled:text-slate-gray disabled:cursor-not-allowed  ${className}`}
        >
            {children}
        </button>
    )
}
