'use client'
import { IProduct } from '@/common/interface/product-interface'
import { productService } from '@/common/services/product-service'
import { useProductStore } from '@/common/stores/product.store'
import MiniShopCard from '@/shared/components/MiniShopCard'
import MiniShopTable, { Column } from '@/shared/components/table/MiniShopTable'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useCallback, useState } from 'react'
import EditCreateDialog from './components/EditCreateDialog'
import AlertDialog from './components/AlertDialog'
import { Button, Grid } from '@mui/material'
import MiniShopSearchBar from '@/shared/components/MiniShopSearchBar'
import DetailDialog from './components/DetailDialog'

const columns: Column<IProduct>[] = [
    { id: 'code', label: 'Code', minWidth: 100 },
    { id: 'name', label: 'Tên sản phẩm', minWidth: 150 },
    { id: 'description', label: 'Mô tả', minWidth: 200 },
    { id: 'category.name', label: 'Danh mục', minWidth: 100 },
    { id: 'color.name', label: 'Màu sắc', minWidth: 100 },
    { id: 'size.name', label: 'Kích thước', minWidth: 100 },
    { id: 'material.name', label: 'Chất liệu', minWidth: 100 },
    { id: 'price', label: 'Giá', minWidth: 100, align: 'right', format: (value) => value?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) },
    { id: 'isActive', label: 'Kích hoạt', minWidth: 100, align: 'center' },
];

const ProductPage = () => {
    const [page, setPage] = useState<number>(0)
    const [limit, setLimit] = useState<number>(10)
    const queryClient = useQueryClient();
    const [openDialogEditCreate, setOpenDialogEditCreate] = useState<boolean>(false)
    const [openDialogAlter, setOpenDialogAlter] = useState<boolean>(false)
    const [openDialogDetail, setOpenDialogDetail] = useState<boolean>(false)

    const [type, setType] = useState<"changeStatus" | "deleteSoft" | "deleteHard">("changeStatus");
    const [filter, setFilter] = useState<{ field: string, value: string }>({ field: "", value: "" })
    const {
        setProducts: setProducts,
        setSelectedProduct: setSelectedProduct,
    } = useProductStore()

    const fetchProduct = async (page: number, limit: number, field: string, value: string) => {
        try {
            const res = await productService.getAll(page + 1, limit, field, value);

            if (!res?.payload?.isSuccess) {
                throw new Error(res?.payload?.message || "Fetch product failed");
            }

            const data = res;
            setProducts(data?.payload?.data ?? []);
            return data;
        } catch (err) {
            console.error("Fetch product error:", err);
            throw err;
        }
    };

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['products', page, limit, filter],
        queryFn: () => fetchProduct(page, limit, filter.field, filter.value),
        placeholderData: (previousData) => previousData,
        refetchOnWindowFocus: false,
    });

    const editRecord = (data: IProduct) => {
        setSelectedProduct(data)
        setOpenDialogEditCreate(true)
    }

    const createRecord = () => {
        setSelectedProduct(null)
        setOpenDialogEditCreate(true)
    }

    const handleCloseDialogEditCreate = () => {
        queryClient.invalidateQueries({ queryKey: ['products', page, limit, filter] });
        setOpenDialogEditCreate(false)
    }

    const handleChangeStatus = (data: IProduct) => {
        setType("changeStatus")
        setSelectedProduct(data)
        setOpenDialogAlter(true)
    }

    const handleDelete = (data: IProduct, typeDelete: "deleteSoft" | "deleteHard") => {
        setType(typeDelete)
        setSelectedProduct(data)
        setOpenDialogAlter(true)
    }

    const handleView = (data: IProduct) => {
        setSelectedProduct(data)
        setOpenDialogDetail(true)
    }

    const handleCloseDialogDetail = () => {
        setOpenDialogDetail(false)
    }

    const handleCloseDialogAlter = () => {
        queryClient.invalidateQueries({ queryKey: ['products', page, limit, filter] });
        setOpenDialogAlter(false)
    }

    const handleSearch = useCallback((field: string, value: string) => {
        setFilter({ field, value });
    }, []);


    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error: {error.message}</div>;

    return (
        <MiniShopCard title='Product Page'>
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
            <MiniShopTable<IProduct>
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

export default ProductPage;

