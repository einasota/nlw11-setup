import clsx from "clsx";
import dayjs from "dayjs";
import { useEffect } from "react";
import { View } from "react-native";
import Animated, {useAnimatedStyle, useSharedValue, withTiming} from "react-native-reanimated";

interface Props {
    progress?: number;
}

export function ProgressBar({ progress = 0}: Props) {
    const sharedProgress = useSharedValue(progress);

    const style = useAnimatedStyle(() => {
        return {
            width: `${sharedProgress.value}%`
        }
        }
    )

    useEffect(() => {
        sharedProgress.value = withTiming(progress) 
        return () => {
        
        }
    }, [progress])
    

    return (
        <View className="w-full h-3 rounded-xl bg-zinc-700 mt-4">
            <Animated.View
                className={clsx("h-3 rounded-xl", {
                    "bg-zinc-900 border-zinc-800":
                        progress === 0,
                    "bg-violet-900 border-violet-700":
                        progress > 0 &&
                        progress < 20,
                    "bg-violet-800 border-violet-600":
                        progress >= 20 &&
                        progress < 40,
                    "bg-violet-700 border-violet-500":
                        progress >= 40 &&
                        progress < 60,
                    "bg-violet-600 border-violet-500":
                        progress >= 60 &&
                        progress < 80,
                    "bg-violet-500 border-violet-400":
                        progress >= 80 &&
                        progress < 100,
                    "bg-violet-400 border-violet-300":
                        progress === 100,
                })}
                style={style}
            />
        </View>
    );
}
