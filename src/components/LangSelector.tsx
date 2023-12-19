import type { ReactElement } from "react";
import { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import type { SelectChangeEvent } from "@mui/material/Select";
import Select from "@mui/material/Select";
import { useRouter } from "next/router";

export default function SelectSmall(): ReactElement {
  const router = useRouter();
  const currentLocale = router.locale || router.defaultLocale;
  const [lang, setLang] = useState(currentLocale);

  const handleChange = (event: SelectChangeEvent): void => {
    setLang(event.target.value);
    router.push(router.asPath, router.asPath, { locale: event.target.value });
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <Select value={lang} onChange={handleChange}>
        <MenuItem value="en">English</MenuItem>
        <MenuItem value="vi">Vietnamese</MenuItem>
      </Select>
    </FormControl>
  );
}
