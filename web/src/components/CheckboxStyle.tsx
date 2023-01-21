import * as Checkbox from "@radix-ui/react-checkbox";
import { CheckboxProps } from "@radix-ui/react-checkbox";
import { Check } from "phosphor-react";
interface Props extends CheckboxProps{
    title: string
    classes: string
    class2?: string
}

export function CheckboxStyle({title, classes, class2,...rest}:Props) {
    
    
    return (
        <div className={class2}>
            <Checkbox.Root className="flex items-center gap-3 group focus:outline-none disabled:cursor-not-allowed" {...rest}>
                <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-400 transition-colors duration-300 group-focus:ring-2 group-focus:ring-violet-600 group-focus:ring-offset-2 group-focus:ring-offset-background">
                    <Checkbox.Indicator>
                        <Check size={20} className="text-white" />
                    </Checkbox.Indicator>
                </div>
                <span className={classes}>
                    {title}
                </span>
            </Checkbox.Root>
        </div>
    );
}
