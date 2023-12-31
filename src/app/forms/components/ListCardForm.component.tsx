import type { IQuestionnaire } from "@/types/questionnaire";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import LaunchIcon from "@mui/icons-material/Launch";
import type { IListItem } from "@/types/base";
import { formatDate } from "@/util/date";

const ListCardForm = ({
  listForms,
}: {
  listForms: IListItem<IQuestionnaire>;
}): React.ReactElement => {
  return (
    <Grid container spacing={4}>
      {listForms.data.map(
        ({ name, id, description, thumbnail, createdAt }: IQuestionnaire) => {
          return (
            <Grid item xs={12} sm={6} md={4} lg={4} xl={3} key={id}>
              <Card>
                <CardHeader title={name} subheader={formatDate(createdAt)} />
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
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    {description}
                  </Typography>
                </CardContent>
                <CardActions disableSpacing>
                  <Link href={`/forms/${id}`}>
                    <Button title="Edit" size="small" startIcon={<EditIcon />}>
                      Edit
                    </Button>
                  </Link>
                  <Link href={`/forms-submission/${id}`} target="_blank">
                    <Button
                      title="Launch Form"
                      size="small"
                      startIcon={<LaunchIcon />}
                    >
                      View
                    </Button>
                  </Link>
                </CardActions>
              </Card>
            </Grid>
          );
        },
      )}
    </Grid>
  );
};

export default ListCardForm;
