import type { IQuestionnaire } from "@/types/questionnaire";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import LaunchIcon from "@mui/icons-material/Launch";
import type { IListItem } from "@/types/page.interface";
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
            <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={id}>
              <Card key={"id"}>
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
                    <IconButton title="Edit" size="small">
                      <EditIcon />
                    </IconButton>
                  </Link>
                  <Link href={`/forms-submission/${id}`}>
                    <IconButton title="Launch Form" size="small">
                      <LaunchIcon />
                    </IconButton>
                  </Link>
                </CardActions>
              </Card>
            </Grid>
          );
        }
      )}
    </Grid>
  );
};

export default ListCardForm;
