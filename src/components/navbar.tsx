import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import * as React from 'react';
import { useLogout } from '../features/auth/hooks/logout';
import { useGetProfile } from '../features/home/hooks/profile';
import { ButtonLink } from './button-link';
import { LineMdAccount, LineMdLogout } from './icon';
import Progress from './progress';
import { useState } from 'react';

function Navbar() {
    const { data, isLoading } = useGetProfile();
    const logout = useLogout();
    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    if (isLoading) {
        return <Progress />;
    };

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <img
                        width={50}
                        src='https://res.cloudinary.com/dqvskcnje/image/upload/v1734618334/rtubjrabjj6iago28yxm.png' />
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit">
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{ display: { xs: 'block', md: 'none' } }}>
                            <MenuItem onClick={handleCloseNavMenu}>
                                <ButtonLink sx={{ textAlign: 'center' }} to={`/`}>Product</ButtonLink>
                                <ButtonLink sx={{ textAlign: 'center' }} to={`/add-product`}>Add-Product</ButtonLink>
                            </MenuItem>
                        </Menu>
                    </Box>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, ml: 2 }}>
                        <ButtonLink
                            sx={{ textAlign: 'center', my: 2, color: 'white', display: 'block' }}
                            to={`/`}>
                            Product
                        </ButtonLink>
                        <ButtonLink
                            sx={{ textAlign: 'center', my: 2, color: 'white', display: 'block' }}
                            to={`/add-product`}>
                            Add-Product
                        </ButtonLink>
                    </Box>
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="Remy Sharp" src={data?.image} />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}>
                            <MenuItem onClick={handleCloseUserMenu} sx={{ width: 'auto', display: 'flex', flexDirection: 'column', gap: '5px' }}>
                                <ButtonLink sx={{ display: 'flex', textDecoration: 'none', gap: '5px' }} to={'/profile'}>
                                    <LineMdAccount />Profile
                                </ButtonLink>
                                <ButtonLink sx={{ display: 'flex', textDecoration: 'none', gap: '5px' }} to={''} onClick={logout}>
                                    <LineMdLogout /> Logout
                                </ButtonLink>
                            </MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default Navbar;
