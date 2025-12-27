'use client'
import { paymentMethodService } from '@/common/services/payment-method-service'
import { useOrderStore } from '@/common/stores/order.store'
import MiniShopCard from '@/shared/components/MiniShopCard'
import MiniShopTable, { Column } from '@/shared/components/table/MiniShopTable'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useCallback, useState } from 'react'
import { Button, Grid } from '@mui/material'
import MiniShopSearchBar from '@/shared/components/MiniShopSearchBar'
import { IPaymentMethod } from '@/common/interface/payment-method-interface'
import EditCreateDialog from './components/EditCreateDialog'
import AlertDialog from './components/AlertDialog'
import DetailDialog from './components/DetailDialog'

const columns: Column<IPaymentMethod>[] = [
    { id: 'code', label: 'Code', minWidth: 100 },
    { id: 'name', label: 'Tên người dùng', minWidth: 150 },
    { id: 'description', label: 'Mô tả', minWidth: 200 },
    { id: 'isActive', label: 'Kích hoạt', minWidth: 100, align: 'center' },
];

const PaymentMethodPage = () => {
    const [page, setPage] = useState<number>(0)
    const [limit, setLimit] = useState<number>(10)
    const queryClient = useQueryClient();
    const [openDialogEditCreate, setOpenDialogEditCreate] = useState<boolean>(false)
    const [openDialogAlter, setOpenDialogAlter] = useState<boolean>(false)
    const [openDialogDetail, setOpenDialogDetail] = useState<boolean>(false)

    const [type, setType] = useState<"changeStatus" | "deleteSoft" | "deleteHard">("changeStatus");
    const [filter, setFilter] = useState<{ field: string, value: string }>({ field: "", value: "" })
    const {
        setSelectedPaymentMethod: setSelectedPaymentMethod,
        setPaymentMethods: setPaymentMethods,
    } = useOrderStore();

    const fetchPaymentMethod = async (page: number, limit: number, field: string, value: string) => {
        try {
            const res = await paymentMethodService.getAll(page + 1, limit, field, value);

            if (!res?.payload?.isSuccess) {
                throw new Error(res?.payload?.message || "Fetch paymentMethod failed");
            }

            const data = res;
            setPaymentMethods(data?.payload?.data ?? []);
            return data;
        } catch (err) {
            console.error("Fetch paymentMethod error:", err);
            throw err;
        }
    };

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['paymentMethods', page, limit, filter],
        queryFn: () => fetchPaymentMethod(page, limit, filter.field, filter.value),
        placeholderData: (previousData) => previousData,
        refetchOnWindowFocus: false,
    });

    const editRecord = (data: IPaymentMethod) => {
        console.log("data", data)
        setSelectedPaymentMethod(data)
        setOpenDialogEditCreate(true)
    }

    const createRecord = () => {
        setSelectedPaymentMethod(null)
        setOpenDialogEditCreate(true)
    }

    const handleCloseDialogEditCreate = () => {
        queryClient.invalidateQueries({ queryKey: ['paymentMethods', page, limit, filter] });
        setOpenDialogEditCreate(false)
    }

    const handleChangeStatus = (data: IPaymentMethod) => {
        setType("changeStatus")
        setSelectedPaymentMethod(data)
        setOpenDialogAlter(true)
    }

    const handleDelete = (data: IPaymentMethod, typeDelete: "deleteSoft" | "deleteHard") => {
        setType(typeDelete)
        setSelectedPaymentMethod(data)
        setOpenDialogAlter(true)
    }

    const handleView = (data: IPaymentMethod) => {
        setSelectedPaymentMethod(data)
        setOpenDialogDetail(true)
    }

    const handleCloseDialogDetail = () => {
        setOpenDialogDetail(false)
    }

    const handleCloseDialogAlter = () => {
        queryClient.invalidateQueries({ queryKey: ['paymentMethods', page, limit, filter] });
        setOpenDialogAlter(false)
    }

    const handleSearch = useCallback((field: string, value: string) => {
        setFilter({ field, value });
    }, []);


    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error: {error.message}</div>;

    return (
        <MiniShopCard title='PaymentMethod Page'>
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
            <MiniShopTable<IPaymentMethod>
                serverSide={true}
                columns={columns}
                rows={data?.payload?.data ?? []}
                onEdit={(row) => editRecord(row)}
                onDelete={(row) => handleDelete(row, "deleteSoft")}
                onDeleteHard={(row) => handleDelete(row, "deleteHard")}
                onToggleStatus={(row) => handleChangeStatus(row)}
                onRowClick={(row) => handleView(row)}
                onPageChange={(page, pagePaymentMethod) => {
                    setPage(page)
                    setLimit(pagePaymentMethod)
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

export default PaymentMethodPage;

