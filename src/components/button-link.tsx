import { Button, ButtonProps } from "@mui/material";
import { Link as RRLink, LinkProps as RRLinkProps } from "react-router-dom";

type ButtonLinkProps = ButtonProps & RRLinkProps & { children: React.ReactNode };

export function ButtonLink({ children, to, ...props }: ButtonLinkProps) {
    return (
        <Button
            component={RRLink}
            to={to}
            {...props}>
            {children}
        </Button>
    );
}
