"use client";
import { roleService } from '@/common/services/role-service'
import { useRoleStore } from '@/common/stores/role.store'
import MiniShopCard from '@/shared/components/MiniShopCard'
import MiniShopTable, { Column } from '@/shared/components/table/MiniShopTable'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useCallback, useState } from 'react'
import { Button, Grid } from '@mui/material'
import MiniShopSearchBar from '@/shared/components/MiniShopSearchBar'
import { useProductStore } from '@/common/stores/product.store'
import { IRole } from '@/common/interface/role-interface'
import EditCreateDialog from './components/EditCreateDialog'
import DetailDialog from './components/DetailDialog'
import AlertDialog from './components/AlertDialog';


const columns: Column<IRole>[] = [
    { id: 'code', label: 'Code', minWidth: 100 },
    { id: 'name', label: 'Tên sản phẩm', minWidth: 150 },
    { id: 'description', label: 'Mô tả', minWidth: 200 },
    { id: 'isActive', label: 'Kích hoạt', minWidth: 100, align: 'center' },
];

const RolePage = () => {
    const [page, setPage] = useState<number>(0)
    const [limit, setLimit] = useState<number>(10)
    const queryClient = useQueryClient();
    const [openDialogEditCreate, setOpenDialogEditCreate] = useState<boolean>(false)
    const [openDialogAlter, setOpenDialogAlter] = useState<boolean>(false)
    const [openDialogDetail, setOpenDialogDetail] = useState<boolean>(false)

    const [type, setType] = useState<"changeStatus" | "deleteSoft" | "deleteHard">("changeStatus");
    const [filter, setFilter] = useState<{ field: string, value: string }>({ field: "", value: "" })
    const {
        setSelectedRole: setSelectedRole,
    } = useRoleStore()

    const {
        setRoles: setRoles,
    } = useRoleStore()

    const fetchRole = async (page: number, limit: number, field: string, value: string) => {
        try {
            const res = await roleService.getAll(page + 1, limit, field, value);

            if (!res?.payload?.isSuccess) {
                throw new Error(res?.payload?.message || "Fetch role failed");
            }

            const data = res;
            setRoles(data?.payload?.data ?? []);
            return data;
        } catch (err) {
            console.error("Fetch role error:", err);
            throw err;
        }
    };

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['roles', page, limit, filter],
        queryFn: () => fetchRole(page, limit, filter.field, filter.value),
        placeholderData: (previousData) => previousData,
        refetchOnWindowFocus: false,
    });

    const editRecord = (data: IRole) => {
        setSelectedRole(data)
        setOpenDialogEditCreate(true)
    }

    const createRecord = () => {
        setSelectedRole(null)
        setOpenDialogEditCreate(true)
    }

    const handleCloseDialogEditCreate = () => {
        queryClient.invalidateQueries({ queryKey: ['roles', page, limit, filter] });
        setOpenDialogEditCreate(false)
    }

    const handleChangeStatus = (data: IRole) => {
        setType("changeStatus")
        setSelectedRole(data)
        setOpenDialogAlter(true)
    }

    const handleDelete = (data: IRole, typeDelete: "deleteSoft" | "deleteHard") => {
        setType(typeDelete)
        setSelectedRole(data)
        setOpenDialogAlter(true)
    }


    const handleView = (data: IRole) => {
        setSelectedRole(data)
        setOpenDialogDetail(true)
    }

    const handleCloseDialogDetail = () => {
        setOpenDialogDetail(false)
    }

    const handleCloseDialogAlter = () => {
        queryClient.invalidateQueries({ queryKey: ['roles', page, limit, filter] });
        setOpenDialogAlter(false)
    }

    const handleSearch = useCallback((field: string, value: string) => {
        setFilter({ field, value });
    }, []);


    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error: {error.message}</div>;

    return (
        <MiniShopCard title='Role Page'>
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
            <MiniShopTable<IRole>
                serverSide={true}
                columns={columns}
                rows={data?.payload?.data ?? []}
                onEdit={(row) => editRecord(row)}
                onDelete={(row) => handleDelete(row, "deleteSoft")}
                onToggleStatus={(row) => handleChangeStatus(row)}
                onDeleteHard={(row) => handleDelete(row, "deleteHard")}

                onRowClick={(row) => handleView(row)}
                onPageChange={(page, pageRole) => {
                    setPage(page)
                    setLimit(pageRole)
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

export default RolePage;

