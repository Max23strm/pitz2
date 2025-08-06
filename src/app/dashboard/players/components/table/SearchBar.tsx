import { CloseButton, TextInput } from '@mantine/core'
import { Search } from "@mynaui/icons-react";

const SearchBar = ({searchFn, clearState, searchValue}:{searchFn: (value: string) => void,clearState:() => void, searchValue: string}) => {

    return (
        <TextInput 
            placeholder="Buscar"
            leftSectionPointerEvents="none"
            leftSection={<Search size={16}/>} 
            value={searchValue}
            rightSection={<CloseButton size="xs" onClick={clearState}/>} 
            onChange={(e)=>searchFn(e.target.value)}
        />
    )
}

export default SearchBar