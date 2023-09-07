import { ButtonBase, Divider, Grid, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import MuseService from "../../app/services/muse.service";
import Image from "mui-image";

function MusePage() {
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const resp = await MuseService.getMETObject();
      setData(resp);
    };

    fetchData();
    // 438101
    // setData({"objectID":438101,"isHighlight":false,"accessionNumber":"2019.141.3","accessionYear":"2019","isPublicDomain":true,"primaryImage":"https://images.metmuseum.org/CRDImages/ep/original/DT274230.jpg","primaryImageSmall":"https://images.metmuseum.org/CRDImages/ep/web-large/DT274230.jpg","additionalImages":[],"constituents":[{"constituentID":161741,"role":"Artist","name":"Canaletto (Giovanni Antonio Canal)","constituentULAN_URL":"http://vocab.getty.edu/page/ulan/500115269","constituentWikidata_URL":"https://www.wikidata.org/wiki/Q182664","gender":""}],"department":"European Paintings","objectName":"Painting","title":"Campo Santa Maria Zobenigo, Venice","culture":"","period":"","dynasty":"","reign":"","portfolio":"","artistRole":"Artist","artistPrefix":"","artistDisplayName":"Canaletto (Giovanni Antonio Canal)","artistDisplayBio":"Italian, Venice 1697–1768 Venice","artistSuffix":"","artistAlphaSort":"Canaletto (Giovanni Antonio Canal)","artistNationality":"Italian","artistBeginDate":"1697","artistEndDate":"1768","artistGender":"","artistWikidata_URL":"https://www.wikidata.org/wiki/Q182664","artistULAN_URL":"http://vocab.getty.edu/page/ulan/500115269","objectDate":"1730s","objectBeginDate":1730,"objectEndDate":1739,"medium":"Oil on canvas","dimensions":"18 1/2 × 30 3/4 in. (47 × 78.1 cm)","measurements":[{"elementName":"Overall","elementDescription":null,"elementMeasurements":{"Height":47,"Width":78.105156}}],"creditLine":"Bequest of Mrs. Charles Wrightsman, 2019","geographyType":"","city":"","state":"","county":"","country":"","region":"","subregion":"","locale":"","locus":"","excavation":"","river":"","classification":"Paintings","rightsAndReproduction":"","linkResource":"","metadataDate":"2023-04-18T04:46:43.39Z","repository":"Metropolitan Museum of Art, New York, NY","objectURL":"https://www.metmuseum.org/art/collection/search/438101","tags":[{"term":"Venice","AAT_URL":"http://vocab.getty.edu/page/tgn/7018159","Wikidata_URL":"https://www.wikidata.org/wiki/Q641"},{"term":"Buildings","AAT_URL":"http://vocab.getty.edu/page/aat/300004789","Wikidata_URL":"https://www.wikidata.org/wiki/Q41176"},{"term":"Towers","AAT_URL":"http://vocab.getty.edu/page/aat/300004847","Wikidata_URL":"https://www.wikidata.org/wiki/Q12518"},{"term":"Cities","AAT_URL":"http://vocab.getty.edu/page/aat/300008389","Wikidata_URL":"https://www.wikidata.org/wiki/Q515"}],"objectWikidata_URL":"https://www.wikidata.org/wiki/Q78640265","isTimelineWork":false,"GalleryNumber":""})
  }, []);

  return (
    <div style={{ height: "100vh" }}>
      {data && (
        <Grid
          position="relative"
          container
          display={"flex"}
          flexDirection={"row"}
          spacing={3}
          marginTop={4}
          paddingX={3}
        >
          <Grid item flex={6}>
            <Image
              src={data.primaryImage}
              fit="contain"
              style={{ width: "60vw", height: "80vh" }}
              alt="img"
            />
          </Grid>
          <Grid
            item
            display={"flex"}
            flex={4}
            justifyContent={"center"}
            alignItems={"flex-start"}
            flexDirection={"column"}
          >
            <Paper sx={{ minWidth: "20vw", maxWidth: "30vw" }} elevation={0}>
              <Typography variant="h4" fontWeight={"bold"}>
                {data.title}
              </Typography>
              <Typography variant="body1" gutterBottom>
                {data.medium}
              </Typography>
              <Divider />
              <Typography variant="h6">{data.artistDisplayName}</Typography>
              <Typography variant="body1" color={"grey"}>
                {data.artistDisplayBio}
              </Typography>
            </Paper>
            <ButtonBase
              sx={{ height: "50px", position: "absolute", bottom: 0 }}
              disableRipple
              href={data.objectURL}
              target="_blank"
            >
              <Image src={"./met-logo.jpg"} />
            </ButtonBase>
          </Grid>
        </Grid>
      )}
    </div>
  );
}

export default MusePage;
