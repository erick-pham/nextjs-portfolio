"use server";
import {
  Grid,
  Typography,
  CardMedia,
  CardContent,
  Box,
  Card,
} from "@mui/material";
import type { ReactElement } from "react";
import Image from "next/image";
import Link from "next/link";

type PortfolioProp = {
  description: string;
  href: string;
  image: string;
  name: string;
};

const PORTFOLIOS: PortfolioProp[] = [
  {
    href: "/forms",
    name: "Form Builder",
    image: "/static/images/img-portfolio-form.jpg",
    description:
      "A digital portfolio is a great way to build collection form. You or your team can easily create digital forms, preview and collect data by using our this product.",
  },
  {
    href: "/rules",
    name: "Rule Engine (Coming soon)",
    image: "/static/images/img-portfolio-rule.jpg",
    description:
      "A flexible piece of software that manages business rules. It is essentially a decision-making program that can automate next stage of the workflow or business process.",
  },
  {
    href: "/excel2json",
    name: "XLSX schema to JSON (Coming soon)",
    image: "/static/images/img-portfolio-excel-to-json.jpg",
    description:
      "A product that helps parse Excel sheets to JSON is a software tool designed to convert data from Excel format into JSON format. This type of product is particularly useful when you need to transfer spreadsheet data to CMS web applications in a lightweight and easy-to-process format.",
  },
];

export const HomePortfolio = (): ReactElement => {
  return (
    <div>
      <Grid container mb={4}>
        <Typography
          variant="h3"
          sx={
            {
              // textAlign: "center",
            }
          }
        >
          Portfolios
        </Typography>
      </Grid>
      <Grid container spacing={5}>
        {PORTFOLIOS.map(
          (portfolio: PortfolioProp, index: number): ReactElement => {
            return (
              <Grid key={index} item xs={12} sm={6} md={4}>
                <Link href={portfolio.href} style={{ textDecoration: "none" }}>
                  <Card
                    sx={{
                      "&:hover": {
                        boxShadow: "0 0 10px 10px rgba(255,255,255,0.25)",
                      },
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
                          height: "300px",
                        }}
                        loading="lazy"
                        src={portfolio.image}
                      />
                    </CardMedia>
                    <CardContent>
                      <Typography align="center" gutterBottom variant="h5">
                        {portfolio.name}
                      </Typography>
                      <Typography align="center" variant="body1">
                        {portfolio.description}
                      </Typography>
                    </CardContent>
                    <Box sx={{ flexGrow: 1 }} />
                  </Card>{" "}
                </Link>
              </Grid>
            );
          },
        )}
      </Grid>
    </div>
  );
};
