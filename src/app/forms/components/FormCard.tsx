import type { IQuestionnaire } from "@/types/questionnaire";
import ArrowDownOnSquareIcon from "@heroicons/react/24/solid/ArrowDownOnSquareIcon";
import ClockIcon from "@heroicons/react/24/solid/ClockIcon";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
  Link,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import type { ReactElement } from "react";
import EditIcon from "@mui/icons-material/Edit";
import LaunchIcon from "@mui/icons-material/Launch";
import Image from "next/image";
import { formatDate } from "@/util/date";

export const FormCard = ({
  name,
  id,
  description,
  thumbnail,
  createdAt,
}: IQuestionnaire): ReactElement => {
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <CardContent>
        <Box
          sx={{
            pb: 3,
          }}
        >
          <CardMedia>
            <Image
              alt="example"
              width={0}
              height={0}
              sizes="100vw"
              style={{
                width: "100%",
                height: "200px",
                maxHeight: "200px",
              }}
              loading="lazy"
              src={`${thumbnail || ""}`}
            />
          </CardMedia>
        </Box>
        <Typography align="center" gutterBottom variant="h5">
          {name}
        </Typography>
        <Typography align="center" variant="body1">
          {description}
        </Typography>
      </CardContent>
      <Box sx={{ flexGrow: 1 }} />
      <Divider />
      <Stack
        alignItems="center"
        direction="row"
        justifyContent="space-between"
        spacing={2}
        sx={{ p: 2 }}
      >
        <Stack alignItems="center" direction="row" spacing={1}>
          <SvgIcon color="action" fontSize="small">
            <ClockIcon />
          </SvgIcon>
          <Typography color="text.secondary" display="inline" variant="body2">
            {formatDate(createdAt)}
          </Typography>
        </Stack>
        <Stack alignItems="center" direction="row" spacing={1}>
          <SvgIcon color="action" fontSize="small">
            <ArrowDownOnSquareIcon />
          </SvgIcon>
          <Typography color="text.secondary" display="inline" variant="body2">
            {0} Submissions
          </Typography>
        </Stack>
      </Stack>
      <CardActions disableSpacing>
        <Link href={`/forms/${id}`}>
          <Button title="Edit" size="small" startIcon={<EditIcon />}>
            Edit
          </Button>
        </Link>
        <Link href={`/forms-submission/${id}`} target="_blank">
          <Button title="Launch Form" size="small" startIcon={<LaunchIcon />}>
            Preview
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
};
