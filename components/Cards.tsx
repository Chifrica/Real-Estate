import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import images from '@/constants/images';
import icons from '@/constants/icons';

interface Props {
    onPress?: () => void;
}

export const FeaturedCards = ({onPress} : Props) => {
  return (
    <TouchableOpacity onPress={onPress} className="flex flex-row items-start w-60 h-80 relative bg-white rounded-lg shadow-md">
        <Image source={images.japan} className="size-full rounded-2xl" />
        <Image source={images.cardGradient} className="absolute bottom-0 rounded-2xl size-full" />

        <View className="flex flex-row items-center px-3 absolute py-1.5 bg-white/90 rounded-full top-5 right-5">
            <Image source={icons.star} className="size-3.5" />
            <Text className="text-xs font-rubik-bold text-primary-300 ml-1">4.4</Text>
        </View>
    </TouchableOpacity>
  )
}

export const Card  = () => {
    return (
      <View>
        <Text>cards</Text>
      </View>
    )
}