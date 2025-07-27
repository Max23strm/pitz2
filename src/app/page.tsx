import { homeFetch } from "@/helpers/dataFetcher";
import { Alert, Container, Grid, GridCol } from "@mantine/core";
import { DangerOctagon } from "@mynaui/icons-react";
import dayjs from "dayjs";
import StandardCard from "./components/homeComponents/StandardCard";

export default async function Home() {
  const { data, errors, isSuccess } = await homeFetch(
    dayjs().format("YYYY-MM-DD")
  );
  
  if (!isSuccess) {
    return (
      <Alert variant="light" color="red" title="Error obteniendo información" withCloseButton={false} icon={<DangerOctagon />}>
        {errors.home}
      </Alert>
    );
  }

  return <Container fluid>
    <Grid>
      <GridCol span={{ base: 12}}>
        <StandardCard type={'event'} data={data?.upcoming_event ?? null}/>
      </GridCol>
      <GridCol span={{ base: 12, md: 6}}>
        <StandardCard type={"players"} data={data?.players_amount ?? 0}/>
      </GridCol>
      <GridCol span={{ base: 12, md: 6}}>
         <StandardCard type={"amount"} data={data?.monthly_income ?? 0}/>
      </GridCol>
    </Grid>
    
   
  </Container>;
}
