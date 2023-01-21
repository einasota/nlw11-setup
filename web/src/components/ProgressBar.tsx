import * as Progress from "@radix-ui/react-progress";
import clsx from "clsx";

interface ProgressBarProps {
    progress: number
}

export function ProgressBar(props: ProgressBarProps) {
    const percentual = `${props.progress}%`
    const colorPercentual = parseFloat(percentual)

    return (
        <Progress.Root className="h-3 rounded-xl bg-zinc-700 w-full mt-4 overflow-hidden relative">
            <Progress.Indicator
                style={{ width: percentual}}
                className={clsx("h-3 rounded-xl transition-all duration-500", {
                    'bg-zinc-900': colorPercentual === 0,
                'bg-violet-900': colorPercentual > 0 && colorPercentual < 20,
                'bg-violet-800': colorPercentual >= 20 && colorPercentual < 40,
                'bg-violet-700': colorPercentual >= 40 && colorPercentual < 60,
                'bg-violet-600': colorPercentual >= 60 && colorPercentual < 80,
                'bg-violet-500': colorPercentual >= 80 && colorPercentual < 100,
                'bg-violet-400': colorPercentual === 100,
                })}
            />
        </Progress.Root>
    );
}
