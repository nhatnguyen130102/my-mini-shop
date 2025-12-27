'use client'
import { iconService } from '@/common/services/icon-service'
import { useIconStore } from '@/common/stores/icon.store'
import MiniShopCard from '@/shared/components/MiniShopCard'
import MiniShopTable, { Column } from '@/shared/components/table/MiniShopTable'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useCallback, useState } from 'react'
import { Button, Grid } from '@mui/material'
import MiniShopSearchBar from '@/shared/components/MiniShopSearchBar'
import { IIcon } from '@/common/interface/sidebar-interface'
import EditCreateDialog from './components/EditCreateDialog'
import AlertDialog from './components/AlertDialog'
import DetailDialog from './components/DetailDialog'
import { useSidebarStore } from '@/common/stores/sidebar.store'
import { iconMap } from '@/shared/constants/iconMap'
import ViewSidebarOutlinedIcon from '@mui/icons-material/ViewSidebarOutlined';


const columns: Column<IIcon>[] = [
    { id: 'code', label: 'Code', minWidth: 100 },
    {
        id: 'iconName', label: 'Icon', minWidth: 100, icon: (value) => iconMap[value] || ViewSidebarOutlinedIcon
    },
    { id: 'name', label: 'Tên sản phẩm', minWidth: 150 },
    { id: 'description', label: 'Mô tả', minWidth: 200 },
    { id: 'isActive', label: 'Kích hoạt', minWidth: 100, align: 'center' },
];

const IconPage = () => {
    const [page, setPage] = useState<number>(0)
    const [limit, setLimit] = useState<number>(10)
    const queryClient = useQueryClient();
    const [openDialogEditCreate, setOpenDialogEditCreate] = useState<boolean>(false)
    const [openDialogAlter, setOpenDialogAlter] = useState<boolean>(false)
    const [openDialogDetail, setOpenDialogDetail] = useState<boolean>(false)

    const [type, setType] = useState<"changeStatus" | "deleteSoft" | "deleteHard">("changeStatus");
    const [filter, setFilter] = useState<{ field: string, value: string }>({ field: "", value: "" })
    const {
        setSelectedIcon: setSelectedIcon,
    } = useIconStore()

    const {
        setIcons: setIcons,
    } = useSidebarStore()

    const fetchIcon = async (page: number, limit: number, field: string, value: string) => {
        try {
            const res = await iconService.getAll(page + 1, limit, field, value);

            if (!res?.payload?.isSuccess) {
                throw new Error(res?.payload?.message || "Fetch icon failed");
            }

            const data = res;
            setIcons(data?.payload?.data ?? []);
            return data;
        } catch (err) {
            console.error("Fetch icon error:", err);
            throw err;
        }
    };

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['icons', page, limit, filter],
        queryFn: () => fetchIcon(page, limit, filter.field, filter.value),
        placeholderData: (previousData) => previousData,
        refetchOnWindowFocus: false,
    });

    const editRecord = (data: IIcon) => {
        setSelectedIcon(data)
        setOpenDialogEditCreate(true)
    }

    const createRecord = () => {
        setSelectedIcon(null)
        setOpenDialogEditCreate(true)
    }

    const handleCloseDialogEditCreate = () => {
        queryClient.invalidateQueries({ queryKey: ['icons', page, limit, filter] });
        setOpenDialogEditCreate(false)
    }

    const handleChangeStatus = (data: IIcon) => {
        setType("changeStatus")
        setSelectedIcon(data)
        setOpenDialogAlter(true)
    }

    const handleDelete = (data: IIcon, typeDelete: "deleteSoft" | "deleteHard") => {
        setType(typeDelete)
        setSelectedIcon(data)
        setOpenDialogAlter(true)
    }

    const handleView = (data: IIcon) => {
        setSelectedIcon(data)
        setOpenDialogDetail(true)
    }

    const handleCloseDialogDetail = () => {
        setOpenDialogDetail(false)
    }

    const handleCloseDialogAlter = () => {
        queryClient.invalidateQueries({ queryKey: ['icons', page, limit, filter] });
        setOpenDialogAlter(false)
    }

    const handleSearch = useCallback((field: string, value: string) => {
        setFilter({ field, value });
    }, []);


    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error: {error.message}</div>;

    return (
        <MiniShopCard title='Icon Page'>
            <Grid
                container
                spacing={2}
                display={"flex"}
                flexDirection={"row"}
                justifyContent={"start"}
                alignItems={"stretch"}
                marginBottom={2}
            >
                <Grid>
                    <Button
                        variant='contained'
                        color='primary'
                        sx={{ height: '100%' }}
                        onClick={createRecord}
                    >
                        Add New
                    </Button>
                </Grid>
                <Grid>
                    <MiniShopSearchBar
                        onSearch={handleSearch}
                        listFields={[
                            { label: "Name", value: "name" }
                        ]}
                    />
                </Grid>

            </Grid>
            <MiniShopTable<IIcon>
                serverSide={true}
                columns={columns}
                rows={data?.payload?.data ?? []}
                onEdit={(row) => editRecord(row)}
                onDelete={(row) => handleDelete(row, "deleteSoft")}
                onDeleteHard={(row) => handleDelete(row, "deleteHard")}
                onToggleStatus={(row) => handleChangeStatus(row)}
                onRowClick={(row) => handleView(row)}
                onPageChange={(page, pageIcon) => {
                    setPage(page)
                    setLimit(pageIcon)
                }}
                pageSize={limit}
                totalCount={data?.payload?.total ?? 0}
            />
            <EditCreateDialog open={openDialogEditCreate} onClose={handleCloseDialogEditCreate} />
            <AlertDialog open={openDialogAlter} onClose={handleCloseDialogAlter} type={type} />
            <DetailDialog open={openDialogDetail} onClose={handleCloseDialogDetail} />
        </MiniShopCard>
    )
}

export default IconPage;

