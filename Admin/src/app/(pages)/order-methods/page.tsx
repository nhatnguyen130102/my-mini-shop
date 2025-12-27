'use client'
import { orderMethodService } from '@/common/services/order-method-service'
import MiniShopCard from '@/shared/components/MiniShopCard'
import MiniShopTable, { Column } from '@/shared/components/table/MiniShopTable'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useCallback, useState } from 'react'
import { Button, Grid } from '@mui/material'
import MiniShopSearchBar from '@/shared/components/MiniShopSearchBar'
import { useOrderStore } from '@/common/stores/order.store'
import { IOrderMethod } from '@/common/interface/order-method-interface'
import EditCreateDialog from './components/EditCreateDialog'
import AlertDialog from './components/AlertDialog'
import DetailDialog from './components/DetailDialog'

const columns: Column<IOrderMethod>[] = [
    { id: 'code', label: 'Code', minWidth: 100 },
    { id: 'name', label: 'OrderMethodname', minWidth: 150 },
    { id: 'description', label: 'Mô tả', minWidth: 200 },
    { id: 'isActive', label: 'Kích hoạt', minWidth: 100, align: 'center' },
];

const OrderMethodPage = () => {
    const [page, setPage] = useState<number>(0)
    const [limit, setLimit] = useState<number>(10)
    const queryClient = useQueryClient();
    const [openDialogEditCreate, setOpenDialogEditCreate] = useState<boolean>(false)
    const [openDialogAlter, setOpenDialogAlter] = useState<boolean>(false)
    const [openDialogDetail, setOpenDialogDetail] = useState<boolean>(false)

    const [type, setType] = useState<"changeStatus" | "deleteSoft" | "deleteHard">("changeStatus");
    const [filter, setFilter] = useState<{ field: string, value: string }>({ field: "", value: "" })
    const {
        setSelectedOrderMethod: setSelectedOrderMethod,
        setOrderMethods: setOrderMethods,
    } = useOrderStore()

    const fetchOrderMethod = async (page: number, limit: number, field: string, value: string) => {
        try {
            const res = await orderMethodService.getAll(page + 1, limit, field, value);

            if (!res?.payload?.isSuccess) {
                throw new Error(res?.payload?.message || "Fetch orderMethod failed");
            }

            const data = res;
            setOrderMethods(data?.payload?.data ?? []);
            return data;
        } catch (err) {
            console.error("Fetch orderMethod error:", err);
            throw err;
        }
    };

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['orderMethods', page, limit, filter],
        queryFn: () => fetchOrderMethod(page, limit, filter.field, filter.value),
        placeholderData: (previousData) => previousData,
        refetchOnWindowFocus: false,
    });

    const editRecord = (data: IOrderMethod) => {
        console.log("data", data)
        setSelectedOrderMethod(data)
        setOpenDialogEditCreate(true)
    }

    const createRecord = () => {
        setSelectedOrderMethod(null)
        setOpenDialogEditCreate(true)
    }

    const handleCloseDialogEditCreate = () => {
        queryClient.invalidateQueries({ queryKey: ['orderMethods', page, limit, filter] });
        setOpenDialogEditCreate(false)
    }

    const handleChangeStatus = (data: IOrderMethod) => {
        setType("changeStatus")
        setSelectedOrderMethod(data)
        setOpenDialogAlter(true)
    }

    const handleDelete = (data: IOrderMethod, typeDelete: "deleteSoft" | "deleteHard") => {
        setType(typeDelete)
        setSelectedOrderMethod(data)
        setOpenDialogAlter(true)
    }

    const handleView = (data: IOrderMethod) => {
        setSelectedOrderMethod(data)
        setOpenDialogDetail(true)
    }

    const handleCloseDialogDetail = () => {
        setOpenDialogDetail(false)
    }

    const handleCloseDialogAlter = () => {
        queryClient.invalidateQueries({ queryKey: ['orderMethods', page, limit, filter] });
        setOpenDialogAlter(false)
    }

    const handleSearch = useCallback((field: string, value: string) => {
        setFilter({ field, value });
    }, []);


    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error: {error.message}</div>;

    return (
        <MiniShopCard title='OrderMethod Page'>
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
            <MiniShopTable<IOrderMethod>
                serverSide={true}
                columns={columns}
                rows={data?.payload?.data ?? []}
                onEdit={(row) => editRecord(row)}
                onDelete={(row) => handleDelete(row, "deleteSoft")}
                onDeleteHard={(row) => handleDelete(row, "deleteHard")}
                onToggleStatus={(row) => handleChangeStatus(row)}
                onRowClick={(row) => handleView(row)}
                onPageChange={(page, pageOrderMethod) => {
                    setPage(page)
                    setLimit(pageOrderMethod)
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

export default OrderMethodPage;

