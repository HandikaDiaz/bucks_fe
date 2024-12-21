import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Button, Checkbox, FormControl, IconButton, Input, InputAdornment, InputLabel, MenuItem, Select, SelectChangeEvent, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { ButtonLink } from '../../../components/button-link';
import { useAuthRegister } from '../hooks/register';
import { toast } from 'react-toastify';

function RegisterForm() {
    const { submit, errors, register, setValue } = useAuthRegister();
    const [showPassword, setShowPassword] = useState(false);
    const [gender, setGender] = useState<string>('');

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    const handleChange = (event: SelectChangeEvent) => {
        const value = event.target.value as "MALE" | "FEMALE";
        setValue('gender', value);
        setGender(value);
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
                        Sign Up
                    </Typography>
                    <FormControl sx={{ m: 1, width: '100%' }} variant="outlined">
                        <InputLabel>Fullname</InputLabel>
                        <Input type="text" {...register('fullname')} />
                    </FormControl>
                    <FormControl sx={{ m: 1, width: '100%' }} variant="outlined">
                        <InputLabel>Email</InputLabel>
                        <Input type="text" {...register('email')} />
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
                    <FormControl variant="standard" sx={{ m: 1, width: '100%' }}>
                        <InputLabel id="demo-simple-select-standard-label" sx={{ ml: 2 }}>Gender</InputLabel>
                        <Select
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            value={gender}
                            onChange={handleChange}
                            label="Gender"
                            name="gender">
                            <MenuItem value={"MALE"} >Male</MenuItem>
                            <MenuItem value={"FEMALE"}>Female</MenuItem>
                        </Select>
                    </FormControl>
                    <Typography textAlign={'left'} variant="caption" fontWeight={'bold'}>
                        <Checkbox required />
                        Accept Terms & Conditions
                    </Typography>
                    <Button type='submit' sx={{ m: 1, width: '100%' }} variant="contained">Sign Up</Button>
                    <Typography>
                        Already have an account? <ButtonLink to="/login">Sign In</ButtonLink>
                    </Typography>
                </Stack>
            </form>
        </>
    );
}

export default RegisterForm;