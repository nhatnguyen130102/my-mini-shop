'use client';
import * as React from 'react';
import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Button,
    Dialog,
    Slide,
    Grid,
    Switch,
    FormControlLabel,
    Divider,
    Stack,
    Chip,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { TransitionProps } from '@mui/material/transitions';
import { useFormik } from 'formik';
import { useCallback, useEffect, useState } from 'react';
import { useRoleStore } from '@/common/stores/role.store';
import { roleService } from '@/common/services/role-service';
import { useNotify } from '@/shared/hooks/useNotify';
import MiniShopTextField from '@/shared/components/MiniShopTextField';
import { useUserStore } from '@/common/stores/user.store';
import { IRole, IUserRole } from '@/common/interface/role-interface';
import { userRoleService } from '@/common/services/user-role-serivce';
import { CircularProgress, Box } from '@mui/material';
import MiniShopDialog from '@/shared/components/MiniShopDialog';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<unknown>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});
/* ===================== PROPS ===================== */
interface EditRoleForUserProps {
    open: boolean;
    onClose: () => void;
}

/* ===================== COMPONENT ===================== */
export default function EditRoleForUser({ open, onClose }: EditRoleForUserProps) {
    const { notify } = useNotify();
    const { selectedUser } = useUserStore();
    const [assignedRoles, setAssignedRoles] = useState<IRole[]>([]);
    const [availableRoles, setAvailableRoles] = useState<IRole[]>([]);
    const [initialAssignedRoles, setInitialAssignedRoles] = useState<IRole[]>([]);
    const [initialUserRoles, setInitialUserRoles] = useState<IUserRole[]>([]);

    const [loading, setLoading] = useState(false);

    const fetchData = useCallback(async () => {
        if (!selectedUser) return;

        try {
            setLoading(true);

            const [resRole, resListRoleOfUser] = await Promise.all([
                roleService.getAll(),
                userRoleService.getAll(1, 1000, 'userId', selectedUser.id)
            ]);

            const userRoles: IUserRole[] =
                resListRoleOfUser?.payload?.data ?? [];

            const assigned: IRole[] =
                userRoles.map(ur => ur.role);

            const available: IRole[] =
                resRole?.payload?.data.filter(
                    role => !assigned.some(ar => ar.id === role.id)
                ) ?? [];

            setAssignedRoles(assigned);
            setInitialAssignedRoles(assigned);
            setInitialUserRoles(userRoles); // ⭐ quan trọng
            setAvailableRoles(available);

        } catch (err) {
            notify({ success: false, message: String(err) });
        } finally {
            setLoading(false);
        }
    }, [selectedUser]);


    useEffect(() => {
        if (open) {
            setAssignedRoles([]);
            setAvailableRoles([]);
            setInitialAssignedRoles([]);
            fetchData();
        }
    }, [open, fetchData]);


    const moveToAssigned = (role: IRole) => {
        setAvailableRoles(prev => prev.filter(r => r.id !== role.id));
        setAssignedRoles(prev => [...prev, role]);
    };

    const moveToAvailable = (role: IRole) => {
        setAssignedRoles(prev => prev.filter(r => r.id !== role.id));
        setAvailableRoles(prev => [...prev, role]);
    };

    const isInitiallyAssigned = (role: IRole) =>
        initialAssignedRoles.some(r => r.id === role.id);

    const isNewlyAssigned = (role: IRole) =>
        assignedRoles.some(r => r.id === role.id) &&
        !isInitiallyAssigned(role);

    const isNewlyRemoved = (role: IRole) =>
        availableRoles.some(r => r.id === role.id) &&
        isInitiallyAssigned(role);


    const handleSubmit = async () => {
        if (!selectedUser) return;

        try {
            const removedUserRoleIds = initialUserRoles
                .filter(ur =>
                    !assignedRoles.some(ar => ar.id === ur.roleId)
                )
                .map(ur => ur.id);

            const addedRoles = assignedRoles.filter(
                r => !initialAssignedRoles.some(ir => ir.id === r.id)
            );

            if (removedUserRoleIds.length) {
                await userRoleService.deleteMany(removedUserRoleIds);
            }

            if (addedRoles.length) {
                await userRoleService.createMany(
                    addedRoles.map(role => ({
                        userId: selectedUser.id,
                        roleId: role.id,
                        name: `${selectedUser.username}-${role.name}`
                    }))
                );
            }

            notify({
                success: true,
                message: 'Update roles successfully'
            });

            onClose();
        } catch (err) {
            notify({
                success: false,
                message: String(err)
            });
        }
    };

    return (
        <MiniShopDialog
            open={open}
            onClose={onClose}
            title={"Edit role for user"}
            fullScreen
            handleSubmit={handleSubmit}
        >
            <Box
                sx={{
                    flex: 1,
                    overflowY: 'auto',
                    p: 7,
                    pb: 12,
                }}
            >
                {!loading && (
                    <Grid container spacing={2}>
                        {/* LEFT */}
                        <Grid size={6}>
                            <Typography variant="h6">Assigned Roles</Typography>
                            <Divider sx={{ mb: 2 }} />

                            <Grid container spacing={1}>
                                {assignedRoles.map(role => (
                                    <Box key={role.id} sx={{ position: 'relative' }}>
                                        <Button
                                            fullWidth
                                            variant="outlined"
                                            color="secondary"
                                            onClick={() => moveToAvailable(role)}
                                        >
                                            {role.name}
                                        </Button>

                                        {isNewlyAssigned(role) && (
                                            <Chip
                                                label="Added"
                                                color="success"
                                                size="small"
                                                icon={<AddCircleOutlineIcon />}
                                                sx={{
                                                    position: 'absolute',
                                                    top: -8,
                                                    right: -8,
                                                    fontWeight: 500,
                                                }}
                                            />
                                        )}
                                    </Box>
                                ))}


                            </Grid>
                        </Grid>

                        {/* RIGHT */}
                        <Grid size={6}>
                            <Typography variant="h6">Available Roles</Typography>
                            <Divider sx={{ mb: 2 }} />

                            <Grid container spacing={1}>
                                {availableRoles.map(role => (
                                    <Box key={role.id} sx={{ position: 'relative' }}>
                                        <Button
                                            fullWidth
                                            variant="outlined"
                                            color="primary"
                                            onClick={() => moveToAssigned(role)}
                                        >
                                            {role.name}
                                        </Button>

                                        {isNewlyRemoved(role) && (
                                            <Chip
                                                label="Removed"
                                                color="error"
                                                size="small"
                                                icon={<RemoveCircleOutlineIcon />}
                                                sx={{
                                                    position: 'absolute',
                                                    top: -8,
                                                    right: -8,
                                                    fontWeight: 500,
                                                }}
                                            />
                                        )}
                                    </Box>
                                ))}
                            </Grid>
                        </Grid>
                    </Grid>
                )}
            </Box>
        </MiniShopDialog>

    );
}
