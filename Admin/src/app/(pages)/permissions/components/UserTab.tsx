import React, { useState } from 'react'
import MiniShopTable, { Column } from '@/shared/components/table/MiniShopTable';
import { useUserStore } from '@/common/stores/user.store';
import { userService } from '@/common/services/user-service';
import { useQuery } from '@tanstack/react-query';
import { IUser } from '@/common/interface/user-interface';
import EditRoleForUser from './EditRoleForUser';

const columnUser: Column<IUser>[] = [
    { id: 'code', label: 'Code', minWidth: 100 },
    { id: 'fullname', label: 'Tên người dùng', minWidth: 150 },
    { id: 'username', label: 'Username', minWidth: 150 },
    { id: 'email', label: 'Email', minWidth: 150 },
    { id: 'description', label: 'Mô tả', minWidth: 200 },
    { id: 'isActive', label: 'Kích hoạt', minWidth: 100, align: 'center' },
];

const UserTab = () => {
    const { users: users, setUsers: setUsers, setSelectedUser: setSelectedUser } = useUserStore();

    const [open, setOpen] = useState<boolean>(false)
    const [page, setPage] = useState<number>(0)
    const [limit, setLimit] = useState<number>(10)

    const editRoleForUser = (data: IUser) => {
        setOpen(true)
        setSelectedUser(data)
    }

    const handleClose = () => {
        setSelectedUser(null)
        setOpen(false)
    }


    const fetchUser = async () => {
        try {
            const res = await userService.getAll();

            if (!res?.payload?.isSuccess) {
                throw new Error(res?.payload?.message || "Fetch user failed");
            }

            const data = res;
            setUsers(data?.payload?.data ?? []);
            return data;
        } catch (err) {
            console.error("Fetch user error:", err);
            throw err;
        }
    };

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['users'],
        queryFn: () => fetchUser(),
        placeholderData: (previousData) => previousData,
        refetchOnWindowFocus: false,
    });

    const userData = data?.payload?.data ?? [];
    const userTotal = data?.payload?.total ?? 0;
    return (
        <>
            <MiniShopTable<IUser>
                serverSide={true}
                columns={columnUser}
                rows={userData}
                onEdit={(row) => editRoleForUser(row)}
                // onDelete={(row) => handleDelete(row, "deleteSoft")}
                // onDeleteHard={(row) => handleDelete(row, "deleteHard")}
                // onToggleStatus={(row) => handleChangeStatus(row)}
                // onRowClick={(row) => handleView(row)}
                onPageChange={(page, pageUser) => {
                    setPage(page)
                    setLimit(pageUser)
                }}
                pageSize={limit}
                totalCount={userTotal}
            />
            <EditRoleForUser open={open} onClose={handleClose} />
        </>

    )
}

export default UserTab