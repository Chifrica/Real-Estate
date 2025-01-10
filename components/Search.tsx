import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { router, useLocalSearchParams, usePathname } from 'expo-router'
import icons from '@/constants/icons';
import { useDebouncedCallback } from 'use-debounce';

const Search = () => {
    const path = usePathname();
    const params = useLocalSearchParams<{ query?: string }>();
    const [search, setSearch] = useState(params.query);

    const debouncedSearch = useDebouncedCallback((text: string) => router.setParams({query: text}));
  
    const handleSearch = (text: string) => {
        setSearch(text);
        debouncedSearch(text);
    }

    return (
        <View className="flex flex-row items-center justify-between w-full px-4 rounded-lg bg-accent-100 border border-primary-100 mt-5 py-2">  
            <View className="flex-1 flex-row items-center justify-between z-50">
                <Image source={icons.search} className="size-5" />
                <TextInput
                    value={search}
                    onChangeText={handleSearch}
                    placeholder="Search"
                    placeholderTextColor="#8C8C8C"
                    className="flex-1 text-sm font-rubik text-black-300 ml-2"
                />
            </View>

            <TouchableOpacity onPress={() => console.log('search')}>
                <Image source={icons.filter} className="size-5" />
            </TouchableOpacity>
            {/* <Text>Search</Text> */}
        </View>
    )
}

export default Search;