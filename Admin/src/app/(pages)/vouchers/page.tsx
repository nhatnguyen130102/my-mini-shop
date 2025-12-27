'use client'
import { voucherService } from '@/common/services/voucher-service'
import { useVoucherStore } from '@/common/stores/voucher.store'
import MiniShopCard from '@/shared/components/MiniShopCard'
import MiniShopTable, { Column } from '@/shared/components/table/MiniShopTable'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useCallback, useState } from 'react'
import { Button, Grid } from '@mui/material'
import MiniShopSearchBar from '@/shared/components/MiniShopSearchBar'
import { useProductStore } from '@/common/stores/product.store'
import { IVoucher } from '@/common/interface/voucher-interface'
import EditCreateDialog from './components/EditCreateDialog'
import AlertDialog from './components/AlertDialog'
import DetailDialog from './components/DetailDialog'

const columns: Column<IVoucher>[] = [
    { id: 'code', label: 'Code', minWidth: 100 },
    { id: 'name', label: 'Vouchername', minWidth: 100 },
    { id: 'startDate', label: 'Start Date', minWidth: 100 },
    { id: 'endDate', label: 'End Date', minWidth: 100 },
    { id: 'status', label: 'Status', minWidth: 100 },
    { id: 'type', label: 'Type', minWidth: 100 },
    { id: 'value', label: 'Value', minWidth: 100 },
    { id: 'minimumOrder', label: 'Minimum Order', minWidth: 100, align: 'right' },
    { id: 'maximumDiscount', label: 'Maximum Discount', minWidth: 100, align: 'right' },
    { id: 'description', label: 'Mô tả', minWidth: 200 },
    { id: 'isActive', label: 'Kích hoạt', minWidth: 100, align: 'center' },
];

const VoucherPage = () => {
    const [page, setPage] = useState<number>(0)
    const [limit, setLimit] = useState<number>(10)
    const queryClient = useQueryClient();
    const [openDialogEditCreate, setOpenDialogEditCreate] = useState<boolean>(false)
    const [openDialogAlter, setOpenDialogAlter] = useState<boolean>(false)
    const [openDialogDetail, setOpenDialogDetail] = useState<boolean>(false)

    const [type, setType] = useState<"changeStatus" | "deleteSoft" | "deleteHard">("changeStatus");
    const [filter, setFilter] = useState<{ field: string, value: string }>({ field: "", value: "" })
    const {
        setSelectedVoucher: setSelectedVoucher,
        setVouchers: setVouchers,
    } = useVoucherStore()

    const fetchVoucher = async (page: number, limit: number, field: string, value: string) => {
        try {
            const res = await voucherService.getAll(page + 1, limit, field, value);

            if (!res?.payload?.isSuccess) {
                throw new Error(res?.payload?.message || "Fetch voucher failed");
            }

            const data = res;
            setVouchers(data?.payload?.data ?? []);
            return data;
        } catch (err) {
            console.error("Fetch voucher error:", err);
            throw err;
        }
    };

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['vouchers', page, limit, filter],
        queryFn: () => fetchVoucher(page, limit, filter.field, filter.value),
        placeholderData: (previousData) => previousData,
        refetchOnWindowFocus: false,
    });

    const editRecord = (data: IVoucher) => {
        console.log("data", data)
        setSelectedVoucher(data)
        setOpenDialogEditCreate(true)
    }

    const createRecord = () => {
        setSelectedVoucher(null)
        setOpenDialogEditCreate(true)
    }

    const handleCloseDialogEditCreate = () => {
        queryClient.invalidateQueries({ queryKey: ['vouchers', page, limit, filter] });
        setOpenDialogEditCreate(false)
    }

    const handleChangeStatus = (data: IVoucher) => {
        setType("changeStatus")
        setSelectedVoucher(data)
        setOpenDialogAlter(true)
    }

    const handleDelete = (data: IVoucher, typeDelete: "deleteSoft" | "deleteHard") => {
        setType(typeDelete)
        setSelectedVoucher(data)
        setOpenDialogAlter(true)
    }

    const handleView = (data: IVoucher) => {
        setSelectedVoucher(data)
        setOpenDialogDetail(true)
    }

    const handleCloseDialogDetail = () => {
        setOpenDialogDetail(false)
    }

    const handleCloseDialogAlter = () => {
        queryClient.invalidateQueries({ queryKey: ['vouchers', page, limit, filter] });
        setOpenDialogAlter(false)
    }

    const handleSearch = useCallback((field: string, value: string) => {
        setFilter({ field, value });
    }, []);


    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error: {error.message}</div>;

    return (
        <MiniShopCard title='Voucher Page'>
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
            <MiniShopTable<IVoucher>
                serverSide={true}
                columns={columns}
                rows={data?.payload?.data ?? []}
                onEdit={(row) => editRecord(row)}
                onDelete={(row) => handleDelete(row, "deleteSoft")}
                onDeleteHard={(row) => handleDelete(row, "deleteHard")}
                onToggleStatus={(row) => handleChangeStatus(row)}
                onRowClick={(row) => handleView(row)}
                onPageChange={(page, pageVoucher) => {
                    setPage(page)
                    setLimit(pageVoucher)
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

export default VoucherPage;

