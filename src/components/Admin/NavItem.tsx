import NextLink from "next/link";
import type { ButtonProps } from "@mui/material";
import { Box, Button, ListItem } from "@mui/material";
import { signOut } from "next-auth/react";
import type { ReactElement } from "react";
import { usePathname } from "next/navigation";

type MyStyledButtonProp = ButtonProps & {
  active: boolean;
};

const MyStyledButton = ({
  active,
  children,
  ...rest
}: MyStyledButtonProp): ReactElement => {
  return (
    <Button
      {...rest}
      sx={{
        backgroundColor: active ? "rgba(255,255,255, 0.08)" : undefined,
        borderRadius: 1,
        color: active ? "secondary.main" : "neutral.300",
        fontWeight: active ? "fontWeightBold" : undefined,
        justifyContent: "flex-start",
        px: 3,
        textAlign: "left",
        textTransform: "none",
        width: "100%",
        "& .MuiButton-startIcon": {
          color: active ? "secondary.main" : "neutral.400",
        },
        "&:hover": {
          backgroundColor: "rgba(255,255,255, 0.08)",
        },
      }}
    >
      {children}
    </Button>
  );
};

export type NavItemProp = {
  href: string;
  icon: JSX.Element;
  title: string;
};

export const NavItem = (props: NavItemProp): ReactElement => {
  const { href, icon, title, ...others } = props;
  const pathname = usePathname();
  const active = href ? pathname.startsWith(href) : false;

  const handleSignOut = (): void => {
    if (title === "SignOut") {
      signOut();
    }
  };

  return (
    <ListItem
      disableGutters
      sx={{
        display: "flex",
        mb: 0.5,
        py: 0,
        px: 2,
      }}
      {...others}
    >
      <NextLink
        href={href || "/"}
        passHref
        style={{
          textDecoration: "none",
          color: "inherit",
        }}
      >
        <MyStyledButton
          startIcon={icon}
          disableRipple
          active={active}
          onClick={handleSignOut}
        >
          <Box sx={{ flexGrow: 1 }}>{title}</Box>
        </MyStyledButton>
      </NextLink>
    </ListItem>
  );
};

export default NavItem;
