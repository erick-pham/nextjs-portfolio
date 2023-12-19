import Typography from "@mui/material/Typography";

export default function Copyright(): React.ReactElement {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © By ErickPham"}
      {/* <MuiLink color="inherit" href="https://erickpham-nextjs.vercel.app">
        https://erickpham-nextjs.vercel.app
      </MuiLink> */}{" "}
      {new Date().getFullYear()}.
    </Typography>
  );
}
