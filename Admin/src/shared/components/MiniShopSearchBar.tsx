'use client';

import React, { useEffect, useState } from "react";
import {
    TextField,
    InputAdornment,
    Box,
    MenuItem,
    IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { styled } from "@mui/material/styles";
import { useDebounce } from "../hooks/useDebounce";
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
/* ================= STYLED ================= */

const Wrapper = styled(Box)(() => ({
    display: 'flex',
    height: '100%',
}));

const FieldSelect = styled(TextField)(() => ({
    minWidth: 120,
    '& .MuiOutlinedInput-root': {
        height: '100%',
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
    },
}));

const SearchInput = styled(TextField)(() => ({
    minWidth: 600,
    flex: 1,
    '& .MuiOutlinedInput-root': {
        height: '100%',
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
    },
}));

/* ================= COMPONENT ================= */

interface SearchBarProps {
    placeholder?: string;
    onSearch: (field: string, value: string) => void;
    listFields: { label: string; value: string }[];
}

const MiniShopSearchBar: React.FC<SearchBarProps> = ({
    placeholder = "Tìm kiếm...",
    onSearch,
    listFields,
}) => {
    const [field, setField] = useState(listFields[0]?.value ?? "");
    const [searchValue, setSearchValue] = useState("");

    const debouncedValue = useDebounce(searchValue, 500);

    // ✅ CHỈ GỌI SEARCH Ở ĐÂY
    useEffect(() => {
        onSearch(field, debouncedValue);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [field, debouncedValue]);

    return (
        <Wrapper>
            {/* SELECT */}
            <FieldSelect
                select
                size="small"
                value={field}
                onChange={(e) => setField(e.target.value)}
            >
                {listFields.map((item) => (
                    <MenuItem key={item.value} value={item.value}>
                        {item.label}
                    </MenuItem>
                ))}
            </FieldSelect>

            {/* SEARCH */}
            <SearchInput
                size="small"
                placeholder={placeholder}
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                slotProps={{
                    input: {
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={() => setSearchValue("")}>
                                    <ClearOutlinedIcon />
                                </IconButton>
                            </InputAdornment>
                        )
                    },
                }}
            />
        </Wrapper>
    );
};

export default MiniShopSearchBar;
