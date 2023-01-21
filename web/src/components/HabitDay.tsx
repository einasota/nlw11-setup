import * as Popover from "@radix-ui/react-popover";
import { ProgressBar } from "./ProgressBar";
import clsx from "clsx";
import { CheckboxStyle } from "./CheckboxStyle";
import dayjs from "dayjs";
import { HabitsList } from "./HabitsList";
import { useState } from "react";

interface HabitProps {
    date: Date;
    defaultCompleted?: number;
    amount?: number;
}

export function HabitDay({ defaultCompleted = 0, amount = 0, date }: HabitProps) {
    const [completed, setCompleted] = useState(defaultCompleted)
    
    const completedPercent = amount > 0 ? Math.round((completed / amount) * 100) : 0

    const dayAndMonth = dayjs(date).format('DD/MM')
    const dayOfWeek = dayjs(date).format('dddd')

    function handleCompletedChanged(completed:number) {
        setCompleted(completed)
    }

    return (
        <Popover.Root>
            <Popover.Trigger
                className={clsx("w-10 h-10 rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 focus:ring-offset-background", {
                    "bg-zinc-900 border-zinc-800": completedPercent === 0,
                    "bg-violet-900 border-violet-700":
                        completedPercent > 0 && completedPercent < 20,
                    "bg-violet-800 border-violet-600":
                        completedPercent >= 20 && completedPercent < 40,
                    "bg-violet-700 border-violet-500":
                        completedPercent >= 40 && completedPercent < 60,
                    "bg-violet-600 border-violet-500":
                        completedPercent >= 60 && completedPercent < 80,
                    "bg-violet-500 border-violet-400":
                        completedPercent >= 80 && completedPercent < 100,
                    "bg-violet-400 border-violet-300": completedPercent === 100,
                })}
            />
            <Popover.Portal>
                <Popover.Content className="min-w-[320px] p-6 rounded-2xl bg-zinc-900 flex flex-col">
                    <span className="font-semibold text-zinc-400">
                        {dayOfWeek}
                    </span>
                    <span className="mt-1 font-extrabold leading-tight text-3xl">
                        {dayAndMonth}
                    </span>

                    <ProgressBar progress={completedPercent} />

                    <HabitsList date={date} onCompletedChange={handleCompletedChanged} />
                    <Popover.Arrow
                        height={8}
                        width={16}
                        className="fill-zinc-900"
                    />
                </Popover.Content>
            </Popover.Portal>
        </Popover.Root>
    );
}
