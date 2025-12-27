'use client'
import { colorService } from '@/common/services/color-service'
import { useColorStore } from '@/common/stores/color.store'
import MiniShopCard from '@/shared/components/MiniShopCard'
import MiniShopTable, { Column } from '@/shared/components/table/MiniShopTable'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useCallback, useState } from 'react'
import { Button, Grid } from '@mui/material'
import MiniShopSearchBar from '@/shared/components/MiniShopSearchBar'
import { useProductStore } from '@/common/stores/product.store'
import { IColor } from '@/common/interface/product-interface'
import EditCreateDialog from './components/EditCreateDialog'
import AlertDialog from './components/AlertDialog'
import DetailDialog from './components/DetailDialog'


const columns: Column<IColor>[] = [
    { id: 'code', label: 'Code', minWidth: 100 },
    { id: 'name', label: 'Tên sản phẩm', minWidth: 150 },
    { id: 'description', label: 'Mô tả', minWidth: 200 },
    { id: 'colorCode', label: 'Mã màu', minWidth: 100 },
    { id: 'isActive', label: 'Kích hoạt', minWidth: 100, align: 'center' },
];

const ColorPage = () => {
    const [page, setPage] = useState<number>(0)
    const [limit, setLimit] = useState<number>(10)
    const queryClient = useQueryClient();
    const [openDialogEditCreate, setOpenDialogEditCreate] = useState<boolean>(false)
    const [openDialogAlter, setOpenDialogAlter] = useState<boolean>(false)
    const [openDialogDetail, setOpenDialogDetail] = useState<boolean>(false)

    const [type, setType] = useState<"changeStatus" | "deleteSoft" | "deleteHard">("changeStatus");
    const [filter, setFilter] = useState<{ field: string, value: string }>({ field: "", value: "" })
    const {
        setSelectedColor: setSelectedColor,
    } = useColorStore()

    const {
        setColors: setColors,
    } = useProductStore()

    const fetchColor = async (page: number, limit: number, field: string, value: string) => {
        try {
            const res = await colorService.getAll(page + 1, limit, field, value);

            if (!res?.payload?.isSuccess) {
                throw new Error(res?.payload?.message || "Fetch color failed");
            }

            const data = res;
            setColors(data?.payload?.data ?? []);
            return data;
        } catch (err) {
            console.error("Fetch color error:", err);
            throw err;
        }
    };

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['colors', page, limit, filter],
        queryFn: () => fetchColor(page, limit, filter.field, filter.value),
        placeholderData: (previousData) => previousData,
        refetchOnWindowFocus: false,
    });

    const editRecord = (data: IColor) => {
        setSelectedColor(data)
        setOpenDialogEditCreate(true)
    }

    const createRecord = () => {
        setSelectedColor(null)
        setOpenDialogEditCreate(true)
    }

    const handleCloseDialogEditCreate = () => {
        queryClient.invalidateQueries({ queryKey: ['colors', page, limit, filter] });
        setOpenDialogEditCreate(false)
    }

    const handleChangeStatus = (data: IColor) => {
        setType("changeStatus")
        setSelectedColor(data)
        setOpenDialogAlter(true)
    }

    const handleDelete = (data: IColor, typeDelete: "deleteSoft" | "deleteHard") => {
        setType(typeDelete)
        setSelectedColor(data)
        setOpenDialogAlter(true)
    }

    const handleView = (data: IColor) => {
        setSelectedColor(data)
        setOpenDialogDetail(true)
    }

    const handleCloseDialogDetail = () => {
        setOpenDialogDetail(false)
    }

    const handleCloseDialogAlter = () => {
        queryClient.invalidateQueries({ queryKey: ['colors', page, limit, filter] });
        setOpenDialogAlter(false)
    }

    const handleSearch = useCallback((field: string, value: string) => {
        setFilter({ field, value });
    }, []);


    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error: {error.message}</div>;

    return (
        <MiniShopCard title='Color Page'>
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
            <MiniShopTable<IColor>
                serverSide={true}
                columns={columns}
                rows={data?.payload?.data ?? []}
                onEdit={(row) => editRecord(row)}
                onDelete={(row) => handleDelete(row, "deleteSoft")}
                onDeleteHard={(row) => handleDelete(row, "deleteHard")}
                onToggleStatus={(row) => handleChangeStatus(row)}
                onRowClick={(row) => handleView(row)}
                onPageChange={(page, pageSize) => {
                    setPage(page)
                    setLimit(pageSize)
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

export default ColorPage;

