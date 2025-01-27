import { useFormContext } from 'react-hook-form'
type Props = {
    name: string;
    // react hookform rules that they are objects
    rules: Record<string, unknown>;
    // props items that they are partial
    placeholder?: string;
    isDiv?: boolean;
    type?: string;
    value?: string;
    className?: string
    onClick?: () => void;

}
export default function Input({ name, rules, isDiv, ...props }: Props) {
    const { register, formState: { errors } } = useFormContext()
    return (
        <div>
            {
                //  define as div for show div like input but for open modals to get the value 
                isDiv ?
                    <div className='text-right cursor-pointer input-style'
                        {...register(name, rules)}
                        {...props}
                    >
                        {props.value}
                    </div>
                    :
                    <input
                        className={`input-style placeholder:text-17 placeholder:text-slate-gray focus:outline-none ${props.className}`}
                        {...register(name, rules)}
                        {...props}
                        type={props.type || "text"}
                    />
            }
            {
                errors[name] &&
                <p className="h-4 mt-1 text-sm font-semibold text-primary">
                    {errors[name]?.message?.toString()}
                </p>
            }

        </div>)
}
