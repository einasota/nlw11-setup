import { Check } from "phosphor-react";
import { FormEvent, useState } from "react";
import { api } from "../lib/axios";
import { CheckboxStyle } from "./CheckboxStyle";

const availableWeekDays = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado']

export function NewHabitForm() {
    const [title, setTitle] = useState('')
    const [weekDays, setWeekDays] = useState<number[]>([])
    async function createNewHabit (event: FormEvent){
        event.preventDefault()
        if (!title || setWeekDays.length === 0) {
            return
        }

        await api.post('/habits', {
            title,
            weekDays,
        })
        
        setTitle('')
        setWeekDays([])

        alert('Hábito registrado!')
    }
    function handleToggleWeekDay (weekDay: number){
        if(weekDays.includes(weekDay)){
            const weekDaysWithRemovedOne = weekDays.filter(day => day !== weekDay)
            setWeekDays(weekDaysWithRemovedOne)
        } else {
            const weekDaysWithAddedOne = [...weekDays, weekDay]
            setWeekDays(weekDaysWithAddedOne)
        }
    }
    return (
        <form onSubmit={createNewHabit} className="w-full flex flex-col mt-6">
            <label htmlFor="title" className="font-semibold leading-tight">
                Qual seu comprometimento?
            </label>
            <input
                type="text"
                id="title"
                placeholder="ex.: Exercícios, dormir bem, beber água, etc ..."
                autoFocus
                className="p-4 rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 focus:ring-offset-zinc-900"
                value={title}
                onChange={event => setTitle(event.target.value)}
            />
            <label htmlFor="" className="font-semibold leading-tight mt-4">
                Qual a recorrência?
            </label>
            {availableWeekDays.map((weekDay, index) => {
                return (
                    <CheckboxStyle key={index} title={weekDay} checked={weekDays.includes(index)} classes="text-white leading-tight" class2="mt-3 flex flex-col gap-3" onCheckedChange={() => handleToggleWeekDay(index)}/>
                )
            })}
            <button type="submit" className="mt-6 rounded-lg p-4 flex items-center justify-center gap-3 font-semibold bg-green-600 hover:bg-green-500 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-zinc-900">
                <Check size={20} weight="bold" />
                Confirmar
            </button>
        </form>
    );
}
