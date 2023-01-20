import * as Popover from '@radix-ui/react-popover';
import { ProgressBar } from './ProgressBar';
import clsx from 'clsx'

interface HabitProps{
    completed: number
    amount: number
}

export function HabitDay({completed, amount}: HabitProps) {
    const completedPercent = Math.round((completed/amount) * 100)
    return (
        <Popover.Root>
            <Popover.Trigger className={clsx('w-10 h-10 rounded-lg', {
                'bg-zinc-900 border-zinc-800': completedPercent === 0,
                'bg-violet-900 border-violet-700': completedPercent > 0 && completedPercent < 20,
                'bg-violet-800 border-violet-600': completedPercent >= 20 && completedPercent < 40,
                'bg-violet-700 border-violet-500': completedPercent >= 40 && completedPercent < 60,
                'bg-violet-600 border-violet-500': completedPercent >= 60 && completedPercent < 80,
                'bg-violet-500 border-violet-400': completedPercent >= 80 && completedPercent < 100,
                'bg-violet-400 border-violet-300': completedPercent === 100,
            })}/>
            <Popover.Portal>
                <Popover.Content className='min-w-[320px] p-6 rounded-2xl bg-zinc-900 flex flex-col'>
                    <span className='font-semibold text-zinc-400'>
                        quinta-feira
                    </span>
                    <span className='mt-1 font-extrabold leading-tight text-3xl'>19/01</span>
                    
                    <ProgressBar progress={completedPercent}/>
                    {/* <div className='h-3 rounded-xl bg-zinc-700 w-full mt-4'>
                        <div role="progressbar" aria-label='Progresso de hábito completados nesse dia' aria-valuenow={75} className='h-3 rounded-xl bg-violet-600 w-3/4'></div>
                    </div> */}
                    <Popover.Arrow height={8} width={16} className='fill-zinc-900'/>
                </Popover.Content>
            </Popover.Portal>
        </Popover.Root>
    )
}