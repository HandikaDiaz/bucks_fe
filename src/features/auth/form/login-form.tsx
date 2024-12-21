import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Button, FormControl, IconButton, Input, InputAdornment, InputLabel, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { ButtonLink } from '../../../components/button-link';
import { useAuthLogin } from '../hooks/login';
import { toast } from 'react-toastify';

function LoginForm() {
    const { submit, errors, register } = useAuthLogin();
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    useEffect(() => {
        Object.keys(errors).forEach((field) => {
            const message = errors[field as keyof typeof errors]?.message;
            if (message) {
                toast.error(message);
            }
        });
    }, [errors]);

    return (
        <>
            <form onSubmit={submit}>
                <Stack flex={1} mx={3} justifyContent={'center'} textAlign={'center'}>
                    <Typography variant="h4" fontWeight={'bold'} mb={3}>
                        Sign In
                    </Typography>
                    <FormControl sx={{ m: 1, width: '100%' }} variant="outlined">
                        <InputLabel>Username/Email</InputLabel>
                        <Input type="text" {...register('username')} />
                    </FormControl>
                    <FormControl sx={{ m: 1, width: '100%' }} variant="outlined">
                        <InputLabel>Password</InputLabel>
                        <Input
                            id="standard-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label={
                                            showPassword ? 'hide the password' : 'display the password'
                                        }
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        onMouseUp={handleMouseUpPassword}>
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            } {...register('password')}
                        />
                    </FormControl>
                    <Button type='submit' sx={{ m: 1, width: '100%' }} variant="contained">Sign In</Button>
                    <Typography>
                        Don't have an account? <ButtonLink to="/register">Sign Up</ButtonLink>
                    </Typography>
                </Stack>
            </form>
        </>
    );
}

export default LoginForm;