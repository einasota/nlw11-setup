import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { api } from "../lib/axios";
import { CheckboxStyle } from "./CheckboxStyle";

interface HabitsListProps {
    date: Date;
    onCompletedChange: (completed: number) => void
}

interface HabitsInfo {
    possibleHabits: Array<{
        id: string;
        title: string;
        created_at: string;
    }>;
    completedHabits: string[];
}

export function HabitsList({ date, onCompletedChange }: HabitsListProps) {
    const [habitsInfo, setHabitsInfo] = useState<HabitsInfo>();

    useEffect(() => {
        api.get("day", {
            params: {
                date: date.toISOString(),
            },
        }).then((response) => {
            setHabitsInfo(response.data);
        });
    }, []);

    async function handleToggleHabit (habitId: string){
        const isHabitAlreadyCompleted = habitsInfo!.completedHabits.includes(habitId)
        await api.patch(`/habits/${habitId}/toggle`)
        let completedHabits: string[] = []
        if(isHabitAlreadyCompleted) {
            completedHabits = habitsInfo!.completedHabits.filter(id => id !== habitId)

        } else {
            completedHabits = [...habitsInfo!.completedHabits, habitId]
        }
        setHabitsInfo({
            possibleHabits: habitsInfo!.possibleHabits,
            completedHabits,
        })
        onCompletedChange(completedHabits.length)
    }


    const isDateInPast = dayjs(date).endOf("day").isBefore(new Date());


    return (
        <div>
            {habitsInfo?.possibleHabits.map((habit) => {
                return (
                    <CheckboxStyle
                        key={habit.id}
                        title={habit.title}
                        disabled={isDateInPast}
                        onCheckedChange={() => handleToggleHabit(habit.id)}
                        checked={habitsInfo.completedHabits.includes(habit.id)}
                        classes="font-semibold text-xl text-white leading-tight group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400"
                        class2="mt-6 flex flex-col gap-3"
                    />
                );
            })}
        </div>
    );
}
