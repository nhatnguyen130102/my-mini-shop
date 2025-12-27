'use client'
import MiniShopCard from '@/shared/components/MiniShopCard'
import { Box, Button, Chip, TextField } from '@mui/material'
import { useFormik } from 'formik'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { authService } from '@/common/services/auth-service'
import { useAuth } from '@/shared/context/AuthProvider'
import Divider from '@mui/material/Divider';

import { IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { initalRegisterValue, registerValueSchema } from './validate'
import { toast } from 'sonner'
import { useNotify } from '@/shared/hooks/useNotify'

const RegisterPage = () => {
    const { login } = useAuth();
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showCompare, setShowCompare] = useState<boolean>(false);
    const router = useRouter();
    const { notify } = useNotify();

    const formik = useFormik({
        initialValues: initalRegisterValue,
        validationSchema: registerValueSchema,
        onSubmit: async (values) => {
            try {
                const res = await authService.register(values)
                notify({
                    success: res?.payload?.isSuccess,
                    message: res?.payload?.message,
                })
                if (res?.payload?.isSuccess) {
                    const userData = await authService.login({
                        email: values.email,
                        password: values.password
                    })
                    notify({
                        success: userData?.payload?.isSuccess,
                        message: userData?.payload?.message,
                    })
                    if (userData?.payload?.isSuccess) {
                        login(userData?.payload.data.token, userData?.payload.data.user)
                        router.push('')
                        return;
                    }
                    router.push('/login')
                }
            } catch (err) {
                console.error("error:", err)
                notify({
                    success: false,
                    message: `error: ${err}`,
                })
            }
        },
    });
    return (
        <MiniShopCard title={'Register'}
            sx={{ width: "30%" }}
        >
            <Box
                component="form"
                onSubmit={formik.handleSubmit}
                sx={{ display: "flex", flexDirection: "column", width: "100%", mb: 3, gap: 2 }}
                noValidate
                autoComplete="off"
            >
                <TextField
                    required
                    fullWidth
                    name='email'
                    variant="outlined"
                    label="Email"
                    type="email"
                    placeholder='admin@gmail.com'
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                    autoComplete="off"
                />
                <TextField
                    required
                    fullWidth
                    name='username'
                    variant="outlined"
                    label="Username"
                    type="username"
                    placeholder='admin'
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.username && Boolean(formik.errors.username)}
                    helperText={formik.touched.username && formik.errors.username}
                    autoComplete="off"
                />

                <TextField
                    required
                    fullWidth
                    name='password'
                    variant="outlined"
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    placeholder='*******'
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                    slotProps={{
                        input: {
                            endAdornment: (<InputAdornment position="end">
                                <IconButton aria-label="toggle password visibility" onClick={() => setShowPassword(!showPassword)}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                            ),
                        },
                    }}
                    autoComplete="off"
                />
                <TextField
                    required
                    fullWidth
                    name='compare'
                    variant="outlined"
                    label="Confirm password"
                    type={showCompare ? "text" : "password"}
                    placeholder='*******'
                    value={formik.values.compare}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.compare && Boolean(formik.errors.compare)}
                    helperText={formik.touched.compare && formik.errors.compare}
                    slotProps={{
                        input: {
                            endAdornment: (<InputAdornment position="end">
                                <IconButton aria-label="toggle compare visibility" onClick={() => setShowCompare(!showCompare)}
                                    edge="end"
                                >
                                    {showCompare ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                            ),
                        },
                    }}
                    autoComplete="off"
                />

                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        width: "100%",
                        gap: 2
                    }}
                >
                    <Button
                        fullWidth
                        variant='contained'
                        color='primary'
                        onClick={() => formik.handleSubmit()}
                    >
                        Resgister
                    </Button>
                    <Divider>
                        <Chip label="Or" size="small" />
                    </Divider>
                    <Button
                        fullWidth
                        variant='outlined'
                        color='primary'
                        onClick={() => router.push('/login')}
                    >
                        Login
                    </Button>
                </Box>
            </Box>
        </MiniShopCard>
    )
}

export default RegisterPage