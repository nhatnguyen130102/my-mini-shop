'use client'
import MiniShopCard from '@/shared/components/MiniShopCard'
import { Box, Button, Chip, TextField } from '@mui/material'
import { useFormik } from 'formik'
import { useState } from 'react'
import { initalLoginValue, loginValueSchema } from './validate'
import { useRouter } from 'next/navigation'
import { authService } from '@/common/services/auth-service'
import { useAuth } from '@/shared/context/AuthProvider'
import Divider from '@mui/material/Divider';

import { IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNotify } from '@/shared/hooks/useNotify'

const LoginPage = () => {
    const { login } = useAuth();
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const { notify } = useNotify();
    const router = useRouter();
    const formik = useFormik({
        initialValues: initalLoginValue,
        validationSchema: loginValueSchema,
        onSubmit: async (values) => {
            try {
                const res = await authService.login(values)
                notify({
                    success: res?.payload?.isSuccess,
                    message: res?.payload?.message,
                })
                if (res?.payload?.isSuccess) {
                    login(res.payload.data.token, res.payload.data.user)
                    router.push('/')
                }
            } catch (err) {
                console.error("error:", err);
                notify({
                    success: false,
                    message: `error: ${err}`,
                })

            }
        },
    });
    return (
        <MiniShopCard title={'Login'}
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
                        Login
                    </Button>
                    <Divider>
                        <Chip label="Or" size="small" />
                    </Divider>
                    <Button
                        fullWidth
                        variant='outlined'
                        color='primary'
                        onClick={() => router.push('/register')}
                    >
                        Register
                    </Button>
                </Box>
            </Box>
        </MiniShopCard>
    )
}

export default LoginPage